// importar a biblioteca prompt-sync
// inicializar o prompt
// declarar uma variável para receber o número digitado pelo usuário
// (lembre-se de converter a entrada de texto para número)
// criar uma primeira condição (if) para verificar se o número é exatamente igual a 0
// se for, imprimir uma mensagem informando que o número é 0
// criar uma segunda condição (else if) para verificar se o resto da divisão do número por 2 é diferente de 0
// se a condição for verdadeira, imprimir uma mensagem dizendo que o número é ímpar
// criar a condição final (else) para os números restantes
// imprimir uma mensagem informando que o número é par

import promptSync from "prompt-sync";

const prompt = promptSync();

let num;

num = parseFloat(prompt("Digite o número: "));

if (num === 0) {
  console.log("Seu número é zero!");
  process.exit();
}

processamento(num);

function processamento(num) {
  num = num % 2;
  if (num === 0) {
    console.log("Seu número é par!");
    return;
  }
  console.log("Seu número é ímpar!");
}
