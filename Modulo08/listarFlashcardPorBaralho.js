const { flashcards } = require('./data');

function listarFlashcardsPorBaralho(idBaralho) {
    const idNum = parseInt(idBaralho);
    return flashcards.filter(fc => fc.idBaralho === idNum);
}

module.exports = listarFlashcardsPorBaralho;