/**
 * Exercício 3: Descobrir o Menor Valor
 * Objetivo: Identificar o menor número presente em uma lista.
 */

// 1. Lista de números para teste
const numeros = [42, 10, 5, 88, 3, 27];

// 2. Assumimos que o primeiro número é o menor inicialmente (nossa "aposta" inicial)
let menorValor = numeros[0];

// 3. Percorremos a lista a partir do segundo elemento (índice 1)
for (let i = 1; i < numeros.length; i++) {
  // 4. Se o número atual for menor do que o nosso menorValor guardado...
  if (numeros[i] < menorValor) {
    // ...atualizamos o menorValor com esse novo número encontrado
    menorValor = numeros[i];
  }
}

// 5. Após percorrer tudo, o menorValor conterá o menor número da lista
console.log(`O menor valor da lista é: ${menorValor}`);
