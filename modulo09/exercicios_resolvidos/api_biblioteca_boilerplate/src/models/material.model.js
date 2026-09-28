import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é obrigatório."],
      trim: true,
    },
    tipo: {
      type: String,
      required: [true, "O tipo é obrigatório."],
      enum: {
        values: ["Livro", "Revista", "Apostila"],
        message: "O tipo deve ser Livro, Revista ou Apostila.",
      },
    },
    autor: {
      type: String,
      required: [true, "O autor é obrigatório."],
      trim: true,
    },
    estoque: {
      type: Number,
      required: [true, "O estoque é obrigatório."],
      min: [0, "O estoque não pode ser negativo."],
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O dono do material é obrigatório."],
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", MaterialSchema);

export default Material;
