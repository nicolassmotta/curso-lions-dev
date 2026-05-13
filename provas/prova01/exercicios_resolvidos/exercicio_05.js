/**
 * Exercício 5: Remover Espaços de uma Frase
 * Objetivo: Criar uma nova string sem os espaços em branco da original.
 */

const frase = "A persistência é o caminho do êxito.";

// 1. Iniciamos uma variável vazia que servirá como nossa nova frase
let resultado = "";

// 2. Percorremos a frase original caractere por caractere
for (let i = 0; i < frase.length; i++) {
  // 3. Verificamos se o caractere atual é diferente de um espaço em branco
  if (frase[i] !== " ") {
    // 4. Se não for espaço, "colamos" (concatenamos) ele no nosso resultado
    resultado += frase[i];
  }
}

console.log(`Frase original: "${frase}"`);
console.log(`Sem espaços: "${resultado}"`);
