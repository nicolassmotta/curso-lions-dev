import { flashcards } from "./data.js";

function listarFlashcardsEspecificos(idBaralho) {
  const idNum = parseInt(idBaralho);
  return flashcards.filter((fc) => fc.idBaralho === idNum);
}

export default listarFlashcardsEspecificos;
