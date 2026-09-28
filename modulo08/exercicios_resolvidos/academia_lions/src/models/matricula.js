import mongoose from "mongoose";

const MatriculaSchema = new mongoose.Schema({
  nomeAluno: {
    type: String,
    required: [true, "O nome do aluno é obrigatório."],
    trim: true,
  },
  idade: {
    type: Number,
    required: [true, "A idade é obrigatória."],
  },
  modalidade: {
    type: String,
    required: [true, "A modalidade é obrigatória."],
    enum: {
      values: ["Musculação", "Funcional", "Dança"],
      message: "A modalidade deve ser Musculação, Funcional ou Dança.",
    },
  },
  plano: {
    type: String,
    required: [true, "O plano é obrigatório."],
    enum: {
      values: ["Mensal", "Trimestral", "Semestral"],
      message: "O plano deve ser Mensal, Trimestral ou Semestral.",
    },
  },
  dataMatricula: {
    type: String,
    required: [true, "A data da matrícula é obrigatória."],
  },
  valorMensal: {
    type: Number,
  },
  valorTotal: {
    type: Number,
  },
  status: {
    type: String,
    default: "Ativa",
    enum: {
      values: ["Ativa", "Pausada", "Cancelada"],
      message: "O status deve ser Ativa, Pausada ou Cancelada.",
    },
  },
});

export default mongoose.model("Matricula", MatriculaSchema);
