function atualizarFlashcard(flashcards, idFlashcard, novosDados) {
  const indice = flashcards.findIndex((cartao) => cartao.id === idFlashcard);

  if (indice === -1) {
    console.log(`Flashcard com ID ${idFlashcard} não encontrado.`);
    return false;
  }

  if (novosDados.pergunta !== "") {
    flashcards[indice].pergunta = novosDados.pergunta;
  }

  if (novosDados.resposta !== "") {
    flashcards[indice].resposta = novosDados.resposta;
  }

  console.log(`Flashcard com ID ${idFlashcard} atualizado com sucesso.`);
  return true;
}

export default atualizarFlashcard;
