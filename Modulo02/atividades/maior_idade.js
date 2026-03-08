// importar a biblioteca prompt-sync para receber entradas
// declarar uma variável para o nome, recebendo a entrada do usuário
// declarar uma variável para a idade, convertendo a entrada para número inteiro com parseInt()
// criar uma condicional (if/else) para verificar se a idade digitada é maior ou igual a 18
// dentro da condição verdadeira (se for maior de idade), imprimir a mensagem informando que ele já é maior
// dentro da condição falsa (else), criar uma variável para calcular a diferença (18 menos a idade do usuário)
// ainda dentro do bloco falso, imprimir a mensagem informando quantos anos faltam usando a variável calculada

import { promptSync } from "prompt-sync";

const prompt = promptSync()

let nome = prompt("Qual é o seu nome?")
let idade = Number(promt("Qual é sua idade?"))

if (idade < 18) {
    console.log();
    
} else {
    
}