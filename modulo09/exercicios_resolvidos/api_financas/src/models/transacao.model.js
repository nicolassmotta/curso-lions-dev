import mongoose from "mongoose";

const TransacaoSchema = new mongoose.Schema(
  {
    descricao: {
      type: String,
      required: [true, "A descrição é obrigatória."],
      trim: true,
    },
    tipo: {
      type: String,
      required: [true, "O tipo é obrigatório."],
      enum: {
        values: ["entrada", "saida"],
        message: "O tipo deve ser entrada ou saida.",
      },
    },
    categoria: {
      type: String,
      trim: true,
    },
    // min valida o número já no Schema, sem precisar de if
    valor: {
      type: Number,
      required: [true, "O valor é obrigatório."],
      min: [0.01, "O valor deve ser maior que zero."],
    },
    // Formato "AAAA-MM-DD": nesse formato, comparar como texto dá a mesma ordem das datas
    data: {
      type: String,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O dono da transação é obrigatório."],
    },
  },
  { timestamps: true }
);

const Transacao = mongoose.model("Transacao", TransacaoSchema);

export default Transacao;
