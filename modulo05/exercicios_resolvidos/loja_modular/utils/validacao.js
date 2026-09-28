// Exports nomeados: o arquivo reúne várias funções do mesmo assunto,
// e cada operação importa só as que usa.
export function precoValido(preco) {
  return !isNaN(preco) && preco > 0;
}

export function quantidadeValida(quantidade) {
  return Number.isInteger(quantidade) && quantidade > 0;
}
