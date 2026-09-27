<style>
  :root {
    --ld-preto: #000000;
    --ld-branco: #FFFFFF;
    --ld-laranja: #E16D34;
    --ld-laranja-suave: #FBEDE5;
    --ld-muted: #6B7280;
    --ld-bloco: #F7F7F8;
    --ld-codigo: #F0F0F2;
    --ld-borda: #E5E7EB;
  }

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); }
  h1, h2, h3, h4 { color: var(--ld-preto); font-weight: 700; }
  h1 { border-bottom: 3px solid var(--ld-laranja); padding-bottom: 10px; font-size: 26px; letter-spacing: -0.01em; }
  h2 { margin-top: 28px; padding-left: 12px; border-left: 4px solid var(--ld-laranja); }
  h3 { margin-top: 22px; }
  p, li { line-height: 1.65; font-size: 15px; }
  a { color: var(--ld-laranja); text-decoration: none; }
  a:hover { text-decoration: underline; }
  strong { color: var(--ld-preto); }
  hr { border: 0; border-top: 2px solid rgba(225, 109, 52, 0.35); margin: 26px 0; }
  blockquote { background-color: var(--ld-bloco); border-left: 4px solid var(--ld-laranja); padding: 12px 16px; margin: 16px 0; color: var(--ld-preto); border-radius: 0 6px 6px 0; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--ld-borda); }
  pre code { border: 0; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 10px 12px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 8px 12px; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
    .no-print { display: none; }
  }
</style>

# Gabarito: Funções e Switch

**Lista:** `modulo02/lista_de_exercicios/funcoes/codigo_funcoes.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
// 1
function ola() {
  return "Olá!";
}

// 2
function dobro(n) {
  return n * 2;
}

// 3
function soma(a, b) {
  return a + b;
}

// 4
function saudacao(nome) {
  return `Bem-vindo, ${nome}`;
}

// 5
const quadrado = (n) => n * n;

// 6
function ehPar(n) {
  return n % 2 === 0;
}

// 7
function maior(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

// 8
function mediaDeDois(a, b) {
  return (a + b) / 2;
}

// 9
function converterParaReal(valor) {
  return `R$ ${valor}`;
}

// 10
function diaDaSemana(numero) {
  switch (numero) {
    case 1:
      return "Segunda";
    case 2:
      return "Terça";
    case 3:
      return "Quarta";
    case 4:
      return "Quinta";
    case 5:
      return "Sexta";
    case 6:
      return "Sábado";
    case 7:
      return "Domingo";
    default:
      return "Dia inválido";
  }
}

console.log(ola(), dobro(4), soma(2, 3), saudacao("Ana"), quadrado(5));
console.log(ehPar(4), maior(3, 9), mediaDeDois(6, 8), converterParaReal(50), diaDaSemana(2));
```

> No item 10, o `return` dentro de cada `case` encerra a função, por isso o `break` não é necessário.

---

## Parte 1

**1.** `return numero * 2;`

**2.** ``return `Olá ${nome}, bem-vindo ao ${curso}!`;``

**3.** `const areaRetangulo = (base, altura) => base * altura;`

---

## Parte 2

**4. Função que não devolve nada.** A função imprime a soma, mas não a **retorna**. Toda função sem `return` devolve `undefined`, que é o valor guardado em `resultado`.

```js
function soma(a, b) {
  return a + b;
}

let resultado = soma(2, 3);
console.log("Resultado:", resultado); // Resultado: 5
```

**5. Switch sem freio.** Sem `break`, a execução "cai" nos `case` seguintes até o `default`, que sobrescreve `nome` com "Dia inválido".

```js
function nomeDoDia(dia) {
  let nome;
  switch (dia) {
    case 1:
      nome = "Domingo";
      break;
    case 2:
      nome = "Segunda";
      break;
    case 3:
      nome = "Terça";
      break;
    default:
      nome = "Dia inválido";
  }
  return nome;
}

console.log(nomeDoDia(2)); // Segunda
```

---

## Parte 3

```
Início
25
x vale 25
Fim
```

`quadrado(3) + quadrado(4)` é `9 + 16`. As linhas aparecem na ordem em que o código é executado.

---

## Parte 4

**7 e 8. Funções matemáticas e calculadora**

```js
function somar(a, b) {
  return a + b;
}

function subtrair(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) {
    return "Erro: divisão por zero";
  }
  return a / b;
}

function calculadora(operacao, num1, num2) {
  switch (operacao) {
    case "+":
      return somar(num1, num2);
    case "-":
      return subtrair(num1, num2);
    case "*":
      return multiplicar(num1, num2);
    case "/":
      return dividir(num1, num2);
    default:
      return "Operação inválida";
  }
}

console.log(calculadora("+", 4, 6)); // 10
console.log(calculadora("*", 5, 2)); // 10
console.log(calculadora("/", 8, 0)); // Erro: divisão por zero
console.log(calculadora("%", 4, 2)); // Operação inválida
```

Versão com entrada pelo terminal:

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

let operacao = prompt("Operação (+, -, *, /): ");
let num1 = Number(prompt("Primeiro número: "));
let num2 = Number(prompt("Segundo número: "));

console.log("Resultado:", calculadora(operacao, num1, num2));
```

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Funções e Switch - Módulo 02</i>
</div>
