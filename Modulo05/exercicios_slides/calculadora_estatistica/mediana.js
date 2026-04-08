import numeros from "./numeros.js"

/*
    Caso o tamanho do vetor seja impar:
    let numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    numeros.length / 2 = 4,5
    Caso o tamanho do vetor seja par:
    let numeros = [10, 20, 30, 40]
    numeros.length / 2 = 2
    numeros.length / 2 = 3
*/

function calcularMediana() {
    
    let mediana = 0
    
    if (!numeros || numeros.length === 0) {
        console.log("A lista está nula ou vazia!")
        return
    }
    
    if(numeros.length % 2 == 0){
        mediana = (numeros[numeros.length / 2] + numeros[(numeros.length / 2) - 1]) / 2
    } else {
        mediana = numeros[Math.floor(numeros.length / 2)]
    }
    
    return mediana
}

export default calcularMediana