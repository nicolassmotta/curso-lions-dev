import mongoose from "mongoose";

// O Mongoose Schema define a estrutura física do documento que será gravado no MongoDB.
// O MongoDB por si só é "schemaless" (não tem esquema), mas o Mongoose serve para dar regras
// e validações a esses documentos no lado da nossa aplicação Node.js.
const AgendamentoSchema = new mongoose.Schema({
  // Campo de texto simples obrigatório
  nomePet: {
    type: String,
    required: [true, "O nome do pet é obrigatório."] // O segundo elemento do array é a mensagem de erro customizada
  },
  // Campo de texto obrigatório restrito a valores específicos (Enum)
  especie: {
    type: String,
    required: [true, "A espécie é obrigatória."],
    // O validador 'enum' garante no MongoDB que apenas os valores listados sejam aceitos
    enum: {
      values: ["Cão", "Gato", "Outro"],
      message: "Espécie deve ser: Cão, Gato ou Outro."
    }
  },
  nomeDono: {
    type: String,
    required: [true, "O nome do dono é obrigatório."]
  },
  telefoneDono: {
    type: String,
    required: [true, "O telefone do dono é obrigatório."]
  },
  // Campo de serviço restrito a opções específicas
  servico: {
    type: String,
    required: [true, "O serviço é obrigatório."],
    enum: {
      values: ["Banho", "Tosa", "Banho e Tosa"],
      message: "Serviço deve ser: Banho, Tosa ou Banho e Tosa."
    }
  },
  // A data é armazenada como String para simplificar o formato de entrada (ex: "2026-06-15")
  data: {
    type: String,
    required: [true, "A data é obrigatória."]
  },
  // Campo numérico (será preenchido pelo cálculo no backend antes de salvar no MongoDB)
  valor: {
    type: Number
  },
  // Campo de status com valor padrão (default)
  status: {
    type: String,
    default: "Agendado", // Caso a rota não envie esse campo, o MongoDB gravará "Agendado" automaticamente
    enum: {
      values: ["Agendado", "Concluído", "Cancelado"],
      message: "Status inválido."
    }
  }
});

// Criamos o Modelo (Model) a partir do Schema.
// O primeiro argumento "Agendamento" define o nome do modelo. 
// O Mongoose automaticamente criará uma coleção no MongoDB com o nome no plural e minúsculo: "agendamentos".
const Agendamento = mongoose.model("Agendamento", AgendamentoSchema);
export default Agendamento;
