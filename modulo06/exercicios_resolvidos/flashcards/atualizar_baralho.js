function atualizarBaralho(baralhos, idBaralho, novoTitulo) {
  const indice = baralhos.findIndex((baralho) => baralho.id === idBaralho);

  if (indice === -1) {
    console.log(`Baralho com ID ${idBaralho} não encontrado.`);
    return false;
  }

  if (novoTitulo !== "") {
    baralhos[indice].titulo = novoTitulo;
  }
  
  console.log(`Baralho com ID ${idBaralho} atualizado com sucesso.`);
  return true;
}

export default atualizarBaralho;
