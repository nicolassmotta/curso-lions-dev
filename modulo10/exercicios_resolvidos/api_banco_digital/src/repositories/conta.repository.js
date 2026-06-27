import Conta from "../models/conta.model.js";

async function criar(dados) {
  return Conta.create(dados);
}

async function buscarPorId(id) {
  return Conta.findById(id);
}

async function buscarPorNumero(numero) {
  return Conta.findOne({ numero });
}

async function listarPorUsuario(usuarioId) {
  return Conta.find({ usuarioId }).sort({ createdAt: -1 });
}

async function listar(filtros = {}) {
  return Conta.find(filtros).sort({ createdAt: -1 });
}

async function atualizarPorId(id, dados) {
  return Conta.findByIdAndUpdate(id, dados, {
    new: true,
    runValidators: true,
  });
}

async function salvar(conta) {
  return conta.save();
}

async function contar(filtros = {}) {
  return Conta.countDocuments(filtros);
}

async function somarSaldos() {
  const contas = await Conta.find();
  let totalCentavos = 0;

  for (const conta of contas) {
    totalCentavos += conta.saldoCentavos;
  }

  return totalCentavos;
}

export default {
  criar,
  buscarPorId,
  buscarPorNumero,
  listarPorUsuario,
  listar,
  atualizarPorId,
  salvar,
  contar,
  somarSaldos,
};
