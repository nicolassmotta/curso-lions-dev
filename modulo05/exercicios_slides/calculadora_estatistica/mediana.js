import numeros from "./numeros.js";

/*
    Caso o tamanho do vetor seja ímpar:
    let numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    numeros.length / 2 = 4.5, Math.floor(4.5) = 4
    A mediana é numeros[4] = 50
    Caso o tamanho do vetor seja par:
    let numeros = [10, 20, 30, 40]
    numeros.length / 2 = 2 e numeros.length / 2 - 1 = 1
    A mediana é a média de numeros[1] e numeros[2]: (20 + 30) / 2 = 25
*/

function calcularMediana() {
  let mediana = 0;

  if (!numeros || numeros.length === 0) {
    console.log("A lista está nula ou vazia!");
    return;
  }

  // A mediana precisa da lista ORDENADA. O sort sem regra ordena como texto,
  // por isso usamos (a, b) => a - b. O slice() evita bagunçar a lista original.
  const ordenados = numeros.slice().sort((a, b) => a - b);
  const meio = Math.floor(ordenados.length / 2);

  if (ordenados.length % 2 === 0) {
    mediana = (ordenados[meio - 1] + ordenados[meio]) / 2;
  } else {
    mediana = ordenados[meio];
  }

  return mediana;
}

export default calcularMediana;
