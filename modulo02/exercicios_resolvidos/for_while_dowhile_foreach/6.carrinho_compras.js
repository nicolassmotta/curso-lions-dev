const prompt = require("prompt-sync")();

let carrinhos = [
  {
    nome: "João",
    produtos: [100, 100, 200],
  },
  {
    nome: "Nicolas",
    produtos: [50, 50, 200],
  },
  {
    nome: "Ana",
    produtos: [110, 90, 100],
  },
];

let totalCompra = 0;
let dinheiro = 0;
let relatorio = [];

carrinhos.forEach((item) => {
  console.log(`Quanto ${item.nome} tem de dinheiro para poder pagar?`);
  dinheiro = Number(prompt("R: "));

  item.produtos.forEach((preco) => {
    totalCompra = totalCompra + preco;
  });

  if (dinheiro >= totalCompra) {
    console.log(`O troco a ser devolvido é ${dinheiro - totalCompra}`);
    relatorio.push(item.nome);
  }

  totalCompra = 0;
});

console.log(relatorio);
