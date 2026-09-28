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

# Cola: Métodos de Array, String e Número

**Turma:** LionsDev  
**Use a partir do:** Módulo 02 (arrays e strings) e em todos os módulos seguintes.

> Todos os resultados desta cola foram conferidos rodando o código no Node. A coluna **Altera o original?** é a mais importante: métodos que alteram o array original podem causar bugs quando o array é compartilhado entre arquivos (Módulos 05 e 06).

---

## 1. Arrays: adicionar e remover

| Método | Exemplo | Resultado | Altera o original? |
| ------ | ------- | --------- | ------------------ |
| `push(item)` | `[1, 2].push(3)` | array vira `[1, 2, 3]` | **sim** |
| `pop()` | `[1, 2, 3].pop()` | retorna `3`; array vira `[1, 2]` | **sim** |
| `unshift(item)` | `[2, 3].unshift(1)` | array vira `[1, 2, 3]` | **sim** |
| `shift()` | `[1, 2, 3].shift()` | retorna `1`; array vira `[2, 3]` | **sim** |
| `splice(posição, quantos)` | `["a", "b", "c", "d"].splice(1, 2)` | retorna `["b", "c"]`; array vira `["a", "d"]` | **sim** |
| `slice(início, fim)` | `[1, 2, 3, 4].slice(1, 3)` | `[2, 3]` (o `fim` não entra) | não |
| `concat(outro)` | `[1, 2].concat([3, 4])` | `[1, 2, 3, 4]` | não |
| espalhar `...` | `[...[1, 2], ...[3]]` | `[1, 2, 3]` | não |

> **`splice` × `slice`:** o `splice` **corta** o array original (é o que usamos para remover no CRUD). O `slice` **copia** um pedaço e deixa o original intacto.

## 2. Arrays: procurar

| Método | Exemplo | Resultado | Quando não acha |
| ------ | ------- | --------- | --------------- |
| `includes(valor)` | `[1, 2, 3].includes(2)` | `true` | `false` |
| `indexOf(valor)` | `["a", "b", "c"].indexOf("c")` | `2` | `-1` |
| `find(teste)` | `produtos.find((p) => p.id === 2)` | o **objeto** encontrado | `undefined` |
| `findIndex(teste)` | `produtos.findIndex((p) => p.id === 3)` | a **posição**: `2` | `-1` |
| `some(teste)` | `produtos.some((p) => p.preco > 100)` | `true` se **algum** passa | `false` |
| `every(teste)` | `produtos.every((p) => p.preco > 10)` | `true` se **todos** passam | `false` |

Os exemplos usam:

```js
const produtos = [
  { id: 1, nome: "Mouse", preco: 50 },
  { id: 2, nome: "Teclado", preco: 120 },
  { id: 3, nome: "Cabo", preco: 15 },
];
```

> **Pegadinha:** dentro do `find`, compare com `===`. Com um `=` só, você **altera** o `id` do primeiro item e ele sempre "é encontrado".

## 3. Arrays: transformar

| Método | Exemplo | Resultado | Altera o original? |
| ------ | ------- | --------- | ------------------ |
| `filter(teste)` | `produtos.filter((p) => p.preco > 20)` | novo array com Mouse e Teclado | não |
| `map(transformação)` | `produtos.map((p) => p.nome)` | `["Mouse", "Teclado", "Cabo"]` | não |
| `reduce(acumular, inicial)` | `produtos.reduce((soma, p) => soma + p.preco, 0)` | `185` | não |
| `forEach(ação)` | `[1, 2, 3].forEach((x) => (soma += x))` | faz a ação; **retorna `undefined`** | não |
| `join(separador)` | `["a", "b", "c"].join(", ")` | `"a, b, c"` | não |
| `reverse()` | `[1, 2, 3].reverse()` | `[3, 2, 1]` | **sim** |
| `sort(comparação)` | veja a seção 4 | | **sim** |

> **`reduce` com lista vazia:** `[].reduce((s, x) => s + x, 0)` dá `0`. Sem o valor inicial `0`, a lista vazia gera erro. Sempre passe o inicial.
>
> **`map` × `forEach`:** use `map` quando quer um **array novo** como resultado. O `forEach` só executa algo para cada item e não devolve nada.

## 4. Ordenar com `sort`

| Código | Resultado | Por quê |
| ------ | --------- | ------- |
| `[10, 9, 1, 2].sort()` | `[1, 10, 2, 9]` | **sem comparação, ordena como texto**: `"10"` vem antes de `"2"` |
| `[10, 9, 1, 2].sort((a, b) => a - b)` | `[1, 2, 9, 10]` | crescente |
| `[10, 9, 1, 2].sort((a, b) => b - a)` | `[10, 9, 2, 1]` | decrescente |
| `["b", "a", "c"].sort()` | `["a", "b", "c"]` | texto: aqui o padrão funciona |
| `produtos.sort((a, b) => a.preco - b.preco)` | do mais barato ao mais caro | ordena objetos por um campo |

> O `sort` **altera** o array. Para ordenar sem mexer no original: `lista.slice().sort((a, b) => a - b)`.

---

## 5. Strings

| Método | Exemplo | Resultado |
| ------ | ------- | --------- |
| `length` | `"Lions".length` | `5` |
| `trim()` | `"  Lions Dev  ".trim()` | `"Lions Dev"` |
| `toUpperCase()` | `"Lions".toUpperCase()` | `"LIONS"` |
| `toLowerCase()` | `"Lions".toLowerCase()` | `"lions"` |
| `includes(trecho)` | `"Lions Dev".includes("Dev")` | `true` |
| `includes` diferencia maiúsculas | `"Lions Dev".includes("dev")` | `false` |
| `startsWith` / `endsWith` | `"arquivo.pdf".endsWith(".pdf")` | `true` |
| `indexOf(trecho)` | `"Lions".indexOf("o")` | `2` (ou `-1`) |
| acessar um caractere | `"Lions"[0]` / `"Lions".at(-1)` | `"L"` / `"s"` |
| `slice(início, fim)` | `"Lions Dev".slice(0, 5)` | `"Lions"` |
| `slice` negativo | `"Lions Dev".slice(-3)` | `"Dev"` (conta do fim) |
| `split(separador)` | `"a,b,c".split(",")` | `["a", "b", "c"]` |
| `split("")` | `"roma".split("")` | `["r", "o", "m", "a"]` |
| `replace` | `"a-b-c".replace("-", "")` | `"ab-c"` (**só a primeira**) |
| `replaceAll` | `"a-b-c".replaceAll("-", "")` | `"abc"` |
| `padStart` | `"5".padStart(3, "0")` | `"005"` |
| `repeat` | `"ha".repeat(3)` | `"hahaha"` |
| template string | `` `Total: ${2 * 5}` `` | `"Total: 10"` |

> **Strings nunca mudam no lugar.** `nome.trim()` sozinho não faz nada: guarde o resultado (`nome = nome.trim()`).
>
> **Busca sem diferenciar maiúsculas:** converta os dois lados, `nome.toLowerCase().includes(termo.toLowerCase())`.

---

## 6. Converter e formatar números

| Código | Resultado | Observação |
| ------ | --------- | ---------- |
| `Number("42")` | `42` | |
| `Number("3.14")` | `3.14` | |
| `Number("3,14")` | `NaN` | o JavaScript só entende **ponto** decimal |
| `Number("")` | `0` | entrada vazia vira zero: valide antes |
| `Number("abc")` | `NaN` | teste com `isNaN(valor)` |
| `parseInt("42px")` | `42` | lê até onde der |
| `parseFloat("3.5kg")` | `3.5` | |
| `String(42)` | `"42"` | |
| `(1234.5).toFixed(2)` | `"1234.50"` | vira **texto** com 2 casas |
| `(1234.5).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })` | `"R$ 1.234,50"` | formato de dinheiro brasileiro |
| `0.1 + 0.2` | `0.30000000000000004` | decimais são aproximados; arredonde para exibir |

## 7. Objetos

| Código | Resultado |
| ------ | --------- |
| `Object.keys({ a: 1, b: 2 })` | `["a", "b"]` |
| `Object.values({ a: 1, b: 2 })` | `[1, 2]` |
| `Object.entries({ a: 1 })` | `[["a", 1]]` |
| `const { nome, preco } = produto` | tira os campos do objeto (desestruturação) |
| `{ ...produto, preco: 10 }` | cópia do objeto com o `preco` trocado |

---

## 8. Qual método eu uso?

| Eu quero... | Use |
| ----------- | --- |
| adicionar no fim | `push` |
| remover pela posição | `findIndex` + `splice` |
| achar **um** item | `find` |
| achar **vários** itens | `filter` |
| saber **se existe** | `some` ou `includes` |
| transformar cada item | `map` |
| somar ou acumular | `reduce` (ou um `for` com acumulador) |
| ordenar números | `sort((a, b) => a - b)` |
| juntar em texto | `join` |
| quebrar texto em partes | `split` |

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Material de Apoio: Métodos de Array, String e Número</i>
</div>
