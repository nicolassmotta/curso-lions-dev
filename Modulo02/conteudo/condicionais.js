/* * ESTRUTURAS CONDICIONAIS E OPERADORES LÓGICOS/DE COMPARAÇÃO EM JAVASCRIPT
 * Os operadores de comparação e lógicos são a base para construir
 * as condições (expressões que resultam em true ou false).
 */

// ===================================================================
// PARTE I: OPERADORES ESSENCIAIS (A ESPINHA DORSAL DAS CONDIÇÕES)
// ===================================================================

// -------------------------------------------------------------------
// 1. Operadores de Comparação (As "Setinhas" e Igualdades)
// -------------------------------------------------------------------

console.log("--- 1. Operadores de Comparação ---");

const numA = 10;
const numB = 5;
const textoA = "10";

// Maior que (>) e Menor que (<)
console.log(`10 > 5? ${numA > numB}`); // true
console.log(`10 < 5? ${numA < numB}`); // false

// Maior ou Igual (>=) e Menor ou Igual (<=)
console.log(`10 >= 10? ${numA >= 10}`); // true
console.log(`5 <= 10? ${numB <= numA}`); // true

// Igualdade Estrita (===) - PREFERENCIAL: Compara valor E tipo
console.log(`10 === 10? ${numA === 10}`); // true
console.log(`10 === "10"? ${numA === textoA}`); // false (Tipos diferentes: Number vs String)

// Igualdade Abstrata (==) - EVITAR: Compara apenas valor, tentando converter tipos
console.log(`10 == "10"? ${numA == textoA}`); // true (JS converte "10" para 10)

// Desigualdade Estrita (!==) - PREFERENCIAL: Compara valor E tipo
console.log(`10 !== 5? ${numA !== numB}`); // true
console.log(`10 !== "10"? ${numA !== textoA}`); // true (Tipos diferentes)

// Desigualdade Abstrata (!=) - EVITAR
console.log(`10 != 5? ${numA != numB}`); // true

console.log("-----------------------------------");

// -------------------------------------------------------------------
// 2. Operadores Lógicos (Juntando Múltiplas Condições)
// -------------------------------------------------------------------

console.log("\n--- 2. Operadores Lógicos ---");

const temDinheiro = true;
const temVisto = false;
const idadePermitida = 20;

// E (&& - AND): Só retorna TRUE se TODAS as condições forem TRUE
if (temDinheiro && idadePermitida >= 18) {
    console.log("AND (&&): Condição de compra aprovada (tem dinheiro E é maior de idade)."); // Executa
}

// OU (|| - OR): Retorna TRUE se PELO MENOS UMA das condições for TRUE
if (temDinheiro || temVisto) {
    console.log("OR (||): Pode viajar (tem dinheiro OU tem visto)."); // Executa (pois temDinheiro é true)
}

// NÃO (! - NOT): Inverte o valor booleano (true vira false e vice-versa)
if (!temVisto) { // !false resulta em true
    console.log("NOT (!): O visto NÃO foi emitido."); // Executa
}

console.log("-------------------------------");

// ===================================================================
// PARTE II: APLICAÇÃO DOS OPERADORES NAS ESTRUTURAS CONDICIONAIS
// ===================================================================

// Exemplo 4: if com Operadores Lógicos
const cargo = "Gerente";
const salario = 6000;

if ((cargo === "Gerente" || cargo === "Diretor") && salario > 5000) {
    console.log("\nEx. 4: Acesso de nível alto concedido."); // Executa
} else {
    console.log("\nEx. 4: Acesso de nível padrão.");
}

// Exemplo 5: switch com Agrupamento
const nivel = 'A';
let mensagemNivel;

switch (nivel) {
    case 'A':
    case 'B': // Agrupando A e B (funciona como um OR lógico)
        mensagemNivel = "Parabéns, seu nível é excelente!";
        break;
    case 'C':
        mensagemNivel = "Seu nível é bom, mas pode melhorar.";
        break;
    default:
        mensagemNivel = "Nível não reconhecido.";
}
console.log(`\nEx. 5: Avaliação do Nível ${nivel}: ${mensagemNivel}`); // Executa 'A'

// Exemplo 6: Operador Ternário com Operador Lógico
const isPremium = true;
const carrinhoVazio = false;

// Se for Premium OU o carrinho estiver vazio, o frete é grátis.
const frete = (isPremium || carrinhoVazio) ? "Grátis" : "R$ 15,00"; 

console.log(`\nEx. 6: Frete calculado: ${frete}`); // Grátis

// Exemplo 7: Curto-Circuito Lógico
/*
 * O JS avalia apenas o necessário. Se o primeiro operando já define o resultado, 
 * o segundo nem é avaliado.
 */

const usuarioAtivo = true;
let dados = {};

// Curto-Circuito com &&: Se usuarioAtivo é true, JS executa a segunda parte
usuarioAtivo && (dados = { nome: "Novo Usuário" });
console.log("\nEx. 7: Curto-Circuito (&&): Dados carregados:", dados); // Carrega os dados

const usuarioInativo = false;
// Curto-Circuito com ||: Se usuarioInativo é false, JS retorna a segunda parte
const valorFinal = usuarioInativo || 50; 
console.log("Ex. 7: Curto-Circuito (||): Valor Final:", valorFinal); // 50