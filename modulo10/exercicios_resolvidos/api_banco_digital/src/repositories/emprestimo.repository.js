import Emprestimo from "../models/emprestimo.model.js";

async function criar(dados) {
  return Emprestimo.create(dados);
}

async function buscarPorId(id) {
  return Emprestimo.findById(id);
}

async function listarPorUsuario(usuarioId) {
  return Emprestimo.find({ usuarioId }).sort({ createdAt: -1 });
}

async function listar(filtros = {}) {
  return Emprestimo.find(filtros).sort({ createdAt: -1 });
}

async function salvar(emprestimo) {
  return emprestimo.save();
}

async function contar(filtros = {}) {
  return Emprestimo.countDocuments(filtros);
}

export default {
  criar,
  buscarPorId,
  listarPorUsuario,
  listar,
  salvar,
  contar,
};
