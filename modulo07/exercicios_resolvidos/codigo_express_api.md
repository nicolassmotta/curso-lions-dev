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

# Gabarito: API com Express

**Lista:** `modulo07/lista_de_exercicios/codigo_express_api.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma resposta também são válidas.

---

## Parte 0

```js
import express from "express";

// 1
const app = express();

// 2
app.use(express.json());

// 3
app.get("/", (req, res) => {
  res.send("API no ar!");
});

// 4
app.get("/ping", (req, res) => {
  res.json({ mensagem: "pong" });
});

// 5
app.post("/echo", (req, res) => {
  console.log(req.body);
  res.send("Corpo recebido, veja o terminal");
});

// 6 e 10
app.get("/produtos/:id", (req, res) => {
  console.log(req.params.id); // "5" (string)
  const id = Number(req.params.id); // 5 (número)
  res.send({ idRecebido: id });
});

// 7
app.post("/criado", (req, res) => {
  res.status(201).send({ mensagem: "Criado com sucesso" });
});

// 8
app.get("/nao-existe", (req, res) => {
  res.status(404).send({ erro: "Não encontrado" });
});

// 9
app.post("/cadastro", (req, res) => {
  const { nome } = req.body || {};
  if (!nome) {
    return res.status(400).send({ erro: "O campo nome é obrigatório" });
  }
  res.status(201).send({ nome });
});

// 1
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
```

> No item 9, o `|| {}` evita um erro quando a requisição chega sem corpo. No Express 5, sem corpo JSON o `req.body` fica `undefined`, e tentar tirar `nome` de `undefined` quebra a rota.

---

## Parte 1

### 1. Rota de listagem

```js
app.get("/produtos", (req, res) => {
  res.status(200).send(produtos);
});
```

### 2. Rota de criação

```js
app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(400).send({ erro: "nome e preco são obrigatórios" });
  }
  const novo = { id: produtos.length + 1, nome, preco };
  produtos.push(novo);
  res.status(201).send(novo);
});
```

> Para o `preco`, testamos `=== undefined` em vez de `!preco`. Com `!preco`, um produto de preço `0` seria recusado, porque `0` conta como falso.

### 3. Rota por ID

```js
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return res.status(404).send({ erro: "Produto não encontrado" });
  }
  res.status(200).send(produto);
});
```

---

## Parte 2

### 4. req.body vazio

Faltou o middleware que lê o JSON do corpo da requisição. Sem ele, o Express não transforma o texto enviado em objeto:

```js
const app = express();
app.use(express.json());
```

> Ele precisa vir **antes** das rotas. O Express executa tudo na ordem em que foi registrado.

### 5. Sem status de erro

Dois problemas:

1. Falta `res.status(404)`, então o erro sai com o status padrão `200`.
2. Falta `return`. A função continua depois do primeiro `res.send` e tenta responder de novo, o que gera o erro `Cannot set headers after they are sent to the client`.

```js
app.get("/itens/:id", (req, res) => {
  const item = itens.find((i) => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).send({ erro: "não encontrado" });
  }
  res.send(item);
});
```

---

## Parte 3

| Requisição | Status | Corpo |
| ---------- | ------ | ----- |
| (a) `GET /usuarios/1` | `200` | `{ "id": 1, "nome": "Ana" }` |
| (b) `GET /usuarios/9` | `404` | `{ "erro": "não encontrado" }` |

---

## Parte 4

### 7. API de Tarefas

```js
import express from "express";

const app = express();
app.use(express.json());

let tarefas = [];
let proximoId = 1;

// Lista todas
app.get("/tarefas", (req, res) => {
  res.status(200).send(tarefas);
});

// Busca uma por id
app.get("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).send({ erro: "Tarefa não encontrada" });
  }

  res.status(200).send(tarefa);
});

// Cria
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body || {};

  if (!titulo) {
    return res.status(400).send({ erro: "O campo titulo é obrigatório" });
  }

  const nova = { id: proximoId, titulo, concluida: false };
  tarefas.push(nova);
  proximoId++;

  res.status(201).send(nova);
});

// Atualiza
app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).send({ erro: "Tarefa não encontrada" });
  }

  const { titulo, concluida } = req.body || {};

  if (titulo !== undefined) {
    tarefas[indice].titulo = titulo;
  }
  if (concluida !== undefined) {
    tarefas[indice].concluida = concluida;
  }

  res.status(200).send(tarefas[indice]);
});

// Remove
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).send({ erro: "Tarefa não encontrada" });
  }

  const removida = tarefas[indice];
  tarefas.splice(indice, 1);

  res.status(200).send({ mensagem: "Tarefa removida", tarefa: removida });
});

app.listen(3000, () => {
  console.log("API de Tarefas rodando na porta 3000");
});
```

Roteiro de teste no Insomnia ou Postman:

1. `POST /tarefas` com `{ "titulo": "Estudar Express" }`: `201`.
2. `POST /tarefas` com `{}`: `400`.
3. `GET /tarefas`: `200` com a lista.
4. `PUT /tarefas/1` com `{ "concluida": true }`: `200`.
5. `GET /tarefas/99`: `404`.
6. `DELETE /tarefas/1`: `200`. Repita o mesmo `DELETE`: `404`.

> O id vem de um contador (`proximoId`) e não de `tarefas.length + 1`. Com `length + 1`, depois de apagar uma tarefa o próximo id poderia repetir o de uma tarefa que ainda existe.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: API com Express - Módulo 07</i>
</div>
