import ApostaRepository from "../repositories/aposta.repository.js";
import EventoRepository from "../repositories/evento.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";

const LIMITE_POR_APOSTA = 1000; // Bônus 4

// Qual campo do evento guarda a odd de cada palpite
const CAMPO_DA_ODD = {
  mandante: "oddMandante",
  empate: "oddEmpate",
  visitante: "oddVisitante",
};

async function apostar(idDoUsuario, dados = {}) {
  const { evento: idEvento, palpite, valor } = dados;

  // 1. evento existe?
  const evento = await EventoRepository.buscarPorId(idEvento);
  if (!evento) {
    throw criarErro("Evento não encontrado.", 404);
  }

  // 2. ainda aceita apostas?
  if (evento.status !== "aberto") {
    throw criarErro("As apostas para este evento estão encerradas.", 400);
  }

  // 3. palpite válido?
  if (!CAMPO_DA_ODD[palpite]) {
    throw criarErro("O palpite deve ser mandante, empate ou visitante.", 400);
  }

  // 4. valor válido?
  if (typeof valor !== "number" || Number.isNaN(valor) || valor <= 0) {
    throw criarErro("O valor da aposta deve ser maior que zero.", 400);
  }

  if (valor > LIMITE_POR_APOSTA) {
    throw criarErro("O valor máximo por aposta é R$ 1.000,00.", 400);
  }

  // 6 e 7. "foto" da odd e retorno potencial
  const oddNaAposta = evento[CAMPO_DA_ODD[palpite]];
  const retornoPotencial = Math.round(valor * oddNaAposta * 100) / 100;

  // 5 e 8. confere o saldo e debita na MESMA operação do banco (bônus 5).
  // Ler o saldo, comparar e depois debitar deixaria uma brecha: duas apostas
  // simultâneas poderiam ler o mesmo saldo e as duas passarem.
  const usuario = await UsuarioRepository.debitarSeTiverSaldo(idDoUsuario, valor);
  if (!usuario) {
    throw criarErro("Saldo insuficiente.", 400);
  }

  // 9. cria a aposta. Se falhar aqui, devolvemos o valor para não sumir dinheiro.
  try {
    return await ApostaRepository.criar({
      usuario: idDoUsuario,
      evento: idEvento,
      palpite,
      valor,
      oddNaAposta,
      retornoPotencial,
    });
  } catch (error) {
    await UsuarioRepository.ajustarSaldo(idDoUsuario, valor);
    throw error;
  }
}

async function listarMinhas(idDoUsuario) {
  return ApostaRepository.listarPorUsuario(idDoUsuario);
}

async function buscarMinha(idDoUsuario, idAposta) {
  const aposta = await ApostaRepository.buscarPorIdDoDono(idAposta, idDoUsuario);

  if (!aposta) {
    throw criarErro("Aposta não encontrada.", 404);
  }

  return aposta;
}

async function listarTodas() {
  return ApostaRepository.listarTodas();
}

const ApostaService = {
  apostar,
  listarMinhas,
  buscarMinha,
  listarTodas,
};

export default ApostaService;
