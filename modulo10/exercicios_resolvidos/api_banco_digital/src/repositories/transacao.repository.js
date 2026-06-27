import Transacao from "../models/transacao.model.js";

async function criar(dados) {
  return Transacao.create(dados);
}

async function buscarPorId(id) {
  return Transacao.findById(id);
}

async function listarPorConta(contaId, filtros = {}) {
  const transacoes = await Transacao.find(filtros).sort({ createdAt: -1 });
  const transacoesDaConta = [];

  for (const transacao of transacoes) {
    const origemIgual = String(transacao.contaOrigemId) === String(contaId);
    const destinoIgual = String(transacao.contaDestinoId) === String(contaId);

    if (origemIgual || destinoIgual) {
      transacoesDaConta.push(transacao);
    }
  }

  return transacoesDaConta;
}

async function listar(filtros = {}) {
  return Transacao.find(filtros).sort({ createdAt: -1 });
}

async function somarPixEnviadoNoPeriodo(contaIds, inicio, fim) {
  const transacoes = await Transacao.find({ tipo: "pix", status: "aprovada" });
  let totalCentavos = 0;

  for (const transacao of transacoes) {
    let contaEhDoUsuario = false;

    for (const contaId of contaIds) {
      if (String(contaId) === String(transacao.contaOrigemId)) {
        contaEhDoUsuario = true;
      }
    }

    const estaNoPeriodo = transacao.createdAt >= inicio && transacao.createdAt <= fim;

    if (contaEhDoUsuario && estaNoPeriodo) {
      totalCentavos += transacao.valorCentavos;
    }
  }

  return totalCentavos;
}

async function salvar(transacao) {
  return transacao.save();
}

export default {
  criar,
  buscarPorId,
  listarPorConta,
  listar,
  somarPixEnviadoNoPeriodo,
  salvar,
};
