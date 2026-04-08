import numeros from "./numeros.js"

// let numeros = [10, 20, 30, 40, 50]

function calcularMedia() {
    
    let soma = 0

    /*
    for(let i = 0; i < numeros.length; i++){

        soma = soma + numeros[i]
    }
    */
    
    if (!numeros || numeros.length === 0) {
        console.log("A lista está nula ou vazia!")
        return
    }
    
    numeros.forEach((num) => {
        soma = soma + num
    })
    
    return soma / numeros.length
}

export default calcularMedia