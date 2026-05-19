import mongoose from "mongoose";

// Schema para Avaliações (Reviews) enviadas pelos hóspedes.
const AvaliacaoSchema = new mongoose.Schema({
  // RELACIONAMENTO:
  // Referência ao ID do Imóvel que está sendo avaliado.
  // Permite saber exatamente qual imóvel recebeu o comentário e nota.
  imovelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imovel", // Conecta com o modelo "Imovel"
    required: [true, "O ID do imóvel é obrigatório."]
  },
  nomeUsuario: {
    type: String,
    required: [true, "O nome do usuário é obrigatório."]
  },
  // VALIDADORES NATIVOS DO MONGOOSE:
  // A nota é do tipo Number e tem limites definidos por min e max.
  // O Mongoose impedirá de salvar qualquer valor menor que 1 ou maior que 5.
  nota: {
    type: Number,
    required: [true, "A nota é obrigatória."],
    min: [1, "A nota mínima é 1."], // Validador de valor mínimo
    max: [5, "A nota máxima é 5."]  // Validador de valor máximo
  },
  // Validador de tamanho de texto:
  // minlength impede a gravação de textos muito curtos (ex: "Legal") forçando feedbacks mais úteis.
  comentario: {
    type: String,
    required: [true, "O comentário é obrigatório."],
    minlength: [10, "O comentário deve ter no mínimo 10 caracteres."] // Validador de comprimento mínimo
  },
  // Campo de Data com valor dinâmico gerado pelo servidor MongoDB (Date.now)
  dataCriacao: {
    type: Date,
    default: Date.now // Define a data e hora atual do momento exato do insert no banco de dados
  }
});

// Cria o modelo. Ele gerará a coleção "avaliacoes" no MongoDB.
const Avaliacao = mongoose.model("Avaliacao", AvaliacaoSchema);
export default Avaliacao;
