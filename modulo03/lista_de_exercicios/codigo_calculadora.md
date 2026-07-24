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

# Lista de Código: Lógica e Validação (Projeto Calculadora)

**Turma:** LionsDev  
**Tópicos:** funções, `switch`, laço `while`, menu interativo, validação de entrada com `Number()` e `isNaN()`, e regras de negócio (divisão por zero).

> Nesta lista você monta, pedaço por pedaço, uma calculadora de terminal. Comece com `import promptSync from "prompt-sync"; const prompt = promptSync();`. No fim, os pedaços viram um programa só.

---

## Parte 0 — Treino rápido (aquecimento)

Comece pelas peças soltas: uma função aqui, uma validação ali.

1. Escreva `somar(a, b)` que retorna `a + b`.
2. Escreva `dividir(a, b)` que retorna `a / b`.
3. Peça um número com `prompt`, converta com `Number()` e imprima ele somado a 1.
4. Crie `let x = Number("abc")` e imprima `isNaN(x)` (deve dar `true`).
5. Crie `let y = Number("42")` e imprima `isNaN(y)` (deve dar `false`).
6. Escreva um `if` que imprime **"Entrada inválida"** quando `isNaN(valor)` for `true`.
7. Escreva um `switch` sobre a variável `op` com casos `"1"`, `"2"` e `default`.
8. Escreva um `while` que repete enquanto `opcao !== "0"`.
9. Escreva um `if` que imprime **"Não é possível dividir por zero"** quando `b === 0`.
10. Imprima um menu com 4 opções usando um único `console.log` e `\n`.

---

## Parte 1 — Complete o código

### 1. Validador de Número
Complete a validação seguindo o fluxo: capturar → converter → testar.

```js
let entrada = prompt("Digite um número: ");
let numero = Number(entrada);

if (/* TODO: testar se NÃO é um número */) {
  console.log("Entrada inválida!");
} else {
  console.log("Número válido:", numero);
}
// "abc" -> Entrada inválida!  |  "15" -> Número válido: 15
```

### 2. Operação por Switch
Complete os casos para executar a operação escolhida.

```js
function calcular(op, a, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      // TODO
    case "*":
      // TODO
    case "/":
      // TODO (cuidado com b === 0)
    default:
      return "Operação inválida";
  }
}
console.log(calcular("*", 3, 4)); // 12
```

---

## Parte 2 — Ache o bug

### 3. Divisão perigosa
Esta função retorna `Infinity` quando o segundo número é zero, em vez de avisar o usuário. Conserte.

```js
function dividir(a, b) {
  return a / b;  // BUG: falta tratar b === 0
}
console.log(dividir(10, 0)); // Esperado: "Não é possível dividir por zero"
```

### 4. Menu que nunca sai
Este `while` deveria encerrar quando o usuário digita `0`, mas roda pra sempre. Encontre o erro.

```js
let opcao = prompt("Opção (0 para sair): ");
while (opcao !== "0") {
  console.log("Você escolheu:", opcao);
  // BUG: falta algo aqui
}
console.log("Programa encerrado.");
```

---

## Parte 3 — Prever a saída

### 5. O que acontece?
Sem rodar, diga a saída de cada linha.

```js
console.log(Number("10") + Number("5")); // (a)
console.log(isNaN(Number("10")));        // (b)
console.log(isNaN(Number("dez")));       // (c)
console.log(10 / 0);                      // (d)
console.log(typeof Number("3.14"));       // (e)
```

---

## Parte 4 — Escreva do zero

### 6. Calculadora Completa (Desafio)
Junte tudo. Escreva uma calculadora de terminal que:

1. Mostra um menu: `1) Somar  2) Subtrair  3) Multiplicar  4) Dividir  0) Sair`.
2. Repete com `while` até o usuário digitar `0`.
3. Pede dois números e valida cada um com `Number()` + `isNaN()` (se inválido, avisa e volta ao menu).
4. Usa `switch` para chamar a função da operação escolhida.
5. Na divisão, se o segundo número for `0`, avisa e não calcula.
6. Imprime o resultado e volta ao menu.

```
Exemplo:
  Opção: 1
  Número 1: 10
  Número 2: 5
  -> Resultado: 15
  Opção: 4
  Número 1: 8
  Número 2: 0
  -> Não é possível dividir por zero
  Opção: 0
  -> Até logo!
```

---

> **Dica:** a validação segue sempre o mesmo caminho: pegue a string do `prompt`, converta com `Number()`, teste com `if (isNaN(valor))`. A divisão por zero é regra de negócio à parte, o `isNaN` não pega ela, você trata com um `if` próprio.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Lógica e Validação - Módulo 03</i>
</div>
