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

# Gabarito: Autenticação (bcrypt + JWT) e MVC

**Lista:** `modulo09/lista_de_exercicios/codigo_auth_mvc.md`  
**Uso:** material de referência para correção. Outras soluções que produzam o mesmo resultado também são válidas.

---

## Parte 0

```js
// 1
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 2
const hash = await bcrypt.hash("123456", 10);
console.log(hash); // algo como $2b$10$... (muda a cada execução)

// 3
const confere = await bcrypt.compare("123456", hash);
console.log(confere); // true

// 4
const token = jwt.sign({ id: 1 }, "segredo", { expiresIn: "1h" });
console.log(token);

// 5
const payload = jwt.verify(token, "segredo");
console.log(payload); // { id: 1, iat: ..., exp: ... }

// 6 a 9: dentro de um middleware
function exemploMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // 6

  if (!authHeader) {
    return res.status(401).send({ erro: "Token ausente" }); // 8
  }

  const [tipo, tokenRecebido] = authHeader.split(" "); // 7
  console.log(tipo, tokenRecebido);

  next(); // 9
}

// 10
const segredo = process.env.JWT_SECRET;
```

> No item 2, o hash muda toda vez, mesmo com a mesma senha, porque o bcrypt sorteia um "salt" novo a cada chamada. O `compare` funciona assim mesmo, porque o salt fica guardado dentro do próprio hash.
>
> No item 5, o payload traz dois campos que o `jwt.sign` adiciona sozinho: `iat` (quando o token foi criado) e `exp` (quando expira).

---

## Parte 1

### 1. Cadastro com hash

```js
const senhaHash = await bcrypt.hash(senha, 10);
```

### 2. Login

```js
const confere = await bcrypt.compare(senhaDigitada, usuario.senhaHash);
```

```js
const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
```

### 3. Middleware de proteção

```js
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.usuario = payload;
next();
```

---

## Parte 2

### 4. Senha vazando

1. **BUG 1:** a senha é guardada em texto puro. Se alguém acessar o banco, vê a senha de todo mundo. O certo é guardar só o hash.
2. **BUG 2:** o objeto devolvido contém a senha, então ela aparece na resposta da API. A resposta nunca deve trazer a senha nem o hash.

```js
async function cadastrar(nome, senha) {
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = { id: 1, nome, senhaHash }; // isso é o que vai para o banco

  // Para a resposta, montamos um objeto só com os dados públicos
  return { id: usuario.id, nome: usuario.nome };
}
```

### 5. Comparação errada

Faltou o `await`. O `bcrypt.compare` é assíncrono e, sem `await`, devolve uma **Promise**, não `true`/`false`. Todo objeto conta como verdadeiro em um `if`, e a Promise é um objeto. Por isso o `if` sempre passa, com qualquer senha.

```js
const confere = await bcrypt.compare(senhaDigitada, usuario.senhaHash);
if (confere) {
  /* ... */
}
```

---

## Parte 3

| Requisição | Resultado | Onde para |
| ---------- | --------- | --------- |
| (a) sem `Authorization` | `401` `{ erro: "Token ausente" }` | primeiro `if` |
| (b) `Token abc123` | `401` `{ erro: "Formato inválido" }` | `tipo` é `"Token"`, não `"Bearer"` |
| (c) `Bearer token_valido` | chama `next()` | o `jwt.verify` passa e `req.usuario` recebe o payload |
| (d) `Bearer token_expirado` | `401` `{ erro: "Token inválido" }` | o `jwt.verify` lança `TokenExpiredError`, que cai no `catch` |

---

## Parte 4

### 7. Separe em camadas

Estrutura final:

```text
src/
|-- app.js
|-- server.js
|-- config/database.js
|-- models/usuario.model.js
|-- repositories/usuario.repository.js
|-- services/usuario.service.js
|-- controllers/usuario.controller.js
|-- middlewares/autenticacao.middleware.js
`-- routes/usuario.routes.js
```

```js
// src/models/usuario.model.js
import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select: false faz o find NÃO trazer o hash, a não ser que peçamos
    senhaHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
```

```js
// src/repositories/usuario.repository.js
// Única camada que conversa com o banco
import Usuario from "../models/usuario.model.js";

async function criar(dados) {
  return Usuario.create(dados);
}

async function buscarPorEmail(email, incluirSenha = false) {
  const consulta = Usuario.findOne({ email: email.toLowerCase() });
  if (incluirSenha) {
    consulta.select("+senhaHash");
  }
  return consulta;
}

async function buscarPorId(id) {
  return Usuario.findById(id);
}

export default { criar, buscarPorEmail, buscarPorId };
```

```js
// src/services/usuario.service.js
// Regra de negócio: não sabe nada de req e res
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/usuario.repository.js";

function criarErro(mensagem, status) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

async function cadastrar({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    throw criarErro("Nome, email e senha são obrigatórios.", 400);
  }

  const existente = await UsuarioRepository.buscarPorEmail(email);
  if (existente) {
    throw criarErro("Email já cadastrado.", 409);
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await UsuarioRepository.criar({ nome, email, senhaHash });

  // Devolve só os dados públicos
  return { id: usuario._id, nome: usuario.nome, email: usuario.email };
}

async function login({ email, senha }) {
  if (!email || !senha) {
    throw criarErro("Email e senha são obrigatórios.", 400);
  }

  const usuario = await UsuarioRepository.buscarPorEmail(email, true);

  // Mesma mensagem nos dois casos: não revela se o email existe
  if (!usuario) {
    throw criarErro("Email ou senha incorretos.", 401);
  }

  const confere = await bcrypt.compare(senha, usuario.senhaHash);
  if (!confere) {
    throw criarErro("Email ou senha incorretos.", 401);
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { token };
}

async function perfil(id) {
  const usuario = await UsuarioRepository.buscarPorId(id);
  if (!usuario) {
    throw criarErro("Usuário não encontrado.", 404);
  }
  return usuario;
}

export default { cadastrar, login, perfil };
```

```js
// src/controllers/usuario.controller.js
// Lê a requisição, chama o service e responde
import UsuarioService from "../services/usuario.service.js";

async function cadastrar(req, res) {
  try {
    const usuario = await UsuarioService.cadastrar(req.body || {});
    res.status(201).json(usuario);
  } catch (erro) {
    res.status(erro.status || 500).json({ erro: erro.message });
  }
}

async function login(req, res) {
  try {
    const resultado = await UsuarioService.login(req.body || {});
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(erro.status || 500).json({ erro: erro.message });
  }
}

async function perfil(req, res) {
  try {
    // req.usuario foi preenchido pelo middleware autenticar
    const usuario = await UsuarioService.perfil(req.usuario.id);
    res.status(200).json(usuario);
  } catch (erro) {
    res.status(erro.status || 500).json({ erro: erro.message });
  }
}

export default { cadastrar, login, perfil };
```

```js
// src/middlewares/autenticacao.middleware.js
import jwt from "jsonwebtoken";

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ erro: "Token ausente" });
  }

  const [tipo, token] = authHeader.split(" ");
  if (tipo !== "Bearer" || !token) {
    return res.status(401).send({ erro: "Formato inválido" });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (erro) {
    return res.status(401).send({ erro: "Token inválido" });
  }
}

export default autenticar;
```

```js
// src/routes/usuario.routes.js
// Só liga método + caminho ao controller
import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

router.post("/usuarios", UsuarioController.cadastrar);
router.post("/login", UsuarioController.login);
router.get("/perfil", autenticar, UsuarioController.perfil);

export default router;
```

```js
// src/config/database.js
import mongoose from "mongoose";

async function conectarDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não definida no .env");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB conectado");
}

export default conectarDatabase;
```

```js
// src/app.js
import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();
app.use(express.json());
app.use(usuarioRoutes);

export default app;
```

```js
// src/server.js
import dotenv from "dotenv";
import app from "./app.js";
import conectarDatabase from "./config/database.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

try {
  await conectarDatabase();
  app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
} catch (erro) {
  console.log("Erro ao iniciar:", erro.message);
  process.exit(1);
}
```

Roteiro de teste:

1. `POST /usuarios` com `{ "nome": "Ana", "email": "ana@email.com", "senha": "123456" }`: `201`, sem senha na resposta.
2. Repita o mesmo cadastro: `409`.
3. `POST /login` com a senha errada: `401`. Com a senha certa: `200` e um `token`.
4. `GET /perfil` sem token: `401`.
5. `GET /perfil` com `Authorization: Bearer <token>`: `200` com nome e email, sem o hash.

> Para lembrar qual camada faz o quê: se a linha mexe com `req`/`res`, é **controller**. Se decide uma regra (email repetido, senha confere), é **service**. Se chama `find`/`create`, é **repository**.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Autenticação (bcrypt + JWT) e MVC - Módulo 09</i>
</div>
