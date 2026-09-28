import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
  // ObjectId + ref: o campo guarda o _id de uma Barraca.
  // É isso que permite usar .populate("idBarraca") depois.
  idBarraca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barraca",
    required: [true, "O ID da barraca é obrigatório."],
  },
  nome: {
    type: String,
    required: [true, "O nome do produto é obrigatório."],
    trim: true,
  },
  preco: {
    type: Number,
    required: [true, "O preço do produto é obrigatório."],
    min: [0, "O preço do produto não pode ser negativo."],
  },
  estoque: {
    type: Number,
    default: 0,
    min: [0, "O estoque não pode ser negativo."],
  },
});

export default mongoose.model("Produto", ProdutoSchema);
