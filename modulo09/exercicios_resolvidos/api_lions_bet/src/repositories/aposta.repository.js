import Aposta from "../models/aposta.model.js";

async function criar(dados) {
  return Aposta.create(dados);
}

// Bônus 2: populate traz os dados do evento junto de cada aposta
async function listarPorUsuario(idUsuario) {
  return Aposta.find({ usuario: idUsuario }).sort({ createdAt: -1 }).populate("evento", "mandante visitante status resultado");
}

async function listarPorEvento(idEvento) {
  return Aposta.find({ evento: idEvento });
}

// Bônus 3: apostas de vários eventos de uma vez ($in = "está na lista")
async function listarPorEventos(idsEventos) {
  return Aposta.find({ evento: { $in: idsEventos } });
}

async function listarTodas() {
  return Aposta.find().sort({ createdAt: -1 });
}

async function buscarPorIdDoDono(idAposta, idUsuario) {
  return Aposta.findOne({ _id: idAposta, usuario: idUsuario });
}

async function salvar(aposta) {
  return aposta.save();
}

const ApostaRepository = {
  criar,
  listarPorUsuario,
  listarPorEvento,
  listarPorEventos,
  listarTodas,
  buscarPorIdDoDono,
  salvar,
};

export default ApostaRepository;
