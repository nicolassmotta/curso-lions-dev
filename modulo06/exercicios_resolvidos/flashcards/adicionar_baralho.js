function adicionarBaralho(baralho, novoBaralho) {
  const ultimoBaralho = baralho[baralho.length - 1];
  let novoId = 1;

  if (ultimoBaralho) {
    novoId = ultimoBaralho.id + 1;
  }

  novoBaralho.id = novoId;
  baralho.push(novoBaralho);
  return novoBaralho;
}

export default adicionarBaralho;
