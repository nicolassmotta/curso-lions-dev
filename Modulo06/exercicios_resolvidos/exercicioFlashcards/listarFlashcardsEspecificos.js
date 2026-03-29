import flashcard from "./flashcard.js";

function listarFlashcardsEspecificos(flashcards, idBaralho) {
  flashcards.forEach((cartao, index) => {
    if (cartao.idBaralho == idBaralho) {
      console.log(`Flashcard ${index + 1}:`);
      console.log(`Pergunta: ${cartao.pergunta}`);
      console.log(`Resposta: ${cartao.resposta}`);
      console.log("-----------------------");
    }
  });
}

export default listarFlashcardsEspecificos;
