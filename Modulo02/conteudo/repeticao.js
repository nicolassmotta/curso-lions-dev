/* * ESTRUTURAS DE REPETIÇÃO (LOOPS) EM JAVASCRIPT
 * Permitem que um bloco de código seja executado múltiplas vezes.
 */

// -------------------------------------------------------------------
// 1. Loop 'for' (O mais comum: Contador com início, condição e incremento)
// -------------------------------------------------------------------

console.log("--- 1. Loop 'for' (Contador) ---");

/* Estrutura: for (inicialização; condição; incremento) { ... } */

// Exemplo 1: Contagem simples de 0 a 4
for (let i = 0; i < 5; i++) {
    console.log(`Ex. 1: Contador: ${i}`);
}

// Exemplo 2: Contagem regressiva de 10 a 5
for (let j = 10; j >= 5; j--) {
    console.log(`Ex. 2: Regressiva: ${j}`);
}

console.log("---------------------------------");

// -------------------------------------------------------------------
// 2. Loop 'while' (Repete ENQUANTO a condição for TRUE)
// -------------------------------------------------------------------

console.log("\n--- 2. Loop 'while' (Condicional) ---");

// Exemplo 3: Repetir até que uma condição externa mude
let k = 0;
while (k < 3) {
    console.log(`Ex. 3: Repetição while: ${k}`);
    k++; // O incremento deve estar DENTRO do corpo do loop!
}

// CUIDADO: Se a condição nunca for falsa, o loop é infinito!

console.log("-------------------------------------");

// -------------------------------------------------------------------
// 3. Loop 'do...while' (Executa no mínimo UMA vez)
// -------------------------------------------------------------------

console.log("\n--- 3. Loop 'do...while' (Garantido 1x) ---");

// Exemplo 4: A condição é verificada APÓS a primeira execução.
let l = 10;
do {
    // Este bloco executa pelo menos uma vez, mesmo que l já seja >= 5
    console.log(`Ex. 4: Repetição do...while: ${l}`); 
    l++;
} while (l < 5); // Condição Falsa na primeira verificação (10 < 5 é false)

console.log("-------------------------------------------");

// -------------------------------------------------------------------
// 4. Loops de Iteração (Para Arrays e Objetos)
// -------------------------------------------------------------------

console.log("\n--- 4. Loops de Iteração ---");

const frutas = ["Maçã", "Banana", "Morango"];
const carro = { marca: "Fiat", modelo: "Uno", ano: 2010 };

// Exemplo 5: for...of (Itera sobre VALORES de iteráveis - Arrays, Strings, etc.)
// Ideal para obter o valor de cada item de um Array.
for (const fruta of frutas) {
    console.log(`Ex. 5 (for...of): Fruta: ${fruta}`);
}

// Exemplo 6: for...in (Itera sobre PROPRIEDADES (chaves/índices) de Objetos)
// Ideal para percorrer as chaves de um Objeto.
for (const chave in carro) {
    console.log(`Ex. 6 (for...in): Chave: ${chave}, Valor: ${carro[chave]}`);
}

// Exemplo 7: O método forEach() (Alto nível, exclusivo de Arrays)
// A forma preferida de iterar sobre Arrays no JS moderno.
frutas.forEach((item, index) => {
    console.log(`Ex. 7 (forEach): Item: ${item} no índice ${index}`);
});

console.log("----------------------------");

// -------------------------------------------------------------------
// 5. Comandos de Controle de Loop (break e continue)
// -------------------------------------------------------------------

console.log("\n--- 5. Comandos de Controle ---");

// Exemplo 8: 'break' (Sai imediatamente do loop)
for (let x = 0; x < 10; x++) {
    if (x === 5) {
        console.log("Ex. 8: O loop foi interrompido no número 5 (break).");
        break; 
    }
    console.log(`Ex. 8: Processando: ${x}`);
}

// Exemplo 9: 'continue' (Pula a iteração atual e vai para a próxima)
for (let y = 0; y < 10; y++) {
    if (y % 2 === 0) { // Se y for par
        continue; // Pula a iteração, o console.log abaixo não é executado
    }
    console.log(`Ex. 9: Número ímpar: ${y}`); // Só mostra números ímpares
}

console.log("-------------------------------");