import mongoose from "mongoose";

const TransacaoSchema = new mongoose.Schema(
  {
    contaOrigemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conta",
      default: null,
    },
    contaDestinoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conta",
      default: null,
    },
    usuarioOrigemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
    usuarioDestinoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
    transacaoOriginalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transacao",
      default: null,
    },
    tipo: {
      type: String,
      enum: ["deposito", "saque", "transferencia", "pix", "boleto", "cartao", "emprestimo", "tarifa", "estorno"],
      required: [true, "O tipo da transação é obrigatório."],
    },
    valorCentavos: {
      type: Number,
      required: [true, "O valor é obrigatório."],
      min: [1, "O valor deve ser maior que zero."],
    },
    descricao: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pendente", "aprovada", "recusada", "estornada"],
      default: "aprovada",
    },
    saldoAntesOrigemCentavos: {
      type: Number,
      default: null,
    },
    saldoDepoisOrigemCentavos: {
      type: Number,
      default: null,
    },
    saldoAntesDestinoCentavos: {
      type: Number,
      default: null,
    },
    saldoDepoisDestinoCentavos: {
      type: Number,
      default: null,
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

const Transacao = mongoose.model("Transacao", TransacaoSchema);

export default Transacao;
