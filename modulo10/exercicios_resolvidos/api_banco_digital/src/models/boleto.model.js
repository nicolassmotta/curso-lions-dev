import mongoose from "mongoose";

const BoletoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O usuário é obrigatório."],
    },
    contaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conta",
      required: [true, "A conta é obrigatória."],
    },
    codigoBarras: {
      type: String,
      required: [true, "O código de barras é obrigatório."],
      unique: true,
      trim: true,
    },
    beneficiario: {
      type: String,
      required: [true, "O beneficiário é obrigatório."],
      trim: true,
    },
    valorCentavos: {
      type: Number,
      required: [true, "O valor é obrigatório."],
      min: [1, "O valor deve ser maior que zero."],
    },
    dataVencimento: {
      type: Date,
      required: [true, "A data de vencimento é obrigatória."],
    },
    status: {
      type: String,
      enum: ["aberto", "pago", "vencido", "cancelado"],
      default: "aberto",
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

const Boleto = mongoose.model("Boleto", BoletoSchema);

export default Boleto;
