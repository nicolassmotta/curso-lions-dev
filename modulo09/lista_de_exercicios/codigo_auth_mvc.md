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

# Lista de Código: Autenticação (bcrypt + JWT) e MVC

**Turma:** LionsDev  
**Tópicos:** hash de senha com `bcryptjs` (`bcrypt.hash`, `bcrypt.compare`), tokens com `jsonwebtoken` (`jwt.sign`, `jwt.verify`), middleware de proteção (`Authorization: Bearer`) e organização em camadas (MVC).

> Nesta lista você escreve a parte de segurança de uma API. Instale com `npm install bcryptjs jsonwebtoken`. Nunca salve nem devolva a senha em texto puro, só o hash.

---

## Parte 0 — Treino rápido (aquecimento)

Uma peça por vez: hash, token, middleware, camadas.

1. Importe o `bcrypt` de `"bcryptjs"` e o `jwt` de `"jsonwebtoken"`.
2. Gere o hash de uma senha: `await bcrypt.hash("123456", 10)`.
3. Compare senha com hash: `await bcrypt.compare("123456", hash)` e imprima o resultado.
4. Gere um token: `jwt.sign({ id: 1 }, "segredo", { expiresIn: "1h" })`.
5. Verifique um token: `jwt.verify(token, "segredo")` e imprima o payload.
6. Leia o cabeçalho de autorização: `req.headers.authorization`.
7. Separe o `"Bearer TOKEN"` em `tipo` e `token` (dica: `.split(" ")`).
8. Retorne status 401 quando não houver token.
9. Chame `next()` para liberar a requisição no middleware.
10. Leia o segredo do ambiente: `process.env.JWT_SECRET`.

---

## Parte 1 — Complete o código

### 1. Cadastro com hash
Complete o cadastro, salvando o hash e nunca a senha pura.

```js
async function cadastrar(nome, senha) {
  const senhaHash = /* TODO: gere o hash de 'senha' com salt 10 */;
  const usuario = { id: 1, nome, senhaHash };
  return usuario; // repare: sem a senha em texto puro
}
```

### 2. Login
Complete o login: confere a senha e devolve um token.

```js
async function login(senhaDigitada, usuario) {
  const confere = /* TODO: compare senhaDigitada com usuario.senhaHash */;
  if (!confere) return { erro: "Credenciais inválidas" };

  const token = /* TODO: assine um token com { id: usuario.id } e expiração de 1h */;
  return { token };
}
```

### 3. Middleware de proteção
Complete o middleware que valida o token.

```js
function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ erro: "Token ausente" });

  const [tipo, token] = authHeader.split(" ");
  if (tipo !== "Bearer" || !token) return res.status(401).send({ erro: "Formato inválido" });

  try {
    const payload = /* TODO: verifique o token com o segredo do ambiente */;
    req.usuario = payload;
    // TODO: libere a requisição
  } catch (erro) {
    return res.status(401).send({ erro: "Token inválido" });
  }
}
```

---

## Parte 2 — Ache o bug

### 4. Senha vazando
Este cadastro salva a senha em texto puro e ainda devolve ela na resposta. Aponte os dois problemas de segurança e conserte.

```js
async function cadastrar(nome, senha) {
  const usuario = { nome, senha };  // BUG 1
  return usuario;                   // BUG 2
}
```

### 5. Comparação errada
O login nunca deixa ninguém entrar, mesmo com a senha certa. Encontre o erro.

```js
const confere = bcrypt.compare(senhaDigitada, usuario.senhaHash); // BUG
if (confere) { /* ... */ }
```

---

## Parte 3 — Prever o comportamento

### 6. Passa ou barra?
Para cada requisição no middleware `autenticar` acima, diga o status retornado (ou se chama `next()`).

```
(a) sem cabeçalho Authorization
(b) Authorization: "Token abc123"      (tipo errado)
(c) Authorization: "Bearer token_valido"
(d) Authorization: "Bearer token_expirado"
```

---

## Parte 4 — Escreva do zero

### 7. Separe em MVC (Desafio)
Você recebeu uma rota de cadastro com tudo misturado num arquivo só. Reescreva separando nas camadas do MVC, cada uma no seu arquivo:

- `models/usuario.model.js`: o schema/estrutura do usuário.
- `services/usuario.service.js`: a regra de negócio (gerar hash, criar usuário).
- `controllers/usuario.controller.js`: pega `req.body`, chama o service, devolve `res`.
- `routes/usuario.routes.js`: liga a rota `POST /usuarios` ao controller.

Depois, crie a rota `POST /login` (controller + service) que confere a senha e devolve o token, e proteja uma rota `GET /perfil` com o middleware `autenticar`.

---

> **Dica:** hash é de mão única. Você nunca "descriptografa" a senha; gera o hash de novo a partir da senha digitada e compara com `bcrypt.compare`. `bcrypt.hash` e `bcrypt.compare` são assíncronos, precisam de `await`. E o segredo do JWT vive no ambiente, nunca no código.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Autenticação e MVC - Módulo 09</i>
</div>
