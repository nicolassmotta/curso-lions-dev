import ChavePix from "../models/chavePix.model.js";

async function criar(dados) {
  return ChavePix.create(dados);
}

async function buscarPorId(id) {
  return ChavePix.findById(id);
}

async function buscarAtivaPorValor(valor) {
  return ChavePix.findOne({ valor, ativa: true });
}

async function listarPorUsuario(usuarioId) {
  return ChavePix.find({ usuarioId, ativa: true }).sort({ createdAt: -1 });
}

async function salvar(chavePix) {
  return chavePix.save();
}

export default {
  criar,
  buscarPorId,
  buscarAtivaPorValor,
  listarPorUsuario,
  salvar,
};
