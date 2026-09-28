import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema(
  {
    mandante: {
      type: String,
      required: [true, "O time mandante é obrigatório."],
      trim: true,
    },
    visitante: {
      type: String,
      required: [true, "O time visitante é obrigatório."],
      trim: true,
    },
    oddMandante: {
      type: Number,
      required: [true, "A odd do mandante é obrigatória."],
      min: [1.01, "Odd inválida."],
    },
    oddEmpate: {
      type: Number,
      required: [true, "A odd do empate é obrigatória."],
      min: [1.01, "Odd inválida."],
    },
    oddVisitante: {
      type: Number,
      required: [true, "A odd do visitante é obrigatória."],
      min: [1.01, "Odd inválida."],
    },
    status: {
      type: String,
      enum: ["aberto", "encerrado"],
      default: "aberto",
    },
    // Só é preenchido ao encerrar
    resultado: {
      type: String,
      enum: {
        values: ["mandante", "empate", "visitante"],
        message: "O resultado deve ser mandante, empate ou visitante.",
      },
    },
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

const Evento = mongoose.model("Evento", EventoSchema);

export default Evento;
