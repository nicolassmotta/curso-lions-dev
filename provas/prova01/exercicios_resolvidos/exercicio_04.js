/**
 * Exercício 4: Contar Consoantes
 * Objetivo: Contar quantas consoantes existem em uma string.
 */

const texto = "Programacao em Javascript";

// 1. Definimos quais são as vogais (incluindo as acentuadas) para facilitar a filtragem
const vogais = "aeiou";

let contadorConsoantes = 0;

// 2. Convertemos o texto para minúsculas para padronizar a comparação
const textoLimpo = texto.toLowerCase();

// 3. Percorremos cada caractere da string (strings funcionam como arrays de letras)
for (let i = 0; i < textoLimpo.length; i++) {
  const char = textoLimpo[i];

  // 4. Primeiro, verificamos se o caractere é uma letra de 'a' a 'z'
  // Isso evita contar espaços, números ou símbolos como consoantes
  if (char >= "a" && char <= "z") {
    // 5. Se for letra, verificamos se ela NÃO está na lista de vogais
    if (!vogais.includes(char)) {
      // Se for letra e não for vogal, é consoante
      contadorConsoantes++;
    }
  }
}

console.log(`Texto: "${texto}"`);
console.log(`Quantidade de consoantes: ${contadorConsoantes}`);
