import produtos from "../dados.js";
import formatarReal from "../utils/formatar.js";

function relatorioEstoque() {
  let total = 0;
  for (const produto of produtos) {
    total += produto.preco * produto.estoque;
  }
  console.log(`Produtos: ${produtos.length} | Valor em estoque: ${formatarReal(total)}`);
}

export default relatorioEstoque;
