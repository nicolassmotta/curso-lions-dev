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

# Lista de Código: Arrays

**Turma:** LionsDev  
**Tópicos:** criação de arrays, índices, `.length`, `.push()`, `.pop()`, `.unshift()`, `.shift()`, `.includes()`, `.indexOf()` e percorrer arrays com laços.

> Nesta lista você escreve o código. Cada item mostra o que preencher e a saída certa. Rode no Node e compare.

---

## Parte 0 — Treino rápido (aquecimento)

Rode cada um num `treino.js` pra fixar os métodos de array.

1. Crie um array `frutas` com 3 frutas e imprima o array inteiro.
2. Imprima a **segunda** fruta do array (índice 1).
3. Imprima o **tamanho** do array com `.length`.
4. Adicione `"manga"` no **final** do array com `.push()` e imprima.
5. Adicione `"uva"` no **início** do array com `.unshift()` e imprima.
6. Remova o **último** elemento com `.pop()` e imprima o array.
7. Imprima o primeiro e o último elemento (use `.length - 1`).
8. Crie `const numeros = [4, 8, 15]` e imprima a **soma** dos três (acessando por índice).
9. Use `for` para imprimir **todos** os elementos de `frutas`, um por linha.
10. Verifique com `.includes()` se `"banana"` está no array e imprima `true`/`false`.

---

## Parte 1 — Complete o código

### 1. Primeiro e Último
Complete os acessos usando índice e `.length`.

```js
const cidades = ["Curitiba", "Ponta Grossa", "Londrina", "Maringá"];

let primeira = /* TODO: primeiro elemento */;
let ultima = /* TODO: último elemento usando .length */;

console.log("Primeira:", primeira); // Curitiba
console.log("Última:", ultima);     // Maringá
```

### 2. Fila do Suporte
Complete os métodos para manipular a fila.

```js
const fila = ["Ana", "Bruno"];

// TODO: adicione "Carla" no FINAL da fila
// TODO: adicione "Diego" no INÍCIO da fila
// TODO: remova quem está sendo atendido (o PRIMEIRO da fila)

console.log(fila); // [ 'Ana', 'Bruno', 'Carla' ]
```

### 3. Soma das Vendas
Percorra o array com um laço e some todos os valores.

```js
const vendas = [120, 340, 85, 200, 90];
let total = 0;

for (let i = 0; i < vendas.length; i++) {
  // TODO: some vendas[i] em total
}

console.log("Faturamento:", total); // 835
```

---

## Parte 2 — Ache o bug

### 4. Índice fantasma
Deveria imprimir os 3 nomes, mas dá erro / imprime `undefined` no fim. Corrija a condição do laço.

```js
const nomes = ["Léo", "Mia", "Théo"];

for (let i = 0; i <= nomes.length; i++) {  // BUG
  console.log(nomes[i]);
}
```

### 5. Busca errada
Deveria avisar se "banana" está na lista, mas sempre diz que não tem. Encontre o erro.

```js
const frutas = ["maçã", "banana", "uva"];

if (frutas.indexOf("banana") === -1) {  // pense: o que indexOf retorna quando ACHA?
  console.log("Tem banana!");
} else {
  console.log("Não tem banana.");
}
// Esperado: Tem banana!
```

---

## Parte 3 — Prever a saída

### 6. Antes e depois
Sem rodar, diga o valor final do array e o que cada `console.log` imprime.

```js
const lista = [10, 20, 30];

lista.push(40);
lista.shift();
console.log(lista);          // (a)
console.log(lista.length);   // (b)
console.log(lista[1]);       // (c)
console.log(lista.includes(10)); // (d)
```

---

## Parte 4 — Escreva do zero

### 7. Maior e Menor
Dado o array abaixo, percorra-o e descubra o maior e o menor valor (sem usar `Math.max`/`Math.min`, faça na mão com um laço e comparações).

```js
const temperaturas = [22, 30, 18, 27, 15, 33, 21];
// Esperado: Maior: 33 | Menor: 15
```

### 8. Lista de Tarefas no Terminal (Desafio)
Comece com um array vazio `tarefas`. Pergunte ao usuário quantas tarefas quer cadastrar e, com um `for`, peça cada uma e adicione com `.push()`. No final:
- imprima a quantidade de tarefas;
- liste todas numeradas (`1 - ...`, `2 - ...`).

```
Exemplo:
  Quantas tarefas? 2
  Tarefa: Estudar arrays
  Tarefa: Fazer a lista
  -> Você tem 2 tarefas:
  1 - Estudar arrays
  2 - Fazer a lista
```

---

> **Dica:** o primeiro índice de um array é `0`, então o último é sempre `array.length - 1`. Ao percorrer com `for`, use `i < array.length` (com `<`, não `<=`), senão você acessa uma posição que não existe e recebe `undefined`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Arrays - Módulo 02</i>
</div>
