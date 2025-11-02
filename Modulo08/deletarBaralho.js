const { baralhos, flashcards } = require('./data');

function deletarBaralho(id) {
    const idNum = parseInt(id);
    const index = baralhos.findIndex(b => b.id === idNum);

    if (index === -1) {
        return { error: "Baralho não encontrado!" };
    }

    // Remove o baralho
    const deletado = baralhos.splice(index, 1)[0];

    // Filtra os flashcards, mantendo apenas os que NÃO são desse baralho
    // (Sobrescreve o array original de flashcards)
    const flashcardsRestantes = flashcards.filter(fc => fc.idBaralho !== idNum);
    
    // Atualiza o array de flashcards no módulo 'data'
    // (Isso é um pouco complexo, mas necessário_
    //_ porque 'require' importa uma referência)
    flashcards.length = 0; // Esvazia o array original
    Array.prototype.push.apply(flashcards, flashcardsRestantes); // Adiciona os itens restantes

    return { data: deletado };
}

module.exports = deletarBaralho;