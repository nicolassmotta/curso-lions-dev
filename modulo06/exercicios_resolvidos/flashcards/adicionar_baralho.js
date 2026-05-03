function adicionarBaralho(baralhos, novoBaralho) {
  const ultimoBaralho = baralhos[baralhos.length - 1];
  let novoId = 1;

  if (ultimoBaralho) {
    novoId = ultimoBaralho.id + 1;
  }

  novoBaralho.id = novoId;
  baralhos.push(novoBaralho);
  return novoBaralho;
}

export default adicionarBaralho;
