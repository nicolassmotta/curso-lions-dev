/*
 * ===================================================================
 * MÓDULO 02: FUNDAMENTOS DE PROGRAMAÇÃO
 * Arrays são um dos tipos de dados mais poderosos em JavaScript.
 * Além de armazenar uma lista (ex: `const lista = [1, 2, 3]`),
 * eles vêm com "métodos" (funções) embutidos para nos ajudar
 * a manipular esses dados.
 */

// --- 1. Métodos que MODIFICAM o Array Original (Mutação) ---

console.log("--- 1. Métodos de Mutação (push, pop, unshift, shift) ---");
const frutas = ["Maçã", "Banana", "Laranja"];
console.log("Array original:", frutas);

// .push(): Adiciona um item no FINAL do array.
frutas.push("Uva");
console.log("Depois do .push('Uva'):", frutas); // [ "Maçã", "Banana", "Laranja", "Uva" ]

// .pop(): Remove o ÚLTIMO item do array (e o retorna).
const frutaRemovidaDoFinal = frutas.pop();
console.log("Fruta removida do final:", frutaRemovidaDoFinal); // "Uva"
console.log("Depois do .pop():", frutas); // [ "Maçã", "Banana", "Laranja" ]

// .unshift(): Adiciona um item no INÍCIO do array.
frutas.unshift("Morango");
console.log("Depois do .unshift('Morango'):", frutas); // [ "Morango", "Maçã", "Banana", "Laranja" ]

// .shift(): Remove o PRIMEIRO item do array (e o retorna).
const frutaRemovidaDoInicio = frutas.shift();
console.log("Fruta removida do início:", frutaRemovidaDoInicio); // "Morango"
console.log("Depois do .shift():", frutas); // [ "Maçã", "Banana", "Laranja" ]

console.log("================================================");


// --- 2. Métodos que CRIAM um NOVO Array (Imutabilidade) ---
// Estes são os métodos funcionais. Eles NÃO modificam o array original.

console.log("--- 2. Métodos Funcionais (map, filter, reduce) ---");
const numeros = [10, 20, 30, 40, 50];
console.log("Array de números original:", numeros);

// .map(): TRANSFORMA o array.
// Ele cria um NOVO array com o resultado da função aplicada a cada item.
// Útil para "mapear" um array para outro.
const numerosDobrados = numeros.map(function(numero) {
    return numero * 2;
});
console.log("Array original NÃO mudou:", numeros);
console.log("Novo array com .map() (dobro):", numerosDobrados); // [20, 40, 60, 80, 100]

// .filter(): FILTRA o array.
// Ele cria um NOVO array SÓ com os itens que passam em um teste (retornam true).
const numerosMaioresQue25 = numeros.filter(function(numero) {
    // Se a condição for 'true', o item é incluído no novo array
    return numero > 25;
});
console.log("Array original NÃO mudou:", numeros);
console.log("Novo array com .filter() (> 25):", numerosMaioresQue25); // [30, 40, 50]

// .reduce(): REDUZ (ou "acumula") o array a um único valor.
// Ótimo para somar, multiplicar, ou agrupar dados.
//
// A função do reduce recebe dois argumentos principais:
// 1. 'acumulador': O valor total que está sendo construído (começa em 0).
// 2. 'valorAtual': O item do array (10, 20, 30...)
const somaTotal = numeros.reduce(function(acumulador, valorAtual) {
    return acumulador + valorAtual;
}, 0); // 0 é o valor inicial do 'acumulador'
console.log("Valor reduzido com .reduce() (soma):", somaTotal); // 150

console.log("================================================");


// --- 3. Métodos de Iteração e Busca ---

console.log("--- 3. Métodos de Iteração e Busca (forEach, find) ---");
console.log("Array de frutas:", frutas); // [ "Maçã", "Banana", "Laranja" ]

// .forEach(): Executa uma função para CADA item do array.
// É uma alternativa ao loop 'for' tradicional, mais limpa de ler.
// Não retorna nada (é 'undefined').
console.log("Testando .forEach():");
frutas.forEach(function(fruta, indice) {
    console.log(`Índice ${indice}: ${fruta}`);
});

// .find(): ENCONTRA o PRIMEIRO item que passa no teste.
// Retorna o item (ou 'undefined' se não achar).
const frutaEncontrada = frutas.find(function(fruta) {
    return fruta === "Banana";
});
console.log("Item encontrado com .find('Banana'):", frutaEncontrada); // "Banana"

const frutaNaoEncontrada = frutas.find(function(fruta) {
    return fruta === "Pera";
});
console.log("Item não encontrado com .find('Pera'):", frutaNaoEncontrada); // undefined