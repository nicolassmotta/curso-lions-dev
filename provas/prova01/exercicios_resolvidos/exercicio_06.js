/**
 * Exercício 6: Soma dos Números Ímpares
 * Objetivo: Calcular a soma apenas dos números ímpares de uma lista.
 */

const numeros = [5, 10, 15, 20, 25, 30];

// 1. Iniciamos o acumulador da soma em zero
let somaImpares = 0;

// 2. Percorremos a lista
for (let i = 0; i < numeros.length; i++) {
  // 3. Verificamos se o número atual é ímpar
  if (numeros[i] % 2 !== 0) {
    // 4. Se for ímpar, somamos o valor dele ao nosso acumulador
    somaImpares += numeros[i];
  }
}

console.log(`Lista: ${numeros}`);
console.log(`Soma dos números ímpares: ${somaImpares}`);
