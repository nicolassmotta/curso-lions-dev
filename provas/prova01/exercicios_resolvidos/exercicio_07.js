/**
 * Exercício 7: Elementos Únicos (Remover Duplicatas)
 * Objetivo: Criar uma lista sem valores repetidos.
 */

const numeros = [1, 2, 2, 3, 4, 4, 5, 1, 6];

// 1. Criamos um array vazio para guardar apenas os números únicos
const listaUnicos = [];

// 2. Percorremos a lista original
for (let i = 0; i < numeros.length; i++) {
  // 3. Verificamos se o número atual já NÃO existe na nossa lista de únicos
  // O método .includes() retorna verdadeiro se o item já estiver lá
  if (!listaUnicos.includes(numeros[i])) {
    // 4. Se ele não estiver lá (for a primeira vez que o vemos), nós o adicionamos
    listaUnicos.push(numeros[i]);
  }
}

console.log(`Lista original: ${numeros}`);
console.log(`Lista de únicos: ${listaUnicos}`);
