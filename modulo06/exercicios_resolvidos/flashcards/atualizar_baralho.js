function atualizarBaralho(baralho, idBaralho, novoTitulo) {
  const indice = baralho.findIndex((item) => item.id === idBaralho);

  if (indice === -1) {
    console.log(`Baralho com ID ${idBaralho} não encontrado.`);
    return false;
  }

  baralho[indice].titulo = novoTitulo || baralho[indice].titulo;
  console.log(`Baralho com ID ${idBaralho} atualizado com sucesso.`);
  return true;
}

export default atualizarBaralho;
