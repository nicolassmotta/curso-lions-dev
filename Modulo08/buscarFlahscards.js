import { flashcards } from './data.js';

function buscarFlashcards(termo) {
    if (!termo) {
        return [];
    }
    const termoBusca = termo.toLowerCase();
    return flashcards.filter(cartao => 
        cartao.pergunta.toLowerCase().includes(termoBusca) || 
        cartao.resposta.toLowerCase().includes(termoBusca)
    );
}

export default buscarFlashcards;