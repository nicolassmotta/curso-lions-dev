const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    idBarraca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barraca',
        required: [true, 'O ID da barraca é obrigatório.'],
    },
    nome: {
        type: String,
        required: [true, 'O nome do produto é obrigatório.'],
        trim: true,
    },
    preco: {
        type: Number,
        required: [true, 'O preço do produto é obrigatório.'],
        min: [0, 'O preço do produto não pode ser negativo.'],
    }
});

module.exports = mongoose.model('Produto', ProdutoSchema);
