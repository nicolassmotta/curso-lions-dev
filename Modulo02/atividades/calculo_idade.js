// importar a biblioteca prompt-sync para receber entradas
// criar uma constante para armazenar o ano atual
// declarar variável para armazenar o nome do usuário usando prompt
// declarar variável para a idade, convertendo para inteiro com parseInt()
// calcular o ano de nascimento (anoAtual - idade) para quem já fez aniversário
// calcular o ano de nascimento (anoAtual - idade - 1) para quem não fez aniversário
// imprimir a mensagem final com o nome e as duas opções de ano de nascimento

import promptSync from "prompt-sync"

const prompt = promptSync()

let anoAtual = 2026
let nome = prompt("Qual seu nome? R: ")
let idade = parseInt(prompt("Quantos anos você tem? R: "))
let aniversario = prompt("Você já fez aniversario? [S] - Sim [N] - Não R: ")

if (aniversario == "S") {
    console.log(` Oi ${nome}! Você nasceu em ${anoAtual - idade}.`)
    
} else {
    console.log(` Oi ${nome}! Você nasceu em ${anoAtual - idade - 1}.`)

}
