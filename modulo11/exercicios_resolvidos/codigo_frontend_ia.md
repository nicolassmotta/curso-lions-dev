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

# Gabarito: Frontend com IA

**Lista:** `modulo11/lista_de_exercicios/codigo_frontend_ia.md`  
**Uso:** material de referência para correção. Prompts são texto livre: qualquer prompt que informe objetivo, dados (rota e campos), ação e estilo é uma boa resposta. Use os exemplos abaixo como régua.

---

## Parte 0

Cada prompt responde a quatro perguntas: **qual tela**, **de onde vêm os dados** (rota e campos), **o que cada ação faz** e **qual estilo**.

1. "Crie uma tela de listagem de produtos que faz `GET http://localhost:3000/produtos`. A resposta é um array de objetos `{ _id, nome, preco }`. Mostre cada produto em um card com o nome e o preço formatado em reais (R$ 10,00). Use grid de 3 colunas no desktop."
2. "Crie um formulário de cadastro de produto com os campos `nome` (texto, obrigatório) e `preco` (número, obrigatório). Ao enviar, faça `POST http://localhost:3000/produtos` com o corpo `{ nome, preco }` em JSON. Com resposta 201, limpe o formulário e mostre 'Produto cadastrado'."
3. "Crie uma tela de login com `email` e `senha`. Ao enviar, faça `POST http://localhost:3000/login` com `{ email, senha }`. A resposta de sucesso é `{ token }`. Guarde o token no `localStorage` com a chave `token` e redirecione para a listagem."
4. "Na listagem de produtos, adicione em cada card um botão 'Excluir'. Ao clicar, peça confirmação e faça `DELETE http://localhost:3000/produtos/:id` usando o `_id` do produto. Com resposta 200, remova o card da tela sem recarregar a página."
5. "Crie uma tela de detalhe que lê o `id` da URL (`/produtos/:id`) e faz `GET http://localhost:3000/produtos/:id`. Mostre nome e preço. Se a API responder 404, mostre 'Produto não encontrado'."
6. "Aplique a paleta da marca na tela de listagem: fundo branco (#FFFFFF), textos em preto (#000000) e botões e destaques em laranja (#E16D34). Não altere a lógica, só o estilo."
7. "Quando a API responder status 400, leia a mensagem do corpo da resposta (campo `message`) e mostre em vermelho acima do formulário. Não mostre mensagem genérica."
8. "Enquanto a requisição estiver em andamento, desabilite o botão de enviar e mostre o texto 'Carregando...'. Volte ao normal quando a resposta chegar, com sucesso ou com erro."
9. "Deixe a tela de listagem responsiva: 1 card por linha no celular (até 600px), 2 no tablet e 3 no desktop. O formulário deve ocupar a largura toda no celular."
10. "Adicione acima da listagem um campo de busca. Ao digitar, filtre os cards pelo `nome`, sem diferenciar maiúsculas de minúsculas. O filtro é feito na tela, sem nova chamada à API."

---

## Parte 1

### 1. Complete o prompt

```
Crie uma tela de listagem de tarefas que consome a rota GET /tarefas.
Cada item deve mostrar o título e se está concluída (com um checkbox).
Ao clicar em "Excluir", chame a rota DELETE /tarefas/:id.
Use as cores preto, branco e laranja (#E16D34) e deixe responsivo (celular e desktop).
```

### 2. Complete o consumo da API

```js
async function carregarProdutos() {
  const resposta = await fetch("http://localhost:3000/produtos");
  const produtos = await resposta.json();
  console.log(produtos);
}
```

> O `fetch` devolve a resposta HTTP, e não os dados. O `.json()` lê o corpo e o transforma em objeto. Ele também é assíncrono e precisa de `await`.

### 3. Complete o envio autenticado

```js
"Authorization": "Bearer " + token,
```

> O espaço depois de `Bearer` é obrigatório. O middleware separa o cabeçalho por espaço (`split(" ")`) e espera exatamente duas partes.

---

## Parte 2

### 4. Prompt vago

"Tela bonita de produtos" não diz de onde vêm os dados, quais campos mostrar nem o que a tela faz. A IA inventa rotas, campos e dados falsos. Reescrito:

```
Crie uma tela de listagem de produtos que faz GET http://localhost:3000/produtos.
A resposta é um array de { _id, nome, preco, estoque }.
Mostre cada produto em um card com nome, preço em reais e estoque.
Produtos com estoque 0 aparecem com o selo "Esgotado".
Cada card tem um botão "Excluir" que chama DELETE /produtos/:id.
Use fundo branco, textos pretos e botões laranja (#E16D34). Layout responsivo.
Não use dados de exemplo: os dados vêm só da API.
```

### 5. Prompt sem contrato

Falta o **contrato** com o backend:

- qual rota recebe o cadastro (método e URL);
- quais campos o corpo precisa ter, com nomes exatos e tipos;
- o que a API responde no sucesso e no erro;
- o que a tela faz depois de salvar.

```
Crie um formulário de cadastro de usuário com os campos nome (texto),
email (email) e senha (password, mínimo 6 caracteres), todos obrigatórios.
Ao clicar em "Salvar", faça POST http://localhost:3000/usuarios com o corpo
{ "nome", "email", "senha" } em JSON.
Se a resposta for 201, mostre "Cadastro realizado" e vá para a tela de login.
Se for 409, mostre "Este email já está cadastrado".
Se for 400, mostre a mensagem que vem no campo "message" da resposta.
```

---

## Parte 3

### 6. Rota → Tela

| Rota | Tela | Elementos principais |
| ---- | ---- | -------------------- |
| `GET /tarefas` | Listagem de tarefas | lista ou cards com título e status, busca, botão "Nova tarefa", ações de editar e excluir em cada item, mensagem para lista vazia |
| `POST /tarefas` | Cadastro de tarefa | formulário com campo `titulo`, botão "Salvar", mensagens de sucesso e de erro, loading |
| `GET /tarefas/:id` | Detalhe da tarefa | título, status, datas, botões "Editar" e "Voltar", mensagem de "não encontrada" |
| `PUT /tarefas/:id` | Edição de tarefa | o mesmo formulário do cadastro, já preenchido com os dados atuais, checkbox "concluída", botão "Salvar alterações" |

> Repare que cadastro e edição podem reaproveitar o mesmo formulário. A diferença é a rota chamada (`POST` ou `PUT`) e se os campos começam vazios ou preenchidos.

---

## Parte 4

### 7. Frontend da sua API

Não existe resposta única: cada aluno usa a própria API. Na correção, confira se a entrega tem:

1. **Lista de rotas** com método, caminho, campos do corpo e se a rota exige token.
2. **Mapa rota → tela** cobrindo pelo menos listagem, cadastro, detalhe e login.
3. **Prompts** no formato da Parte 0: tela, rota com URL, campos, ação e estilo.
4. **Telas geradas** por um dos métodos (IA web, editor com IA ou FlutterFlow).
5. **Conexão real:** os dados da tela vêm da API, e não de dados de exemplo gerados pela IA. Se aparecer erro de CORS no navegador, o backend precisa de `app.use(cors())`.
6. **Teste ponta a ponta** com prints: cadastrar, listar, editar e excluir, com os dados conferidos também no banco (MongoDB Compass ou Atlas).

> Erros mais comuns na correção: URL apontando para `localhost` em um frontend publicado (o celular ou outro computador não enxergam o `localhost` do aluno); campos com nomes diferentes dos da API (`name` em vez de `nome`); token salvo, mas não enviado no cabeçalho `Authorization`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Frontend com IA - Módulo 11</i>
</div>
