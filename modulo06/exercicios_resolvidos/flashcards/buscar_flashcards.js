function buscarFlashcards(flashcards, termoBusca) {
  const resultados = flashcards.filter((cartao) => cartao.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) || cartao.resposta.toLowerCase().includes(termoBusca.toLowerCase()));
  return resultados;
}

export default buscarFlashcards;
