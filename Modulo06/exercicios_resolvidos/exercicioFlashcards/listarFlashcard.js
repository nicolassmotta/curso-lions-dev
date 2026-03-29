import flashcard from './flashcard.js';

function listarFlashcards(flashcards) {
    flashcards.forEach((cartao, index) => {
        console.log(`Flashcard ${index + 1}:`);
        console.log(`Pergunta: ${cartao.pergunta}`);
        console.log(`Resposta: ${cartao.resposta}`);
        console.log(`ID do Baralho: ${cartao.idBaralho}`);
        console.log('-----------------------');
    });
}

export default listarFlashcards;