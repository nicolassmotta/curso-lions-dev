import Cartao from "../models/cartao.model.js";

async function criar(dados) {
  return Cartao.create(dados);
}

async function buscarPorId(id, incluirSenha = false) {
  const query = Cartao.findById(id);

  if (incluirSenha) {
    query.select("+senhaCartaoHash");
  }

  return query;
}

async function listarPorUsuario(usuarioId) {
  return Cartao.find({ usuarioId }).sort({ createdAt: -1 });
}

async function salvar(cartao) {
  return cartao.save();
}

export default {
  criar,
  buscarPorId,
  listarPorUsuario,
  salvar,
};
