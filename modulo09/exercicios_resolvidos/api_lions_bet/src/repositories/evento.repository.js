import Evento from "../models/evento.model.js";

async function criar(dados) {
  return Evento.create(dados);
}

async function listarAbertos() {
  return Evento.find({ status: "aberto" }).sort({ createdAt: -1 });
}

async function listarTodos() {
  return Evento.find().sort({ createdAt: -1 });
}

async function listarEncerrados() {
  return Evento.find({ status: "encerrado" });
}

async function buscarPorId(idEvento) {
  return Evento.findById(idEvento);
}

async function salvar(evento) {
  return evento.save();
}

const EventoRepository = {
  criar,
  listarAbertos,
  listarTodos,
  listarEncerrados,
  buscarPorId,
  salvar,
};

export default EventoRepository;
