import { flashcards } from "./data.js";

function listarFlashcardsPorBaralho(idBaralho) {
  const idNum = parseInt(idBaralho);
  return flashcards.filter((fc) => fc.idBaralho === idNum);
}

export default listarFlashcardsPorBaralho;
