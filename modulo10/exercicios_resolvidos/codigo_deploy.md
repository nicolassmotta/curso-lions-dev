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

# Gabarito: Deploy e Variáveis de Ambiente

**Lista:** `modulo10/lista_de_exercicios/codigo_deploy.md`  
**Uso:** material de referência para correção. Outras soluções que produzam o mesmo resultado também são válidas.

---

## Parte 0

```js
// 5. carrega o .env em process.env (sempre na PRIMEIRA linha)
import "dotenv/config";
import express from "express";

const app = express();

// 1
console.log(process.env.PORT);

// 2
const PORT = process.env.PORT || 3000;

// 3
const uri = process.env.MONGO_URI;

// 8
const segredo = process.env.JWT_SECRET;

// 9
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 4 e 10
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
```

**5.** Arquivo `.env`, na raiz do projeto:

```bash
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/loja
JWT_SECRET=uma_chave_grande_e_dificil_de_adivinhar
```

**6.** Arquivo `.gitignore`:

```bash
node_modules
.env
```

O `.env` guarda senhas e chaves. Se for para o Git, qualquer pessoa com acesso ao repositório (ou todo mundo, se ele for público) consegue ler o usuário e a senha do banco e o segredo que assina os tokens. Com o segredo, dá para criar um token falso de qualquer usuário.

**7.** No `package.json`:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

> Se o seu arquivo principal for `src/server.js`, o script fica `"start": "node src/server.js"`.

---

## Parte 1

1. `const PORT = process.env.PORT || 3000;`
2. `const MONGO_URI = process.env.MONGO_URI;`
3. `"start": "node index.js"` (com o caminho do arquivo principal da sua API)

---

## Parte 2

### 4. Porta fixa no código

O Render escolhe a porta em que a aplicação precisa escutar e informa essa porta pela variável `PORT`. Com `3000` fixo, a API sobe em uma porta diferente da que o Render espera, e o deploy falha com erro de porta não detectada (`No open ports detected`).

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));
```

> O `|| 3000` mantém a API funcionando na sua máquina, onde normalmente ninguém define `PORT`.

### 5. Segredo no código

Os dois valores ficam salvos no histórico do Git. Mesmo que você apague a linha depois, os commits antigos continuam com a senha. Riscos:

- com a `MONGO_URI`, qualquer pessoa entra no banco e pode ler, alterar ou apagar os dados;
- com o `JWT_SECRET`, qualquer pessoa assina tokens válidos e entra como qualquer usuário.

Correção:

```js
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
```

Os valores vão para o `.env` (fora do Git) e para o painel do Render. Se a senha já foi enviada ao GitHub, **troque a senha do banco e o segredo**: apagar do código não basta.

---

## Parte 3

| Constante | Valor | Por quê |
| --------- | ----- | ------- |
| (a) `PORT` | `"8080"` | veio do `.env` |
| (b) `URI` | `"local"` | `MONGO_URI` não existe, então o `\|\|` usa o valor padrão |
| (c) `DEBUG` | `undefined` | a variável não existe e não há valor padrão |

Sem o `import "dotenv/config";`, o `.env` não é lido. O `process.env.PORT` fica `undefined` e (a) vira `3000`.

> Detalhe: `process.env` só guarda **texto**. O `PORT` do item (a) é a string `"8080"`, não o número `8080`. O `app.listen` aceita os dois, mas para fazer contas é preciso converter com `Number()`.

---

## Parte 4

### 7. Checklist de Produção

Exemplo com uma API de tarefas:

```js
// src/server.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// 1
const PORT = process.env.PORT || 3000;

// 5
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ... demais rotas da API ...

// 2
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
} catch (erro) {
  console.log("Erro ao iniciar:", erro.message);
  process.exit(1);
}
```

`package.json` (4):

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js"
  }
}
```

`.gitignore` (3):

```bash
node_modules
.env
```

README (6):

```markdown
## Variáveis de ambiente

Configure no painel do Render (Environment):

| Variável     | Exemplo                                      |
| ------------ | -------------------------------------------- |
| `MONGO_URI`  | `mongodb+srv://usuario:senha@cluster/banco`  |
| `JWT_SECRET` | uma chave grande e aleatória                 |

A variável `PORT` não precisa ser configurada: o Render define sozinho.
```

Deploy em 3 passos:

1. Envie o projeto para o GitHub (sem o `.env`).
2. No Render, crie um **Web Service** conectado ao repositório, com Build Command `npm install` e Start Command `npm start`.
3. Em **Environment**, cadastre `MONGO_URI` e `JWT_SECRET`, faça o deploy e teste `https://sua-api.onrender.com/health`.

> No MongoDB Atlas, libere o acesso de qualquer IP (`0.0.0.0/0`) em **Network Access**. O Render não tem um IP fixo, e sem essa liberação a conexão com o banco é recusada.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Deploy e Variáveis de Ambiente - Módulo 10</i>
</div>
