import mongoose from "mongoose";

const ChavePixSchema = new mongoose.Schema(
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
      enum: ["cpf", "email", "telefone", "aleatoria"],
      required: [true, "O tipo da chave PIX é obrigatório."],
    },
    valor: {
      type: String,
      required: [true, "O valor da chave PIX é obrigatório."],
      trim: true,
    },
    ativa: {
      type: Boolean,
      default: true,
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

const ChavePix = mongoose.model("ChavePix", ChavePixSchema);

export default ChavePix;
