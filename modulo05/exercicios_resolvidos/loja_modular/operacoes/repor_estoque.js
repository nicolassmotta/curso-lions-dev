// Parte 2: funcionalidade nova, em um arquivo novo.
// Reaproveita a validação que já existia em utils/validacao.js.
import produtos from "../dados.js";
import { quantidadeValida } from "../utils/validacao.js";

function reporEstoque(id, quantidade) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return "Produto não encontrado.";
  }
  if (!quantidadeValida(quantidade)) {
    return "Quantidade inválida.";
  }
  produto.estoque += quantidade;
  return `Estoque de ${produto.nome} atualizado para ${produto.estoque}.`;
}

export default reporEstoque;
