import numeros from "./numeros.js"

function calcularMedia() {

    let media = 0
    numeros.forEach(num => {
        media = media + num
    })

    return media / numeros.length
}

export default calcularMedia