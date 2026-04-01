const prompt = require("prompt-sync")()

function atualizarEntrega(codigo) {
    
    switch (codigo) {
        case "P":
            entrega.status = "Pendente de Envio"
            break
        case "E":
            entrega.status = "Em Rota de Entrega"
            break
        case "C":
            entrega.status = "Cancelado"
            break
        default:
            break
    }
}

let codigo = ""
let entrega = {
    id: "54873892826",
    status: ""
}

console.log("Qual o código do status da entrega?\n[P] - Pendente de Envio\n[E] - Em Rota de Entrega\n[C] - Cancelado")
codigo = prompt("R: ")

atualizarEntrega(codigo)

console.log(entrega)
