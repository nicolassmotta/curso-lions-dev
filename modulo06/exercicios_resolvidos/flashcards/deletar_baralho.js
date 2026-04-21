import flashcard from "./flashcard.js";

function deletarBaralho(baralho, idBaralho) {
  const index = baralho.findIndex((b) => b.id === idBaralho);

  if (index !== -1) {
    baralho.splice(index, 1);
    console.log(`Baralho com ID ${idBaralho} deletado com sucesso.`);
  } else {
    console.log(`Baralho com ID ${idBaralho} não encontrado.`);
    return;
  }

  for (let i = flashcard.length - 1; i >= 0; i--) {
    const fc = flashcard[i];

    if (fc.idBaralho === idBaralho) {
      flashcard.splice(i, 1);
      console.log(`Flashcard com ID ${fc.id} associado ao baralho ${idBaralho} deletado.`);
    }
  }
}

export default deletarBaralho;
