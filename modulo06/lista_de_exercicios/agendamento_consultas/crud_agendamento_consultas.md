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

# Exercício Prático: Sistema de Agendamento de Consultas

**Turma:** LionsDev  
**Tópicos:** CRUD (Create, Read, Update, Delete), Arrays de Objetos, Modularização com `export default`/`import from`, Validação de Dados e Menu Interativo com `prompt-sync`.

---

## 1. Base de Dados
Para começar, utilize a estrutura de dados base apresentada em aula. Salve este conteúdo em um arquivo chamado `dados.js`:

```javascript
const medicos = [
  { id: 1, nome: "Dr. House", especialidade: "Diagnóstico" },
  { id: 2, nome: "Dra. Grey", especialidade: "Cirurgia" },
];

const pacientes = [
  { id: 1, nome: "John Doe", dataNascimento: "1985-01-15" },
  { id: 2, nome: "Jane Smith", dataNascimento: "1990-05-30" },
];

let consultas = [
  { id: 1, data: "2023-01-10", idMedico: 1, idPaciente: 1, descricao: "Consulta inicial" },
  { id: 2, data: "2023-02-15", idMedico: 2, idPaciente: 1, descricao: "Seguimento" },
  { id: 3, data: "2023-03-20", idMedico: 1, idPaciente: 2, descricao: "Consulta de rotina" },
];

export default { medicos, pacientes, consultas };
```

## 2. Requisitos Obrigatórios

Crie um arquivo principal `index.js` contendo um menu interativo com o `prompt`, semelhante ao sistema de contatos, com as seguintes opções:

### 2.1 Agendar nova consulta (CREATE)
Crie uma função `adicionarConsulta` que receba os dados inseridos pelo usuário no terminal.
* **Regra 1:** O sistema deve gerar um `id` sequencial para a nova consulta automaticamente.
* **Regra 2 (Validação):** Antes de salvar a consulta, o sistema deve verificar se o `idMedico` digitado realmente existe no array de `medicos`. Faça o mesmo para o `idPaciente`. Se um dos dois não existir, exiba um erro e aborte o cadastro.

### 2.2 Listar todas as consultas (READ)
Crie uma função `listarConsultas` que percorra o array de consultas.
* **Regra:** O terminal não deve imprimir apenas os números de `idMedico` e `idPaciente`. Você deve usar lógicas de busca (como o `encontrarMedicoPorId` visto em aula) para imprimir o **Nome do Médico** e o **Nome do Paciente** ao lado da data e descrição.

### 2.3 Atualizar uma consulta (UPDATE)
Crie uma função `atualizarConsulta` que receba o `id` da consulta que o usuário deseja alterar.
* **Regra:** Permita que o usuário altere apenas a **data** e a **descrição** da consulta. Use a regra do operador lógico `||` ensinada em aula para manter o dado antigo caso o usuário deixe o campo em branco. Não permita alterar o médico ou o paciente (se errar isso, a regra de negócio diz que a consulta deve ser cancelada e refeita).

### 2.4 Cancelar consulta (DELETE)
Crie uma função `cancelarConsulta` que receba o `id` da consulta.
* **Regra:** Encontre o índice da consulta usando `.findIndex()` e remova-a do array utilizando o método `.splice()`. Imprima uma mensagem de sucesso ou uma mensagem de erro caso o ID fornecido não exista.

## 3. Dicas para a Implementação

* **Modularização:** Assim como feito nos slides, crie um arquivo `.js` separado para cada uma das quatro funções do CRUD e importe-os no seu menu principal.
* **Funções Auxiliares:** Crie funções como `encontrarPacientePorId(id)` para evitar repetir o código do `for` ou `.find()` toda vez que precisar descobrir o nome de um paciente na hora de listar as consultas.
* **Atenção aos Tipos:** Lembre-se que o dado que vem do `prompt` é sempre um texto (`String`). Se for comparar com os IDs do array (que são números), use `parseInt()` ou verifique usando `==` ao invés de `===`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático de CRUD com Arrays - Módulo 06</i>
</div>
