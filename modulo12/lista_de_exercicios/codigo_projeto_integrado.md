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

# Lista de Código: Projeto Integrado (Full Stack)

**Turma:** LionsDev  
**Tópicos:** integração de tudo: modelagem (Mongoose), API REST (Express), autenticação (bcrypt + JWT), organização MVC, deploy (env/Render) e frontend consumindo a API.

> Cada exercício constrói uma camada de uma aplicação completa e liga na anterior. Quando você terminar a Parte 4, tem um projeto full stack de ponta a ponta. Reaproveite o que já viu nos módulos 06 a 11.

---

## Parte 0 — Treino rápido (uma peça de cada camada)

Faça cada mini-tarefa isolada, pensando "de qual módulo isso veio".

1. **Model:** escreva um `Schema` de `Tarefa` com `titulo` (String, obrigatório) e `concluida` (Boolean, padrão `false`).
2. **Rota:** escreva a rota `GET /tarefas` que lista do banco com `await Tarefa.find()`.
3. **Create:** escreva `POST /tarefas` que cria com `await Tarefa.create(req.body)` e responde 201.
4. **Auth:** gere o hash da senha no cadastro com `bcrypt.hash`.
5. **Token:** no login, assine um token com `jwt.sign({ id }, process.env.JWT_SECRET)`.
6. **Middleware:** proteja `GET /perfil` exigindo `Authorization: Bearer`.
7. **Env:** faça a porta ser `process.env.PORT || 3000`.
8. **MVC:** diga em qual camada (model/service/controller/route) fica a regra "gerar o hash".
9. **Frontend:** escreva o prompt de uma tela que lista `GET /tarefas` em cards.
10. **Deploy:** liste as 3 variáveis de ambiente que o Render precisa (`PORT`, `MONGO_URI`, `JWT_SECRET`).

---

## Parte 1 — Complete a integração

### 1. Ligando controller e service
Complete o controller para chamar o service e responder.

```js
// service
async function listarTarefas() {
  return await Tarefa.find();
}

// controller
async function getTarefas(req, res) {
  const tarefas = /* TODO: await chamar o service */;
  // TODO: responda 200 com as tarefas
}
```

### 2. Rota protegida
Complete a definição da rota aplicando o middleware de autenticação.

```js
// só usuários logados podem ver o perfil
router.get("/perfil", /* TODO: middleware */, perfilController);
```

---

## Parte 2 — Ache o problema (de integração)

### 3. O frontend não recebe nada
A tela chama `GET /tarefas` e vem `[]` sempre, mesmo com dados no banco. Liste 3 causas prováveis olhando a cadeia inteira (rota errada? faltou `await`? API não está no ar? URL do frontend apontando pro lugar errado?).

### 4. Rota protegida barra todo mundo
Depois de logar, o usuário chama `GET /perfil` e recebe 401 mesmo com o token. Aponte onde investigar (o front está enviando `Authorization: Bearer TOKEN`? o segredo do `verify` é o mesmo do `sign`? o token expirou?).

---

## Parte 3 — Prever o fluxo ponta a ponta

### 5. A jornada de uma requisição
Descreva, em ordem, por quais camadas passa uma requisição de cadastro de tarefa, do clique no frontend até a resposta:

```
Frontend (fetch POST /tarefas)
  -> ?  (o que recebe primeiro no backend)
  -> ?  (quem valida o token)
  -> ?  (quem pega req.body e chama a lógica)
  -> ?  (quem fala com o banco)
  -> ?  (o que volta pro frontend)
```

Preencha cada `?` com a camada/responsável correto.

---

## Parte 4 — Construa o Projeto Final

### 6. Aplicação Full Stack (Desafio final)
Escolha um tema (agenda, finanças, petshop, biblioteca...) e construa a aplicação completa, integrando todos os módulos:

1. **Requisitos:** liste as entidades e as rotas (o que o sistema faz).
2. **Model:** schemas no Mongoose com validações.
3. **API:** CRUD completo em Express, organizado em MVC.
4. **Auth:** cadastro/login com bcrypt + JWT; rotas privadas protegidas por middleware.
5. **Config:** porta, URI e segredo via `process.env`; `.env` no `.gitignore`; script `start`.
6. **Deploy:** suba a API no Render com as variáveis configuradas.
7. **Frontend:** gere as telas (IA/FlutterFlow) consumindo a API publicada.
8. **Teste ponta a ponta:** cadastrar usuário → logar → criar/listar/editar/deletar dados pela tela.

Entregue: repositório no GitHub, link da API no Render, e um roteiro de teste mostrando o fluxo completo funcionando.

---

> **Dica:** num projeto full stack a requisição passa por frontend, rota, middleware, controller, service, model e banco, e a resposta volta pelo mesmo caminho. Quando algo não funciona, não adivinhe: siga o caminho com um `console.log` em cada camada até achar onde o dado se perde.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Projeto Integrado Full Stack - Módulo 12</i>
</div>
