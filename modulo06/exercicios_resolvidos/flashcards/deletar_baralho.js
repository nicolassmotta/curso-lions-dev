function deletarBaralho(baralhos, flashcards, idBaralho) {
  const index = baralhos.findIndex((baralho) => baralho.id === idBaralho);

  if (index !== -1) {
    baralhos.splice(index, 1);
    console.log(`Baralho com ID ${idBaralho} deletado com sucesso.`);
  } else {
    console.log(`Baralho com ID ${idBaralho} não encontrado.`);
    return;
  }

  for (let i = flashcards.length - 1; i >= 0; i--) {
    const fc = flashcards[i];

    if (fc.idBaralho === idBaralho) {
      flashcards.splice(i, 1);
      console.log(`Flashcard com ID ${fc.id} associado ao baralho ${idBaralho} deletado.`);
    }
  }
}

export default deletarBaralho;
