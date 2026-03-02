import promptSync from "prompt-sync"

const prompt = promptSync();

let num;

num = parseFloat(prompt('Digite o número: '));

if (num === 0) {
    console.log('Seu número é zero!');
    process.exit();
}

processamento(num);

function processamento(num) {
        
    num = num % 2;
    if (num === 0) {
        console.log('Seu número é par!');
        return;
    }
    console.log('Seu número é ímpar!');
}