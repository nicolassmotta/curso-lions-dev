// Os dados ficam em um arquivo só, compartilhado por todas as operações.
// O array é const: as operações alteram o conteúdo (push, estoque -= ...),
// mas ninguém reatribui a variável.
const produtos = [
  { id: 1, nome: "Caderno", preco: 18.9, estoque: 10 },
  { id: 2, nome: "Caneta", preco: 3.5, estoque: 40 },
];

export default produtos;
