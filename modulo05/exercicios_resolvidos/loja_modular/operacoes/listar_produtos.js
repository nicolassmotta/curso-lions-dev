import produtos from "../dados.js";
import formatarReal from "../utils/formatar.js";

function listarProdutos() {
  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }
  for (const produto of produtos) {
    console.log(`${produto.id} - ${produto.nome} | ${formatarReal(produto.preco)} | estoque: ${produto.estoque}`);
  }
}

export default listarProdutos;
