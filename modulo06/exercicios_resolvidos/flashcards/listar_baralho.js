import baralho from "./baralho.js";

function listarBaralho(baralho) {
  baralho.forEach((baralho, index) => {
    console.log(`IdBaralho: ${baralho.id}:`);
    console.log(`Título: ${baralho.titulo}`);
    console.log("-----------------------");
  });
}

export default listarBaralho;
