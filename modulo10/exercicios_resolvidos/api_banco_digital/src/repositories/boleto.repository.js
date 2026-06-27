import Boleto from "../models/boleto.model.js";

async function criar(dados) {
  return Boleto.create(dados);
}

async function buscarPorId(id) {
  return Boleto.findById(id);
}

async function listarPorUsuario(usuarioId) {
  return Boleto.find({ usuarioId }).sort({ createdAt: -1 });
}

async function salvar(boleto) {
  return boleto.save();
}

export default {
  criar,
  buscarPorId,
  listarPorUsuario,
  salvar,
};
