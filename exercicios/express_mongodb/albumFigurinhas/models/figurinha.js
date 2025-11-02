const mongoose = require('mongoose');

const FigurinhaSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: [true, 'O número da figurinha é obrigatório.'],
  },
  tema: {
    type: String,
    required: [true, 'O tema da figurinha é obrigatório.'],
    trim: true, // Remove espaços em branco desnecessários
  },
  // O MongoDB cria automaticamente um campo `_id` único para cada documento.
  // O Mongoose nos permite usar `id` como um alias para `_id`.
});

module.exports = mongoose.model('Figurinha', FigurinhaSchema);