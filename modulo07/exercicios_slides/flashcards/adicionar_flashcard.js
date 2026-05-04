import { baralhos, flashcards } from "./data.js";

function adicionarFlashcard(pergunta, resposta, idBaralho) {
  // Validação (lógica do Modulo07/adicionarFlashcard.js)
  const baralhoEncontrado = baralhos.find((b) => b.id === idBaralho);
  if (!baralhoEncontrado) {
    return { error: `Baralho com ID ${idBaralho} não encontrado.` };
  }

  let novoId = 1;
  if (flashcards.length > 0) {
    const ultimoFlashcard = flashcards[flashcards.length - 1];
    novoId = ultimoFlashcard.id + 1;
  }

  const novoFlashcard = {
    id: novoId,
    pergunta: pergunta,
    resposta: resposta,
    idBaralho: idBaralho,
  };

  flashcards.push(novoFlashcard);
  return { data: novoFlashcard };
}

export default adicionarFlashcard;
