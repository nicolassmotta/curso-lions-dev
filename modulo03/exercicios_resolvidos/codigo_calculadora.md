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

# Gabarito: Lógica e Validação (Projeto Calculadora)

**Lista:** `modulo03/lista_de_exercicios/codigo_calculadora.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

// 1
function somar(a, b) {
  return a + b;
}

// 2
function dividir(a, b) {
  return a / b;
}

// 3
let n = Number(prompt("Digite um número: "));
console.log(n + 1);

// 4
let x = Number("abc");
console.log(isNaN(x)); // true

// 5
let y = Number("42");
console.log(isNaN(y)); // false

// 6
let valor = Number(prompt("Digite um valor: "));
if (isNaN(valor)) {
  console.log("Entrada inválida");
}

// 7
let op = prompt("Opção: ");
switch (op) {
  case "1":
    console.log("Opção 1");
    break;
  case "2":
    console.log("Opção 2");
    break;
  default:
    console.log("Opção inválida");
}

// 8
let opcao = prompt("Opção (0 para sair): ");
while (opcao !== "0") {
  console.log("Você escolheu:", opcao);
  opcao = prompt("Opção (0 para sair): ");
}

// 9
let b = 0;
if (b === 0) {
  console.log("Não é possível dividir por zero");
}

// 10
console.log("1) Somar\n2) Subtrair\n3) Multiplicar\n4) Dividir");
```

> No item 3, sem o `Number()`, o `prompt` devolve texto e `"5" + 1` vira `"51"`. No item 8, o `prompt` precisa estar **dentro** do `while`, senão a condição nunca muda.

---

## Parte 1

### 1. Validador de Número

```js
if (isNaN(numero)) {
```

### 2. Operação por Switch

```js
function calcular(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Não é possível dividir por zero";
      }
      return a / b;
    default:
      return "Operação inválida";
  }
}

console.log(calcular("*", 3, 4)); // 12
```

> Como cada `case` termina em `return`, o `break` não é necessário: o `return` já sai da função.

---

## Parte 2

### 3. Divisão perigosa

Em JavaScript, dividir por zero não dá erro: o resultado é `Infinity`. Por isso a regra precisa ser tratada com um `if` antes da conta.

```js
function dividir(a, b) {
  if (b === 0) {
    return "Não é possível dividir por zero";
  }
  return a / b;
}

console.log(dividir(10, 0)); // Não é possível dividir por zero
console.log(dividir(10, 2)); // 5
```

### 4. Menu que nunca sai

O `prompt` roda uma vez só, **antes** do laço. Dentro do `while`, `opcao` nunca muda, então a condição `opcao !== "0"` fica verdadeira para sempre (laço infinito). A correção é pedir a opção de novo no fim de cada volta:

```js
let opcao = prompt("Opção (0 para sair): ");
while (opcao !== "0") {
  console.log("Você escolheu:", opcao);
  opcao = prompt("Opção (0 para sair): ");
}
console.log("Programa encerrado.");
```

---

## Parte 3

| Linha | Saída | Por quê |
| ----- | ----- | ------- |
| (a) | `15` | os dois textos viram número antes da soma |
| (b) | `false` | `Number("10")` é o número 10, então **não** é NaN |
| (c) | `true` | `"dez"` não é um número válido, `Number` devolve `NaN` |
| (d) | `Infinity` | divisão por zero não quebra o programa, gera `Infinity` |
| (e) | `4.140000000000001` | `Number` aceita ponto decimal, mas o computador guarda decimais de forma aproximada |

> **Pegadinha do item (e):** em quase toda linguagem, contas com decimais têm pequenas imprecisões (`0.1 + 0.2` dá `0.30000000000000004`). Para exibir, arredonde com `.toFixed(2)`: `(Number("3.14") + 1).toFixed(2)` dá `"4.14"`.
>
> Atenção também: `Number("3,14")` (com vírgula) dá `NaN`. O JavaScript só entende o ponto.

---

## Parte 4

### 6. Calculadora Completa

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

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
  return a / b;
}

let opcao = "";

while (opcao !== "0") {
  console.log("\n1) Somar  2) Subtrair  3) Multiplicar  4) Dividir  0) Sair");
  opcao = prompt("Opção: ");

  if (opcao === "0") {
    console.log("Até logo!");
  } else if (opcao !== "1" && opcao !== "2" && opcao !== "3" && opcao !== "4") {
    console.log("Opção inválida!");
  } else {
    const num1 = Number(prompt("Número 1: "));
    const num2 = Number(prompt("Número 2: "));

    if (isNaN(num1) || isNaN(num2)) {
      console.log("Entrada inválida! Digite apenas números.");
    } else {
      switch (opcao) {
        case "1":
          console.log("Resultado:", somar(num1, num2));
          break;
        case "2":
          console.log("Resultado:", subtrair(num1, num2));
          break;
        case "3":
          console.log("Resultado:", multiplicar(num1, num2));
          break;
        case "4":
          if (num2 === 0) {
            console.log("Não é possível dividir por zero");
          } else {
            console.log("Resultado:", dividir(num1, num2));
          }
          break;
      }
    }
  }
}
```

> A opção é testada **antes** de pedir os números. Assim o programa não pede dois números à toa quando o usuário quer sair ou digitou uma opção que não existe.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Lógica e Validação (Projeto Calculadora) - Módulo 03</i>
</div>
