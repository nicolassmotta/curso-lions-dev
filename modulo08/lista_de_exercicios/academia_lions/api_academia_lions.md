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

# Exercício Prático: API de Matrículas da Academia Lions

**Turma:** LionsDev

**Tópicos:** APIs REST com Express.js, Integração com MongoDB (Mongoose), Schemas e Modelos, Validações básicas com Mongoose, Operações CRUD assíncronas (async/await), Query Params (filtros), Regras de Negócio simples e Status Codes HTTP.

---

## 1. Contexto

A **Academia Lions** está recebendo novas matrículas e precisa organizar os dados dos alunos, planos contratados e valores a pagar. Hoje esse controle é feito manualmente, o que dificulta saber quem está ativo, pausado ou cancelado.

Você deverá criar uma API REST simples conectada ao MongoDB para gerenciar matrículas da academia. A estrutura deve seguir o modelo usado em aula: `server.js`, `db.js` e `models/`, com as rotas escritas diretamente no `server.js`.

---

## 2. Configuração Inicial

Crie uma API Node.js com Express e Mongoose.

Requisitos estruturais:
* Crie um arquivo `.env` contendo as variáveis `MONGO_URI` e `PORT` (porta `3000`).
* Crie a pasta `src`.
* Crie o arquivo `src/db.js` para gerenciar a conexão com o MongoDB.
* Crie o arquivo `src/server.js` como ponto de entrada da aplicação.
* Crie a pasta `src/models` e nela o arquivo `matricula.js`.
* Todas as rotas devem ficar no `src/server.js`, como fizemos em sala.

### O Modelo (Schema) da Matrícula

O Schema do Mongoose para as `matriculas` deve conter os seguintes campos:

* `nomeAluno`: Tipo `String`, obrigatório.
* `idade`: Tipo `Number`, obrigatório.
* `modalidade`: Tipo `String`, obrigatório (deve aceitar apenas: `Musculação`, `Funcional` ou `Dança`).
* `plano`: Tipo `String`, obrigatório (deve aceitar apenas: `Mensal`, `Trimestral` ou `Semestral`).
* `dataMatricula`: Tipo `String`, obrigatório (ex: `"2026-06-15"`).
* `valorMensal`: Tipo `Number` (será calculado automaticamente pela API).
* `valorTotal`: Tipo `Number` (será calculado automaticamente pela API).
* `status`: Tipo `String`, com valor padrão de `"Ativa"` (deve aceitar apenas: `Ativa`, `Pausada` ou `Cancelada`).

---

## 3. Requisitos Obrigatórios e Regras de Negócio

### 3.1 Cadastrar Matrícula (CREATE)

Crie a rota `POST /matriculas`.

O corpo da requisição enviará os dados da matrícula (exceto `valorMensal`, `valorTotal` e `status`).

```json
{
  "nomeAluno": "Beatriz Lima",
  "idade": 17,
  "modalidade": "Funcional",
  "plano": "Trimestral",
  "dataMatricula": "2026-06-15"
}
```

Regras:
1. **Definição do Valor Mensal**: Antes de salvar no banco, o backend deve preencher `valorMensal` seguindo esta tabela:
   * `Musculação`: R$ 90
   * `Funcional`: R$ 120
   * `Dança`: R$ 100
2. **Cálculo do Valor Total**:
   * Plano `Mensal`: 1 mensalidade.
   * Plano `Trimestral`: 3 mensalidades com 10% de desconto.
   * Plano `Semestral`: 6 mensalidades com 15% de desconto.
3. **Retorno**: Salve a matrícula no banco e retorne o documento criado com status `201`.

### 3.2 Listar Todas as Matrículas (READ)

Crie a rota `GET /matriculas`.

Regras:
* A rota deve retornar todas as matrículas salvas no MongoDB usando `Matricula.find()`.
* Retorne o array de resultados com status `200`.

### 3.3 Buscar Matrículas por Modalidade (QUERY PARAMS)

Crie a rota `GET /matriculas/busca`.

Esta rota deve aceitar um filtro opcional via Query Params chamado `modalidade`:
* Exemplo de URL: `http://localhost:3000/matriculas/busca?modalidade=func`
* A busca deve retornar todas as matrículas em que a modalidade contenha o texto pesquisado.

### 3.4 Atualizar Status da Matrícula (UPDATE)

Crie a rota `PATCH /matriculas/:id`.

O corpo da requisição deve enviar apenas o novo status (ex: `{ "status": "Pausada" }`).

Regras:
* Busque a matrícula pelo ID e atualize o status usando `findByIdAndUpdate`.
* Se o ID não for encontrado, responda com status `404`.
* Retorne o documento atualizado com status `200`.

### 3.5 Remover Matrícula (DELETE)

Crie a rota `DELETE /matriculas/:id`.

Regras:
* Remova a matrícula do banco de dados pelo ID usando `findByIdAndDelete`.
* Se não encontrar o registro, retorne status `404`.
* Se remover com sucesso, retorne status `200` com uma mensagem de confirmação.

---

## 4. Testes Esperados

Realize testes na sua API seguindo este fluxo de validação:

1. Cadastre uma matrícula `Mensal` de `Musculação` e verifique se o total ficou R$ 90.
2. Cadastre uma matrícula `Trimestral` de `Funcional` e verifique se o desconto de 10% foi aplicado.
3. Liste todas as matrículas cadastradas.
4. Faça uma busca pela modalidade `func`.
5. Atualize o status de uma matrícula para `Pausada`.
6. Delete uma das matrículas informando o ID.

---

## 5. Dicas para a Implementação

* Use `if` ou `switch` para calcular o valor mensal da modalidade.
* Para o plano trimestral, calcule `valorMensal * 3` e aplique desconto.
* Para o plano semestral, calcule `valorMensal * 6` e aplique desconto.
* No `findByIdAndUpdate`, passe `{ new: true, runValidators: true }`.
* Lembre-se de usar `app.use(express.json())` no `src/server.js` para conseguir ler o corpo das requisições.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático de Mongoose e MongoDB - Módulo 08</i>
</div>
