import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true,
      minlength: [2, "O nome deve ter pelo menos 2 caracteres."],
    },
    email: {
      type: String,
      required: [true, "O email é obrigatório."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido."],
    },
    cpf: {
      type: String,
      required: [true, "O CPF é obrigatório."],
      unique: true,
      trim: true,
    },
    telefone: {
      type: String,
      required: [true, "O telefone é obrigatório."],
      trim: true,
    },
    senhaHash: {
      type: String,
      required: [true, "A senhaHash é obrigatória."],
      select: false,
    },
    papel: {
      type: String,
      enum: ["cliente", "gerente", "admin"],
      default: "cliente",
    },
    status: {
      type: String,
      enum: ["ativo", "bloqueado", "pendente_verificacao", "encerrado"],
      default: "ativo",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(document, retorno) {
        delete retorno.senhaHash;
        delete retorno.__v;
        return retorno;
      },
    },
  }
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;
