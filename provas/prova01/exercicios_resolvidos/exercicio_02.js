/**
 * Exercício 2: Filtro de Números Ímpares
 * Objetivo: Contar quantos números em uma lista são ímpares.
 */

// 1. Lista de números para teste
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// 2. Iniciamos um contador em zero
let contadorImpares = 0;

// 3. Percorremos toda a lista de números
for (let i = 0; i < numeros.length; i++) {
  // 4. Verificamos se o número atual é ímpar usando o operador de resto (%)
  // Se o resto da divisão por 2 for diferente de zero, o número é ímpar
  if (numeros[i] % 2 !== 0) {
    // Se for ímpar, incrementamos o contador
    contadorImpares++;
  }
}

// 5. Exibimos a quantidade total encontrada
console.log(`Quantidade de números ímpares: ${contadorImpares}`);
