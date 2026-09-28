import mongoose from "mongoose";

const ApostaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O dono da aposta é obrigatório."],
    },
    evento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evento",
      required: [true, "O evento é obrigatório."],
    },
    palpite: {
      type: String,
      required: [true, "O palpite é obrigatório."],
      enum: {
        values: ["mandante", "empate", "visitante"],
        message: "O palpite deve ser mandante, empate ou visitante.",
      },
    },
    valor: {
      type: Number,
      required: [true, "O valor é obrigatório."],
      min: [0.01, "O valor deve ser maior que zero."],
    },
    // "Foto" da odd no momento da aposta: mudar a odd depois não muda o prêmio
    oddNaAposta: {
      type: Number,
      required: [true, "A odd da aposta é obrigatória."],
    },
    retornoPotencial: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pendente", "ganha", "perdida"],
      default: "pendente",
    },
  },
  { timestamps: true }
);

const Aposta = mongoose.model("Aposta", ApostaSchema);

export default Aposta;
