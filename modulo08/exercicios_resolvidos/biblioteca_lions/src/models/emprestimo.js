import mongoose from "mongoose";

const EmprestimoSchema = new mongoose.Schema({
  // Guarda o _id do material como texto (sem populate, como pede o enunciado)
  materialId: {
    type: String,
    required: [true, "O ID do material é obrigatório."],
  },
  nomeAluno: {
    type: String,
    required: [true, "O nome do aluno é obrigatório."],
    trim: true,
  },
  turma: {
    type: String,
    required: [true, "A turma é obrigatória."],
  },
  dataEmprestimo: {
    type: String,
    required: [true, "A data do empréstimo é obrigatória."],
  },
  diasEmprestimo: {
    type: Number,
    required: [true, "A quantidade de dias é obrigatória."],
    min: [1, "O empréstimo deve ter pelo menos 1 dia."],
  },
  multaPrevista: {
    type: Number,
  },
  status: {
    type: String,
    default: "Emprestado",
    enum: {
      values: ["Emprestado", "Devolvido", "Atrasado"],
      message: "O status deve ser Emprestado, Devolvido ou Atrasado.",
    },
  },
});

export default mongoose.model("Emprestimo", EmprestimoSchema);
