import mongoose from "mongoose";

const CartaoSchema = new mongoose.Schema(
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
    tipo: {
      type: String,
      enum: ["debito", "credito"],
      required: [true, "O tipo do cartão é obrigatório."],
    },
    numeroMascarado: {
      type: String,
      required: [true, "O número mascarado é obrigatório."],
    },
    ultimos4: {
      type: String,
      required: [true, "Os últimos 4 dígitos são obrigatórios."],
    },
    senhaCartaoHash: {
      type: String,
      required: [true, "A senha do cartão é obrigatória."],
      select: false,
    },
    limiteCentavos: {
      type: Number,
      default: 0,
      min: [0, "O limite não pode ser negativo."],
    },
    limiteDisponivelCentavos: {
      type: Number,
      default: 0,
      min: [0, "O limite disponível não pode ser negativo."],
    },
    status: {
      type: String,
      enum: ["solicitado", "ativo", "bloqueado", "cancelado"],
      default: "solicitado",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(document, retorno) {
        delete retorno.senhaCartaoHash;
        delete retorno.__v;
        return retorno;
      },
    },
  }
);

const Cartao = mongoose.model("Cartao", CartaoSchema);

export default Cartao;
