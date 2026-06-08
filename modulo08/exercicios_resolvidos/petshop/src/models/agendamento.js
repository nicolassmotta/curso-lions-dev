import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema({
  nomePet: {
    type: String,
    required: [true, "O nome do pet é obrigatório."],
  },
  especie: {
    type: String,
    required: [true, "A especie do pet é obrigatória."],
    enum: {
      values: ["Cão", "Gato", "Outro"],
      message: "A especie deve ser Cão, Gato ou Outro.",
    },
  },
  nomeDono: {
    type: String,
    required: [true, "O nome do dono é obrigatório."],
  },
  telefoneDono: {
    type: String,
    required: [true, "O telefone do dono é obrigatório."],
  },
  servico: {
    type: String,
    required: [true, "O serviço é obrigatório."],
    enum: {
      values: ["Banho", "Tosa", "Banho e Tosa"],
      message: "O serviço deve ser Banho, Tosa ou Banho e Tosa",
    },
  },
  data: {
    type: String,
    required: [true, "A data é obrigatória."],
  },
  valor: {
    type: Number,
  },
  status: {
    type: String,
    default: "Agendado",
    enum: {
      values: ["Agendado", "Concluído", "Cancelado"],
    },
  },
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;
