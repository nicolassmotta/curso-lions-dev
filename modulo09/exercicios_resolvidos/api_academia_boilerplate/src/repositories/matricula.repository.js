import Matricula from "../models/matricula.model.js";

async function criar(dados) {
  return Matricula.create(dados);
}

async function listarPorUsuario(idUsuario, filtro = {}) {
  return Matricula.find({ usuario: idUsuario, ...filtro }).sort({ createdAt: -1 });
}

async function buscarPorIdDoDono(idMatricula, idUsuario) {
  return Matricula.findOne({ _id: idMatricula, usuario: idUsuario });
}

async function atualizarPorIdDoDono(idMatricula, idUsuario, dados) {
  return Matricula.findOneAndUpdate({ _id: idMatricula, usuario: idUsuario }, dados, {
    new: true,
    runValidators: true,
  });
}

async function deletarPorIdDoDono(idMatricula, idUsuario) {
  return Matricula.findOneAndDelete({ _id: idMatricula, usuario: idUsuario });
}

// Bônus 3: existe outra matrícula Ativa com o mesmo nome, deste dono?
async function buscarAtivaPorNome(nomeAluno, idUsuario) {
  return Matricula.findOne({ nomeAluno, usuario: idUsuario, status: "Ativa" });
}

const MatriculaRepository = {
  criar,
  listarPorUsuario,
  buscarPorIdDoDono,
  atualizarPorIdDoDono,
  deletarPorIdDoDono,
  buscarAtivaPorNome,
};

export default MatriculaRepository;
