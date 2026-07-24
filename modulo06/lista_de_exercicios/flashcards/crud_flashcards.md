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

# Projeto Colaborativo: Sistema de Gerenciamento de Flashcards

**Turma:** LionsDev  
**Tópicos:** CRUD (Create, Read, Update, Delete), Arrays de Objetos, Modularização, Menu Interativo, Versionamento com Git/GitHub e Trabalho em Equipe.

---

## 1. Dinâmica de Equipe e Versionamento (GitHub)

Para simular um ambiente real de desenvolvimento, este projeto será construído de forma colaborativa.

* **Equipes:** O trabalho deve ser realizado em grupos de **2 a 3 pessoas**.
* **Repositório:** Um integrante da equipe (o "dono" do projeto) deve criar o repositório no GitHub e adicionar os demais colegas como colaboradores (`Settings > Collaborators`).
* **Documentação:** É **obrigatória** a criação de um arquivo `README.md` na raiz do projeto. Este arquivo deve conter uma breve descrição do sistema e listar o nome completo e o link do perfil do GitHub de todos os autores da equipe.

---

## 2. Estrutura do Projeto (Base de Dados)

Para começar, crie os arquivos de dados base para persistir as informações durante a execução.

### 2.1 Baralhos (`baralho.js`)
```javascript
const baralhos = [
  { id: 1, titulo: "JavaScript" },
  { id: 2, titulo: "Matemática" }
];

export default baralhos;
```

### 2.2 Flashcards (`flashcard.js`)
```javascript
const flashcards = [
  { id: 1, pergunta: "O que é uma variável?", resposta: "Um espaço de memória para armazenar valores.", idBaralho: 1 },
  { id: 2, pergunta: "Quanto é 1 + 1?", resposta: "2", idBaralho: 2 }
];

export default flashcards;
```

---

## 3. Requisitos do Sistema

Desenvolva um sistema interativo que permita gerenciar os flashcards e seus respectivos baralhos.

### 3.1 Criação (CREATE)
* **Adicionar Baralho:** Receber o `titulo` e gerar um `id` automático.
* **Adicionar Flashcard:** Receber `pergunta`, `resposta` e `idBaralho`. O `id` deve ser gerado automaticamente.

### 3.2 Leitura (READ)
* **Listar Baralhos:** Exibir todos os baralhos cadastrados.
* **Listar Flashcards:** Exibir todos os flashcards do sistema.
* **Listar por Baralho:** Listar apenas os flashcards que pertencem a um `idBaralho` específico.

### 3.3 Atualização (UPDATE)
* **Atualizar Baralho:** Alterar o `titulo` de um baralho buscando pelo seu `id`.
* **Atualizar Flashcard:** Alterar os dados (`pergunta`, `resposta`) de um flashcard buscando pelo seu `id`.

### 3.4 Deleção (DELETE)
* **Remover Baralho:** Remover um baralho pelo `id`.
  * **Regra Importante:** Ao remover um baralho, todos os flashcards vinculados a ele também devem ser excluídos.
* **Remover Flashcard:** Remover um flashcard individual pelo seu `id`.

### 3.5 Busca
* **Buscar por Pergunta:** Localizar flashcards que contenham uma determinada pergunta.

---

## 4. Tarefas do Exercício

1. **Configuração e Repositório:** O dono do projeto cria o repositório, o arquivo `README.md` com os nomes dos autores e convida os colaboradores.
2. **Setup do Projeto:** Configure o ambiente Node.js e crie os arquivos necessários seguindo a modularização (ex: `package.json`, pastas para as funções).
3. **Implementação Dividida:** Dividam o desenvolvimento das funções de CRUD e Busca entre os membros da equipe em arquivos separados. Usem commits regulares para salvar o progresso de cada um.
4. **Menu Interativo:** Crie um arquivo `index.js` com um menu (`prompt-sync`) que permita ao usuário navegar por todas as funcionalidades.
5. **Testes e Integração:** Juntos, validem cada operação e garantam que o código de todos funciona de forma integrada (especialmente a exclusão em cascata de flashcards ao deletar um baralho).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático Colaborativo de CRUD com Flashcards - Módulo 06</i>
</div>
