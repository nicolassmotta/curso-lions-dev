/**
 * Exercício 10: Amplitude (Maior - Segundo Menor)
 * Objetivo: Calcular a diferença entre o maior e o segundo menor valor usando o método sort.
 */

const numeros = [10, 2, 5, 8, 1, 15];

// 1. Ordenamos a lista original de forma crescente (do menor para o maior)
// O (a, b) => a - b é usado para garantir que o sort ordene números corretamente
numeros.sort((a, b) => a - b);

// 2. Com a lista ordenada, o maior valor está na última posição
const maior = numeros[numeros.length - 1];

// 3. O segundo menor valor está na segunda posição (índice 1)
const segundoMenor = numeros[1];

// 4. Calculamos a amplitude (maior - segundo menor)
const amplitude = maior - segundoMenor;

console.log(`Lista ordenada: ${numeros}`);
console.log(`Maior: ${maior}`);
console.log(`Segundo Menor: ${segundoMenor}`);
console.log(`Amplitude (Maior - Segundo Menor): ${amplitude}`);
