function adicionarBaralho(baralho, novaBaralho) {
  const ultimoBaralho = baralho[baralho.length - 1];
  let novoId = 1;

  if (ultimoBaralho) {
    novoId = ultimoBaralho.id + 1;
  }

  novaBaralho.id = novoId;
  baralho.push(novaBaralho);
  return novaBaralho;
}

export default adicionarBaralho;
