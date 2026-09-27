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

# Gabarito: Arrays

**Lista:** `modulo02/lista_de_exercicios/arrays/codigo_arrays.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
// 1
const frutas = ["maçã", "banana", "laranja"];
console.log(frutas);

// 2
console.log(frutas[1]); // banana

// 3
console.log(frutas.length); // 3

// 4
frutas.push("manga");
console.log(frutas);

// 5
frutas.unshift("uva");
console.log(frutas);

// 6
frutas.pop();
console.log(frutas); // [ 'uva', 'maçã', 'banana', 'laranja' ]

// 7
console.log(frutas[0], frutas[frutas.length - 1]); // uva laranja

// 8
const numeros = [4, 8, 15];
console.log(numeros[0] + numeros[1] + numeros[2]); // 27

// 9
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// 10
console.log(frutas.includes("banana")); // true
```

---

## Parte 1

**1.**

```js
let primeira = cidades[0];
let ultima = cidades[cidades.length - 1];
```

**2.**

```js
const fila = ["Ana", "Bruno"];

fila.push("Carla");
fila.unshift("Diego");
fila.shift();

console.log(fila); // [ 'Ana', 'Bruno', 'Carla' ]
```

**3.** `total = total + vendas[i];` (ou `total += vendas[i];`). Resultado: `Faturamento: 835`.

---

## Parte 2

**4. Índice fantasma.** Com `<=`, o laço acessa `nomes[3]`, que não existe e resulta em `undefined`. A condição correta é `i < nomes.length`.

**5. Busca errada.** `indexOf` devolve a posição do item quando encontra e `-1` quando não encontra. A condição está invertida:

```js
if (frutas.indexOf("banana") !== -1) {
  console.log("Tem banana!");
} else {
  console.log("Não tem banana.");
}
```

`frutas.includes("banana")` também resolve, de forma mais legível.

---

## Parte 3

| Linha | Saída |
| ----- | ----- |
| (a) | `[ 20, 30, 40 ]` |
| (b) | `3` |
| (c) | `30` |
| (d) | `false` |

`push(40)` deixa `[10, 20, 30, 40]` e `shift()` remove o primeiro item.

---

## Parte 4

**7. Maior e Menor**

```js
const temperaturas = [22, 30, 18, 27, 15, 33, 21];

let maior = temperaturas[0];
let menor = temperaturas[0];

for (let i = 1; i < temperaturas.length; i++) {
  if (temperaturas[i] > maior) {
    maior = temperaturas[i];
  }
  if (temperaturas[i] < menor) {
    menor = temperaturas[i];
  }
}

console.log(`Maior: ${maior} | Menor: ${menor}`); // Maior: 33 | Menor: 15
```

> Começar `maior` e `menor` com o primeiro elemento evita erros com valores negativos, que aconteceriam se as variáveis começassem em `0`.

**8. Lista de Tarefas no Terminal**

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

const tarefas = [];
let quantidade = Number(prompt("Quantas tarefas? "));

for (let i = 0; i < quantidade; i++) {
  tarefas.push(prompt("Tarefa: "));
}

console.log(`Você tem ${tarefas.length} tarefas:`);
for (let i = 0; i < tarefas.length; i++) {
  console.log(`${i + 1} - ${tarefas[i]}`);
}
```

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Arrays - Módulo 02</i>
</div>
