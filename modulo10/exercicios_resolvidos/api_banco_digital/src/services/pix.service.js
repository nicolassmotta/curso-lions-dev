import ChavePixRepository from "../repositories/chavePix.repository.js";
import ContaRepository from "../repositories/conta.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import criarErro from "../utils/criarErro.js";
import { inicioDoDia, validarValorCentavos } from "../utils/dinheiro.js";
import { gerarChavePixAleatoria } from "../utils/gerarCodigo.js";
import { idIgual } from "../utils/permissoes.js";
import { documentoSeguro, listaSegura } from "../utils/serializar.js";
import { buscarContaOperavel, buscarUsuarioOuErro, garantirContaAtiva, garantirSaldoSuficiente, garantirUsuarioPodeOperar } from "./regrasBanco.service.js";

function normalizarChave(tipo, valor, usuario) {
  if (tipo === "aleatoria") {
    if (valor) {
      return valor.trim();
    }

    return gerarChavePixAleatoria();
  }

  if (tipo === "cpf") {
    return (valor || usuario.cpf).trim();
  }

  if (tipo === "email") {
    return (valor || usuario.email).trim().toLowerCase();
  }

  if (tipo === "telefone") {
    return (valor || usuario.telefone).trim();
  }

  throw criarErro("Tipo de chave PIX inválido.", 400);
}

async function cadastrarChave(usuarioLogado, { contaId, tipo, valor }) {
  const usuario = await buscarUsuarioOuErro(usuarioLogado.id);
  const conta = await buscarContaOperavel(contaId, usuarioLogado);
  const chaveValor = normalizarChave(tipo, valor, usuario);

  const chaveExistente = await ChavePixRepository.buscarAtivaPorValor(chaveValor);

  if (chaveExistente) {
    throw criarErro("Chave PIX já cadastrada.", 409);
  }

  const chave = await ChavePixRepository.criar({
    usuarioId: usuarioLogado.id,
    contaId: conta._id,
    tipo,
    valor: chaveValor,
    ativa: true,
  });

  return documentoSeguro(chave);
}

async function listarMinhasChaves(usuarioLogado) {
  const chaves = await ChavePixRepository.listarPorUsuario(usuarioLogado.id);
  return listaSegura(chaves);
}

async function removerChave(usuarioLogado, chaveId) {
  const chave = await ChavePixRepository.buscarPorId(chaveId);

  if (!chave || !chave.ativa) {
    throw criarErro("Chave PIX não encontrada.", 404);
  }

  if (!idIgual(chave.usuarioId, usuarioLogado.id)) {
    throw criarErro("Você não tem permissão para remover esta chave PIX.", 403);
  }

  chave.ativa = false;
  await ChavePixRepository.salvar(chave);

  return { message: "Chave PIX desativada com sucesso.", chave: documentoSeguro(chave) };
}

async function consultarLimites(usuarioLogado) {
  const limiteDiarioCentavos = Number(process.env.LIMITE_PIX_DIARIO_CENTAVOS || 500000);
  const contas = await ContaRepository.listarPorUsuario(usuarioLogado.id);
  const contaIds = [];

  for (const conta of contas) {
    contaIds.push(conta._id);
  }

  const inicio = inicioDoDia();
  const fim = new Date();
  const usadoHojeCentavos = await TransacaoRepository.somarPixEnviadoNoPeriodo(contaIds, inicio, fim);

  return {
    limiteDiarioCentavos,
    usadoHojeCentavos,
    disponivelHojeCentavos: Math.max(limiteDiarioCentavos - usadoHojeCentavos, 0),
  };
}

async function enviarPix(usuarioLogado, { contaOrigemId, chavePix, valorCentavos, descricao = "PIX enviado" }) {
  const valor = validarValorCentavos(valorCentavos);
  const contaOrigem = await buscarContaOperavel(contaOrigemId, usuarioLogado);
  const chaveDestino = await ChavePixRepository.buscarAtivaPorValor(chavePix);

  if (!chaveDestino) {
    throw criarErro("Chave PIX não encontrada.", 404);
  }

  const contaDestino = await ContaRepository.buscarPorId(chaveDestino.contaId);

  if (!contaDestino) {
    throw criarErro("Conta de destino não encontrada.", 404);
  }

  if (idIgual(contaOrigem._id, contaDestino._id)) {
    throw criarErro("A conta de origem e a conta da chave PIX devem ser diferentes.", 400);
  }

  await garantirUsuarioPodeOperar(contaDestino.usuarioId);
  garantirContaAtiva(contaDestino);

  const limites = await consultarLimites(usuarioLogado);
  if (limites.usadoHojeCentavos + valor > limites.limiteDiarioCentavos) {
    throw criarErro("Limite diário de PIX excedido.", 400);
  }

  garantirSaldoSuficiente(contaOrigem, valor);

  const saldoAntesOrigem = contaOrigem.saldoCentavos;
  const saldoAntesDestino = contaDestino.saldoCentavos;

  contaOrigem.saldoCentavos -= valor;
  contaDestino.saldoCentavos += valor;

  await ContaRepository.salvar(contaOrigem);
  await ContaRepository.salvar(contaDestino);

  const transacao = await TransacaoRepository.criar({
    contaOrigemId: contaOrigem._id,
    contaDestinoId: contaDestino._id,
    usuarioOrigemId: contaOrigem.usuarioId,
    usuarioDestinoId: contaDestino.usuarioId,
    tipo: "pix",
    valorCentavos: valor,
    descricao,
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntesOrigem,
    saldoDepoisOrigemCentavos: contaOrigem.saldoCentavos,
    saldoAntesDestinoCentavos: saldoAntesDestino,
    saldoDepoisDestinoCentavos: contaDestino.saldoCentavos,
  });

  return { transacao: documentoSeguro(transacao) };
}

export default {
  cadastrarChave,
  listarMinhasChaves,
  removerChave,
  consultarLimites,
  enviarPix,
};
