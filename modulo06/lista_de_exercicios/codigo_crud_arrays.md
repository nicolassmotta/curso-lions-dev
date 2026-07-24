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

# Lista de Código: CRUD em Arrays

**Turma:** LionsDev  
**Tópicos:** array de objetos, `.push()` (Create), `.find()` e `.filter()` (Read), `.findIndex()` (Update) e `.filter()` (Delete), o CRUD completo em memória.

> Nesta lista você implementa as funções de um CRUD sobre um array de objetos. Comece sempre com `let itens = []` e um contador de id. Cada exercício descreve o comportamento esperado.

---

## Parte 0 — Treino rápido (aquecimento)

Considere `const produtos = [{ id: 1, nome: "Mouse" }, { id: 2, nome: "Teclado" }]`.

1. Adicione `{ id: 3, nome: "Monitor" }` ao array com `.push()`.
2. Imprima quantos produtos existem (`.length`).
3. Use `.find()` para pegar o produto de `id === 2`.
4. Use `.filter()` para pegar todos os produtos cujo `id` é maior que 1.
5. Use `.findIndex()` para descobrir a posição do produto de `id === 1`.
6. Use `.filter()` para criar um novo array sem o produto de `id === 2`.
7. Percorra o array com `for` e imprima só o `nome` de cada produto.
8. Escreva `existe(id)` que retorna `true`/`false` usando `.find()`.
9. Acesse e imprima o `nome` do primeiro produto do array.
10. Altere o `nome` do produto de índice `0` para `"Webcam"`.

---

## Parte 1 — Complete o código

### 1. Create
Complete a função que cria um item com id automático.

```js
let tarefas = [];
let proximoId = 1;

function criarTarefa(titulo) {
  const nova = { id: proximoId, titulo, concluida: false };
  // TODO: adicione 'nova' no array e incremente 'proximoId'
  return nova;
}
criarTarefa("Estudar CRUD");
console.log(tarefas); // [ { id: 1, titulo: 'Estudar CRUD', concluida: false } ]
```

### 2. Read por ID
Complete a busca.

```js
function buscarPorId(id) {
  // TODO: retorne a tarefa cujo id bate, usando .find()
}
console.log(buscarPorId(1)); // { id: 1, titulo: 'Estudar CRUD', ... }
```

### 3. Update
Complete a atualização usando `.findIndex()`.

```js
function atualizarTarefa(id, novoTitulo) {
  const indice = /* TODO: use .findIndex() */;
  if (indice === -1) return "Tarefa não encontrada";
  tarefas[indice].titulo = novoTitulo;
  return tarefas[indice];
}
```

---

## Parte 2 — Ache o bug

### 4. Delete que não deleta
Deveria remover a tarefa, mas o array continua igual. Encontre o erro.

```js
function deletarTarefa(id) {
  tarefas.filter((t) => t.id !== id);  // BUG
  return "Removida";
}
// Dica: .filter() retorna um NOVO array. O que fazer com esse retorno?
```

### 5. Comparação errada
Este `find` nunca acha o item, mesmo passando um id que existe. Por quê?

```js
const item = tarefas.find((t) => t.id = id);  // BUG sutil
```

---

## Parte 3 — Prever a saída

### 6. O que sai?
Sem rodar, diga a saída.

```js
let lista = [{ id: 1, ok: false }, { id: 2, ok: true }];

console.log(lista.find((x) => x.ok === true));        // (a)
console.log(lista.filter((x) => x.ok === false).length); // (b)
console.log(lista.findIndex((x) => x.id === 2));      // (c)
console.log(lista.find((x) => x.id === 99));          // (d)
```

---

## Parte 4 — Escreva do zero

### 7. CRUD de Contatos (Desafio)
Implemente um CRUD completo em memória para uma agenda de contatos. Cada contato: `{ id, nome, telefone }`. Escreva as funções:

- `criarContato(nome, telefone)`: cria com id automático (Create / `.push()`).
- `listarContatos()`: retorna todos (Read).
- `buscarPorId(id)`: retorna um (Read / `.find()`).
- `buscarPorNome(termo)`: retorna todos que contêm o termo no nome (Read / `.filter()` + `.includes()`).
- `atualizarContato(id, novosDados)`: atualiza (Update / `.findIndex()`); se não achar, retorna aviso.
- `deletarContato(id)`: remove (Delete / `.filter()`); se não achar, retorna aviso.

Ao final, teste chamando as funções em sequência e imprimindo o array a cada passo.

---

> **Dica:** o CRUD em array usa quatro métodos. `.push()` para criar. `.find()` para achar um, `.filter()` para achar vários. `.findIndex()` para achar a posição e alterar. E `arr = arr.filter(...)` para apagar, reatribuindo o array sem o item removido.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: CRUD em Arrays - Módulo 06</i>
</div>
