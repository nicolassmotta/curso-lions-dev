// Exercício 1: schema com validação
import mongoose from "mongoose";

const FilmeSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: [true, "O título é obrigatório."], trim: true },
    ano: {
      type: Number,
      min: [1888, "O ano deve ser 1888 ou depois."],
      max: [new Date().getFullYear(), "O ano não pode estar no futuro."],
    },
    generos: [String],
    nota: { type: Number, min: [0, "A nota vai de 0 a 10."], max: [10, "A nota vai de 0 a 10."] },
    excluidoEm: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Filme", FilmeSchema);
