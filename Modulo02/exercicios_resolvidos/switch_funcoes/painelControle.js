const prompt = require("prompt-sync")()

function registrarVenda(saldo, venda) {
    
    return saldo + venda
}

function registrarDespesa(saldo, despesa) {
    
    return saldo - despesa
}

let operacao = ""
let venda = 0
let despesa = 0
let caixa = {
    operador: "João",
    saldo: 100,
    historicoTransacoes: []
}

while (operacao != "Sair") {

    console.log("Qual operação você deseja realizar?\n[V] - Venda\n[D] - Despesa\n[Sair] - Fechar o Programa\nR: ")
    operacao = prompt()

    switch (operacao) {
        case "V":
            venda = parseFloat(prompt("Quanto foi o valor da venda? R: "))
            caixa.saldo = registrarVenda(caixa.saldo, venda)
            caixa.historicoTransacoes.push("Entrada")
            break
        case "D":
            despesa = parseFloat(prompt("Quanto foi o valor da despesa? R: "))
            caixa.saldo = registrarDespesa(caixa.saldo, despesa)
            caixa.historicoTransacoes.push("Saída")
            break
        case "Sair":
            console.log("Programa fechando...")
            break
        default:
            console.log("Opção inválida!")
            break
    }
}

console.table(caixa)
