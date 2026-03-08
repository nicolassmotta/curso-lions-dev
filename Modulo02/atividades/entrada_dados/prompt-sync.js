// importar a biblioteca prompt-sync para receber entradas
// declarar variavel para armazenar o nome do pet usando prompt
// declarar variavel para armazenar a idade do pet usando prompt
// imprimir a mensagem final concatenando o nome e a idade

import promptSync from "prompt-sync"

const prompt = promptSync();

const nome = prompt("Digite o nome do pet: ");
const idade = prompt("Digite a idade do pet: ");
console.log(`O ${nome} tem ${idade} anos!`);
