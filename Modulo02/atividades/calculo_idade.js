// importar a biblioteca prompt-sync para receber entradas
// criar uma constante para armazenar o ano atual
// declarar variável para armazenar o nome do usuário usando prompt
// declarar variável para a idade, convertendo para inteiro com parseInt()
// calcular o ano de nascimento (anoAtual - idade) para quem já fez aniversário
// calcular o ano de nascimento (anoAtual - idade - 1) para quem não fez aniversário
// imprimir a mensagem final com o nome e as duas opções de ano de nascimento

import promptSync from "prompt-sync"

const prompt = promptSync();

let nome;
let idade;

nome = prompt('Qual seu nome?');

idade = prompt('Quantos anos você tem?');

processamento(nome, idade);

function processamento(nome, idade) {
    
    console.log('Seu nome é ' + nome + ' e sua idade é ' + idade + '.');
    console.log('Caso você esteja com um ano a mais, provavelmente não fez aniversário esse ano ainda!');
}