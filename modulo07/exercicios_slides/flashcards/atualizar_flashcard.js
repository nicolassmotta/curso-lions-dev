import { baralhos, flashcards } from "./dados.js";

function atualizarFlashcard(id, pergunta, resposta, idBaralho) {
  const idNum = parseInt(id);
  const flashcard = flashcards.find((f) => f.id === idNum);

  if (!flashcard) {
    return { error: "Flashcard não encontrado!" };
  }

  // Valida ANTES de alterar qualquer campo, para não deixar o flashcard
  // atualizado pela metade quando o baralho informado não existe
  if (idBaralho !== undefined) {
    const baralhoEncontrado = baralhos.find((b) => b.id === idBaralho);
    if (!baralhoEncontrado) {
      return { error: `Baralho com ID ${idBaralho} não encontrado.` };
    }
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
