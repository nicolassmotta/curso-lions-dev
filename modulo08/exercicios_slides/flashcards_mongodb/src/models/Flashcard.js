import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    pergunta: {
      type: String,
      required: [true, "A pergunta é obrigatória."],
      trim: true,
    },
    resposta: {
      type: String,
      required: [true, "A resposta é obrigatória."],
      trim: true,
    },
    baralho: {
      // ObjectId guarda o _id do Baralho relacionado.
      type: mongoose.Schema.Types.ObjectId,
      // ref indica para qual model esse ObjectId aponta.
      ref: "Baralho",
      required: [true, "O id do baralho é obrigatório."],
    },
  },
  {
    // Cria automaticamente createdAt e updatedAt em cada documento.
    timestamps: true,
  }
);

// Model para CRUD na coleção "flashcards".
const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
