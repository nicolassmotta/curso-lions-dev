import promptSync from "prompt-sync"

const prompt = promptSync();

let nome = '';

nome = prompt('Qual seu nome?');

processamento(nome);

function processamento(nome) {
    console.log('Olá, ' + nome + '! Seja bem-vindo(a)!');
}