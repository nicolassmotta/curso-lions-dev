import ContaRepository from "../repositories/conta.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import criarErro from "../utils/criarErro.js";
import { validarValorNaoNegativo } from "../utils/dinheiro.js";
import gerarNumeroConta from "../utils/gerarNumeroConta.js";
import { garantirDonoOuEquipe } from "../utils/permissoes.js";
import { documentoSeguro, listaSegura } from "../utils/serializar.js";
import { buscarContaAcessivel, buscarContaOuErro, garantirUsuarioPodeOperar } from "./regrasBanco.service.js";

async function gerarNumeroUnico() {
  for (let tentativa = 0; tentativa < 20; tentativa++) {
    const numero = gerarNumeroConta();
    const contaExistente = await ContaRepository.buscarPorNumero(numero);

    if (!contaExistente) {
      return numero;
    }
  }

  throw criarErro("Não foi possível gerar número de conta único.", 500);
}

async function solicitarAbertura(usuarioLogado, { tipo, limiteChequeEspecialCentavos = 0 }) {
  await garantirUsuarioPodeOperar(usuarioLogado.id);

  const tiposPermitidos = ["corrente", "poupanca", "salario"];

  if (!tiposPermitidos.includes(tipo)) {
    throw criarErro("Tipo de conta inválido.", 400);
  }

  const limite = validarValorNaoNegativo(limiteChequeEspecialCentavos, "limiteChequeEspecialCentavos");

  if (tipo === "poupanca" && limite > 0) {
    throw criarErro("Conta poupança não pode ter cheque especial.", 400);
  }

  const conta = await ContaRepository.criar({
    usuarioId: usuarioLogado.id,
    agencia: "0001",
    numero: await gerarNumeroUnico(),
    tipo,
    saldoCentavos: 0,
    limiteChequeEspecialCentavos: limite,
    status: "pendente_aprovacao",
  });

  return documentoSeguro(conta);
}

async function listarMinhas(usuarioLogado) {
  const contas = await ContaRepository.listarPorUsuario(usuarioLogado.id);
  return listaSegura(contas);
}

async function detalhar(usuarioLogado, contaId) {
  const conta = await buscarContaAcessivel(contaId, usuarioLogado);
  return documentoSeguro(conta);
}

async function atualizarStatus(contaId, { status, limiteChequeEspecialCentavos }) {
  const conta = await buscarContaOuErro(contaId);
  const statusPermitidos = ["ativa", "bloqueada", "encerrada", "pendente_aprovacao"];

  if (!statusPermitidos.includes(status)) {
    throw criarErro("Status de conta inválido.", 400);
  }

  const dadosAtualizados = { status };

  if (limiteChequeEspecialCentavos !== undefined) {
    const limite = validarValorNaoNegativo(limiteChequeEspecialCentavos, "limiteChequeEspecialCentavos");

    if (conta.tipo === "poupanca" && limite > 0) {
      throw criarErro("Conta poupança não pode ter cheque especial.", 400);
    }

    dadosAtualizados.limiteChequeEspecialCentavos = limite;
  }

  const contaAtualizada = await ContaRepository.atualizarPorId(contaId, dadosAtualizados);
  return documentoSeguro(contaAtualizada);
}

async function extrato(usuarioLogado, contaId, filtros = {}) {
  const conta = await buscarContaOuErro(contaId);
  garantirDonoOuEquipe(conta.usuarioId, usuarioLogado);

  const filtrosTransacao = {};

  const transacoes = await TransacaoRepository.listarPorConta(contaId, filtrosTransacao);
  const transacoesFiltradas = [];

  for (const transacao of transacoes) {
    const depoisDoInicio = !filtros.inicio || transacao.createdAt >= new Date(filtros.inicio);
    const antesDoFim = !filtros.fim || transacao.createdAt <= new Date(filtros.fim);

    if (depoisDoInicio && antesDoFim) {
      transacoesFiltradas.push(transacao);
    }
  }

  return {
    conta: documentoSeguro(conta),
    transacoes: listaSegura(transacoesFiltradas),
  };
}

export default {
  solicitarAbertura,
  listarMinhas,
  detalhar,
  atualizarStatus,
  extrato,
};
