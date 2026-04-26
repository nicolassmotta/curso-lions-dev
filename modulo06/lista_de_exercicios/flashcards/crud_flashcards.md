<style>
  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #000000; }
  h1 { color: #001A33; border-bottom: 2px solid #001A33; padding-bottom: 8px; font-size: 24px; }
  h2, h3 { color: #002B5E; margin-top: 24px; }
  p, li { line-height: 1.6; font-size: 15px; }
  blockquote { background-color: #f4f6f7; border-left: 4px solid #002B5E; padding: 12px 15px; margin: 15px 0; color: #000000; }
  code { background-color: #f0f2f5 !important; color: #000000 !important; font-weight: bold; padding: 2px 4px; border-radius: 4px; }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
    .no-print { display: none; }
  }
</style>

# Exercício Prático: Sistema de Gerenciamento de Flashcards

**Turma:** LionsDev  
**Tópicos:** CRUD (Create, Read, Update, Delete), Arrays de Objetos, Modularização, Busca e Filtros, e Menu Interativo com `prompt-sync`.

---

## 1. Estrutura do Projeto (Base de Dados)

Para começar, crie os arquivos de dados base para persistir as informações durante a execução.

### 1.1 Baralhos (`baralho.js`)
```javascript
const baralhos = [
  { id: 1, titulo: "JavaScript" },
  { id: 2, titulo: "Matemática" }
];

export default baralhos;
```

### 1.2 Flashcards (`flashcard.js`)
```javascript
const flashcards = [
  { id: 1, pergunta: "O que é uma variável?", resposta: "Um espaço de memória para armazenar valores.", idBaralho: 1 },
  { id: 2, pergunta: "Quanto é 1 + 1?", resposta: "2", idBaralho: 2 }
];

export default flashcards;
```

---

## 2. Requisitos do Sistema

Desenvolva um sistema interativo que permita gerenciar os flashcards e seus respectivos baralhos.

### 2.1 Criação (CREATE)
* **Adicionar Baralho:** Receber o `titulo` e gerar um `id` automático.
* **Adicionar Flashcard:** Receber `pergunta`, `resposta` e `idBaralho`. O `id` deve ser gerado automaticamente.

### 2.2 Leitura (READ)
* **Listar Baralhos:** Exibir todos os baralhos cadastrados.
* **Listar Flashcards:** Exibir todos os flashcards do sistema.
* **Listar por Baralho:** Listar apenas os flashcards que pertencem a um `idBaralho` específico.

### 2.3 Atualização (UPDATE)
* **Atualizar Baralho:** Alterar o `titulo` de um baralho buscando pelo seu `id`.
* **Atualizar Flashcard:** Alterar os dados (`pergunta`, `resposta`) de um flashcard buscando pelo seu `id`.

### 2.4 Deleção (DELETE)
* **Remover Baralho:** Remover um baralho pelo `id`. 
  * **Regra Importante:** Ao remover um baralho, todos os flashcards vinculados a ele também devem ser excluídos.
* **Remover Flashcard:** Remover um flashcard individual pelo seu `id`.

### 2.5 Busca
* **Buscar por Pergunta:** Localizar flashcards que contenham uma determinada pergunta.
* **Buscar por Baralho:** Filtrar flashcards baseados no `idBaralho`.

---

## 3. Tarefas do Exercício

1. **Configuração:** Configure o ambiente e crie os arquivos necessários seguindo a modularização.
2. **Implementação:** Desenvolva as funções de CRUD e Busca em arquivos separados.
3. **Menu Interativo:** Crie um arquivo `index.js` com um menu que permita ao usuário navegar por todas as funcionalidades.
4. **Testes:** Valide cada operação (especialmente a exclusão em cascata de flashcards ao deletar um baralho).

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático de CRUD com Flashcards - Módulo 06</i>
</div>
