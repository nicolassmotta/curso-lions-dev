import ApostaRepository from "../repositories/aposta.repository.js";
import EventoRepository from "../repositories/evento.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";

const RESULTADOS = ["mandante", "empate", "visitante"];

function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}

async function criar(idAdmin, dados = {}) {
  const { mandante, visitante, oddMandante, oddEmpate, oddVisitante } = dados;

  // status nasce "aberto" pelo default; resultado só existe ao encerrar
  return EventoRepository.criar({
    mandante,
    visitante,
    oddMandante,
    oddEmpate,
    oddVisitante,
    criadoPor: idAdmin,
  });
}

async function listarAbertos() {
  return EventoRepository.listarAbertos();
}

async function listarTodos() {
  return EventoRepository.listarTodos();
}

async function buscarPorId(idEvento) {
  const evento = await EventoRepository.buscarPorId(idEvento);

  if (!evento) {
    throw criarErro("Evento não encontrado.", 404);
  }

  return evento;
}

async function atualizarOdds(idEvento, dados = {}) {
  const evento = await buscarPorId(idEvento);

  if (evento.status !== "aberto") {
    throw criarErro("Evento já encerrado.", 400);
  }

  const { oddMandante, oddEmpate, oddVisitante } = dados;

  if (oddMandante === undefined && oddEmpate === undefined && oddVisitante === undefined) {
    throw criarErro("Envie ao menos uma odd para atualizar.", 400);
  }

  if (oddMandante !== undefined) evento.oddMandante = oddMandante;
  if (oddEmpate !== undefined) evento.oddEmpate = oddEmpate;
  if (oddVisitante !== undefined) evento.oddVisitante = oddVisitante;

  // o save aplica o min: 1.01 do Schema
  return EventoRepository.salvar(evento);
}

// A parte principal: cruza Evento, Aposta e Usuario
async function encerrar(idEvento, resultado) {
  // 1. existe e ainda está aberto?
  const evento = await buscarPorId(idEvento);

  if (evento.status === "encerrado") {
    throw criarErro("Evento já encerrado.", 400);
  }

  // 2. resultado válido?
  if (!RESULTADOS.includes(resultado)) {
    throw criarErro("O resultado deve ser mandante, empate ou visitante.", 400);
  }

  // Marca o evento como encerrado ANTES de pagar. Se o admin clicar duas vezes,
  // a segunda chamada já encontra "encerrado" e não paga em dobro.
  evento.status = "encerrado";
  evento.resultado = resultado;
  await EventoRepository.salvar(evento);

  // 3 e 4. liquida as apostas pendentes
  const apostas = await ApostaRepository.listarPorEvento(idEvento);

  let ganhadoras = 0;
  let perdedoras = 0;
  let totalPago = 0;

  for (const aposta of apostas) {
    if (aposta.status !== "pendente") {
      continue;
    }

    if (aposta.palpite === resultado) {
      aposta.status = "ganha";
      await UsuarioRepository.ajustarSaldo(aposta.usuario, aposta.retornoPotencial);
      ganhadoras = ganhadoras + 1;
      totalPago = totalPago + aposta.retornoPotencial;
    } else {
      aposta.status = "perdida";
      perdedoras = perdedoras + 1;
    }

    await ApostaRepository.salvar(aposta);
  }

  // 6. resumo
  return {
    evento,
    totalApostas: apostas.length,
    ganhadoras,
    perdedoras,
    totalPago: arredondar(totalPago),
  };
}

// Bônus 3: lucro da casa nos eventos encerrados
async function relatorio() {
  const encerrados = await EventoRepository.listarEncerrados();
  const ids = encerrados.map((evento) => evento._id);
  const apostas = await ApostaRepository.listarPorEventos(ids);

  let totalApostado = 0;
  let totalPago = 0;

  for (const aposta of apostas) {
    totalApostado = totalApostado + aposta.valor;
    if (aposta.status === "ganha") {
      totalPago = totalPago + aposta.retornoPotencial;
    }
  }

  return {
    eventosEncerrados: encerrados.length,
    totalApostado: arredondar(totalApostado),
    totalPago: arredondar(totalPago),
    lucroDaCasa: arredondar(totalApostado - totalPago),
  };
}

const EventoService = {
  criar,
  listarAbertos,
  listarTodos,
  buscarPorId,
  atualizarOdds,
  encerrar,
  relatorio,
};

export default EventoService;
