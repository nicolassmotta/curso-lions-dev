import Transacao from "../models/transacao.model.js";

async function criar(dados) {
  return Transacao.create(dados);
}

// Filtro extra opcional, sempre somado ao filtro pelo dono.
async function listarPorUsuario(idUsuario, filtro = {}) {
  return Transacao.find({ usuario: idUsuario, ...filtro }).sort({ createdAt: -1 });
}

async function buscarPorIdDoDono(idTransacao, idUsuario) {
  return Transacao.findOne({ _id: idTransacao, usuario: idUsuario });
}

async function atualizarPorIdDoDono(idTransacao, idUsuario, dados) {
  return Transacao.findOneAndUpdate({ _id: idTransacao, usuario: idUsuario }, dados, {
    new: true,
    runValidators: true,
  });
}

async function deletarPorIdDoDono(idTransacao, idUsuario) {
  return Transacao.findOneAndDelete({ _id: idTransacao, usuario: idUsuario });
}

const TransacaoRepository = {
  criar,
  listarPorUsuario,
  buscarPorIdDoDono,
  atualizarPorIdDoDono,
  deletarPorIdDoDono,
};

export default TransacaoRepository;
