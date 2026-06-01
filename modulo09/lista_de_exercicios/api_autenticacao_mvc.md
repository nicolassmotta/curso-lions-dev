<style>
  :root {
    --lionsdev-titulo: #001A33;
    --lionsdev-texto: #000000;
    --lionsdev-muted: #6B7280;
    --lionsdev-bloco: #F4F6F7;
    --lionsdev-codigo: #F0F2F5;
  }

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--lionsdev-texto); }
  h1, h2, h3 { color: var(--lionsdev-titulo); }
  h1 { border-bottom: 2px solid var(--lionsdev-titulo); padding-bottom: 8px; font-size: 24px; }
  h2, h3 { margin-top: 24px; }
  p, li { line-height: 1.6; font-size: 15px; }
  hr { border: 0; border-top: 2px solid var(--lionsdev-titulo); margin: 24px 0; }
  blockquote { background-color: var(--lionsdev-bloco); border-left: 4px solid var(--lionsdev-titulo); padding: 12px 15px; margin: 15px 0; color: var(--lionsdev-texto); }
  code { background-color: var(--lionsdev-codigo) !important; color: var(--lionsdev-texto) !important; font-weight: bold; padding: 2px 4px; border-radius: 4px; }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
    .no-print { display: none; }
  }
</style>

# Exercício Prático: API de Autenticação com MVC

**Turma:** LionsDev

**Tópicos:** Express.js, MongoDB, Mongoose, MVC, bcrypt, JWT, middlewares, variáveis de ambiente e deploy com Render.

---

## 1. Contexto

Uma aplicação precisa cadastrar usuários, permitir login e proteger rotas que só usuários autenticados podem acessar.

O objetivo é construir uma API REST organizada em camadas, usando o padrão MVC com `controllers`, `services`, `repositories`, `models`, `routes`, `middlewares` e `config`.

> Regra principal: a senha real do usuário nunca deve ser salva no banco. Salve apenas o hash da senha.

---

## 2. Estrutura Obrigatória

Crie a seguinte estrutura:

```txt
projeto/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── usuario.controller.js
│   ├── middlewares/
│   │   ├── autenticacao.middleware.js
│   │   ├── erro.middleware.js
│   │   └── validarCampos.middleware.js
│   ├── models/
│   │   └── usuario.model.js
│   ├── repositories/
│   │   └── usuario.repository.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── usuario.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── usuario.service.js
│   └── utils/
│       └── criarErro.js
├── .env
├── .env.example
├── package.json
└── render.yaml
```

---

## 3. Dependências

Instale:

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken
```

No `package.json`, configure:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js"
  }
}
```

---

## 4. Variáveis de Ambiente

Crie um arquivo `.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/api_auth_mvc
JWT_SECRET=troque_essa_chave_por_uma_chave_grande
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
```

O `.env` não deve ser enviado para o GitHub.

---

## 5. Model de Usuário

O model `Usuario` deve conter:

- `nome`: `String`, obrigatório, mínimo 2 caracteres.
- `email`: `String`, obrigatório, único, em minúsculo.
- `senhaHash`: `String`, obrigatório, com `select: false`.
- `timestamps: true`.

Importante: o campo deve se chamar `senhaHash`, não `senha`.

---

## 6. Rotas Obrigatórias

### 6.1 Cadastro

Crie a rota `POST /api/auth/cadastro`.

Body:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

Regras:

1. Validar `nome`, `email` e `senha`.
2. Não permitir email duplicado.
3. Gerar hash da senha com bcrypt.
4. Salvar `nome`, `email` e `senhaHash`.
5. Retornar o usuário criado sem `senhaHash`.
6. Retornar também um token JWT.

### 6.2 Login

Crie a rota `POST /api/auth/login`.

Body:

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

Regras:

1. Buscar usuário pelo email.
2. Trazer o campo `senhaHash` usando `.select("+senhaHash")`.
3. Comparar a senha digitada com `bcrypt.compare`.
4. Se estiver correto, retornar token JWT.
5. Se estiver errado, retornar status `401`.

### 6.3 Perfil do Usuário Logado

Crie a rota `GET /api/usuarios/perfil`.

Essa rota deve ser protegida por middleware JWT.

O cliente deve enviar:

```txt
Authorization: Bearer TOKEN_AQUI
```

Regras:

1. Validar o token.
2. Pegar o `id` do usuário de dentro do token.
3. Buscar o usuário no banco.
4. Retornar os dados do usuário sem `senhaHash`.

### 6.4 Atualizar Perfil

Crie a rota `PATCH /api/usuarios/perfil`.

Body permitido:

```json
{
  "nome": "Maria Souza",
  "senha": "novaSenha123"
}
```

Regras:

1. A rota deve ser protegida por JWT.
2. Permitir atualizar `nome` e/ou `senha`.
3. Se atualizar senha, salvar novo `senhaHash`.
4. Não retornar `senhaHash`.

### 6.5 Listar Usuários

Crie a rota `GET /api/usuarios`.

Regras:

1. A rota deve ser protegida por JWT.
2. Retornar todos os usuários sem `senhaHash`.

---

## 7. Testes Esperados

Teste o fluxo nessa ordem:

1. Cadastrar um usuário.
2. Conferir no MongoDB se existe `senhaHash` e não existe `senha`.
3. Fazer login com senha errada e receber `401`.
4. Fazer login com senha correta e receber um token.
5. Acessar `GET /api/usuarios/perfil` sem token e receber `401`.
6. Acessar `GET /api/usuarios/perfil` com token válido e receber os dados.
7. Atualizar o nome do usuário logado.
8. Fazer deploy no Render configurando as variáveis de ambiente.

---

## 8. Deploy no Render

No Render:

- **Build Command:** `npm install`
- **Start Command:** `npm start`

Variáveis de ambiente:

| Key                  | Value                              |
| -------------------- | ---------------------------------- |
| `MONGO_URI`          | connection string do MongoDB Atlas |
| `JWT_SECRET`         | chave grande e secreta             |
| `JWT_EXPIRES_IN`     | `1d`                               |
| `BCRYPT_SALT_ROUNDS` | `10`                               |
| `NODE_ENV`           | `production`                       |

Não configure `PORT`. O Render define essa variável automaticamente.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático de Autenticação, MVC e Deploy - Módulo 09</i>
</div>
