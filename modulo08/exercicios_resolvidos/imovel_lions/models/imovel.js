import mongoose from "mongoose";

// Definição do Schema do Imóvel para temporada.
// Cada propriedade deste objeto representará uma chave (campo) dentro do documento BSON do MongoDB.
const ImovelSchema = new mongoose.Schema({
  // Campos obrigatórios de texto (String)
  titulo: {
    type: String,
    required: [true, "O título do imóvel é obrigatório."] // Customiza o erro de campo obrigatório
  },
  descricao: {
    type: String,
    required: [true, "A descrição do imóvel é obrigatória."]
  },
  localizacao: {
    type: String,
    required: [true, "A localização do imóvel é obrigatória."]
  },
  // Campos numéricos (Number)
  precoNoite: {
    type: Number,
    required: [true, "O preço por noite é obrigatório."]
  },
  capacidadeMaxima: {
    type: Number,
    required: [true, "A capacidade máxima de hóspedes é obrigatória."]
  },
  // Campo booleano (Boolean) para controle de status ativo/inativo
  disponivel: {
    type: Boolean,
    default: true // Por padrão, ao criar um imóvel, ele estará disponível para locação no MongoDB
  }
});

// mongoose.model("Imovel", ImovelSchema) compila o schema em um modelo funcional.
// O Mongoose mapeará este modelo para a coleção "imoveis" no MongoDB (plural automático).
const Imovel = mongoose.model("Imovel", ImovelSchema);
export default Imovel;
