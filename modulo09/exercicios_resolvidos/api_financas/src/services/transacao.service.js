import TransacaoRepository from "../repositories/transacao.repository.js";
import criarErro from "../utils/criarErro.js";

// Arredonda para centavos. Somas com decimais podem gerar sobras
// como 0.30000000000000004, e dinheiro sempre tem 2 casas.
function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}

function validarValor(valor) {
  if (typeof valor !== "number" || Number.isNaN(valor) || valor <= 0) {
    throw criarErro("O valor deve ser um número maior que zero.", 400);
  }
}

// Só estes campos podem vir do body; o dono nunca.
function pegarCamposPermitidos(dados = {}) {
  const permitidos = {};

  if (dados.descricao !== undefined) permitidos.descricao = dados.descricao;
  if (dados.tipo !== undefined) permitidos.tipo = dados.tipo;
  if (dados.categoria !== undefined) permitidos.categoria = dados.categoria;
  if (dados.valor !== undefined) permitidos.valor = dados.valor;
  if (dados.data !== undefined) permitidos.data = dados.data;

  return permitidos;
}

async function registrar(idDoUsuario, dados) {
  const transacao = pegarCamposPermitidos(dados);

  // Regra do enunciado: conferir o valor no service, mesmo com o min do Schema
  validarValor(transacao.valor);

  transacao.usuario = idDoUsuario;
  return TransacaoRepository.criar(transacao);
}

async function listarMinhas(idDoUsuario, filtro = {}) {
  return TransacaoRepository.listarPorUsuario(idDoUsuario, filtro);
}

async function buscarMinha(idDoUsuario, idTransacao) {
  const transacao = await TransacaoRepository.buscarPorIdDoDono(idTransacao, idDoUsuario);

  if (!transacao) {
    throw criarErro("Transação não encontrada.", 404);
  }

  return transacao;
}

async function atualizarMinha(idDoUsuario, idTransacao, dados) {
  const dadosAtualizados = pegarCamposPermitidos(dados);

  if (Object.keys(dadosAtualizados).length === 0) {
    throw criarErro("Envie ao menos um campo para atualizar.", 400);
  }

  if (dadosAtualizados.valor !== undefined) {
    validarValor(dadosAtualizados.valor);
  }

  const transacao = await TransacaoRepository.atualizarPorIdDoDono(idTransacao, idDoUsuario, dadosAtualizados);

  if (!transacao) {
    throw criarErro("Transação não encontrada.", 404);
  }

  return transacao;
}

async function removerMinha(idDoUsuario, idTransacao) {
  const transacao = await TransacaoRepository.deletarPorIdDoDono(idTransacao, idDoUsuario);

  if (!transacao) {
    throw criarErro("Transação não encontrada.", 404);
  }

  return { message: "Transação removida com sucesso." };
}

async function resumoDoUsuario(idDoUsuario) {
  const transacoes = await TransacaoRepository.listarPorUsuario(idDoUsuario);

  // filter separa por tipo; reduce soma. Começando em 0, lista vazia soma 0.
  const totalEntradas = transacoes.filter((t) => t.tipo === "entrada").reduce((soma, t) => soma + t.valor, 0);
  const totalSaidas = transacoes.filter((t) => t.tipo === "saida").reduce((soma, t) => soma + t.valor, 0);

  // Bônus 2: soma das saídas por categoria
  const totalPorCategoria = {};
  for (const transacao of transacoes) {
    if (transacao.tipo === "saida") {
      const categoria = transacao.categoria || "sem categoria";
      totalPorCategoria[categoria] = arredondar((totalPorCategoria[categoria] || 0) + transacao.valor);
    }
  }

  return {
    totalEntradas: arredondar(totalEntradas),
    totalSaidas: arredondar(totalSaidas),
    saldo: arredondar(totalEntradas - totalSaidas),
    quantidade: transacoes.length,
    totalPorCategoria,
  };
}

const TransacaoService = {
  registrar,
  listarMinhas,
  buscarMinha,
  atualizarMinha,
  removerMinha,
  resumoDoUsuario,
};

export default TransacaoService;
