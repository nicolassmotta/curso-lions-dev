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

# Lista de Código: API com Express

**Turma:** LionsDev  
**Tópicos:** `express()`, `express.json()`, rotas `GET`/`POST`/`PUT`/`DELETE`, `req.body`, `req.params`, `res.status()`, `res.send()`/`res.json()` e status codes (200, 201, 400, 404).

> Nesta lista você escreve as rotas de uma API. Base do arquivo: `import express from "express"; const app = express(); app.use(express.json()); app.listen(3000);`. Teste cada rota no Insomnia ou no Postman.

---

## Parte 0 — Treino rápido (aquecimento)

Uma rota por vez. Escreva, suba o servidor, teste.

1. Crie o app Express e faça ele escutar na porta `3000`.
2. Ative o middleware que lê JSON do corpo da requisição (`express.json()`).
3. Crie uma rota `GET /` que responde `"API no ar!"`.
4. Crie uma rota `GET /ping` que responde o JSON `{ mensagem: "pong" }`.
5. Numa rota `POST`, leia `req.body` e imprima no console.
6. Numa rota `GET /produtos/:id`, leia e imprima `req.params.id`.
7. Responda com status 201 e um objeto (`res.status(201).send(...)`).
8. Responda com status 404 e a mensagem `{ erro: "Não encontrado" }`.
9. Responda com status 400 quando faltar um campo obrigatório.
10. Converta `req.params.id` (string) para número com `Number()` ou `parseInt()`.

---

## Parte 1 — Complete o código

### 1. Rota de listagem
Complete a rota que devolve todos os produtos.

```js
const produtos = [{ id: 1, nome: "Mouse" }];

app.get("/produtos", (req, res) => {
  // TODO: responda status 200 com o array 'produtos'
});
```

### 2. Rota de criação
Complete a rota `POST` lendo o corpo e validando.

```js
app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;

  if (/* TODO: nome OU preco não enviados */) {
    return res.status(400).send({ erro: "nome e preco são obrigatórios" });
  }

  const novo = { id: produtos.length + 1, nome, preco };
  produtos.push(novo);
  // TODO: responda status 201 com o novo produto
});
```

### 3. Rota por ID
Complete a busca por parâmetro de rota.

```js
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    // TODO: responda 404 com mensagem
  }
  // TODO: responda 200 com o produto
});
```

---

## Parte 2 — Ache o bug

### 4. req.body vazio
No `POST`, `req.body` sempre chega `undefined`. Falta uma linha na configuração do app. Qual?

```js
const app = express();
// ??? -> faltou algo aqui

app.post("/itens", (req, res) => {
  console.log(req.body); // undefined
  res.send("ok");
});
```

### 5. Sem status de erro
Esta rota responde `200` mesmo quando não acha o item, e ainda tenta responder duas vezes. Conserte usando `return`.

```js
app.get("/itens/:id", (req, res) => {
  const item = itens.find((i) => i.id === Number(req.params.id));
  if (!item) {
    res.send({ erro: "não achou" }); // BUG: falta status e falta return
  }
  res.send(item);
});
```

---

## Parte 3 — Prever o comportamento

### 6. Qual a resposta?
Dada a rota abaixo e o array `usuarios = [{ id: 1, nome: "Ana" }]`, diga status e corpo da resposta para cada requisição.

```js
app.get("/usuarios/:id", (req, res) => {
  const u = usuarios.find((x) => x.id === Number(req.params.id));
  if (!u) return res.status(404).send({ erro: "não encontrado" });
  res.status(200).send(u);
});
```

```
(a) GET /usuarios/1
(b) GET /usuarios/9
```

---

## Parte 4 — Escreva do zero

### 7. API de Tarefas (Desafio)
Monte uma API REST completa em memória (array `tarefas`, cada uma `{ id, titulo, concluida }`), com as rotas:

| Método | Rota | O que faz | Status sucesso |
|--------|------|-----------|----------------|
| GET | `/tarefas` | lista todas | 200 |
| GET | `/tarefas/:id` | uma por id (404 se não achar) | 200 |
| POST | `/tarefas` | cria (valida `titulo`; 400 se faltar) | 201 |
| PUT | `/tarefas/:id` | atualiza (404 se não achar) | 200 |
| DELETE | `/tarefas/:id` | remove (404 se não achar) | 200 |

Teste cada rota no seu cliente HTTP e confira os status codes.

---

> **Dica:** sem `express.json()` o `req.body` vem `undefined`, então ele é obrigatório pra ler o corpo da requisição. O `req.params` chega sempre como string, converta o id com `Number()`. E use `return res.status(...)...` pra não cair no erro de responder duas vezes na mesma requisição.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: API com Express - Módulo 07</i>
</div>
