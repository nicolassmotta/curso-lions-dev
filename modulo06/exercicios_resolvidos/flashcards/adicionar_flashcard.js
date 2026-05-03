function adicionarFlashcard(flashcards, baralhos, novoFlashcard) {
  const baralhoEncontrado = baralhos.find((baralho) => baralho.id === novoFlashcard.idBaralho);

  if (!baralhoEncontrado) {
    console.log(`Baralho com ID ${novoFlashcard.idBaralho} não encontrado. Flashcard não adicionado.`);
    return false;
  }

  const ultimoFlashcard = flashcards[flashcards.length - 1];
  let novoId = 1;

  if (ultimoFlashcard) {
    novoId = ultimoFlashcard.id + 1;
  }

  novoFlashcard.id = novoId;
  flashcards.push(novoFlashcard);
  console.log("Flashcard adicionado com sucesso!");
  return true;
}

export default adicionarFlashcard;
