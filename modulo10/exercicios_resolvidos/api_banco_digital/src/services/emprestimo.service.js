import ContaRepository from "../repositories/conta.repository.js";
import EmprestimoRepository from "../repositories/emprestimo.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import criarErro from "../utils/criarErro.js";
import { adicionarMeses, validarValorCentavos } from "../utils/dinheiro.js";
import { garantirDonoOuEquipe, idIgual } from "../utils/permissoes.js";
import { documentoSeguro, listaSegura } from "../utils/serializar.js";
import { buscarContaOperavel, garantirContaAtiva, garantirSaldoSuficiente } from "./regrasBanco.service.js";

function calcularSimulacao({ valorSolicitadoCentavos, quantidadeParcelas, taxaJurosMensal = 2.5 }) {
  const valor = validarValorCentavos(valorSolicitadoCentavos, "valorSolicitadoCentavos");
  const parcelas = Number(quantidadeParcelas);
  const taxa = Number(taxaJurosMensal);

  if (!Number.isInteger(parcelas) || parcelas <= 0) {
    throw criarErro("quantidadeParcelas deve ser um número inteiro maior que zero.", 400);
  }

  if (!Number.isFinite(taxa) || taxa < 0) {
    throw criarErro("taxaJurosMensal deve ser maior ou igual a zero.", 400);
  }

  const valorTotalCentavos = Math.ceil(valor * (1 + (taxa / 100) * parcelas));
  const valorParcelaCentavos = Math.ceil(valorTotalCentavos / parcelas);

  return {
    valorSolicitadoCentavos: valor,
    quantidadeParcelas: parcelas,
    taxaJurosMensal: taxa,
    valorTotalCentavos,
    valorParcelaCentavos,
  };
}

function montarParcelas(quantidadeParcelas, valorParcelaCentavos) {
  const parcelas = [];

  for (let indice = 0; indice < quantidadeParcelas; indice++) {
    parcelas.push({
      numero: indice + 1,
      valorCentavos: valorParcelaCentavos,
      vencimento: adicionarMeses(new Date(), indice + 1),
      status: "pendente",
      dataPagamento: null,
    });
  }

  return parcelas;
}

function atualizarParcelasAtrasadas(emprestimo) {
  if (!["aprovado", "em_atraso"].includes(emprestimo.status)) {
    return false;
  }

  const hoje = new Date();
  let temAtraso = false;

  for (const parcela of emprestimo.parcelas) {
    if (parcela.status === "pendente" && parcela.vencimento < hoje) {
      parcela.status = "atrasada";
      temAtraso = true;
    }
  }

  if (temAtraso) {
    emprestimo.status = "em_atraso";
  }

  return temAtraso;
}

async function simular(dados) {
  return calcularSimulacao(dados);
}

async function solicitar(usuarioLogado, dados) {
  const conta = await buscarContaOperavel(dados.contaId, usuarioLogado);
  const simulacao = calcularSimulacao(dados);

  const emprestimo = await EmprestimoRepository.criar({
    usuarioId: usuarioLogado.id,
    contaId: conta._id,
    valorSolicitadoCentavos: simulacao.valorSolicitadoCentavos,
    quantidadeParcelas: simulacao.quantidadeParcelas,
    taxaJurosMensal: simulacao.taxaJurosMensal,
    valorParcelaCentavos: simulacao.valorParcelaCentavos,
    status: "solicitado",
    parcelas: montarParcelas(simulacao.quantidadeParcelas, simulacao.valorParcelaCentavos),
  });

  return documentoSeguro(emprestimo);
}

async function listar(usuarioLogado) {
  const emprestimos = await EmprestimoRepository.listarPorUsuario(usuarioLogado.id);

  for (const emprestimo of emprestimos) {
    if (atualizarParcelasAtrasadas(emprestimo)) {
      await EmprestimoRepository.salvar(emprestimo);
    }
  }

  return listaSegura(emprestimos);
}

async function aprovar(emprestimoId) {
  const emprestimo = await EmprestimoRepository.buscarPorId(emprestimoId);

  if (!emprestimo) {
    throw criarErro("Empréstimo não encontrado.", 404);
  }

  if (emprestimo.status !== "solicitado") {
    throw criarErro("Somente empréstimos solicitados podem ser aprovados.", 400);
  }

  const conta = await ContaRepository.buscarPorId(emprestimo.contaId);
  garantirContaAtiva(conta);

  const saldoAntes = conta.saldoCentavos;
  conta.saldoCentavos += emprestimo.valorSolicitadoCentavos;
  emprestimo.status = "aprovado";

  await ContaRepository.salvar(conta);
  await EmprestimoRepository.salvar(emprestimo);

  const transacao = await TransacaoRepository.criar({
    contaDestinoId: conta._id,
    usuarioDestinoId: conta.usuarioId,
    tipo: "emprestimo",
    valorCentavos: emprestimo.valorSolicitadoCentavos,
    descricao: "Crédito de empréstimo aprovado",
    status: "aprovada",
    saldoAntesDestinoCentavos: saldoAntes,
    saldoDepoisDestinoCentavos: conta.saldoCentavos,
  });

  return {
    emprestimo: documentoSeguro(emprestimo),
    transacao: documentoSeguro(transacao),
  };
}

async function reprovar(emprestimoId, { motivoReprovacao }) {
  const emprestimo = await EmprestimoRepository.buscarPorId(emprestimoId);

  if (!emprestimo) {
    throw criarErro("Empréstimo não encontrado.", 404);
  }

  if (emprestimo.status !== "solicitado") {
    throw criarErro("Somente empréstimos solicitados podem ser reprovados.", 400);
  }

  emprestimo.status = "reprovado";
  emprestimo.motivoReprovacao = motivoReprovacao || "Não informado.";

  await EmprestimoRepository.salvar(emprestimo);
  return documentoSeguro(emprestimo);
}

async function pagarParcela(usuarioLogado, emprestimoId, numeroParcela) {
  const emprestimo = await EmprestimoRepository.buscarPorId(emprestimoId);

  if (!emprestimo) {
    throw criarErro("Empréstimo não encontrado.", 404);
  }

  garantirDonoOuEquipe(emprestimo.usuarioId, usuarioLogado);

  if (!["aprovado", "em_atraso"].includes(emprestimo.status)) {
    throw criarErro("Empréstimo não está disponível para pagamento.", 400);
  }

  const parcela = emprestimo.parcelas.find((item) => item.numero === Number(numeroParcela));

  if (!parcela) {
    throw criarErro("Parcela não encontrada.", 404);
  }

  if (parcela.status === "paga") {
    throw criarErro("Parcela já foi paga.", 400);
  }

  const conta = await buscarContaOperavel(emprestimo.contaId, usuarioLogado);
  garantirSaldoSuficiente(conta, parcela.valorCentavos);

  const saldoAntes = conta.saldoCentavos;
  conta.saldoCentavos -= parcela.valorCentavos;
  parcela.status = "paga";
  parcela.dataPagamento = new Date();

  let todasPagas = true;
  let existeAtrasada = false;

  for (const item of emprestimo.parcelas) {
    if (item.status !== "paga") {
      todasPagas = false;
    }

    if (item.status === "atrasada") {
      existeAtrasada = true;
    }
  }

  emprestimo.status = todasPagas ? "quitado" : existeAtrasada ? "em_atraso" : "aprovado";

  await ContaRepository.salvar(conta);
  await EmprestimoRepository.salvar(emprestimo);

  const transacao = await TransacaoRepository.criar({
    contaOrigemId: conta._id,
    usuarioOrigemId: conta.usuarioId,
    tipo: "emprestimo",
    valorCentavos: parcela.valorCentavos,
    descricao: `Pagamento da parcela ${parcela.numero} do empréstimo`,
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntes,
    saldoDepoisOrigemCentavos: conta.saldoCentavos,
  });

  return {
    emprestimo: documentoSeguro(emprestimo),
    transacao: documentoSeguro(transacao),
  };
}

async function detalhar(usuarioLogado, emprestimoId) {
  const emprestimo = await EmprestimoRepository.buscarPorId(emprestimoId);

  if (!emprestimo) {
    throw criarErro("Empréstimo não encontrado.", 404);
  }

  garantirDonoOuEquipe(emprestimo.usuarioId, usuarioLogado);

  if (atualizarParcelasAtrasadas(emprestimo)) {
    await EmprestimoRepository.salvar(emprestimo);
  }

  return documentoSeguro(emprestimo);
}

export default {
  simular,
  solicitar,
  listar,
  detalhar,
  aprovar,
  reprovar,
  pagarParcela,
};
