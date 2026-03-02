// importar a biblioteca prompt-sync para receber entradas
// declarar variável para a nota 1, convertendo para float com parseFloat()
// declarar variável para a nota 2, convertendo para float com parseFloat()
// criar uma variável para calcular e armazenar a média aritmética
// imprimir a mensagem final exibindo o resultado da média

import promptSync from "prompt-sync"

const prompt = promptSync();

let num1 = parseFloat(prompt('Qual foi a sua nota da prova 01? '));
let num2 = parseFloat(prompt('Qual foi a sua nota da prova 02? '));

processamento(num1, num2);

function processamento(num1, num2) {
    let resultado = (num1 + num2) / 2;
    console.log('A sua média é: ' + resultado);
    return;
}