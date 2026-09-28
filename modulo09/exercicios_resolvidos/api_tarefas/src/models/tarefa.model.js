import mongoose from "mongoose";

const TarefaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é obrigatório."],
      trim: true,
      minlength: [2, "O título deve ter pelo menos 2 caracteres."],
    },
    descricao: {
      type: String,
      trim: true,
    },
    // enum trava o campo nesses três valores; default é o valor inicial.
    prioridade: {
      type: String,
      enum: {
        values: ["baixa", "media", "alta"],
        message: "A prioridade deve ser baixa, media ou alta.",
      },
      default: "media",
    },
    concluida: {
      type: Boolean,
      default: false,
    },
    dataLimite: {
      type: String,
    },
    // Dono da tarefa: guarda o _id de um Usuario.
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O dono da tarefa é obrigatório."],
    },
  },
  { timestamps: true }
);

const Tarefa = mongoose.model("Tarefa", TarefaSchema);

export default Tarefa;
