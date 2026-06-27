import mongoose from "mongoose";

const ParcelaSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    valorCentavos: {
      type: Number,
      required: true,
      min: 1,
    },
    vencimento: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendente", "paga", "atrasada"],
      default: "pendente",
    },
    dataPagamento: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const EmprestimoSchema = new mongoose.Schema(
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
    valorSolicitadoCentavos: {
      type: Number,
      required: [true, "O valor solicitado é obrigatório."],
      min: [1, "O valor deve ser maior que zero."],
    },
    quantidadeParcelas: {
      type: Number,
      required: [true, "A quantidade de parcelas é obrigatória."],
      min: [1, "A quantidade de parcelas deve ser maior que zero."],
    },
    taxaJurosMensal: {
      type: Number,
      required: [true, "A taxa de juros mensal é obrigatória."],
      min: [0, "A taxa não pode ser negativa."],
    },
    valorParcelaCentavos: {
      type: Number,
      required: [true, "O valor da parcela é obrigatório."],
      min: [1, "O valor da parcela deve ser maior que zero."],
    },
    motivoReprovacao: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["solicitado", "aprovado", "reprovado", "quitado", "em_atraso"],
      default: "solicitado",
    },
    parcelas: {
      type: [ParcelaSchema],
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

const Emprestimo = mongoose.model("Emprestimo", EmprestimoSchema);

export default Emprestimo;
