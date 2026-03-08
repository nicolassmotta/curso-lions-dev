// importar a biblioteca prompt-sync para receber entradas
// usar o prompt para perguntar se o usuário gosta de café e salvar a resposta em uma variável de texto
// declarar a variável booleana gostaDeCafe (usando let)
// criar a primeira condicional (if/else) para checar a resposta de texto digitada pelo usuário
// dentro dessa condicional, atribuir o valor true ou false para a variável gostaDeCafe
// criar uma segunda condicional (if/else) que avalie apenas o valor armazenado na variável booleana gostaDeCafe
// imprimir a mensagem personalizada caso o valor seja verdadeiro (true)
// imprimir uma mensagem diferente caso o valor seja falso (false)

import promptSync from "prompt-sync"

const prompt = promptSync()

let resposta
let gostaDeCafe

resposta = prompt('Você gosta de café?\n[S]- Sim\n[N] - Não\nResposta: ').toUpperCase().trim()

if (resposta == "S") {
    gostaDeCafe = true

} else {
    gostaDeCafe = false

}

if (gostaDeCafe) {
    console.log("Então você gosta de café!");

} else {
    console.log("Você deveria experimentar!");
    
}
