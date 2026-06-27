import BoletoRepository from "../repositories/boleto.repository.js";
import ContaRepository from "../repositories/conta.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import criarErro from "../utils/criarErro.js";
import { validarValorCentavos } from "../utils/dinheiro.js";
import { gerarCodigoBarras } from "../utils/gerarCodigo.js";
import { garantirDonoOuEquipe, idIgual } from "../utils/permissoes.js";
import { documentoSeguro, listaSegura } from "../utils/serializar.js";
import { buscarContaOperavel, garantirSaldoSuficiente } from "./regrasBanco.service.js";

async function gerarBoleto(usuarioLogado, { contaId, beneficiario, valorCentavos, dataVencimento }) {
  if (!beneficiario || !dataVencimento) {
    throw criarErro("Beneficiário e data de vencimento são obrigatórios.", 400);
  }

  const valor = validarValorCentavos(valorCentavos);
  const conta = await buscarContaOperavel(contaId, usuarioLogado);

  const boleto = await BoletoRepository.criar({
    usuarioId: usuarioLogado.id,
    contaId: conta._id,
    codigoBarras: gerarCodigoBarras(),
    beneficiario: beneficiario.trim(),
    valorCentavos: valor,
    dataVencimento,
    status: "aberto",
  });

  return documentoSeguro(boleto);
}

async function listarMeusBoletos(usuarioLogado) {
  const boletos = await BoletoRepository.listarPorUsuario(usuarioLogado.id);
  return listaSegura(boletos);
}

async function detalhar(usuarioLogado, boletoId) {
  const boleto = await BoletoRepository.buscarPorId(boletoId);

  if (!boleto) {
    throw criarErro("Boleto não encontrado.", 404);
  }

  garantirDonoOuEquipe(boleto.usuarioId, usuarioLogado);
  return documentoSeguro(boleto);
}

async function pagar(usuarioLogado, boletoId, { contaId }) {
  const boleto = await BoletoRepository.buscarPorId(boletoId);

  if (!boleto) {
    throw criarErro("Boleto não encontrado.", 404);
  }

  if (!idIgual(boleto.usuarioId, usuarioLogado.id)) {
    throw criarErro("Você não tem permissão para pagar este boleto.", 403);
  }

  if (boleto.status !== "aberto") {
    throw criarErro("Somente boletos em aberto podem ser pagos.", 400);
  }

  const conta = await buscarContaOperavel(contaId || boleto.contaId, usuarioLogado);
  garantirSaldoSuficiente(conta, boleto.valorCentavos);

  const saldoAntes = conta.saldoCentavos;
  conta.saldoCentavos -= boleto.valorCentavos;
  boleto.status = "pago";

  await ContaRepository.salvar(conta);
  await BoletoRepository.salvar(boleto);

  const transacao = await TransacaoRepository.criar({
    contaOrigemId: conta._id,
    usuarioOrigemId: conta.usuarioId,
    tipo: "boleto",
    valorCentavos: boleto.valorCentavos,
    descricao: `Pagamento de boleto para ${boleto.beneficiario}`,
    status: "aprovada",
    saldoAntesOrigemCentavos: saldoAntes,
    saldoDepoisOrigemCentavos: conta.saldoCentavos,
  });

  return {
    boleto: documentoSeguro(boleto),
    transacao: documentoSeguro(transacao),
  };
}

async function cancelar(usuarioLogado, boletoId) {
  const boleto = await BoletoRepository.buscarPorId(boletoId);

  if (!boleto) {
    throw criarErro("Boleto não encontrado.", 404);
  }

  if (!idIgual(boleto.usuarioId, usuarioLogado.id)) {
    throw criarErro("Você não tem permissão para cancelar este boleto.", 403);
  }

  if (boleto.status !== "aberto") {
    throw criarErro("Somente boletos em aberto podem ser cancelados.", 400);
  }

  boleto.status = "cancelado";
  await BoletoRepository.salvar(boleto);

  return documentoSeguro(boleto);
}

export default {
  gerarBoleto,
  listarMeusBoletos,
  detalhar,
  pagar,
  cancelar,
};
