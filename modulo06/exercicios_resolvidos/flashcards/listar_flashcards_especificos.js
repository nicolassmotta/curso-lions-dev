function listarFlashcardsEspecificos(flashcards, idBaralho) {
  const flashcardsDoBaralho = flashcards.filter((cartao) => cartao.idBaralho === idBaralho);

  if (flashcardsDoBaralho.length === 0) {
    console.log("Nenhum flashcard encontrado para este baralho.");
    return;
  }

  flashcardsDoBaralho.forEach((cartao) => {
    console.log(`Flashcard ID: ${cartao.id}`);
    console.log(`Pergunta: ${cartao.pergunta}`);
    console.log(`Resposta: ${cartao.resposta}`);
    console.log("-----------------------");
  });
}

export default listarFlashcardsEspecificos;
