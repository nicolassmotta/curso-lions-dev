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

# Lista de Código: MongoDB com Mongoose

**Turma:** LionsDev  
**Tópicos:** `mongoose.connect()`, `Schema` (com `type` e `required`), `mongoose.model()`, operações `create` / `find` / `findById` / `findByIdAndUpdate` / `findByIdAndDelete` e `async/await`.

> Nesta lista você escreve os schemas e as queries de uma API com banco. Toda operação no banco é assíncrona, então use `async/await` dentro de `try/catch`.

---

## Parte 0 — Treino rápido (aquecimento)

Comece pelo schema, depois as queries uma a uma.

1. Importe o mongoose (`import mongoose from "mongoose"`).
2. Conecte no banco com `await mongoose.connect(MONGO_URI)`.
3. Crie um `Schema` com um campo `nome` do tipo `String`.
4. Torne o campo `nome` obrigatório (`required: true`).
5. Adicione um campo `preco` do tipo `Number` obrigatório.
6. Adicione um campo `ativo` do tipo `Boolean`.
7. Crie o model: `const Produto = mongoose.model("Produto", ProdutoSchema)`.
8. Crie um documento com `await Produto.create({ ... })`.
9. Liste todos os documentos com `await Produto.find()`.
10. Busque um documento pelo id com `await Produto.findById(id)`.

---

## Parte 1 — Complete o código

### 1. Definindo o Schema
Complete o schema com os tipos e validações.

```js
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { /* TODO: String, obrigatório */ },
  idade: { /* TODO: Number, opcional */ },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
```

### 2. Create com async/await
Complete a função de criação.

```js
async function criarUsuario(dados) {
  try {
    const novo = /* TODO: await ... crie o documento com 'dados' */;
    return novo;
  } catch (erro) {
    console.log("Erro ao criar:", erro.message);
  }
}
```

### 3. Read por ID
Complete a busca por id.

```js
async function buscarUsuario(id) {
  const usuario = /* TODO: await ... busque por id */;
  if (!usuario) return "Usuário não encontrado";
  return usuario;
}
```

---

## Parte 2 — Ache o bug

### 4. Faltou esperar
Esta função imprime uma `Promise` pendente em vez dos dados. O que falta?

```js
async function listar() {
  const produtos = Produto.find();  // BUG
  console.log(produtos);
}
```

### 5. Schema sem validação
O campo `preco` deveria ser obrigatório e numérico, mas aceita texto e vazio. Conserte a definição.

```js
const ItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: String,  // BUG: tipo errado e sem required
});
```

---

## Parte 3 — Prever o comportamento

### 6. O que retorna?
Para cada chamada, diga o que a variável recebe (um documento, um array, `null` ou erro).

```
(a) await Produto.find()                         -> ?
(b) await Produto.findById("id_que_existe")      -> ?
(c) await Produto.findById("id_que_nao_existe")  -> ?
(d) await Produto.create({})  // schema exige 'nome' required -> ?
```

---

## Parte 4 — Escreva do zero

### 7. CRUD com Mongoose (Desafio)
Monte o CRUD completo de uma coleção `Livro` com o schema: `titulo` (String, obrigatório), `autor` (String, obrigatório), `ano` (Number) e `disponivel` (Boolean, padrão `true`). Escreva as funções assíncronas, todas com `try/catch`:

- `criarLivro(dados)` → `Livro.create(...)`
- `listarLivros()` → `Livro.find()`
- `buscarLivro(id)` → `Livro.findById(...)` (trate o "não encontrado")
- `atualizarLivro(id, dados)` → `Livro.findByIdAndUpdate(...)` (retorne o atualizado)
- `deletarLivro(id)` → `Livro.findByIdAndDelete(...)`

Depois, conecte no banco e teste chamando as funções em sequência.

---

> **Dica:** toda operação de banco é assíncrona, então sem `await` você recebe uma `Promise` no lugar dos dados. Envolva em `try/catch` pra pegar erro de validação do schema. E pra atualizar e já receber o documento novo, passe `{ new: true }` no `findByIdAndUpdate`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: MongoDB com Mongoose - Módulo 08</i>
</div>
