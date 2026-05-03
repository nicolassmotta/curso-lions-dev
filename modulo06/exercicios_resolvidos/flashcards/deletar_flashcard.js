function deletarFlashcard(flashcards, idFlashcard) {
  const index = flashcards.findIndex((flashcard) => flashcard.id === idFlashcard);
  if (index !== -1) {
    flashcards.splice(index, 1);
    console.log(`Flashcard com ID ${idFlashcard} deletado com sucesso.`);
    return true;
  } else {
    console.log(`Flashcard com ID ${idFlashcard} não encontrado.`);
    return false;
  }
}

export default deletarFlashcard;
