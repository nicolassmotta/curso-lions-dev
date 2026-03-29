import flashcard from './flashcard.js';
import baralho from './baralho.js';

function adicionarFlashcard(flashcards, novoFlashcard) {
    let baralhoEncontrado = false;
    baralho.forEach((baralho) =>  {
        if (baralho.id === novoFlashcard.idBaralho) {
            flashcards.push(novoFlashcard);
            baralhoEncontrado = true;
            return;
        }
    });
    if (!baralhoEncontrado) {
        console.log(`Baralho com ID ${novoFlashcard.idBaralho} não encontrado. Flashcard não adicionado.`);
    }
} 

export default adicionarFlashcard;