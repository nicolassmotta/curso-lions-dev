/**
 * Exercício 1: Somatório de Carrinho de Compras
 * Objetivo: Calcular a soma total e a média de uma lista de preços.
 */

// 1. Definimos o array com os preços dos produtos
const precos = [10.5, 25.0, 5.75, 40.0, 15.25];

// 2. Iniciamos a variável acumuladora para guardar a soma total
let somaTotal = 0;

// 3. Utilizamos o laço 'for' para percorrer cada item da lista
for (let i = 0; i < precos.length; i++) {
  // A cada volta, somamos o valor atual ao acumulador somaTotal
  somaTotal += precos[i];
}

// 4. Calculamos a média dividindo o total pela quantidade de itens (length)
const media = somaTotal / precos.length;

// 5. Exibimos os resultados formatados com duas casas decimais (.toFixed(2))
console.log(`Soma Total: R$ ${somaTotal.toFixed(2)}`);
console.log(`Média por produto: R$ ${media.toFixed(2)}`);
