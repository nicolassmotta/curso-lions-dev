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

# Exercício Prático: API de Agendamento de Petshop

**Turma:** LionsDev

**Tópicos:** APIs REST com Express.js, Integração com MongoDB (Mongoose), Schemas e Modelos, Validações básicas com Mongoose, Operações CRUD assíncronas (async/await), Query Params (filtros) e Status Codes HTTP.

---

## 1. Contexto

Um petshop chamado **PetLions** deseja modernizar seus processos. Atualmente, o agendamento de serviços de banho e tosa é feito em uma folha de papel, o que costuma causar perda de informações.

Eles precisam de uma API REST simples que conecte a um banco de dados MongoDB (usando Mongoose) para gerenciar esses agendamentos de forma persistente, garantindo que as informações não sejam perdidas quando o servidor reiniciar. A estrutura deve seguir o modelo usado em aula: `server.js`, `db.js` e `models/`, com as rotas escritas diretamente no `server.js`.

---

## 2. Configuração Inicial

Crie uma API Node.js com Express e Mongoose.

Requisitos estruturais:
* Crie um arquivo `.env` contendo as variáveis `MONGO_URI` e `PORT` (porta `3000`).
* Crie a pasta `src`.
* Crie o arquivo `src/db.js` para gerenciar a conexão com o MongoDB.
* Crie o arquivo `src/server.js` como ponto de entrada da aplicação.
* Crie a pasta `src/models` e nela o arquivo `agendamento.js`.
* Todas as rotas devem ficar no `src/server.js`, como fizemos em sala.

### O Modelo (Schema) do Agendamento

O Schema do Mongoose para os `agendamentos` deve conter os seguintes campos:

* `nomePet`: Tipo `String`, obrigatório.
* `especie`: Tipo `String`, obrigatório (deve aceitar apenas: `Cão`, `Gato` ou `Outro`).
* `nomeDono`: Tipo `String`, obrigatório.
* `telefoneDono`: Tipo `String`, obrigatório.
* `servico`: Tipo `String`, obrigatório (deve aceitar apenas: `Banho`, `Tosa` ou `Banho e Tosa`).
* `data`: Tipo `String`, obrigatório (ex: `"2026-06-15"`).
* `valor`: Tipo `Number` (será calculado de forma automática pela API).
* `status`: Tipo `String`, com valor padrão de `"Agendado"` (deve aceitar apenas: `Agendado`, `Concluído` ou `Cancelado`).

---

## 3. Requisitos Obrigatórios e Regras de Negócio

### 3.1 Cadastrar Agendamento (CREATE)

Crie a rota `POST /agendamentos`.

O corpo da requisição enviará os dados do agendamento (exceto o `valor` e o `status`).

```json
{
  "nomePet": "Frederico",
  "especie": "Cão",
  "nomeDono": "Ana Paula",
  "telefoneDono": "(11) 99999-9999",
  "servico": "Banho e Tosa",
  "data": "2026-06-15"
}
```

Regras:
1. **Cálculo Automático do Valor**: Antes de salvar no banco, o backend deve preencher o campo `valor` seguindo esta lógica simples baseada na espécie:
   * Se for `Cão`: Banho (R$ 50) | Tosa (R$ 60) | Banho e Tosa (R$ 100)
   * Se for `Gato`: Banho (R$ 60) | Tosa (R$ 70) | Banho e Tosa (R$ 110)
   * Se for `Outro`: Banho (R$ 40) | Tosa (R$ 50) | Banho e Tosa (R$ 80)
2. **Retorno**: Salve o agendamento no banco e retorne o documento criado com status `201`.

### 3.2 Listar Todos os Agendamentos (READ)

Crie a rota `GET /agendamentos`.

Regras:
* A rota deve retornar todos os agendamentos salvos no MongoDB usando `Agendamento.find()`.
* Retorne o array de resultados com status `200`.

### 3.3 Buscar Agendamentos por Nome do Pet (QUERY PARAMS)

Crie a rota `GET /agendamentos/busca`.

Esta rota deve aceitar um filtro opcional via Query Params chamado `nome`:
* Exemplo de URL: `http://localhost:3000/agendamentos/busca?nome=fred`
* A busca deve retornar todos os agendamentos em que o nome do pet contenha o texto pesquisado.
* **Exemplo**: Buscar por `"fred"` deve retornar agendamentos do pet `"Frederico"`.

### 3.4 Update do Status do Agendamento (UPDATE)

Crie a rota `PATCH /agendamentos/:id`.

O corpo da requisição deve enviar apenas o novo status (ex: `{ "status": "Concluído" }`).

Regras:
* Busque o agendamento pelo ID e atualize o status usando `findByIdAndUpdate`.
* Se o ID não for encontrado, responda com status `404`.
* Retorne o documento atualizado com status `200`.

### 3.5 Remover Agendamento (DELETE)

Crie a rota `DELETE /agendamentos/:id`.

Regras:
* Remova o agendamento do banco de dados pelo ID usando `findByIdAndDelete`.
* Se não encontrar o registro, retorne status `404`.
* Se remover com sucesso, retorne status `200` com uma mensagem de confirmação.

---

## 4. Testes Esperados

Realize testes na sua API seguindo este fluxo de validação:

1. Cadastre um agendamento para um `Cão` com o serviço `Banho` (verifique se o valor gravado foi R$ 50).
2. Cadastre outro agendamento para um `Gato` com o serviço `Banho e Tosa` (verifique se o valor gravado foi R$ 110).
3. Liste todos os agendamentos cadastrados.
4. Faça uma busca pelo termo `"fred"` e verifique se traz apenas os pets correspondentes.
5. Atualize o status de um agendamento para `Concluído`.
6. Delete um dos agendamentos informando o ID.

---

## 5. Dicas para a Implementação

* No arquivo `db.js`, use `mongoose.connect(process.env.MONGO_URI)` envolvido em um `try/catch` assíncrono.
* No `findByIdAndUpdate`, passe `{ new: true, runValidators: true }` para que o Mongoose aplique as validações e retorne o registro já atualizado.
* Lembre-se de usar `app.use(express.json())` no `src/server.js` para conseguir ler o corpo das requisições.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático de Mongoose e MongoDB - Módulo 08</i>
</div>
