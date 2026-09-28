import Emprestimo from "../models/emprestimo.model.js";

async function criar(dados) {
  return Emprestimo.create(dados);
}

// Bônus 2: populate troca o _id do material pelo documento inteiro
async function listarPorUsuario(idUsuario) {
  return Emprestimo.find({ usuario: idUsuario }).sort({ createdAt: -1 }).populate("material");
}

async function buscarPorIdDoDono(idEmprestimo, idUsuario) {
  return Emprestimo.findOne({ _id: idEmprestimo, usuario: idUsuario });
}

// Bônus 3: o aluno já tem este material emprestado (e ainda não devolveu)?
async function buscarEmAberto(idMaterial, nomeAluno, idUsuario) {
  return Emprestimo.findOne({ material: idMaterial, nomeAluno, usuario: idUsuario, status: "Emprestado" });
}

async function salvar(emprestimo) {
  return emprestimo.save();
}

async function deletarPorIdDoDono(idEmprestimo, idUsuario) {
  return Emprestimo.findOneAndDelete({ _id: idEmprestimo, usuario: idUsuario });
}

const EmprestimoRepository = {
  criar,
  listarPorUsuario,
  buscarPorIdDoDono,
  buscarEmAberto,
  salvar,
  deletarPorIdDoDono,
};

export default EmprestimoRepository;
