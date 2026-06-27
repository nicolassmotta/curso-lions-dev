import Usuario from "../models/usuario.model.js";

async function criar(dados) {
  return Usuario.create(dados);
}

async function buscarPorId(id, incluirSenha = false) {
  const query = Usuario.findById(id);

  if (incluirSenha) {
    query.select("+senhaHash");
  }

  return query;
}

async function buscarPorEmail(email, incluirSenha = false) {
  const query = Usuario.findOne({ email: email.trim().toLowerCase() });

  if (incluirSenha) {
    query.select("+senhaHash");
  }

  return query;
}

async function buscarPorCpf(cpf) {
  return Usuario.findOne({ cpf: cpf.trim() });
}

async function listar(filtros = {}) {
  return Usuario.find(filtros).sort({ createdAt: -1 });
}

async function atualizarPorId(id, dados) {
  return Usuario.findByIdAndUpdate(id, dados, {
    new: true,
    runValidators: true,
  });
}

async function contar(filtros = {}) {
  return Usuario.countDocuments(filtros);
}

export default {
  criar,
  buscarPorId,
  buscarPorEmail,
  buscarPorCpf,
  listar,
  atualizarPorId,
  contar,
};
