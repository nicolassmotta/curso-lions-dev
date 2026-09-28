import mongoose from "mongoose";

const EmprestimoSchema = new mongoose.Schema(
  {
    // Qual material foi emprestado (referência ao _id de um Material)
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: [true, "O material é obrigatório."],
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
      enum: {
        values: ["Emprestado", "Devolvido", "Atrasado"],
        message: "O status deve ser Emprestado, Devolvido ou Atrasado.",
      },
      default: "Emprestado",
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O dono do empréstimo é obrigatório."],
    },
  },
  { timestamps: true }
);

const Emprestimo = mongoose.model("Emprestimo", EmprestimoSchema);

export default Emprestimo;
