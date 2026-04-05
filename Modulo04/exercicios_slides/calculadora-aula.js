import somar from "./somar.js"
import subtrair from "./subtrair.js"
import multiplicar from "./multiplicar.js"
import dividir from "./dividir.js"
import porcentagem from "./porcentagem.js"
const somar = require("./somar.js")

import PromptSync from "prompt-sync"
const prompt = PromptSync()



let operacao = 0
let resultado = 0
let numero = 0

while (operacao != 6) {
    
    console.log("Qual operação você deseja realizar?\n[1] - Adição\n[2] - Subtração\n[3] - Multiplicação\n[4] - Divisão\n[5] - Porcentagem\n[6] - Sair do Programa")
    operacao = Number(prompt("R: "))

    switch (operacao) {
        case 1:
            numero = parseFloat(prompt("Qual número você deseja somar ao resultado?"))
            console.log(isNaN(numero))
            
            if (!isNaN(numero)) {
                resultado = somar(resultado, numero)
                console.log(`O resultado atual é ${resultado}`)
                
            } else {
                console.log("Digite um número válido!")
            }
            
            break;
    
        default:
            console.log("Opção Inválida!")
            
            break;
    }
}