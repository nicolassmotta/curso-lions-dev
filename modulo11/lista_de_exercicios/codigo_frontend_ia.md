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

# Lista Prática: Frontend com IA

**Turma:** LionsDev  
**Tópicos:** transformar rotas da API em telas, escrever bons prompts para IA (web, termin/editor e plataformas visuais como FlutterFlow), pedir correções e testar a tela contra o backend.

> Aqui o "código" é o prompt e a ligação com a API. Cada exercício pede algo concreto: um prompt bem escrito, um mapa de qual rota alimenta qual tela, ou o teste da tela funcionando.

---

## Parte 0 — Treino rápido (aquecimento)

Escreva um prompt curto e específico para cada pedido. Sempre diga o objetivo, os dados e o estilo.

1. Uma tela de listagem que consome `GET /produtos` e mostra os produtos em cards.
2. Um formulário de cadastro que envia `POST /produtos` com `nome` e `preco`.
3. Uma tela de login que envia `POST /login` e guarda o token retornado.
4. Um botão de deletar em cada item que chama `DELETE /produtos/:id`.
5. Uma tela de detalhe que consome `GET /produtos/:id`.
6. Aplicar as cores da marca (preto, branco e laranja) numa tela existente.
7. Mostrar uma mensagem de erro quando a API responde status 400.
8. Adicionar um loading enquanto a requisição está em andamento.
9. Deixar a tela responsiva (celular e desktop).
10. Adicionar um campo de busca que filtra a lista por nome.

---

## Parte 1 — Complete o prompt / a chamada

### 1. Complete o prompt
Este prompt é vago demais. Complete os campos entre `[ ]` para ele virar específico.

```
Crie uma tela de [qual tela?] que consome a rota [método + caminho].
Cada item deve mostrar [quais campos?].
Ao clicar em [qual ação?], chame a rota [método + caminho].
Use as cores [paleta] e deixe [responsivo/desktop].
```

### 2. Complete o consumo da API
Complete a chamada que busca a lista de produtos e mostra no console.

```js
async function carregarProdutos() {
  const resposta = await fetch("/* TODO: URL da rota GET /produtos */");
  const produtos = await resposta./* TODO: converter para JSON */;
  console.log(produtos);
}
```

### 3. Complete o envio autenticado
Complete o cabeçalho que envia o token para uma rota protegida.

```js
await fetch("/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": /* TODO: "Bearer " + token */,
  },
  body: JSON.stringify({ nome, preco }),
});
```

---

## Parte 2 — Ache o problema (no prompt)

### 4. Prompt vago
A IA gerou uma tela genérica e errada. Reescreva o prompt abaixo deixando-o específico (rota, campos, ação, estilo).

```
"Faça uma tela bonita de produtos pra mim."
```

### 5. Prompt sem contrato
Este prompt não diz de onde vêm os dados nem o formato. Aponte o que falta e corrija.

```
"Crie um formulário de cadastro de usuário com um botão de salvar."
```

---

## Parte 3 — Prever o resultado

### 6. Rota → Tela
Para cada rota da sua API, descreva que tela faz sentido e quais elementos ela precisa.

| Rota | Tela | Elementos principais |
|------|------|----------------------|
| `GET /tarefas` | ? | ? |
| `POST /tarefas` | ? | ? |
| `GET /tarefas/:id` | ? | ? |
| `PUT /tarefas/:id` | ? | ? |

---

## Parte 4 — Construa

### 7. Frontend da sua API (Desafio)
Pegue uma API sua (módulos 07–10) e gere um frontend funcional usando IA, seguindo o fluxo do módulo:

1. Liste as rotas da sua API (método, caminho, campos).
2. Para cada rota, defina a tela correspondente (mapa rota→tela).
3. Escreva os prompts de cada tela (listagem, cadastro, detalhe, login).
4. Gere as telas (IA web, editor com IA ou FlutterFlow, escolha um método).
5. Conecte o frontend à API rodando (local ou no Render).
6. Teste: cadastrar, listar, editar e deletar de ponta a ponta.

Entregue: o mapa rota→tela, os prompts usados e um print de cada tela funcionando com dados reais da API.

---

> **Dica:** a IA acerta o frontend na medida em que o pedido é específico. Um bom prompt diz qual tela você quer, de qual rota vêm os dados e quais campos, o que cada botão faz, e o estilo. Quanto mais vago o pedido, mais genérica e errada vem a tela.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista Prática: Frontend com IA - Módulo 11</i>
</div>
