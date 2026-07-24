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

# Lista de Código: Variáveis, Tipos e Entrada de Dados

**Turma:** LionsDev  
**Tópicos:** `let`/`const`, tipos de dados (string, number, boolean), operadores matemáticos, template strings, `prompt-sync` e conversão com `Number()`.

> Nesta lista você escreve código de verdade, não só pensa nele. Cada item mostra o que preencher e a saída certa pra conferir. Crie um arquivo `.js`, resolva um de cada vez e rode no Node. Nos que pedem entrada, comece com `import promptSync from "prompt-sync"; const prompt = promptSync();`.
> ```js
> import promptSync from "prompt-sync";
> const prompt = promptSync();
> ```

---

## Parte 0 — Treino rápido (aquecimento)

Comece por aqui. Cada item sai em duas ou três linhas num arquivo `treino.js`.

1. Crie uma **variável** `nome` com o seu nome e imprima ela no console.
2. Crie `idade = 20` e imprima **"Tenho 20 anos"** usando **template string** (crase).
3. Crie `a = 7` e `b = 3` e imprima a **soma** dos dois.
4. Imprima o **resto** da divisão de `10` por `3` (operador `%`).
5. Crie `preco = 100` e imprima o preço com **10% de desconto**.
6. Crie a string `"15"`, **converta para número** e some 5 (resultado 20).
7. Crie `const PI = 3.14` e imprima a **área** de um círculo de raio `2` (`PI * raio * raio`).
8. Imprima o `typeof` de `true` e o de `"oi"`.
9. Peça um número com `prompt` e imprima o **dobro** dele (lembre do `Number()`).
10. Crie `temperatura = 25` e imprima **"Hoje faz 25 graus"** com template string.

---

## Parte 1 — Complete o código

### 1. Cadastro de Aluno
Complete as declarações para que a saída seja exatamente a do comentário.

```js
// TODO: declare as variáveis abaixo
let nome = /* ... */;      // "Ana"
let idade = /* ... */;     // 22
const curso = /* ... */;   // "LionsDev"

console.log(`${nome} tem ${idade} anos e estuda no ${curso}.`);
// Saída esperada: Ana tem 22 anos e estuda no LionsDev.
```

### 2. Área do Terreno
O cálculo está faltando. Complete a linha do `TODO`.

```js
const largura = 8;
const comprimento = 5;

// TODO: calcule a área (largura vezes comprimento)
let area = /* ... */;

console.log(`A área do terreno é ${area} m².`);
// Saída esperada: A área do terreno é 40 m².
```

### 3. Conversão de Temperatura
Peça a temperatura em Celsius pelo terminal e converta para Fahrenheit usando a fórmula `F = C * 1.8 + 32`.

```js
let celsius = prompt("Digite a temperatura em Celsius: ");
// TODO: converta 'celsius' para número e calcule 'fahrenheit'
let fahrenheit = /* ... */;

console.log(`${celsius}°C equivalem a ${fahrenheit}°F.`);
// Exemplo: entrada 25  ->  25°C equivalem a 77°F.
```

---

## Parte 2 — Ache o bug

### 4. Soma que não soma
O programa deveria somar dois números digitados, mas está "grudando" eles (ex.: digita 10 e 5 e aparece 105). Explique o motivo e conserte.

```js
let a = prompt("Primeiro número: ");
let b = prompt("Segundo número: ");

let soma = a + b; // BUG está aqui
console.log("A soma é: " + soma);
// Esperado: entrada 10 e 5  ->  A soma é: 15
```

### 5. Constante teimosa
Este código quebra ao rodar. Aponte a linha do erro e corrija mantendo o resultado.

```js
const saldo = 100;
saldo = saldo + 50; // erro acontece aqui
console.log("Novo saldo:", saldo); // Esperado: Novo saldo: 150
```

---

## Parte 3 — Prever a saída

### 6. O que aparece no console?
Sem rodar, escreva o que cada `console.log` imprime. Depois rode para conferir.

```js
let x = 10;
let y = "10";

console.log(x + 5);        // (a)
console.log(y + 5);        // (b)
console.log(typeof x);     // (c)
console.log(typeof y);     // (d)
console.log(Number(y) + 5);// (e)
```

---

## Parte 4 — Escreva do zero

### 7. Calculadora de Gorjeta
Peça ao usuário o valor da conta e a porcentagem de gorjeta. Calcule o valor da gorjeta e o total a pagar (conta + gorjeta). Lembre-se de converter as entradas com `Number()`.

```
Exemplo:
  Valor da conta: 200
  Gorjeta (%): 10
  -> Gorjeta: R$ 20
  -> Total a pagar: R$ 220
```

### 8. Ficha do Personagem (Desafio)
Peça nome, classe (ex.: "Guerreiro") e nível (número). Crie a variável `pontosDeVida` valendo `nivel * 20`. Ao final, imprima uma ficha assim:

```
Exemplo:
  Nome: Kael
  Classe: Guerreiro
  Nível: 3
  -> [Kael] Guerreiro Nv.3 | HP: 60
```

---

> **Dica:** tudo que vem do `prompt-sync` chega como texto. Antes de fazer conta, converta com `Number()` (ou `parseInt`/`parseFloat`), senão `"10" + 5` vira `"105"`. Vá imprimindo com `console.log` no meio do caminho pra ver o valor das variáveis enquanto resolve.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Variáveis, Tipos e Entrada de Dados - Módulo 02</i>
</div>
