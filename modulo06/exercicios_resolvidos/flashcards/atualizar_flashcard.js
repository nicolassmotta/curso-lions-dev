function atualizarFlashcard(flashcards, idFlashcard, novosDados) {
  const indice = flashcards.findIndex((cartao) => cartao.id === idFlashcard);

  if (indice === -1) {
    console.log(`Flashcard com ID ${idFlashcard} não encontrado.`);
    return false;
  }

  flashcards[indice].pergunta = novosDados.pergunta || flashcards[indice].pergunta;
  flashcards[indice].resposta = novosDados.resposta || flashcards[indice].resposta;

  console.log(`Flashcard com ID ${idFlashcard} atualizado com sucesso.`);
  return true;
}

export default atualizarFlashcard;
