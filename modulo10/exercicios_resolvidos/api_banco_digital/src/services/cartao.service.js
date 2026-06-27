import bcrypt from "bcryptjs";

import CartaoRepository from "../repositories/cartao.repository.js";
import ContaRepository from "../repositories/conta.repository.js";
import FaturaRepository from "../repositories/fatura.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import criarErro from "../utils/criarErro.js";
import { mesAtual, validarValorCentavos, validarValorNaoNegativo } from "../utils/dinheiro.js";
import { gerarDadosCartao } from "../utils/gerarCodigo.js";
import { garantirDonoOuEquipe, idIgual } from "../utils/permissoes.js";
import { documentoSeguro, listaSegura } from "../utils/serializar.js";
import { buscarContaOperavel, garantirContaAtiva, garantirSaldoSuficiente } from "./regrasBanco.service.js";

function validarSenhaCartao(senhaCartao) {
  if (!senhaCartao || senhaCartao.length < 4) {
    throw criarErro("A senha do cartão deve ter pelo menos 4 caracteres.", 400);
  }
}

async function buscarCartaoAcessivel(usuarioLogado, cartaoId, incluirSenha = false) {
  const cartao = await CartaoRepository.buscarPorId(cartaoId, incluirSenha);

  if (!cartao) {
    throw criarErro("Cartão não encontrado.", 404);
  }

  garantirDonoOuEquipe(cartao.usuarioId, usuarioLogado);
  return cartao;
}

async function buscarOuCriarFatura(cartao, mesReferencia = mesAtual()) {
  const faturaExistente = await FaturaRepository.buscarPorCartaoEMes(cartao._id, mesReferencia);

  if (faturaExistente) {
    return faturaExistente;
  }

  return FaturaRepository.criar({
    cartaoId: cartao._id,
    usuarioId: cartao.usuarioId,
    mesReferencia,
    valorTotalCentavos: 0,
    valorPagoCentavos: 0,
    status: "aberta",
    compras: [],
  });
}

async function solicitar(usuarioLogado, { contaId, tipo, senhaCartao, limiteCentavos = 0 }) {
  if (!["debito", "credito"].includes(tipo)) {
    throw criarErro("Tipo de cartão inválido.", 400);
  }

  validarSenhaCartao(senhaCartao);

  const conta = await buscarContaOperavel(contaId, usuarioLogado);
  const limite = tipo === "credito" ? validarValorNaoNegativo(limiteCentavos, "limiteCentavos") : 0;
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  const senhaCartaoHash = await bcrypt.hash(senhaCartao, saltRounds);
  const dadosCartao = gerarDadosCartao();

  const cartao = await CartaoRepository.criar({
    usuarioId: usuarioLogado.id,
    contaId: conta._id,
    tipo,
    numeroMascarado: dadosCartao.numeroMascarado,
    ultimos4: dadosCartao.ultimos4,
    senhaCartaoHash,
    limiteCentavos: limite,
    limiteDisponivelCentavos: 0,
    status: "solicitado",
  });

  return documentoSeguro(cartao);
}

async function listar(usuarioLogado) {
  const cartoes = await CartaoRepository.listarPorUsuario(usuarioLogado.id);
  return listaSegura(cartoes);
}

async function atualizarStatus(cartaoId, { status, limiteCentavos }) {
  const cartao = await CartaoRepository.buscarPorId(cartaoId);

  if (!cartao) {
    throw criarErro("Cartão não encontrado.", 404);
  }

  if (!["solicitado", "ativo", "bloqueado", "cancelado"].includes(status)) {
    throw criarErro("Status de cartão inválido.", 400);
  }

  if (limiteCentavos !== undefined && cartao.tipo === "credito") {
    const novoLimite = validarValorNaoNegativo(limiteCentavos, "limiteCentavos");
    const diferenca = novoLimite - cartao.limiteCentavos;
    cartao.limiteCentavos = novoLimite;
    cartao.limiteDisponivelCentavos = Math.max(cartao.limiteDisponivelCentavos + diferenca, 0);
  }

  cartao.status = status;

  if (status === "ativo" && cartao.tipo === "credito" && cartao.limiteDisponivelCentavos === 0) {
    cartao.limiteDisponivelCentavos = cartao.limiteCentavos;
  }

  await CartaoRepository.salvar(cartao);
  return documentoSeguro(cartao);
}

async function registrarCompra(usuarioLogado, cartaoId, { valorCentavos, estabelecimento, descricao = "Compra no cartão", senhaCartao }) {
  if (!estabelecimento) {
    throw criarErro("Estabelecimento é obrigatório.", 400);
  }

  const valor = validarValorCentavos(valorCentavos);
  const cartao = await buscarCartaoAcessivel(usuarioLogado, cartaoId, true);

  if (cartao.status !== "ativo") {
    throw criarErro("Cartão precisa estar ativo.", 403);
  }

  const senhaCorreta = await bcrypt.compare(senhaCartao || "", cartao.senhaCartaoHash);

  if (!senhaCorreta) {
    throw criarErro("Senha do cartão incorreta.", 401);
  }

  const conta = await ContaRepository.buscarPorId(cartao.contaId);
  garantirContaAtiva(conta);

  if (cartao.tipo === "debito") {
    garantirSaldoSuficiente(conta, valor);

    const saldoAntes = conta.saldoCentavos;
    conta.saldoCentavos -= valor;
    await ContaRepository.salvar(conta);

    const transacao = await TransacaoRepository.criar({
      contaOrigemId: conta._id,
      usuarioOrigemId: conta.usuarioId,
      tipo: "cartao",
      valorCentavos: valor,
      descricao: `${descricao} - ${estabelecimento}`,
      status: "aprovada",
      saldoAntesOrigemCentavos: saldoAntes,
      saldoDepoisOrigemCentavos: conta.saldoCentavos,
    });

    return { transacao: documentoSeguro(transacao) };
  }

  if (cartao.limiteDisponivelCentavos < valor) {
    throw criarErro("Limite do cartão insuficiente.", 400);
  }

  const limiteAntes = cartao.limiteDisponivelCentavos;
  cartao.limiteDisponivelCentavos -= valor;

  const fatura = await buscarOuCriarFatura(cartao);
  fatura.compras.push({
    descricao,
    estabelecimento: estabelecimento.trim(),
    valorCentavos: valor,
    data: new Date(),
  });
  fatura.valorTotalCentavos += valor;
  fatura.status = fatura.valorPagoCentavos >= fatura.valorTotalCentavos ? "paga" : "aberta";

  await CartaoRepository.salvar(cartao);
  await FaturaRepository.salvar(fatura);

  const transacao = await TransacaoRepository.criar({
    contaOrigemId: conta._id,
    usuarioOrigemId: conta.usuarioId,
    tipo: "cartao",
    valorCentavos: valor,
    descricao: `${descricao} - ${estabelecimento}`,
    status: "aprovada",
    saldoAntesOrigemCentavos: limiteAntes,
    saldoDepoisOrigemCentavos: cartao.limiteDisponivelCentavos,
  });

  return {
    cartao: documentoSeguro(cartao),
    fatura: documentoSeguro(fatura),
    transacao: documentoSeguro(transacao),
  };
}

async function consultarFatura(usuarioLogado, cartaoId, mesReferencia = mesAtual()) {
  const cartao = await buscarCartaoAcessivel(usuarioLogado, cartaoId);
  const fatura = await buscarOuCriarFatura(cartao, mesReferencia);
  return documentoSeguro(fatura);
}

async function pagarFatura(usuarioLogado, cartaoId, { contaId, mesReferencia = mesAtual(), valorCentavos }) {
  const cartao = await buscarCartaoAcessivel(usuarioLogado, cartaoId);

  if (cartao.tipo !== "credito") {
    throw criarErro("Apenas cartão de crédito possui fatura.", 400);
  }

  const fatura = await buscarOuCriarFatura(cartao, mesReferencia);
  const valorEmAberto = fatura.valorTotalCentavos - fatura.valorPagoCentavos;

  if (valorEmAberto <= 0) {
    throw criarErro("Fatura já está paga.", 400);
  }

  const valorPagamento = valorCentavos !== undefined ? validarValorCentavos(valorCentavos) : valorEmAberto;

  if (valorPagamento > valorEmAberto) {
    throw criarErro("O pagamento não pode ser maior que o valor em aberto.", 400);
  }

  const conta = await buscarContaOperavel(contaId || cartao.contaId, usuarioLogado);
  garantirSaldoSuficiente(conta, valorPagamento);

  const saldoAntes = conta.saldoCentavos;
  conta.saldoCentavos -= valorPagamento;
  fatura.valorPagoCentavos += valorPagamento;
  cartao.limiteDisponivelCentavos = Math.min(cartao.limiteCentavos, cartao.limiteDisponivelCentavos + valorPagamento);

  if (fatura.valorPagoCentavos >= fatura.valorTotalCentavos) {
    fatura.status = "paga";
  }

  await ContaRepository.salvar(conta);
  await FaturaRepository.salvar(fatura);
  await CartaoRepository.salvar(cartao);

  const transacao = await TransacaoRepository.criar({
    contaOrigemId: conta._id,
    usuarioOrigemId: conta.usuarioId,
    tipo: "cartao",
    valorCentavos: valorPagamento,
    descricao: `Pagamento da fatura ${fatura.mesReferencia}`,
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntes,
    saldoDepoisOrigemCentavos: conta.saldoCentavos,
  });

  return {
    cartao: documentoSeguro(cartao),
    fatura: documentoSeguro(fatura),
    transacao: documentoSeguro(transacao),
  };
}

export default {
  solicitar,
  listar,
  atualizarStatus,
  registrarCompra,
  consultarFatura,
  pagarFatura,
};
