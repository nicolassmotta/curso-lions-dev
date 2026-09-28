import produtos from "../dados.js";
import formatarReal from "../utils/formatar.js";
import { quantidadeValida } from "../utils/validacao.js";

function venderProduto(id, quantidade) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return "Produto não encontrado.";
  }
  if (!quantidadeValida(quantidade)) {
    return "Quantidade inválida.";
  }
  if (quantidade > produto.estoque) {
    return `Estoque insuficiente. Disponível: ${produto.estoque}.`;
  }
  produto.estoque -= quantidade;
  return `Venda registrada: ${quantidade}x ${produto.nome} = ${formatarReal(produto.preco * quantidade)}`;
}

export default venderProduto;
