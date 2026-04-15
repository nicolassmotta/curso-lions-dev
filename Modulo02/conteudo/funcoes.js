/*
 * ===================================================================
 * MÓDULO 02: FUNDAMENTOS DE PROGRAMAÇÃO
 * -------------------------------------------------------------------
 * Aula: Funções e Estrutura Switch/Case
 * ===================================================================
 *
 * Funções são um dos conceitos mais importantes da programação.
 * Elas nos permitem "empacotar" um bloco de código e reutilizá-lo
 * sempre que precisarmos, sem repetir o mesmo código várias vezes.
 *
 * Pense em uma função como uma RECEITA DE BOLO:
 * - Ela tem um nome (ex: "fazerBolo")
 * - Ela pode receber ingredientes (parâmetros)
 * - Ela faz um processo interno (corpo da função)
 * - Ela pode devolver um resultado (retorno)
 */

// ===================================================================
// PARTE I: FUNÇÕES
// ===================================================================

// -------------------------------------------------------------------
// 1. Declaração de Função (Function Declaration)
// -------------------------------------------------------------------

console.log("--- 1. Declaração de Função ---");

/*
 * Estrutura:
 *   function nomeDaFuncao(parametro1, parametro2) {
 *       // corpo da função (o que ela faz)
 *       return resultado; // o que ela devolve
 *   }
 */

// Exemplo 1: Função simples sem parâmetros
function saudacao() {
  console.log("Olá, bem-vindo ao curso Lions Dev!");
}

// Para "executar" a função, precisamos CHAMAR ela pelo nome:
saudacao(); // Executa e imprime a mensagem
saudacao(); // Podemos chamar quantas vezes quisermos!

console.log("-------------------------------");

// -------------------------------------------------------------------
// 2. Parâmetros e Argumentos
// -------------------------------------------------------------------

console.log("\n--- 2. Parâmetros e Argumentos ---");

/*
 * Parâmetros são as "variáveis" que a função ESPERA receber.
 * Argumentos são os VALORES que passamos quando chamamos a função.
 *
 * Parâmetro = variável na DEFINIÇÃO da função
 * Argumento = valor na CHAMADA da função
 */

// Exemplo 2: Função com parâmetros
function saudacaoPersonalizada(nome, curso) {
  console.log(`Olá, ${nome}! Bem-vindo ao ${curso}!`);
}

// Chamando com argumentos:
saudacaoPersonalizada("Maria", "Lions Dev"); // nome="Maria", curso="Lions Dev"
saudacaoPersonalizada("João", "Programação"); // nome="João", curso="Programação"

console.log("----------------------------------");

// -------------------------------------------------------------------
// 3. Retorno (return)
// -------------------------------------------------------------------

console.log("\n--- 3. Retorno (return) ---");

/*
 * O `return` faz a função DEVOLVER um valor.
 * Sem return, a função apenas executa ações (como console.log),
 * mas não "entrega" nenhum resultado para quem chamou.
 *
 * Com return, o resultado pode ser guardado em uma variável.
 */

// Exemplo 3: Função COM retorno
function somar(a, b) {
  return a + b; // Devolve o resultado da soma
}

// O valor retornado pode ser armazenado:
let resultado = somar(10, 5);
console.log("Resultado da soma:", resultado); // 15

// Ou usado diretamente:
console.log("Outra soma:", somar(100, 200)); // 300

// Exemplo 4: Função SEM retorno (retorna 'undefined')
function apenasImprime(mensagem) {
  console.log(mensagem);
  // Sem return → retorna undefined
}

let retorno = apenasImprime("Teste");
console.log("Retorno da função sem return:", retorno); // undefined

console.log("--------------------------");

// -------------------------------------------------------------------
// 4. Funções Anônimas (Expressão de Função)
// -------------------------------------------------------------------

console.log("\n--- 4. Funções Anônimas ---");

/*
 * Uma função anônima é uma função SEM NOME, guardada em uma variável.
 * É chamada "Expressão de Função" (Function Expression).
 */

// Exemplo 5: Função anônima armazenada em const
const multiplicar = function (a, b) {
  return a * b;
};

console.log("Multiplicação:", multiplicar(4, 5)); // 20

console.log("--------------------------");

// -------------------------------------------------------------------
// 5. Arrow Functions (Funções Seta) — ES6+
// -------------------------------------------------------------------

console.log("\n--- 5. Arrow Functions ---");

/*
 * Arrow Functions são uma forma mais CURTA de escrever funções.
 * Elas usam o símbolo => ("seta gorda" ou "fat arrow").
 *
 * Sintaxe:
 *   const nomeFuncao = (params) => { corpo };
 *
 * Se tiver apenas UMA expressão, podemos omitir as chaves e o return:
 *   const nomeFuncao = (params) => expressão;
 */

// Exemplo 6: Arrow Function completa
const dividir = (a, b) => {
  if (b === 0) {
    return "Erro: divisão por zero!";
  }
  return a / b;
};

console.log("Divisão:", dividir(20, 4)); // 5
console.log("Divisão:", dividir(10, 0)); // Erro

// Exemplo 7: Arrow Function simplificada (uma linha)
const dobrar = (n) => n * 2;
const triplicar = (n) => n * 3; // Se tem SÓ UM parâmetro, os () são opcionais

console.log("Dobro de 7:", dobrar(7)); // 14
console.log("Triplo de 5:", triplicar(5)); // 15

// Exemplo 8: Arrow Function como callback (muito usado com forEach, map, filter)
const numeros = [1, 2, 3, 4, 5];
numeros.forEach((num) => {
  console.log(`Número: ${num}, Quadrado: ${num * num}`);
});

console.log("-------------------------");

// -------------------------------------------------------------------
// 6. Escopo de Variáveis em Funções
// -------------------------------------------------------------------

console.log("\n--- 6. Escopo ---");

/*
 * Variáveis declaradas DENTRO de uma função só existem DENTRO dela.
 * Isso se chama "Escopo Local".
 *
 * Variáveis declaradas FORA de qualquer função são "Escopo Global"
 * e podem ser acessadas de qualquer lugar.
 */

let global = "Sou global"; // Acessível em todo lugar

function exemploEscopo() {
  let local = "Sou local"; // Só existe dentro desta função
  console.log(global); // ✅ Funciona
  console.log(local); // ✅ Funciona
}

exemploEscopo();
console.log(global); // ✅ Funciona
// console.log(local);        // ❌ ERRO: local is not defined

console.log("----------------");

// ===================================================================
// PARTE II: SWITCH/CASE
// ===================================================================

// -------------------------------------------------------------------
// 7. Estrutura Switch/Case
// -------------------------------------------------------------------

console.log("\n--- 7. Switch/Case ---");

/*
 * O switch é uma alternativa ao if/else quando precisamos
 * comparar UMA variável com MÚLTIPLOS valores fixos.
 *
 * É mais legível que vários if/else if encadeados.
 *
 * Estrutura:
 *   switch (expressão) {
 *       case valor1:
 *           // código
 *           break;
 *       case valor2:
 *           // código
 *           break;
 *       default:
 *           // código se nenhum case combinar
 *   }
 *
 * ⚠️ IMPORTANTE: O 'break' é OBRIGATÓRIO em cada case!
 * Sem ele, o código "cai" para o próximo case (fall-through).
 */

// Exemplo 9: Switch com dia da semana
const diaSemana = 3;
let nomeDia;

switch (diaSemana) {
  case 1:
    nomeDia = "Segunda-feira";
    break;
  case 2:
    nomeDia = "Terça-feira";
    break;
  case 3:
    nomeDia = "Quarta-feira";
    break;
  case 4:
    nomeDia = "Quinta-feira";
    break;
  case 5:
    nomeDia = "Sexta-feira";
    break;
  case 6:
    nomeDia = "Sábado";
    break;
  case 7:
    nomeDia = "Domingo";
    break;
  default:
    nomeDia = "Dia inválido";
}

console.log(`Dia ${diaSemana} = ${nomeDia}`); // Quarta-feira

// -------------------------------------------------------------------
// 8. Switch com Agrupamento de Cases
// -------------------------------------------------------------------

console.log("\n--- 8. Agrupamento de Cases ---");

/*
 * Podemos agrupar cases que compartilham o mesmo resultado.
 * Isso funciona como um OR lógico (||).
 */

// Exemplo 10: Categorias de dias
const dia = "Sábado";
let tipoDia;

switch (dia) {
  case "Segunda-feira":
  case "Terça-feira":
  case "Quarta-feira":
  case "Quinta-feira":
  case "Sexta-feira":
    tipoDia = "Dia útil";
    break;
  case "Sábado":
  case "Domingo":
    tipoDia = "Final de semana";
    break;
  default:
    tipoDia = "Dia inválido";
}

console.log(`${dia} é ${tipoDia}`); // Sábado é Final de semana

console.log("-----------------------------");

// ===================================================================
// PARTE III: COMBINANDO FUNÇÕES + SWITCH
// ===================================================================

// -------------------------------------------------------------------
// 9. Exemplo Prático: Mini Calculadora
// -------------------------------------------------------------------

console.log("\n--- 9. Mini Calculadora (Funções + Switch) ---");

/*
 * Neste exemplo, combinamos funções para cada operação matemática
 * com um switch para selecionar qual operação executar.
 *
 * Este é o mesmo conceito usado na calculadora completa
 * que vocês farão como exercício!
 */

function calcSomar(a, b) {
  return a + b;
}
function calcSubtrair(a, b) {
  return a - b;
}
function calcMultiplicar(a, b) {
  return a * b;
}
function calcDividir(a, b) {
  if (b === 0) return "Erro: divisão por zero";
  return a / b;
}

function calculadora(operacao, num1, num2) {
  let resultado;

  switch (operacao) {
    case "+":
      resultado = calcSomar(num1, num2);
      break;
    case "-":
      resultado = calcSubtrair(num1, num2);
      break;
    case "*":
      resultado = calcMultiplicar(num1, num2);
      break;
    case "/":
      resultado = calcDividir(num1, num2);
      break;
    default:
      resultado = "Operação não reconhecida";
  }

  return resultado;
}

console.log("10 + 5 =", calculadora("+", 10, 5)); // 15
console.log("10 - 3 =", calculadora("-", 10, 3)); // 7
console.log("4 * 8 =", calculadora("*", 4, 8)); // 32
console.log("20 / 4 =", calculadora("/", 20, 4)); // 5
console.log("? =", calculadora("%", 10, 5)); // Operação não reconhecida

console.log("-------------------------------------------");

// -------------------------------------------------------------------
// 10. Resumo
// -------------------------------------------------------------------

/*
 * ┌───────────────────────┬──────────────────────────────────────────┐
 * │ Conceito              │ Descrição                                │
 * ├───────────────────────┼──────────────────────────────────────────┤
 * │ function              │ Declara uma função nomeada               │
 * │ Parâmetros            │ Variáveis que a função recebe            │
 * │ return                │ Devolve um valor para quem chamou        │
 * │ Função anônima        │ Função sem nome, guardada em variável    │
 * │ Arrow function (=>)   │ Sintaxe curta para funções               │
 * │ Escopo                │ Onde uma variável pode ser acessada      │
 * │ switch/case           │ Alternativa ao if/else para múltiplos    │
 * │                       │ valores fixos                            │
 * │ break                 │ Para a execução dentro de um case        │
 * │ default               │ Executado quando nenhum case combina     │
 * └───────────────────────┴──────────────────────────────────────────┘
 */

console.log("\n================================================");
console.log("Fim do conteúdo: Funções e Switch/Case");
console.log("================================================");
