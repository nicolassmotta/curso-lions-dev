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

# Gabarito: CRUD em Arrays

**Lista:** `modulo06/lista_de_exercicios/codigo_crud_arrays.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
let produtos = [
  { id: 1, nome: "Mouse" },
  { id: 2, nome: "Teclado" },
];

// 1
produtos.push({ id: 3, nome: "Monitor" });

// 2
console.log(produtos.length); // 3

// 3
const teclado = produtos.find((p) => p.id === 2);
console.log(teclado); // { id: 2, nome: 'Teclado' }

// 4
const maioresQue1 = produtos.filter((p) => p.id > 1);
console.log(maioresQue1); // Teclado e Monitor

// 5
const posicao = produtos.findIndex((p) => p.id === 1);
console.log(posicao); // 0

// 6
const semTeclado = produtos.filter((p) => p.id !== 2);
console.log(semTeclado); // Mouse e Monitor (o array original não muda)

// 7
for (let i = 0; i < produtos.length; i++) {
  console.log(produtos[i].nome);
}

// 8
function existe(id) {
  const produto = produtos.find((p) => p.id === id);
  return produto !== undefined;
}
console.log(existe(1), existe(99)); // true false

// 9
console.log(produtos[0].nome); // Mouse

// 10
produtos[0].nome = "Webcam";
console.log(produtos[0]); // { id: 1, nome: 'Webcam' }
```

> No item 6, o `.filter()` **não altera** o array original: ele devolve um array novo. Por isso guardamos o resultado em `semTeclado`.

---

## Parte 1

### 1. Create

```js
function criarTarefa(titulo) {
  const nova = { id: proximoId, titulo, concluida: false };
  tarefas.push(nova);
  proximoId++;
  return nova;
}
```

### 2. Read por ID

```js
function buscarPorId(id) {
  return tarefas.find((t) => t.id === id);
}
```

### 3. Update

```js
const indice = tarefas.findIndex((t) => t.id === id);
```

---

## Parte 2

### 4. Delete que não deleta

O `.filter()` devolve um array **novo** sem a tarefa, mas esse retorno é jogado fora. O array `tarefas` continua igual. É preciso guardar o resultado na própria variável (por isso ela é `let`):

```js
function deletarTarefa(id) {
  const tamanhoAntes = tarefas.length;
  tarefas = tarefas.filter((t) => t.id !== id);

  if (tarefas.length === tamanhoAntes) {
    return "Tarefa não encontrada";
  }
  return "Removida";
}
```

> Comparar o tamanho antes e depois mostra se alguma tarefa saiu de fato. Assim a função não diz "Removida" quando o id não existe.

### 5. Comparação errada

Dentro do `find` foi usado `=` (atribuição) em vez de `===` (comparação). Para o primeiro item, `t.id = id` **troca** o id dele pelo valor procurado e devolve esse valor. Como um id diferente de zero conta como verdadeiro, o `find` aceita o primeiro item logo de cara.

Efeito colateral: o primeiro item do array fica com o `id` alterado, e agora podem existir dois itens com o mesmo id.

```js
const item = tarefas.find((t) => t.id === id);
```

---

## Parte 3

| Linha | Saída | Por quê |
| ----- | ----- | ------- |
| (a) | `{ id: 2, ok: true }` | `find` devolve o **primeiro** objeto que passa no teste |
| (b) | `1` | só o objeto de id 1 tem `ok === false` |
| (c) | `1` | o objeto de id 2 está na posição 1 do array |
| (d) | `undefined` | `find` devolve `undefined` quando nada passa no teste |

> Guarde a diferença: quando não acha nada, `find` devolve `undefined` e `findIndex` devolve `-1`.

---

## Parte 4

### 7. CRUD de Contatos

```js
let contatos = [];
let proximoId = 1;

function criarContato(nome, telefone) {
  const novo = { id: proximoId, nome, telefone };
  contatos.push(novo);
  proximoId++;
  return novo;
}

function listarContatos() {
  return contatos;
}

function buscarPorId(id) {
  return contatos.find((c) => c.id === id);
}

function buscarPorNome(termo) {
  const termoMinusculo = termo.toLowerCase();
  return contatos.filter((c) => c.nome.toLowerCase().includes(termoMinusculo));
}

function atualizarContato(id, novosDados) {
  const indice = contatos.findIndex((c) => c.id === id);

  if (indice === -1) {
    return "Contato não encontrado";
  }

  // Só troca os campos que vieram em novosDados
  if (novosDados.nome !== undefined) {
    contatos[indice].nome = novosDados.nome;
  }
  if (novosDados.telefone !== undefined) {
    contatos[indice].telefone = novosDados.telefone;
  }

  return contatos[indice];
}

function deletarContato(id) {
  const existe = contatos.find((c) => c.id === id);

  if (!existe) {
    return "Contato não encontrado";
  }

  contatos = contatos.filter((c) => c.id !== id);
  return "Contato removido";
}

// Testes em sequência
criarContato("Ana Silva", "11 91111-1111");
criarContato("Bruno Costa", "11 92222-2222");
criarContato("Ana Paula", "11 93333-3333");
console.log(listarContatos());

console.log(buscarPorId(2)); // Bruno
console.log(buscarPorNome("ana")); // Ana Silva e Ana Paula

console.log(atualizarContato(1, { telefone: "11 90000-0000" }));
console.log(atualizarContato(99, { nome: "X" })); // Contato não encontrado

console.log(deletarContato(2)); // Contato removido
console.log(deletarContato(2)); // Contato não encontrado
console.log(listarContatos()); // Ana Silva e Ana Paula
```

> O `buscarPorNome` converte os dois lados para minúsculas. Assim, buscar por `"ana"` também encontra `"Ana Silva"`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: CRUD em Arrays - Módulo 06</i>
</div>
