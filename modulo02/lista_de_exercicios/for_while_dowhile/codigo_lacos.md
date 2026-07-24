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

# Lista de Código: Laços de Repetição

**Turma:** LionsDev  
**Tópicos:** `for`, `while`, `do...while`, `for...of`, incremento/decremento, acumuladores e contadores.

> Nesta lista você escreve o código. Cada item mostra o que preencher e a saída certa. Rode no Node e compare.

---

## Parte 0 — Treino rápido (aquecimento)

Antes dos exercícios maiores, pegue o jeito dos laços. Cada item é curtinho.

1. Use `for` para imprimir os números de 1 a 5.
2. Use `for` para imprimir os números de 10 a 1 (regressiva).
3. Use `for` para imprimir os números **pares** de 0 a 10.
4. Use `for` para imprimir a **tabuada** do 3 (`3 x 1` até `3 x 10`).
5. Use `for` para **somar** os números de 1 a 10 e imprimir o total (55).
6. Use `while` para imprimir os números de 1 a 5.
7. Use `while` para imprimir a contagem **regressiva** de 3 até 1 e depois **"Já!"**.
8. Use `for` para imprimir **"LionsDev"** 3 vezes.
9. Use `for` para imprimir os números de 1 a 20, mas só os **múltiplos de 5**.
10. Use `do...while` para imprimir **"Rodou"** uma vez, mesmo com a condição `false`.

---

## Parte 1 — Complete o código

### 1. Contagem de 1 a 10
Complete o cabeçalho do `for` para imprimir os números de 1 até 10.

```js
for (let i = /* ? */; i /* ? */ 10; i/* ? */) {
  console.log(i);
}
// Saída esperada: 1, 2, 3, ... 10 (um por linha)
```

### 2. Soma dos Números
Complete o acumulador para somar todos os números de 1 a 100.

```js
let soma = 0;

for (let i = 1; i <= 100; i++) {
  // TODO: acumule 'i' em 'soma'
}

console.log("Soma total:", soma);
// Saída esperada: Soma total: 5050
```

### 3. Contagem Regressiva
Use `while` para imprimir de 5 até 1 e depois "Fim!".

```js
let n = 5;

while (/* TODO: enquanto n for maior que 0 */) {
  console.log(n);
  // TODO: diminua n
}
console.log("Fim!");
// Saída: 5, 4, 3, 2, 1, Fim!
```

---

## Parte 2 — Ache o bug

### 4. Loop Infinito
Este programa nunca para. Explique por quê e conserte para imprimir de 0 a 4.

```js
let i = 0;
while (i < 5) {
  console.log(i);
  // BUG: falta algo aqui
}
```

### 5. Fora do intervalo
Deveria imprimir a tabuada do 7 (de 7x1 até 7x10), mas imprime uma linha a mais e começa errado. Corrija o `for`.

```js
for (let i = 0; i <= 10; i++) {   // BUG na inicialização e no limite
  console.log(`7 x ${i} = ${7 * i}`);
}
// Esperado: 7 x 1 = 7  ...  7 x 10 = 70
```

---

## Parte 3 — Prever a saída

### 6. Quantas linhas e quais valores?
Sem rodar, diga exatamente o que sai no console.

```js
for (let i = 0; i < 6; i += 2) {
  console.log(i);
}

let k = 3;
do {
  console.log("valor:", k);
  k--;
} while (k > 3);
```

---

## Parte 4 — Escreva do zero

### 7. Média com Entrada Dinâmica
Pergunte quantas notas o usuário vai digitar. Depois, com um `for`, peça cada nota, some tudo e ao final mostre a média.

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

// Exemplo: quantidade 3, notas 8, 6, 10 -> Média: 8
```

### 8. Caça ao Número Secreto (Desafio)
O número secreto é `7`. Use um `do...while` para pedir palpites ao usuário enquanto ele não acertar. A cada erro diga "Tente novamente". Quando acertar, imprima "Você acertou!" e o total de tentativas.

```
Exemplo:
  Palpite: 3 -> Tente novamente
  Palpite: 9 -> Tente novamente
  Palpite: 7 -> Você acertou! Tentativas: 3
```

---

> **Dica:** todo laço precisa de três coisas pra não travar: onde começa, quando para, e algo que avance até a parada (o `i++` ou o `k--`). Se o console travar num loop infinito, quase sempre é o avanço que ficou de fora.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Laços de Repetição - Módulo 02</i>
</div>
