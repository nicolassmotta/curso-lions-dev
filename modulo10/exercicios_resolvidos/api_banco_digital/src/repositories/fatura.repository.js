import Fatura from "../models/fatura.model.js";

async function criar(dados) {
  return Fatura.create(dados);
}

async function buscarPorId(id) {
  return Fatura.findById(id);
}

async function buscarPorCartaoEMes(cartaoId, mesReferencia) {
  return Fatura.findOne({ cartaoId, mesReferencia });
}

async function salvar(fatura) {
  return fatura.save();
}

export default {
  criar,
  buscarPorId,
  buscarPorCartaoEMes,
  salvar,
};
