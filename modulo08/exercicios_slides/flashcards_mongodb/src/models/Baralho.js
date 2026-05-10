import mongoose from "mongoose";

// Schema define o "formato" dos documentos da coleção no MongoDB.
const baralhoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título do baralho é obrigatório."],
      trim: true,
    },
    descricao: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    // Cria automaticamente createdAt e updatedAt em cada documento.
    timestamps: true,
  }
);

// Model é a interface para executar CRUD na coleção "baralhos".
const Baralho = mongoose.model("Baralho", baralhoSchema);

export default Baralho;
