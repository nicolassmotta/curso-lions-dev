/**
 * Exercício 10: Amplitude (Maior - Segundo Menor)
 * Objetivo: Calcular a diferença entre o maior e o segundo menor valor usando o método sort.
 * O segundo menor precisa ser DIFERENTE do menor (mesma regra do exercício 12).
 */

const numeros = [10, 1, 2, 5, 8, 1, 15];

// 1. Ordenamos a lista de forma crescente (do menor para o maior)
// O (a, b) => a - b é usado para garantir que o sort ordene números corretamente
numeros.sort((a, b) => a - b);

// 2. Com a lista ordenada, o menor valor está na primeira posição e o maior na última
const menor = numeros[0];
const maior = numeros[numeros.length - 1];

// 3. O segundo menor NÃO é simplesmente numeros[1]: se o menor se repetir,
// numeros[1] seria o próprio menor. Procuramos o primeiro valor maior que ele.
let segundoMenor = null;

for (let i = 1; i < numeros.length; i++) {
  if (numeros[i] > menor) {
    segundoMenor = numeros[i];
    break;
  }
}

console.log(`Lista ordenada: ${numeros}`);

// 4. Se todos os números forem iguais, não existe segundo menor
if (segundoMenor === null) {
  console.log("Não há um segundo menor valor diferente (todos os números são iguais).");
} else {
  const amplitude = maior - segundoMenor;
  console.log(`Maior: ${maior}`);
  console.log(`Segundo Menor: ${segundoMenor}`);
  console.log(`Amplitude (Maior - Segundo Menor): ${amplitude}`);
}
