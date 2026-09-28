import { baralhos } from "./dados.js";

function adicionarBaralho(titulo) {
  if (!titulo) {
    return { error: "O título é obrigatório." };
  }

  let novoId = 1;
  if (baralhos.length > 0) {
    const ultimoBaralho = baralhos[baralhos.length - 1];
    novoId = ultimoBaralho.id + 1;
  }

  const novoBaralho = {
    id: novoId,
    titulo: titulo,
  };

  baralhos.push(novoBaralho);
  return { data: novoBaralho };
}

export default adicionarBaralho;
