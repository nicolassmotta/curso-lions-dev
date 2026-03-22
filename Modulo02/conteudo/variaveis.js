// ======================================================
// 1️⃣ O que é uma variável?
// ======================================================
//
// Uma variável é como uma "caixinha" onde guardamos valores
// temporários na memória do computador. Esses valores podem
// ser lidos, alterados e usados em operações.
//
// Exemplo simples:

let nome = "Nicolas";
let idade = 20;

console.log("Nome:", nome);
console.log("Idade:", idade);

// Cada variável tem:
// - um NOME (identificador)
// - um TIPO (string, number, boolean, etc.)
// - um VALOR (dados armazenados)


// ======================================================
// 2️⃣ Tipos de declaração de variáveis
// ======================================================
//
// Em JavaScript, podemos declarar variáveis de três formas:
// - var → forma antiga, escopo global ou de função
// - let → forma moderna, escopo de bloco
// - const → valor constante, não pode ser alterado
//
// Exemplos:

var antiga = "Sou global e problemática";
let moderna = "Sou moderna e segura";
const constante = "Meu valor não muda";

console.log(antiga);
console.log(moderna);
console.log(constante);

// ⚠️ 'var' deve ser evitada em novos códigos,
// pois pode causar comportamentos inesperados.
// 'let' e 'const' são mais previsíveis.


// ======================================================
// 3️⃣ Diferença entre var, let e const na prática
// ======================================================

if (true) {
  var exemploVar = "var existe fora do bloco";
  let exemploLet = "let existe só dentro do bloco";
  const exemploConst = "const também existe só dentro do bloco";

  console.log("Dentro do bloco:", exemploVar);
  console.log("Dentro do bloco:", exemploLet);
  console.log("Dentro do bloco:", exemploConst);
}

console.log("Fora do bloco:", exemploVar);
// console.log(exemploLet);  // ❌ erro: não acessível
// console.log(exemploConst); // ❌ erro: não acessível


// ======================================================
// 4️⃣ Tipos de dados em JavaScript
// ======================================================
//
// JavaScript é uma linguagem de tipagem dinâmica,
// ou seja, o tipo de uma variável é determinado
// automaticamente conforme o valor atribuído.
//
// Principais tipos primitivos:

let texto = "Olá, mundo!";     // string
let numeroInteiro = 10;        // number
let numeroDecimal = 3.14;      // number (float)
let ligado = true;             // boolean
let desligado = false;         // boolean
let nulo = null;               // valor nulo
let indefinido;                // undefined (não inicializado)

console.log(typeof texto, typeof numeroInteiro, typeof ligado);


// ======================================================
// 5️⃣ Strings e concatenação
// ======================================================
//
// Strings são textos. Podemos unir textos com o operador +
// (concatenação) ou usando template strings com crases (` `).

let nomeAluno = "Maria";
let curso = "Lions Dev";

// Concatenando com +
let mensagem = "Olá, " + nomeAluno + "! Bem-vinda ao curso " + curso + ".";
console.log(mensagem);

// Usando template string
let mensagem2 = `Olá, ${nomeAluno}! Bem-vinda ao curso ${curso}.`;
console.log(mensagem2);


// ======================================================
// 6️⃣ Convenções de nomenclatura
// ======================================================
//
// Nomear variáveis bem é essencial!
//
// Boas práticas:
// ✅ usar nomes descritivos
// ✅ evitar abreviações confusas
// ✅ seguir um padrão de escrita

// camelCase → padrão mais usado em JavaScript
let nomeCompleto = "João da Silva";

// PascalCase → usado em classes e construtores
let NomeCompleto = "Maria Oliveira";

// snake_case → comum em outras linguagens
let nome_completo = "José Pereira";


// ======================================================
// 7️⃣ Exemplo prático completo
// ======================================================
//
// Vamos criar um pequeno programa que calcula a média de 3 notas.
//

let nota1 = 8;
let nota2 = 7.5;
let nota3 = 9;

let soma = nota1 + nota2 + nota3;
let media = soma / 3;

console.log(`A média das notas é: ${media.toFixed(2)}`);


// ======================================================
// 8️⃣ Curiosidades e boas práticas
// ======================================================
//
// - Use nomes em português apenas em exercícios simples.
// - Em projetos reais, adote inglês para manter padrão global.
// - Prefira const sempre que o valor não for mudar.
// - Evite redeclarar variáveis (erro comum com var).
// - Use o comando typeof para verificar o tipo.
//
// Exemplo:
const PI = 3.14159;
console.log(`O valor de PI é ${PI} (${typeof PI})`);
