import mongoose from "mongoose";

const BarracaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome da barraca é obrigatório."],
    trim: true,
  },
  responsavel: {
    type: String,
    required: [true, "O nome do responsável é obrigatório."],
    trim: true,
  },
  categoria: {
    type: String,
    required: [true, "A categoria é obrigatória."],
    enum: {
      values: ["Hortifrúti", "Laticínios", "Padaria", "Artesanato"],
      message: "A categoria deve ser Hortifrúti, Laticínios, Padaria ou Artesanato.",
    },
  },
  aberta: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Barraca", BarracaSchema);
