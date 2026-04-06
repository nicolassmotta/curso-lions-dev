import PromptSync from "prompt-sync"
const prompt = PromptSync()

import numeros from "./numeros.js"
import adicionarNumero from "./adicionarNumero.js"
import removerNumero from "./removerNumero.js"
import listarNumeros from "./listarNumeros.js"
import calcularMedia from "./media.js"
import calcularMediana from "./mediana.js"

let operacao = 0
let numero = 0

while (operacao != 6) {

    console.log("Qual operação você deseja realizar?\n[1] - Adicionar Número\n[2] - Remover Número\n[3] - Listar Números\n[4] - Calcular Média\n[5] - Calcular Mediana\n[6] - Sair do Programa")
    operacao = parseInt(prompt("R: "))

    switch (operacao) {
        case 1:
            console.log("Qual número você deseja adicionar a lista?")
            numero = parseFloat(prompt("R: "))
            adicionarNumero(numero)
            break
        case 2:
            removerNumero()
            break
        case 3:
            listarNumeros()
            break
        case 4:
            console.log(`A média é: ${calcularMedia()}`)
            break
        case 5:
            numeros.sort((a, b) => a - b)
            console.log(`A mediana é: ${calcularMediana()}`)
            break
        case 6:
            console.log("Fechando o programa...")
            break
        default:
            console.log("Operação Inválida!")
            break
    }
}