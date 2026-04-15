import { flashcards } from "./data.js";

function deletarFlashcard(id) {
  const idNum = parseInt(id);
  const index = flashcards.findIndex((f) => f.id === idNum);

  if (index === -1) {
    return { error: "Flashcard não encontrado!" };
  }

  const deletado = flashcards.splice(index, 1)[0];
  return { data: deletado };
}

export default deletarFlashcard;
