import PromptSync from "prompt-sync"
const prompt = PromptSync()

const conversorMoedas = ((valor, moeda) => {

    let valorFinal = 0

    switch (moeda) {
        case "USD":
            valorFinal = valor / 5
            return valorFinal
            break
        case "EUR":
            valorFinal = valor / 6
            return valorFinal
            break
        case "GBP":
            valorFinal = valor / 7
            return valorFinal
            break
        default:
            console.log("Moeda inválida!")
            return valor
            break
    }
})
let valorBRL = 0
let moeda = ""
console.log("Qual moeda você deseja converter?\n[1] - USD\n[2] - EUR\n[3] - GBP")
moeda = prompt("R: ")
console.log("Valor em Reais")
valorBRL = Number(prompt("R: "))

console.log(`O valor ${valorBRL} em reais convertido para ${moeda} que você escolheu, resulta no valor final de ${conversorMoedas(valorBRL, moeda)}`)
