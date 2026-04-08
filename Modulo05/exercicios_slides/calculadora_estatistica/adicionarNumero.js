import numeros from "./numeros.js"

// let numeros = [10, 20, 30, 40, 50]

function adicionarNumero(num) {
    
    numeros.push(num)
    console.log("Número adicionado com sucesso!")
    console.log(numeros)
     
}

export default adicionarNumero