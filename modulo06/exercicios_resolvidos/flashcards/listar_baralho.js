function listarBaralho(baralho) {
  if (baralho.length === 0) {
    console.log("Nenhum baralho cadastrado.");
    return;
  }

  baralho.forEach((item) => {
    console.log(`IdBaralho: ${item.id}`);
    console.log(`Título: ${item.titulo}`);
    console.log("-----------------------");
  });
}

export default listarBaralho;
