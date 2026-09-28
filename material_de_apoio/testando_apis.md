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

# Guia: Testando APIs no Postman

**Turma:** LionsDev  
**Use a partir do:** Módulo 07 (primeira API) até o projeto final.

> O Postman funciona no aplicativo desktop, na versão web ou como extensão do VS Code. O Insomnia faz as mesmas coisas com nomes parecidos (veja a seção 7). Os exemplos usam uma API de produtos rodando em `http://localhost:3000`.

---

## 1. Anatomia de uma requisição

| Parte | Onde fica no Postman | Exemplo |
| ----- | -------------------- | ------- |
| **Método** | menu à esquerda da URL | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| **URL** | campo principal | `http://localhost:3000/produtos` |
| **Parâmetro de rota** (`req.params`) | dentro da URL | `.../produtos/66f1c2a9e4b0a1b2c3d4e5f6` |
| **Query params** (`req.query`) | aba **Params** (ou depois do `?`) | `.../produtos/busca?nome=mouse` |
| **Corpo** (`req.body`) | aba **Body** → **raw** → **JSON** | `{ "nome": "Mouse", "preco": 50 }` |
| **Cabeçalhos** (`req.headers`) | aba **Headers** | `Authorization: Bearer eyJ...` |

> O corpo precisa ir como **raw + JSON**. Em `form-data` ou `x-www-form-urlencoded`, o `express.json()` não lê nada e o `req.body` chega vazio.

---

## 2. Primeira requisição

1. Suba a API (`npm start`) e confira no terminal a mensagem de "rodando na porta 3000".
2. No Postman, clique em **New** → **HTTP**.
3. Escolha `GET`, digite `http://localhost:3000/` e clique em **Send**.
4. Leia a resposta na parte de baixo: o **status** (ex.: `200 OK`), o **tempo** e o **corpo**.

Para um `POST`:

1. Método `POST`, URL `http://localhost:3000/produtos`.
2. Aba **Body** → **raw** → no menu à direita, troque **Text** por **JSON**.
3. Escreva o JSON com **aspas duplas** nas chaves e nos textos:

```json
{
  "nome": "Mouse",
  "preco": 50
}
```

4. **Send**. O esperado é `201 Created` com o produto criado, já com o `_id`.

---

## 3. Organize em uma coleção

Uma **Collection** é uma pasta de requisições do mesmo projeto. Crie uma por API e salve cada requisição com um nome claro:

```
API Loja
├── Auth
│   ├── Cadastro
│   └── Login
├── Produtos
│   ├── Criar produto
│   ├── Listar produtos
│   ├── Buscar por id
│   ├── Atualizar produto
│   └── Remover produto
└── Erros esperados
    ├── Criar sem nome (400)
    └── Listar sem token (401)
```

> Na entrega de um projeto, exportar a coleção (**...** → **Export**) é uma forma rápida de mostrar ao professor todos os testes.

---

## 4. Variáveis: pare de copiar a URL e o token

Crie um **Environment** (menu **Environments** → **+**) chamado `Local` com duas variáveis:

| Variável | Valor inicial |
| -------- | ------------- |
| `base_url` | `http://localhost:3000` |
| `token` | *(vazio)* |

Selecione o ambiente `Local` no canto superior direito e use as variáveis com chaves duplas:

```
{{base_url}}/api/produtos
```

Para testar a API publicada, crie outro ambiente, `Render`, com `base_url` apontando para `https://sua-api.onrender.com`. Trocar de ambiente troca todas as requisições de uma vez.

---

## 5. Rotas protegidas com token (Módulo 09 em diante)

### 5.1 Enviar o token

Na aba **Authorization** da requisição (ou da coleção inteira), escolha **Bearer Token** e preencha o campo com `{{token}}`. O Postman monta sozinho o cabeçalho:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

> Configurando na **coleção**, todas as requisições com **Inherit auth from parent** usam o mesmo token. Nas rotas públicas (cadastro e login), escolha **No Auth**.

### 5.2 Guardar o token automaticamente no login

Na requisição de **Login**, abra a aba **Scripts** → **Post-response** (em versões antigas do Postman, a aba se chama **Tests**) e cole:

```js
const resposta = pm.response.json();

if (resposta.token) {
  pm.environment.set("token", resposta.token);
}
```

Depois de cada login, a variável `token` é atualizada e todas as rotas protegidas já usam o token novo.

### 5.3 Testando papéis (usuário × admin)

Crie as variáveis `token_usuario` e `token_admin`, salve cada uma no login correspondente e use `{{token_admin}}` só nas requisições de admin. Assim você testa o `403` sem ficar trocando de login.

---

## 6. Roteiro de testes de cada rota

Testar só o caminho feliz não prova que as regras existem. Para cada rota, faça pelo menos:

| Caso | O que enviar | Status esperado |
| ---- | ------------ | --------------- |
| caminho feliz | dados corretos | `200` ou `201` |
| campo obrigatório faltando | JSON sem um campo | `400` |
| valor fora da regra | `enum` inválido, número negativo | `400` |
| id em formato inválido | `/produtos/abc` | `400` |
| id que não existe | um `_id` válido, mas apagado | `404` |
| sem token | aba Authorization em **No Auth** | `401` |
| token de outro usuário | token da Bia no recurso da Ana | `404` |
| usuário comum em rota de admin | `{{token_usuario}}` | `403` |
| duplicado | cadastrar o mesmo email duas vezes | `409` |
| repetir uma remoção | `DELETE` duas vezes | `200`, depois `404` |

> Salve cada caso de erro como uma requisição na pasta **Erros esperados**. É esse roteiro que os enunciados pedem em "Testes Esperados".

---

## 7. Insomnia e curl

**Insomnia:** o fluxo é o mesmo. O corpo fica em **Body** → **JSON**; o token, na aba **Auth** → **Bearer Token**; as variáveis ficam em **Environment** e são usadas com `{{ _.base_url }}`.

**curl** (terminal Linux, macOS ou Git Bash), útil para testes rápidos:

```bash
# GET
curl http://localhost:3000/produtos

# POST com JSON
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Mouse", "preco": 50}'

# rota protegida
curl http://localhost:3000/api/usuarios/perfil \
  -H "Authorization: Bearer SEU_TOKEN"

# mostrar também o status HTTP
curl -i http://localhost:3000/produtos/abc
```

---

## 8. Problemas comuns ao testar

| Sintoma | Causa provável |
| ------- | -------------- |
| `Could not send request` / `ECONNREFUSED` | a API não está rodando, ou a porta está errada |
| `req.body` chega vazio ou `undefined` | Body não está em **raw + JSON**, ou falta `app.use(express.json())` |
| `Cannot POST /produto` | método ou caminho diferente do definido na rota |
| `401` mesmo depois do login | o token não foi enviado (aba Authorization), ou o ambiente selecionado não é o que tem o token |
| `400 ID inválido` | o `_id` foi copiado pela metade ou com aspas |
| resposta com dados de outro teste | o banco guarda tudo; limpe a coleção no Atlas ou no Compass se precisar começar do zero |

Para mais mensagens de erro, veja o [Guia de Erros Comuns](erros_comuns.md). Para escolher o status de cada resposta, veja a [Tabela de Status HTTP](status_http.md).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Material de Apoio: Testando APIs no Postman</i>
</div>
