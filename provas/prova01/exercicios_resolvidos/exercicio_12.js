/**
 * Exercício 12: Segundo Maior Valor
 * Objetivo: Encontrar o segundo maior número de uma lista usando métodos comuns (sort).
 */

const numeros = [5, 10, 10, 8, 3, 10, 9];

// 1. Ordenamos a lista de forma decrescente (do maior para o menor)
numeros.sort((a, b) => b - a);

// 2. O maior valor com certeza será o primeiro da lista ordenada
let maior = numeros[0];

// 3. Criamos uma variável para o segundo maior iniciando vazia
let segundoMaior = null;

// 4. Percorremos a lista a partir do segundo elemento
for (let i = 1; i < numeros.length; i++) {
  // 5. Procuramos pelo primeiro número que seja MENOR que o nosso maior
  // Isso ignora empates no primeiro lugar
  if (numeros[i] < maior) {
    segundoMaior = numeros[i];
    // Assim que encontrarmos o segundo maior, paramos o laço com 'break'
    break;
  }
}

console.log(`Lista ordenada: ${numeros}`);

// 6. Verificamos se conseguimos encontrar um segundo maior valor
if (segundoMaior === null) {
  console.log("Não há um segundo maior valor diferente (todos os números são iguais).");
} else {
  console.log(`Maior: ${maior} | Segundo Maior: ${segundoMaior}`);
}
