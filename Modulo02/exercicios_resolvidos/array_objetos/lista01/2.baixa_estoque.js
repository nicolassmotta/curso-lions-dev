import PromptSync from "prompt-sync"
const prompt = PromptSync()

let vendido = 0
let estoque = [10, 15, 8]

vendido = Number(prompt("Quantas camisetas do tamanho P foram vendidas hoje? R: "))

estoque[0] = estoque[0] - vendido

if (estoque[0] < 5) {
    console.log("Alerta: Estoque de luvas tamanho P está crítico!")
    
} else {
    console.log(`Estoque atualizado. Quantidade restante do tamanho P: ${estoque[0]}`)
    
}