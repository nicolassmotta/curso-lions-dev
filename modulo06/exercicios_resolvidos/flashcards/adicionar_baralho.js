function adicionarBaralho(baralhos, novoBaralho) {
  // Validação: não cria baralho sem título
  if (!novoBaralho.titulo || novoBaralho.titulo.trim() === "") {
    console.log("Erro: o título do baralho é obrigatório.");
    return false;
  }

  const ultimoBaralho = baralhos[baralhos.length - 1];
  let novoId = 1;

  if (ultimoBaralho) {
    novoId = ultimoBaralho.id + 1;
  }

  novoBaralho.id = novoId;
  baralhos.push(novoBaralho);
  console.log("Baralho adicionado com sucesso!");
  return true;
}

export default adicionarBaralho;
