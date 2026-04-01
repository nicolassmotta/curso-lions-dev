const prompt = require("prompt-sync")()

function somar(resultado, num) {
    return resultado + num
}

function subtrair(resultado, num) {
    return resultado - num
}

function multiplicar(resultado, num) {
    return resultado * num
}

function dividir(resultado, num) {
    return resultado / num
    
}

function porcentagem(resultado, num) {
    return (resultado * num) / 100
}
if (condition) {
    
}
let operacao = 0
let resultado = 0
let numero = 0

while (operacao != 6) {
    
    console.log("Qual operação você deseja realizar?\n[1] - Adição\n[2] - Subtração\n[3] - Multiplicação\n[4] - Divisão\n[5] - Porcentagem\n[6] - Sair do Programa")
    operacao = prompt("R: ")

    switch (operacao) {
        case 1:
            numero = prompt("Qual número você deseja somar ao resultado?")
            if (typeof numero === "number ") {
                resultado = somar(resultado, numero)
            } else {
                console.log("Digite um número válido!")
                
            }
            
            break;
    
        default:
            break;
    }
}