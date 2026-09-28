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

# Gabarito: MongoDB com Mongoose

**Lista:** `modulo08/lista_de_exercicios/codigo_mongoose.md`  
**Uso:** material de referência para correção. Outras soluções que produzam o mesmo resultado também são válidas.

---

## Parte 0

```js
// 1
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 2
await mongoose.connect(process.env.MONGO_URI);

// 3 a 6
const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // 3 e 4
  preco: { type: Number, required: true }, // 5
  ativo: { type: Boolean }, // 6
});

// 7
const Produto = mongoose.model("Produto", ProdutoSchema);

// 8
const novo = await Produto.create({ nome: "Mouse", preco: 50, ativo: true });
console.log(novo); // mostra o documento com o _id gerado pelo MongoDB

// 9
const todos = await Produto.find();
console.log(todos); // array com todos os produtos

// 10
const encontrado = await Produto.findById(novo._id);
console.log(encontrado);
```

> O `.env` precisa ter a linha `MONGO_URI=...` com a sua connection string. O `await` fora de função (item 2) funciona porque o projeto usa `"type": "module"`.

---

## Parte 1

### 1. Definindo o Schema

```js
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  idade: { type: Number },
});
```

### 2. Create com async/await

```js
const novo = await Usuario.create(dados);
```

### 3. Read por ID

```js
const usuario = await Usuario.findById(id);
```

---

## Parte 2

### 4. Faltou esperar

Faltou o `await`. Sem ele, `Produto.find()` devolve um objeto `Query` (a consulta montada, mas ainda não executada), e não os documentos.

```js
async function listar() {
  const produtos = await Produto.find();
  console.log(produtos);
}
```

### 5. Schema sem validação

`preco: String` aceita qualquer texto e, sem `required`, também aceita ficar vazio. O certo é `Number` obrigatório:

```js
const ItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
});
```

> Com `type: Number`, o Mongoose converte `"10"` para `10`, mas recusa `"dez"` com um erro de validação (`CastError`).

---

## Parte 3

| Chamada | Resultado | Por quê |
| ------- | --------- | ------- |
| (a) | um **array** (vazio, se não houver documentos) | `find` sempre devolve uma lista |
| (b) | um **documento** | o id existe |
| (c) | **`null`** | o id tem formato válido, mas nenhum documento tem esse id |
| (d) | **erro** (`ValidationError`) | falta o campo obrigatório `nome`, então o `create` lança um erro que precisa de `try/catch` |

> Um caso a mais que costuma aparecer: `findById("abc")`, com um id fora do formato do MongoDB, lança `CastError` em vez de devolver `null`.

---

## Parte 4

### 7. CRUD com Mongoose

```js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number },
  disponivel: { type: Boolean, default: true },
});

const Livro = mongoose.model("Livro", LivroSchema);

async function criarLivro(dados) {
  try {
    return await Livro.create(dados);
  } catch (erro) {
    console.log("Erro ao criar livro:", erro.message);
  }
}

async function listarLivros() {
  try {
    return await Livro.find();
  } catch (erro) {
    console.log("Erro ao listar livros:", erro.message);
  }
}

async function buscarLivro(id) {
  try {
    const livro = await Livro.findById(id);
    if (!livro) {
      return "Livro não encontrado";
    }
    return livro;
  } catch (erro) {
    console.log("Erro ao buscar livro:", erro.message);
  }
}

async function atualizarLivro(id, dados) {
  try {
    // new: true devolve o documento DEPOIS da atualização
    // runValidators: true aplica as regras do schema também no update
    const livro = await Livro.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
    if (!livro) {
      return "Livro não encontrado";
    }
    return livro;
  } catch (erro) {
    console.log("Erro ao atualizar livro:", erro.message);
  }
}

async function deletarLivro(id) {
  try {
    const livro = await Livro.findByIdAndDelete(id);
    if (!livro) {
      return "Livro não encontrado";
    }
    return "Livro removido";
  } catch (erro) {
    console.log("Erro ao deletar livro:", erro.message);
  }
}

// Testes em sequência
await mongoose.connect(process.env.MONGO_URI);

const livro = await criarLivro({ titulo: "O Hobbit", autor: "J. R. R. Tolkien", ano: 1937 });
console.log("Criado:", livro);

await criarLivro({ autor: "Sem título" }); // erro de validação: titulo é obrigatório

console.log("Lista:", await listarLivros());
console.log("Busca:", await buscarLivro(livro._id));
console.log("Atualizado:", await atualizarLivro(livro._id, { disponivel: false }));
console.log(await deletarLivro(livro._id)); // Livro removido
console.log(await buscarLivro(livro._id)); // Livro não encontrado

await mongoose.disconnect();
```

> O `mongoose.disconnect()` no final encerra a conexão. Sem ele, o Node fica esperando e o programa não termina sozinho.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: MongoDB com Mongoose - Módulo 08</i>
</div>
