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

# Atividade Prática: Deploy Guiado de uma API no Render

**Turma:** LionsDev  
**Tópicos:** preparação da API para produção, `dotenv`, `process.env.PORT`, script `start`, `.gitignore` e `.env.example`, MongoDB Atlas (acesso de rede), Web Service no Render, variáveis de ambiente, logs e testes com a URL pública.

---

## 1. Objetivo

Publicar no Render uma API que você já construiu no Módulo 08 (Academia, Biblioteca, Cantina, Imóvel ou Petshop) e testá-la pela internet com o Postman.

Esta atividade é o passo a passo prático da lista `codigo_deploy.md`. Siga as etapas na ordem e marque cada item do checklist antes de passar para a próxima.

---

## 2. Etapa 1: Preparar o código

Abra a API escolhida e confira cada item:

```txt
[ ] O package.json tem "type": "module" e o script "start" apontando para o arquivo de entrada.
[ ] A primeira linha do arquivo de entrada é import "dotenv/config";
[ ] A porta vem de process.env.PORT, com 3000 como fallback.
[ ] A conexão usa process.env.MONGO_URI, sem nenhuma URI escrita no código.
[ ] Existe uma rota GET /health que responde { status: "ok" }.
[ ] O .gitignore contém node_modules/ e .env.
[ ] Existe um arquivo .env.example com os nomes das variáveis e valores de exemplo.
```

Exemplo de `package.json` para uma API com `src/server.js`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js"
  }
}
```

Exemplo de `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nome_do_banco
```

Rode `npm start` localmente e teste `GET http://localhost:3000/health` antes de continuar. Se não funciona na sua máquina, não vai funcionar no Render.

---

## 3. Etapa 2: Enviar para o GitHub

1. Confira que o `.env` **não** aparece em `git status`. Se aparecer, ele não está no `.gitignore`.
2. Faça o commit e envie para a `main` do seu repositório.
3. Abra o repositório no GitHub e confirme que o `.env` e a pasta `node_modules` não foram enviados.

---

## 4. Etapa 3: Liberar o acesso ao MongoDB Atlas

O Render acessa o banco a partir de endereços IP que mudam. Por padrão, o Atlas só aceita conexões dos IPs cadastrados, então a API publicada não consegue se conectar.

1. No painel do Atlas, abra **Network Access** (Security > Network Access).
2. Clique em **Add IP Address** e escolha **Allow Access from Anywhere** (`0.0.0.0/0`).
3. Confirme e aguarde o status ficar **Active**.

> Liberar `0.0.0.0/0` é aceitável em projetos de estudo, porque o acesso continua protegido pelo usuário e pela senha do banco. Em um sistema real, a empresa restringe os IPs permitidos.

---

## 5. Etapa 4: Criar o Web Service no Render

1. Acesse o Render e entre com a sua conta do GitHub.
2. Clique em **New > Web Service** e selecione o repositório da API.
3. Preencha:

| Campo | Valor |
| ----- | ----- |
| Name | nome da API (ex.: `api-petshop-seunome`) |
| Branch | `main` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

4. Em **Environment Variables**, adicione `MONGO_URI` com a sua string de conexão do Atlas. **Não** cadastre `PORT`: o Render define a porta automaticamente.
5. Clique em **Create Web Service** e acompanhe os **Logs** até aparecer a mensagem de que o servidor está rodando.

---

## 6. Etapa 5: Testar a API publicada

A URL pública aparece no topo da página do serviço, no formato `https://nome-da-api.onrender.com`.

1. Abra `https://nome-da-api.onrender.com/health` no navegador.
2. No Postman, crie um **Environment** com a variável `baseUrl` igual à URL pública.
3. Troque `http://localhost:3000` por `{{baseUrl}}` nas requisições e repita os testes do enunciado da API.
4. Confira no Atlas (**Browse Collections**) que os dados criados pela API publicada foram salvos.

> No plano gratuito, o serviço "dorme" depois de um período sem uso. A primeira requisição depois disso pode levar até um minuto para responder; as seguintes voltam ao normal.

---

## 7. Etapa 6: Deploy automático

1. Faça uma alteração pequena na API, por exemplo, mude a mensagem da rota `/health` para `{ status: "ok", versao: 2 }`.
2. Faça commit e push para a `main`.
3. Acompanhe no Render o novo deploy começar sozinho.
4. Quando terminar, confira a nova resposta em `/health`.

---

## 8. Problemas comuns

| Sintoma nos logs ou no teste | Causa provável | Como resolver |
| ---------------------------- | -------------- | ------------- |
| `Error: Cannot find module` ou `ERR_MODULE_NOT_FOUND` | Caminho de import errado ou arquivo com nome diferente (o Linux do Render diferencia maiúsculas de minúsculas). | Confira o nome exato do arquivo e o caminho do import. |
| `No open ports detected` | A API está escutando em uma porta fixa. | Use `process.env.PORT \|\| 3000` no `app.listen`. |
| `MongooseServerSelectionError` | IP do Render bloqueado no Atlas. | Libere `0.0.0.0/0` em Network Access. |
| A conexão falha com `undefined` no lugar da URI | `MONGO_URI` não cadastrada no Render ou com nome diferente. | Confira o nome da variável no painel e no código. |
| `npm ERR! Missing script: "start"` | Script `start` ausente no `package.json`. | Adicione o script e envie de novo. |
| A primeira requisição demora muito | Serviço gratuito "acordando". | Aguarde e repita a requisição. |

---

## 9. Entrega

- Link do repositório no GitHub.
- URL pública da API no Render.
- Print da rota `/health` respondendo pela URL pública.
- Print de uma requisição `POST` e de uma `GET` no Postman usando `{{baseUrl}}`.
- Print dos dados salvos no Atlas.
- Se algum problema da seção 8 aconteceu, descreva o sintoma e como foi resolvido.

---

## 10. Critérios de aceite

- A API responde pela URL pública do Render.
- Nenhum segredo (URI do banco, senha, segredo de token) aparece no repositório.
- O `.env.example` documenta todas as variáveis necessárias.
- As operações feitas pela URL pública ficam salvas no MongoDB Atlas.
- Um push na `main` gera um novo deploy automaticamente.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Atividade Prática: Deploy Guiado de uma API no Render - Módulo 10</i>
</div>
