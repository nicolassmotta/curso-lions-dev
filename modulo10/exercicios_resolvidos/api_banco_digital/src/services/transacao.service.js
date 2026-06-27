import ContaRepository from "../repositories/conta.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";
import { validarValorCentavos } from "../utils/dinheiro.js";
import { ehGerenteOuAdmin, garantirDonoOuEquipe, idIgual } from "../utils/permissoes.js";
import { documentoSeguro } from "../utils/serializar.js";
import { buscarContaOperavel, buscarContaOuErro, garantirContaAtiva, garantirSaldoSuficiente, garantirUsuarioPodeOperar } from "./regrasBanco.service.js";

const TARIFA_SAQUE_CENTAVOS = 250;
const LIMITE_TRANSFERENCIA_AUTOMATICA_CENTAVOS = 500000;

async function depositar(usuarioLogado, { contaId, valorCentavos, descricao = "Depósito" }) {
  const valor = validarValorCentavos(valorCentavos);
  const conta = await buscarContaOperavel(contaId, usuarioLogado);

  const saldoAntes = conta.saldoCentavos;
  conta.saldoCentavos += valor;
  await ContaRepository.salvar(conta);

  const transacao = await TransacaoRepository.criar({
    contaDestinoId: conta._id,
    usuarioDestinoId: conta.usuarioId,
    tipo: "deposito",
    valorCentavos: valor,
    descricao,
    status: "aprovada",
    saldoAntesDestinoCentavos: saldoAntes,
    saldoDepoisDestinoCentavos: conta.saldoCentavos,
  });

  return { transacao: documentoSeguro(transacao) };
}

async function sacar(usuarioLogado, { contaId, valorCentavos, descricao = "Saque" }) {
  const valor = validarValorCentavos(valorCentavos);
  const conta = await buscarContaOperavel(contaId, usuarioLogado);
  const total = valor + TARIFA_SAQUE_CENTAVOS;

  garantirSaldoSuficiente(conta, total);

  const saldoAntes = conta.saldoCentavos;
  conta.saldoCentavos -= total;
  await ContaRepository.salvar(conta);

  const transacao = await TransacaoRepository.criar({
    contaOrigemId: conta._id,
    usuarioOrigemId: conta.usuarioId,
    tipo: "saque",
    valorCentavos: valor,
    descricao,
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntes,
    saldoDepoisOrigemCentavos: saldoAntes - valor,
  });

  const tarifa = await TransacaoRepository.criar({
    contaOrigemId: conta._id,
    usuarioOrigemId: conta.usuarioId,
    tipo: "tarifa",
    valorCentavos: TARIFA_SAQUE_CENTAVOS,
    descricao: "Tarifa de saque",
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntes - valor,
    saldoDepoisOrigemCentavos: conta.saldoCentavos,
  });

  return {
    transacao: documentoSeguro(transacao),
    tarifa: documentoSeguro(tarifa),
  };
}

async function buscarContaDestino({ contaDestinoId, numeroContaDestino }) {
  if (contaDestinoId) {
    return buscarContaOuErro(contaDestinoId);
  }

  if (numeroContaDestino) {
    const conta = await ContaRepository.buscarPorNumero(numeroContaDestino);

    if (!conta) {
      throw criarErro("Conta de destino não encontrada.", 404);
    }

    return conta;
  }

  throw criarErro("Informe contaDestinoId ou numeroContaDestino.", 400);
}

async function validarRegraContaSalario(contaOrigem, contaDestino) {
  if (contaOrigem.tipo !== "salario") {
    return;
  }

  const usuarioOrigem = await UsuarioRepository.buscarPorId(contaOrigem.usuarioId);
  const usuarioDestino = await UsuarioRepository.buscarPorId(contaDestino.usuarioId);

  if (!usuarioOrigem || !usuarioDestino || usuarioOrigem.cpf !== usuarioDestino.cpf) {
    throw criarErro("Conta salário só pode transferir para conta do mesmo CPF.", 403);
  }
}

async function transferir(usuarioLogado, dados) {
  const valor = validarValorCentavos(dados.valorCentavos);
  const contaOrigem = await buscarContaOperavel(dados.contaOrigemId, usuarioLogado);
  const contaDestino = await buscarContaDestino(dados);

  if (idIgual(contaOrigem._id, contaDestino._id)) {
    throw criarErro("Conta de origem e destino devem ser diferentes.", 400);
  }

  await garantirUsuarioPodeOperar(contaDestino.usuarioId);
  garantirContaAtiva(contaDestino);
  await validarRegraContaSalario(contaOrigem, contaDestino);
  garantirSaldoSuficiente(contaOrigem, valor);

  if (valor > LIMITE_TRANSFERENCIA_AUTOMATICA_CENTAVOS && !ehGerenteOuAdmin(usuarioLogado)) {
    const transacaoPendente = await TransacaoRepository.criar({
      contaOrigemId: contaOrigem._id,
      contaDestinoId: contaDestino._id,
      usuarioOrigemId: contaOrigem.usuarioId,
      usuarioDestinoId: contaDestino.usuarioId,
      tipo: "transferencia",
      valorCentavos: valor,
      descricao: dados.descricao || "Transferência aguardando aprovação",
      status: "pendente",
      saldoAntesOrigemCentavos: contaOrigem.saldoCentavos,
      saldoDepoisOrigemCentavos: contaOrigem.saldoCentavos,
      saldoAntesDestinoCentavos: contaDestino.saldoCentavos,
      saldoDepoisDestinoCentavos: contaDestino.saldoCentavos,
    });

    return {
      transacao: documentoSeguro(transacaoPendente),
      message: "Transferência acima de R$ 5.000,00 ficou pendente de análise.",
    };
  }

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
    tipo: "transferencia",
    valorCentavos: valor,
    descricao: dados.descricao || "Transferência entre contas",
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntesOrigem,
    saldoDepoisOrigemCentavos: contaOrigem.saldoCentavos,
    saldoAntesDestinoCentavos: saldoAntesDestino,
    saldoDepoisDestinoCentavos: contaDestino.saldoCentavos,
  });

  return { transacao: documentoSeguro(transacao) };
}

async function buscarPorId(usuarioLogado, transacaoId) {
  const transacao = await TransacaoRepository.buscarPorId(transacaoId);

  if (!transacao) {
    throw criarErro("Transação não encontrada.", 404);
  }

  if (!ehGerenteOuAdmin(usuarioLogado)) {
    const pertenceAoUsuario = idIgual(transacao.usuarioOrigemId, usuarioLogado.id) || idIgual(transacao.usuarioDestinoId, usuarioLogado.id);

    if (!pertenceAoUsuario) {
      throw criarErro("Você não tem permissão para acessar esta transação.", 403);
    }
  }

  return documentoSeguro(transacao);
}

async function estornar(transacaoId) {
  const transacaoOriginal = await TransacaoRepository.buscarPorId(transacaoId);

  if (!transacaoOriginal) {
    throw criarErro("Transação não encontrada.", 404);
  }

  if (transacaoOriginal.tipo === "estorno") {
    throw criarErro("Não é possível estornar um estorno.", 400);
  }

  if (transacaoOriginal.status !== "aprovada") {
    throw criarErro("Somente transações aprovadas podem ser estornadas uma vez.", 400);
  }

  const contaOrigem = transacaoOriginal.contaOrigemId ? await ContaRepository.buscarPorId(transacaoOriginal.contaOrigemId) : null;
  const contaDestino = transacaoOriginal.contaDestinoId ? await ContaRepository.buscarPorId(transacaoOriginal.contaDestinoId) : null;
  const valor = transacaoOriginal.valorCentavos;

  if (contaDestino) {
    garantirSaldoSuficiente(contaDestino, valor);
  }

  let saldoAntesOrigem = null;
  let saldoDepoisOrigem = null;
  let saldoAntesDestino = null;
  let saldoDepoisDestino = null;

  if (contaOrigem) {
    saldoAntesDestino = contaOrigem.saldoCentavos;
    contaOrigem.saldoCentavos += valor;
    saldoDepoisDestino = contaOrigem.saldoCentavos;
    await ContaRepository.salvar(contaOrigem);
  }

  if (contaDestino) {
    saldoAntesOrigem = contaDestino.saldoCentavos;
    contaDestino.saldoCentavos -= valor;
    saldoDepoisOrigem = contaDestino.saldoCentavos;
    await ContaRepository.salvar(contaDestino);
  }

  transacaoOriginal.status = "estornada";
  await TransacaoRepository.salvar(transacaoOriginal);

  const estorno = await TransacaoRepository.criar({
    contaOrigemId: contaDestino ? contaDestino._id : null,
    contaDestinoId: contaOrigem ? contaOrigem._id : null,
    usuarioOrigemId: contaDestino ? contaDestino.usuarioId : null,
    usuarioDestinoId: contaOrigem ? contaOrigem.usuarioId : null,
    transacaoOriginalId: transacaoOriginal._id,
    tipo: "estorno",
    valorCentavos: valor,
    descricao: `Estorno da transação ${transacaoOriginal._id}`,
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntesOrigem,
    saldoDepoisOrigemCentavos: saldoDepoisOrigem,
    saldoAntesDestinoCentavos: saldoAntesDestino,
    saldoDepoisDestinoCentavos: saldoDepoisDestino,
  });

  return {
    transacaoOriginal: documentoSeguro(transacaoOriginal),
    estorno: documentoSeguro(estorno),
  };
}

async function buscarTransferenciaPendente(transacaoId) {
  const transacao = await TransacaoRepository.buscarPorId(transacaoId);

  if (!transacao) {
    throw criarErro("Transação não encontrada.", 404);
  }

  if (transacao.tipo !== "transferencia") {
    throw criarErro("Apenas transferências podem ser aprovadas ou recusadas por esta rota.", 400);
  }

  if (transacao.status !== "pendente") {
    throw criarErro("Apenas transferências pendentes podem ser aprovadas ou recusadas.", 400);
  }

  return transacao;
}

async function aprovarPendente(transacaoId) {
  const transacao = await buscarTransferenciaPendente(transacaoId);
  const contaOrigem = await ContaRepository.buscarPorId(transacao.contaOrigemId);
  const contaDestino = await ContaRepository.buscarPorId(transacao.contaDestinoId);

  garantirContaAtiva(contaOrigem);
  garantirContaAtiva(contaDestino);
  await garantirUsuarioPodeOperar(contaOrigem.usuarioId);
  await garantirUsuarioPodeOperar(contaDestino.usuarioId);
  garantirSaldoSuficiente(contaOrigem, transacao.valorCentavos);

  const saldoAntesOrigem = contaOrigem.saldoCentavos;
  const saldoAntesDestino = contaDestino.saldoCentavos;

  contaOrigem.saldoCentavos -= transacao.valorCentavos;
  contaDestino.saldoCentavos += transacao.valorCentavos;

  transacao.status = "aprovada";
  transacao.saldoAntesOrigemCentavos = saldoAntesOrigem;
  transacao.saldoDepoisOrigemCentavos = contaOrigem.saldoCentavos;
  transacao.saldoAntesDestinoCentavos = saldoAntesDestino;
  transacao.saldoDepoisDestinoCentavos = contaDestino.saldoCentavos;

  await ContaRepository.salvar(contaOrigem);
  await ContaRepository.salvar(contaDestino);
  await TransacaoRepository.salvar(transacao);

  return { transacao: documentoSeguro(transacao) };
}

async function recusarPendente(transacaoId, { motivo } = {}) {
  const transacao = await buscarTransferenciaPendente(transacaoId);

  transacao.status = "recusada";

  if (motivo) {
    transacao.descricao = `${transacao.descricao} | Recusada: ${motivo}`;
  }

  await TransacaoRepository.salvar(transacao);

  return { transacao: documentoSeguro(transacao) };
}

export default {
  depositar,
  sacar,
  transferir,
  buscarPorId,
  estornar,
  aprovarPendente,
  recusarPendente,
};
