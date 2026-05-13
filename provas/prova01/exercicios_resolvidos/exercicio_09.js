/**
 * Exercício 9: Verificar Anagrama
 * Objetivo: Descobrir se duas palavras possuem as mesmas letras em ordens diferentes.
 */

const palavra1 = "Roma";
const palavra2 = "Amor";

// 1. Criamos uma função auxiliar para padronizar as palavras
function formatarPalavra(str) {
  return str
    .toLowerCase() // Transforma em minúsculas
    .split("") // Transforma a string em um array de letras: "amor" -> ["a", "m", "o", "r"]
    .sort() // Coloca o array em ordem alfabética: ["a", "m", "o", "r"]
    .join(""); // Junta o array de volta em uma string: "amor"
}

// 2. Comparamos as palavras formatadas. Se forem iguais, são anagramas.
if (formatarPalavra(palavra1) === formatarPalavra(palavra2)) {
  console.log(`"${palavra1}" e "${palavra2}" são anagramas!`);
} else {
  console.log(`"${palavra1}" e "${palavra2}" NÃO são anagramas.`);
}
