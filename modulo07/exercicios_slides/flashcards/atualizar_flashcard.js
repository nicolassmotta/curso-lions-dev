import { flashcards } from "./data.js";

function atualizarFlashcard(id, pergunta, resposta, idBaralho) {
  const idNum = parseInt(id);
  const flashcard = flashcards.find((f) => f.id === idNum);

  if (!flashcard) {
    return { error: "Flashcard não encontrado!" };
  }

  // Atualiza apenas os campos fornecidos
  if (pergunta !== undefined) {
    flashcard.pergunta = pergunta;
  }
  if (resposta !== undefined) {
    flashcard.resposta = resposta;
  }
  if (idBaralho !== undefined) {
    flashcard.idBaralho = idBaralho;
  }

  return { data: flashcard };
}

export default atualizarFlashcard;
