import mongoose from "mongoose";

const ContaSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O usuário é obrigatório."],
    },
    agencia: {
      type: String,
      default: "0001",
      trim: true,
    },
    numero: {
      type: String,
      required: [true, "O número da conta é obrigatório."],
      unique: true,
      trim: true,
    },
    tipo: {
      type: String,
      enum: ["corrente", "poupanca", "salario"],
      required: [true, "O tipo da conta é obrigatório."],
    },
    saldoCentavos: {
      type: Number,
      default: 0,
    },
    limiteChequeEspecialCentavos: {
      type: Number,
      default: 0,
      min: [0, "O limite não pode ser negativo."],
    },
    status: {
      type: String,
      enum: ["ativa", "bloqueada", "encerrada", "pendente_aprovacao"],
      default: "pendente_aprovacao",
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

const Conta = mongoose.model("Conta", ContaSchema);

export default Conta;
