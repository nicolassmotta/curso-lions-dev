function listarBaralho(baralhos) {
  if (baralhos.length === 0) {
    console.log("Nenhum baralho cadastrado.");
    return;
  }

  baralhos.forEach((item) => {
    console.log(`IdBaralho: ${item.id}`);
    console.log(`Título: ${item.titulo}`);
    console.log("-----------------------");
  });
}

export default listarBaralho;
