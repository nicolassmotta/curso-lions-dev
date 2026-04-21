/*
 * ===================================================================
 * MÓDULO 06: ORGANIZAÇÃO DE PROJETOS E CRUD COM ARRAYS
 * ===================================================================
 *
 * Neste módulo, aprendemos a organizar projetos maiores com
 * múltiplos arquivos e a implementar as operações de CRUD
 * (Create, Read, Update, Delete) usando Arrays em memória.
 *
 * Antes de usar um banco de dados real, é essencial entender
 * a LÓGICA por trás dessas operações. Arrays são o laboratório
 * perfeito para isso.
 */

// -------------------------------------------------------------------
// 1. O QUE É CRUD?
// -------------------------------------------------------------------

/*
 * CRUD é um acrônimo para as quatro operações básicas de
 * qualquer sistema que manipula dados:
 *
 *   C → Create  (Criar)    → Adicionar um novo registro
 *   R → Read    (Ler)      → Consultar/listar registros existentes
 *   U → Update  (Atualizar)→ Modificar um registro existente
 *   D → Delete  (Deletar)  → Remover um registro
 *
 * Exemplos do dia a dia:
 *   📱 Contatos do celular → C: Novo contato, R: Ver contatos,
 *                            U: Editar telefone, D: Apagar contato
 *   📝 Lista de tarefas   → C: Nova tarefa, R: Ver tarefas,
 *                            U: Marcar como feita, D: Remover tarefa
 *   🛒 E-commerce         → C: Cadastrar produto, R: Listar produtos,
 *                            U: Atualizar preço, D: Remover produto
 */

// -------------------------------------------------------------------
// 2. ESTRUTURA DE DADOS: ARRAY DE OBJETOS
// -------------------------------------------------------------------

console.log("--- 2. Array de Objetos como 'Banco de Dados' ---");

/*
 * Vamos usar um Array de Objetos como nosso "banco de dados em memória".
 * Cada objeto representa um REGISTRO (ex: um contato, um produto).
 *
 * ⚠️ IMPORTANTE: Dados em memória são TEMPORÁRIOS!
 * Quando o programa encerra, tudo é perdido.
 * No Módulo 08 (MongoDB), aprenderemos a persistir dados de verdade.
 */

let contatos = [
  { id: 1, nome: "Ana Silva", telefone: "(11) 91234-5678", email: "ana@email.com" },
  { id: 2, nome: "Carlos Santos", telefone: "(11) 99876-5432", email: "carlos@email.com" },
  { id: 3, nome: "Maria Oliveira", telefone: "(11) 95555-1234", email: "maria@email.com" },
];

// Variável para controlar o próximo ID (auto-incremento simples)
let proximoId = 4;

console.log("Contatos iniciais:", contatos);
console.log("---------------------------------------------------");

// -------------------------------------------------------------------
// 3. CREATE — Adicionar Novo Registro
// -------------------------------------------------------------------

console.log("\n--- 3. CREATE (Criar) ---");

/*
 * Para adicionar um novo item ao array, usamos .push().
 * Cada novo registro recebe um ID único e auto-incrementado.
 */

function criarContato(nome, telefone, email) {
  const novoContato = {
    id: proximoId, // ID auto-incrementado
    nome: nome,
    telefone: telefone,
    email: email,
  };

  contatos.push(novoContato); // Adiciona ao final do array
  proximoId++; // Incrementa o contador de IDs

  return novoContato;
}

// Testando:
const novo = criarContato("Pedro Lima", "(11) 93333-4444", "pedro@email.com");
console.log("Novo contato criado:", novo);
console.log("Total de contatos:", contatos.length); // 4

console.log("------------------------");

// -------------------------------------------------------------------
// 4. READ — Consultar Registros
// -------------------------------------------------------------------

console.log("\n--- 4. READ (Ler) ---");

/*
 * Temos várias formas de CONSULTAR dados:
 *
 * a) Listar TODOS → retornar o array inteiro
 * b) Buscar por ID → usar .find()
 * c) Buscar por critério → usar .filter()
 */

// 4a. Listar todos
function listarContatos() {
  return contatos;
}

console.log("Todos:", listarContatos());

// 4b. Buscar por ID (retorna UM objeto ou undefined)
function buscarPorId(id) {
  return contatos.find((contato) => contato.id === id);
}

console.log("Buscar ID 2:", buscarPorId(2)); // { id: 2, nome: "Carlos Santos"... }
console.log("Buscar ID 99:", buscarPorId(99)); // undefined (não existe)

// 4c. Buscar por critério (retorna um ARRAY com os resultados)
function buscarPorNome(termoBusca) {
  return contatos.filter((contato) => contato.nome.toLowerCase().includes(termoBusca.toLowerCase()));
}

console.log("Buscar 'silva':", buscarPorNome("silva")); // [ { id: 1, ... } ]

console.log("--------------------");

// -------------------------------------------------------------------
// 5. UPDATE — Atualizar Registro
// -------------------------------------------------------------------

console.log("\n--- 5. UPDATE (Atualizar) ---");

/*
 * Para atualizar, precisamos:
 *   1. ENCONTRAR o registro pelo ID (usando .findIndex())
 *   2. MODIFICAR as propriedades desejadas
 *
 * .findIndex() retorna o ÍNDICE (posição) do elemento no array.
 * Se não encontrar, retorna -1.
 */

function atualizarContato(id, novosDados) {
  const indice = contatos.findIndex((contato) => contato.id === id);

  // Verificação: o contato existe?
  if (indice === -1) {
    console.log(`Contato com ID ${id} não encontrado.`);
    return null;
  }

  // Atualiza apenas os campos que foram fornecidos
  if (novosDados.nome) contatos[indice].nome = novosDados.nome;
  if (novosDados.telefone) contatos[indice].telefone = novosDados.telefone;
  if (novosDados.email) contatos[indice].email = novosDados.email;

  return contatos[indice]; // Retorna o contato atualizado
}

// Testando:
const atualizado = atualizarContato(1, { nome: "Ana Souza", telefone: "(11) 91111-2222" });
console.log("Contato atualizado:", atualizado);

// Tentando atualizar ID inexistente:
atualizarContato(99, { nome: "Fantasma" }); // "Contato com ID 99 não encontrado."

console.log("---------------------------");

// -------------------------------------------------------------------
// 6. DELETE — Remover Registro
// -------------------------------------------------------------------

console.log("\n--- 6. DELETE (Deletar) ---");

/*
 * Para deletar, temos duas estratégias:
 *
 * a) .filter() → Cria um NOVO array sem o item (mais seguro)
 * b) .splice()  → Remove o item do array ORIGINAL (modifica in-place)
 *
 * Usaremos .filter() por ser mais previsível e seguro.
 */

function deletarContato(id) {
  const contatoExiste = contatos.find((contato) => contato.id === id);

  if (!contatoExiste) {
    console.log(`Contato com ID ${id} não encontrado.`);
    return null;
  }

  // Cria um novo array com todos os contatos EXCETO o que queremos deletar
  contatos = contatos.filter((contato) => contato.id !== id);

  return contatoExiste; // Retorna o contato que foi removido
}

// Testando:
console.log("Antes de deletar:", contatos.length, "contatos");
const removido = deletarContato(3);
console.log("Contato removido:", removido);
console.log("Depois de deletar:", contatos.length, "contatos");

console.log("-------------------------");

// -------------------------------------------------------------------
// 7. MÉTODOS JAVASCRIPT ESSENCIAIS (RESUMO)
// -------------------------------------------------------------------

/*
 * Métodos de Array usados nas operações CRUD:
 *
 * ┌────────────────────┬──────────────┬────────────────────────────────┐
 * │ Método             │ Operação     │ O que faz                      │
 * ├────────────────────┼──────────────┼────────────────────────────────┤
 * │ .push(item)        │ CREATE       │ Adiciona item ao final         │
 * │ .find(fn)          │ READ         │ Retorna 1º item que combina    │
 * │ .filter(fn)        │ READ/DELETE  │ Retorna array com itens filtrados│
 * │ .findIndex(fn)     │ UPDATE       │ Retorna índice do item          │
 * │ .forEach(fn)       │ READ         │ Executa função para cada item   │
 * │ .splice(i, n)      │ DELETE       │ Remove n itens a partir de i    │
 * │ .includes(val)     │ READ         │ Verifica se valor existe        │
 * │ .length            │ READ         │ Retorna o tamanho do array      │
 * └────────────────────┴──────────────┴────────────────────────────────┘
 */

// -------------------------------------------------------------------
// 8. ORGANIZAÇÃO EM MÚLTIPLOS ARQUIVOS
// -------------------------------------------------------------------

/*
 * Na prática (veja o exercicio_slide/), cada operação fica em seu
 * próprio arquivo:
 *
 * exercicio_slide/
 * ├── contatos.js           ← Array de dados (o "banco")
 * ├── adicionarContato.js   ← Função de CREATE
 * ├── listarContatos.js     ← Função de READ
 * ├── atualizarContato.js   ← Função de UPDATE
 * ├── removerContato.js     ← Função de DELETE
 * └── index.js              ← Menu interativo (importa tudo)
 *
 * Cada arquivo exporta SUA função via export default.
 * O index.js importa todas e monta o menu com switch/case.
 *
 * Essa organização facilita:
 *   ✅ Manutenção (cada arquivo tem ~10-20 linhas)
 *   ✅ Testes (testar cada operação isoladamente)
 *   ✅ Trabalho em equipe (cada pessoa em um arquivo)
 */

// -------------------------------------------------------------------
// 9. RESULTADO FINAL
// -------------------------------------------------------------------

console.log("\n--- 9. Estado Final ---");
console.log("Contatos restantes:");
contatos.forEach((c, i) => {
  console.log(`  ${i + 1}. [ID: ${c.id}] ${c.nome} - ${c.telefone} - ${c.email}`);
});

console.log("\n================================================");
console.log("Fim do conteúdo: CRUD com Arrays de Objetos");
console.log("================================================");
