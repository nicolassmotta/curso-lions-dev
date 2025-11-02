const { baralhos, flashcards } = require('./data');

function criarFlashcard(pergunta, resposta, idBaralho) {
    // Validação (lógica do Modulo07/adicionarFlashcard.js)
    const baralhoEncontrado = baralhos.find(b => b.id === idBaralho);
    if (!baralhoEncontrado) {
        return { error: `Baralho com ID ${idBaralho} não encontrado.` };
    }

    const novoFlashcard = {
        id: flashcards.length > 0 ? Math.max(...flashcards.map(f => f.id)) + 1 : 1,
        pergunta: pergunta,
        resposta: resposta,
        idBaralho: idBaralho
    };
    
    flashcards.push(novoFlashcard);
    return { data: novoFlashcard };
}

module.exports = criarFlashcard;