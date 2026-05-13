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
let totalPago = 0;
let relatorio = [];

carrinhos.forEach((item) => {
  item.produtos.forEach((preco) => {
    totalCompra = totalCompra + preco;
  });

  while (totalPago < totalCompra) {
    console.log(`${item.nome} precisa pagar R$ ${totalCompra}. Quanto recebeu agora?`);
    dinheiro = Number(prompt("R: "));
    totalPago = totalPago + dinheiro;
  }

  if (totalPago > totalCompra) {
    console.log(`O troco a ser devolvido é ${totalPago - totalCompra}`);
  }

  relatorio.push(item.nome);
  totalCompra = 0;
  totalPago = 0;
});

console.log(relatorio);
