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

# Exercício Prático: API de Gestão de Estudantes

**Turma:** LionsDev
**Tópicos:** APIs REST com Express.js, JSON, CRUD, parâmetros de rota, query params, validação de dados e status codes HTTP.

---

## 1. Contexto

A secretaria de uma escola precisa de uma API simples para cadastrar, listar, atualizar, remover e buscar estudantes. O sistema ainda não usará banco de dados real: todos os dados ficarão armazenados em um array de objetos enquanto o servidor estiver rodando.

O objetivo deste exercício é transformar operações de CRUD em rotas HTTP usando o Express.

---

## 2. Configuração Inicial

Crie uma pasta para o projeto e configure uma API Node.js com Express.

Requisitos iniciais:

* O arquivo principal deve se chamar `index.js`.
* A API deve rodar na porta `3000`.
* Use `express.json()` para permitir o recebimento de dados em JSON.
* Crie um array chamado `estudantes` para armazenar os registros.
* Crie uma variável `proximoId` iniciando em `1` para gerar IDs automáticos.

Cada estudante deve seguir esta estrutura:

```javascript
{
  id: 1,
  nome: "Ana Souza",
  matricula: "2026001",
  curso: "Desenvolvimento Web",
  ano: 2026
}
```

---

## 3. Requisitos Obrigatórios

### 3.1 Criar estudante (CREATE)

Crie a rota `POST /estudantes/criar`.

O corpo da requisição deve receber:

```json
{
  "nome": "Ana Souza",
  "matricula": "2026001",
  "curso": "Desenvolvimento Web",
  "ano": 2026
}
```

Regras:

* Todos os campos (`nome`, `matricula`, `curso`, `ano`) são obrigatórios.
* Se algum campo estiver faltando, responda com status `400` e uma mensagem de erro.
* O `id` deve ser gerado automaticamente usando `proximoId`.
* Ao cadastrar com sucesso, responda com status `201` e retorne o estudante criado.

### 3.2 Listar estudantes (READ)

Crie a rota `GET /estudantes`.

Regras:

* A rota deve retornar todos os estudantes cadastrados.
* Se não houver estudantes, retorne um array vazio `[]`.
* Use status `200` para a resposta.

### 3.3 Atualizar estudante (UPDATE)

Crie a rota `PUT /estudantes/:id`.

O corpo da requisição pode receber um ou mais campos para alteração:

```json
{
  "curso": "Backend com Node.js",
  "ano": 2027
}
```

Regras:

* Busque o estudante pelo `id` recebido em `req.params`.
* Converta o `id` para número antes de comparar.
* Se o estudante não existir, responda com status `404` e uma mensagem de erro.
* Atualize apenas os campos enviados no corpo da requisição.
* Retorne o estudante atualizado com status `200`.

### 3.4 Deletar estudante (DELETE)

Crie a rota `DELETE /estudantes/:id`.

Regras:

* Busque o índice do estudante usando `.findIndex()`.
* Se o estudante não existir, responda com status `404` e uma mensagem de erro.
* Remova o estudante do array usando `.splice()`.
* Retorne uma mensagem de sucesso com status `200`.

### 3.5 Buscar estudantes (QUERY PARAMS)

Crie a rota `GET /estudantes/busca`.

A busca deve aceitar os seguintes filtros opcionais:

* `nome`
* `matricula`
* `curso`

Exemplos de URLs:

```text
http://localhost:3000/estudantes/busca?nome=ana
http://localhost:3000/estudantes/busca?curso=web
http://localhost:3000/estudantes/busca?matricula=2026
```

Regras:

* A busca por `nome` deve aceitar parte do texto e ignorar letras maiúsculas/minúsculas.
* A busca por `curso` também deve aceitar parte do texto e ignorar letras maiúsculas/minúsculas.
* A busca por `matricula` deve aceitar parte da matrícula digitada.
* Se mais de um filtro for enviado, aplique todos os filtros em sequência.
* Retorne os resultados encontrados com status `200`.

---

## 4. Testes Esperados

Teste sua API no Postman.

Sugestões de testes:

1. Cadastre pelo menos 3 estudantes.
2. Liste todos os estudantes.
3. Atualize apenas o curso de um estudante.
4. Tente atualizar um `id` que não existe.
5. Delete um estudante existente.
6. Tente deletar um `id` que não existe.
7. Busque estudantes por `nome`, `matricula` e `curso`.

---

## 5. Dicas para a Implementação

* `req.body` guarda os dados enviados no corpo da requisição.
* `req.params` guarda valores enviados na rota, como o `id` em `/estudantes/:id`.
* `req.query` guarda filtros enviados depois do `?` na URL.
* Use `parseInt()` para converter o `id` recebido pela rota.
* Para buscas por texto, use `.toLowerCase()` junto com `.includes()`.
* Para atualizar apenas campos enviados, você pode usar a regra do `valorNovo || valorAntigo`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático de APIs REST com Express.js - Módulo 07</i>
</div>
