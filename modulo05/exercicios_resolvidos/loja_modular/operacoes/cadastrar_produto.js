import produtos from "../dados.js";
import { precoValido, quantidadeValida } from "../utils/validacao.js";

// O contador mora AQUI, e não no dados.js: só este arquivo cria produtos,
// então só ele precisa alterar o valor. Uma variável importada é somente
// leitura, e proximoId++ em outro arquivo daria "Assignment to constant variable".
// Ele começa no maior id que já existe, mais 1.
let proximoId = 1;
for (const produto of produtos) {
  if (produto.id >= proximoId) {
    proximoId = produto.id + 1;
  }
}

function cadastrarProduto(nome, preco, estoque) {
  if (nome.trim() === "" || !precoValido(preco) || !quantidadeValida(estoque)) {
    return false;
  }
  produtos.push({ id: proximoId, nome: nome.trim(), preco, estoque });
  proximoId++;
  return true;
}

export default cadastrarProduto;
