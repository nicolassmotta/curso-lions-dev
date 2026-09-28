import Tarefa from "../models/tarefa.model.js";

async function criar(dados) {
  return Tarefa.create(dados);
}

// O ...filtro soma condições extras (ex.: { concluida: true })
// sem nunca perder o filtro pelo dono.
async function listarPorUsuario(idUsuario, filtro = {}) {
  return Tarefa.find({ usuario: idUsuario, ...filtro }).sort({ createdAt: -1 });
}

// Todas as consultas por id levam o dono junto no filtro:
// tarefa de outra pessoa volta null, igual a uma tarefa que não existe.
async function buscarPorIdDoDono(idTarefa, idUsuario) {
  return Tarefa.findOne({ _id: idTarefa, usuario: idUsuario });
}

async function atualizarPorIdDoDono(idTarefa, idUsuario, dados) {
  return Tarefa.findOneAndUpdate({ _id: idTarefa, usuario: idUsuario }, dados, {
    new: true,
    runValidators: true,
  });
}

async function deletarPorIdDoDono(idTarefa, idUsuario) {
  return Tarefa.findOneAndDelete({ _id: idTarefa, usuario: idUsuario });
}

const TarefaRepository = {
  criar,
  listarPorUsuario,
  buscarPorIdDoDono,
  atualizarPorIdDoDono,
  deletarPorIdDoDono,
};

export default TarefaRepository;
