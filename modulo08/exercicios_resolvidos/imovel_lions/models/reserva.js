import mongoose from "mongoose";

// Subschema: Define a estrutura de cada hóspede da lista.
// No MongoDB, podemos salvar objetos aninhados (subdocumentos) diretamente dentro de um array.
// Isso é uma das grandes vantagens dos bancos NoSQL orientados a documentos em relação aos bancos SQL.
const HospedeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome do hóspede é obrigatório."]
  },
  idade: {
    type: Number,
    required: [true, "A idade do hóspede é obrigatória."]
  }
});

// Schema Principal da Reserva
const ReservaSchema = new mongoose.Schema({
  // RELACIONAMENTO (Chave Estrangeira / Referência):
  // imovelId guarda o ID único de um documento na coleção de Imóveis.
  // - O tipo deve ser mongoose.Schema.Types.ObjectId.
  // - O atributo 'ref' avisa o Mongoose qual modelo está associado (neste caso, "Imovel").
  //   Isso permite usar o método '.populate()' nas rotas para buscar os detalhes do imóvel automaticamente.
  imovelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imovel",
    required: [true, "O ID do imóvel é obrigatório."]
  },
  nomeHospede: {
    type: String,
    required: [true, "O nome do responsável pela reserva é obrigatório."]
  },
  emailHospede: {
    type: String,
    required: [true, "O e-mail do responsável é obrigatório."]
  },
  // Tipo Date para trabalhar com datas e cálculos de tempo no JavaScript
  dataEntrada: {
    type: Date,
    required: [true, "A data de check-in é obrigatória."]
  },
  dataSaida: {
    type: Date,
    required: [true, "A data de check-out é obrigatória."]
  },
  // SUBDOCUMENTOS EM ARRAY:
  // O MongoDB permite guardar um array de objetos estruturados.
  // Passamos o 'HospedeSchema' dentro de colchetes [] para dizer ao Mongoose que
  // esse campo é um array de subdocumentos que seguem aquele modelo de Hóspede.
  hospedes: {
    type: [HospedeSchema],
    required: [true, "A lista de hóspedes é obrigatória."]
  },
  cupomDesconto: {
    type: String
  },
  valorTotal: {
    type: Number
  },
  status: {
    type: String,
    default: "Pendente",
    enum: {
      values: ["Pendente", "Confirmada", "Cancelada"],
      message: "Status inválido."
    }
  }
});

// Compila o modelo. Ele criará a coleção "reservas" no MongoDB.
const Reserva = mongoose.model("Reserva", ReservaSchema);
export default Reserva;
