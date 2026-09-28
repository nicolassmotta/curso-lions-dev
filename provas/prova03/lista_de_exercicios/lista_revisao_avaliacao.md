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

# Lista de Revisão — Preparação para a Avaliação 3

**Turma:** LionsDev
**Tópicos:** MongoDB e Mongoose, autenticação com bcrypt e JWT, camadas do boilerplate, testes automatizados, Swagger, debug e deploy (Módulos 8, 9, 9B e 10).

---

> **Objetivo:** Esta lista prepara para a Avaliação 3. Os exercícios usam uma API de filmes; a prova usa outro recurso, com os mesmos raciocínios. Os exercícios 3, 4, 6 e 7 podem ser feitos e testados **sem banco**, com mocks.

---

### 1. Schema com validação
Crie o model `Filme` com `titulo` (texto, obrigatório, mensagem "O título é obrigatório."), `ano` (número, entre 1888 e o ano atual), `generos` (lista de textos), `nota` (número de 0 a 10) e `excluidoEm` (data, padrão `null`), com `timestamps`. Mostre as mensagens de erro de um filme inválido usando `validateSync()`, que funciona sem conectar no banco.

---

### 2. Embedding ou referência?
Para cada caso, diga se usaria embedding ou referência e por quê: (a) os endereços de entrega de um cliente; (b) as avaliações de um filme, escritas por usuários; (c) o diretor de um filme, que também tem página própria.

---

### 3. Rota de busca com tratamento de erro
Escreva `GET /filmes/:id` com `async`/`await` e `try`/`catch`: 200 com o filme, **404** se não existir (ou se tiver `excluidoEm`), **400** se o id tiver formato inválido (`CastError`).

---

### 4. Atualização parcial e soft delete
- `PATCH /filmes/:id` altera **só** `titulo`, `ano`, `generos` e `nota`; qualquer outro campo do body é ignorado.
- `DELETE /filmes/:id` não apaga: grava a data em `excluidoEm` e responde 204.
- `GET /filmes` lista só os filmes com `excluidoEm: null`.

> **Dica:** monte um objeto só com os campos permitidos antes de chamar o `findOneAndUpdate`.

---

### 5. bcrypt e JWT
Crie `gerarHash(senha)`, `conferirSenha(senha, hash)`, `gerarToken(usuario)` (com `id`, `email` e `papel`, expirando em 1 dia) e `lerToken(token)`. Mostre no terminal que o hash muda a cada execução, mas o `compare` continua dando `true`.

---

### 6. Autenticar e autorizar
Crie o middleware `autenticar` (401 sem token, com formato errado ou com token inválido) e o middleware `autorizar(...papeis)` (403 se o papel do token não estiver na lista). Proteja `POST`, `PATCH` e `DELETE` de filmes para o papel `admin`.

---

### 7. Testes com Vitest e supertest
Escreva testes, com o model mockado, para: `GET /filmes/:id` inexistente (404), `POST /filmes` sem token (401), com token de usuário comum (403) e com token de admin (201), e `PATCH` ignorando um campo proibido.

---

### 8. Deploy
Responda: (a) por que o `app.listen` usa `process.env.PORT`? (b) onde ficam `MONGO_URI` e `JWT_SECRET` no Render? (c) para que serve a rota `/health`? (d) o que é o cold start do plano free? (e) o que liberar no Atlas para o Render conectar?

---

### Exercícios Extras (Opcional)

### 9. Swagger
Documente `GET /filmes/:id` no `openapi.js`, com as respostas 200, 400 e 404.

### 10. Debug
A rota `GET /api/usuarios/perfil` responde 401 mesmo com o token certo. Onde você colocaria breakpoints, e quais variáveis olharia, para descobrir o motivo?

---

> **Dica geral:** rode `npm test` a cada mudança. Um teste vermelho diz **o que** quebrou; o debugger mostra **por quê**.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Revisão — Preparação para a Avaliação 3</i>
</div>
