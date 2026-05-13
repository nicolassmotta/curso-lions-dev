/**
 * Exercício 11: Capitalizar Primeira Letra
 * Objetivo: Transformar a primeira letra de cada palavra em maiúscula.
 */

const frase = "javascript é uma linguagem fenomenal";

// 1. Dividimos a frase em um array de palavras usando o espaço como separador
const palavras = frase.split(" ");

// 2. Criamos um array para guardar as palavras transformadas
const palavrasFormatadas = [];

// 3. Percorremos cada palavra do array
for (let i = 0; i < palavras.length; i++) {
  const palavra = palavras[i];

  // 4. Pegamos a primeira letra da palavra (palavra[0]) e colocamos em maiúscula (toUpperCase)
  // 5. Pegamos o restante da palavra a partir da posição 1 (slice(1))
  // 6. Juntamos as duas partes
  const formatada = palavra[0].toUpperCase() + palavra.slice(1);

  // 7. Guardamos a palavra formatada no novo array
  palavrasFormatadas.push(formatada);
}

// 8. Juntamos todas as palavras de volta em uma frase única separada por espaços
const resultado = palavrasFormatadas.join(" ");

console.log(`Original: "${frase}"`);
console.log(`Formatada: "${resultado}"`);
