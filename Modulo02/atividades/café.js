// importar a biblioteca prompt-sync para receber entradas
// declarar variável para a nota 1, convertendo para float com parseFloat()
// declarar variável para a nota 2, convertendo para float com parseFloat()
// criar uma variável para calcular e armazenar a média aritmética
// imprimir a mensagem final exibindo o resultado da média

import promptSync from "prompt-sync"

const prompt = promptSync();

let resposta;

resposta = prompt('Você gosta de café?\n[S]- Sim\n[N] - Não\nResposta: ');

processamento(resposta);

function processamento(resposta) {
    
    const gostaDeCafe = (resposta.toUpperCase() === 'S' || resposta.toUpperCase() === 'SIM');
    if (gostaDeCafe) {
        console.log('Que ótimo! O café é uma excelente maneira de começar o dia ou ter um bom momento de pausa. Aproveite!');
    } else {
        console.log('Tudo bem! Existem muitas outras bebidas deliciosas por aí. Talvez você prefira um chá ou chocolate quente.');
    }
}
