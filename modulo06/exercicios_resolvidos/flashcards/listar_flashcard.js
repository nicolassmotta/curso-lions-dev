function listarFlashcards(flashcards) {
  if (flashcards.length === 0) {
    console.log("Nenhum flashcard cadastrado.");
    return;
  }

  flashcards.forEach((cartao) => {
    console.log(`Flashcard ID: ${cartao.id}`);
    console.log(`Pergunta: ${cartao.pergunta}`);
    console.log(`Resposta: ${cartao.resposta}`);
    console.log(`ID do Baralho: ${cartao.idBaralho}`);
    console.log("-----------------------");
  });
}

export default listarFlashcards;
