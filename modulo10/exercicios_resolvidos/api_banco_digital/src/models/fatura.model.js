import mongoose from "mongoose";

const CompraSchema = new mongoose.Schema(
  {
    descricao: {
      type: String,
      required: [true, "A descrição da compra é obrigatória."],
      trim: true,
    },
    estabelecimento: {
      type: String,
      required: [true, "O estabelecimento é obrigatório."],
      trim: true,
    },
    valorCentavos: {
      type: Number,
      required: [true, "O valor da compra é obrigatório."],
      min: [1, "O valor deve ser maior que zero."],
    },
    data: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const FaturaSchema = new mongoose.Schema(
  {
    cartaoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cartao",
      required: [true, "O cartão é obrigatório."],
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O usuário é obrigatório."],
    },
    mesReferencia: {
      type: String,
      required: [true, "O mês de referência é obrigatório."],
      trim: true,
    },
    valorTotalCentavos: {
      type: Number,
      default: 0,
      min: [0, "O valor total não pode ser negativo."],
    },
    valorPagoCentavos: {
      type: Number,
      default: 0,
      min: [0, "O valor pago não pode ser negativo."],
    },
    status: {
      type: String,
      enum: ["aberta", "fechada", "paga", "atrasada"],
      default: "aberta",
    },
    compras: {
      type: [CompraSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(document, retorno) {
        delete retorno.__v;
        return retorno;
      },
    },
  }
);

const Fatura = mongoose.model("Fatura", FaturaSchema);

export default Fatura;
