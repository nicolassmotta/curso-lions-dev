import numeros from "./numeros.js"

function calcularMediana() {
    
    let mediana = 0
    if (numeros.length % 2 == 0) {
        
        mediana = (numeros[(numeros.length / 2) - 1] + numeros[(numeros.length / 2)]) / 2
        return mediana

    } else {
        
        mediana = numeros[Math.floor(numeros.length / 2)]
        return mediana
    }
}

export default calcularMediana