/*
 * ===================================================================
 * MÓDULO 09: BANCO DE DADOS — MONGODB E MONGOOSE
 * ===================================================================
 *
 * Até agora, nossos dados ficavam em ARRAYS na memória.
 * Quando o servidor desligava, todos os dados eram perdidos!
 *
 * Neste módulo, aprendemos a PERSISTIR dados usando um banco de
 * dados real: o MongoDB, acessado através do Mongoose.
 *
 * Após este módulo, seus dados sobrevivem a reinicializações
 * do servidor!
 */


// -------------------------------------------------------------------
// 1. BANCOS DE DADOS: SQL vs NoSQL
// -------------------------------------------------------------------

/*
 * Um banco de dados é um sistema para armazenar dados de forma
 * ORGANIZADA e PERMANENTE (persistente).
 *
 * Existem dois grandes tipos:
 *
 * ┌──────────────────┬──────────────────┬──────────────────────────┐
 * │                  │ SQL (Relacional) │ NoSQL (Não-Relacional)   │
 * ├──────────────────┼──────────────────┼──────────────────────────┤
 * │ Estrutura        │ Tabelas (linhas  │ Documentos (JSON-like),  │
 * │                  │ e colunas)       │ coleções                 │
 * │ Esquema          │ Rígido (fixo)    │ Flexível (dinâmico)      │
 * │ Linguagem        │ SQL              │ Métodos da linguagem     │
 * │ Exemplos         │ MySQL, PostgreSQL│ MongoDB, Redis, Firebase │
 * │ Bom para         │ Dados muito      │ Dados variáveis,         │
 * │                  │ estruturados     │ prototipagem rápida      │
 * └──────────────────┴──────────────────┴──────────────────────────┘
 *
 * Neste curso usamos MongoDB (NoSQL) porque:
 *   ✅ Armazena dados como "documentos" (parecido com objetos JS)
 *   ✅ Flexível — não precisa definir todas as colunas antes
 *   ✅ Fácil de usar com JavaScript/Node.js
 *   ✅ MongoDB Atlas oferece plano gratuito na nuvem
 */


// -------------------------------------------------------------------
// 2. CONCEITOS DO MONGODB
// -------------------------------------------------------------------

/*
 * Terminologia do MongoDB comparada com SQL:
 *
 * ┌─────────────────┬───────────────────┬──────────────────────────┐
 * │ SQL             │ MongoDB           │ Exemplo                  │
 * ├─────────────────┼───────────────────┼──────────────────────────┤
 * │ Banco de Dados  │ Database          │ "lojinha"                │
 * │ Tabela          │ Collection        │ "produtos"               │
 * │ Linha           │ Document          │ { nome: "Arroz"... }     │
 * │ Coluna          │ Field (campo)     │ "nome", "preco"          │
 * └─────────────────┴───────────────────┴──────────────────────────┘
 *
 * Um documento MongoDB é basicamente um OBJETO JavaScript
 * (na verdade, formato BSON — Binary JSON).
 */


// -------------------------------------------------------------------
// 3. O QUE É O MONGOOSE?
// -------------------------------------------------------------------

/*
 * Mongoose é um ODM (Object Data Modeling) para MongoDB.
 *
 * Ele funciona como um "tradutor" entre o JavaScript e o MongoDB:
 *   - Você define MODELOS (as regras dos dados) em JavaScript
 *   - O Mongoose converte suas chamadas em operações do MongoDB
 *
 * É como o Express é para HTTP, o Mongoose é para o MongoDB:
 * simplifica MUITO o trabalho.
 *
 * Instalação:
 *   $ npm install mongoose
 */


// -------------------------------------------------------------------
// 4. CONECTANDO AO MONGODB ATLAS
// -------------------------------------------------------------------

/*
 * MongoDB Atlas é o serviço de MongoDB na NUVEM.
 * Vamos usar ele ao invés de instalar MongoDB localmente.
 *
 * PASSO A PASSO (já visto na aula):
 *   1. Criar conta em https://www.mongodb.com/atlas
 *   2. Criar um Cluster gratuito (Free Tier)
 *   3. Criar um usuário de banco (Database Access)
 *   4. Liberar o IP (Network Access → Allow Access from Anywhere)
 *   5. Copiar a Connection String (URI)
 *
 * A URI tem este formato:
 *   mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/NOME_DO_BANCO
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carrega variáveis do arquivo .env para process.env
dotenv.config();

/*
 * ⚠️ NUNCA coloque a URI diretamente no código!
 * Use variáveis de ambiente (arquivo .env):
 *
 * Arquivo .env (na raiz do projeto):
 *   MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meu_banco
 *
 * O dotenv.config() carrega o .env, e acessamos via process.env.MONGO_URI
 */

const MONGO_URI = process.env.MONGO_URI;

async function conectarBanco() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB conectado com sucesso!");
    } catch (error) {
        console.log("❌ Erro ao conectar ao MongoDB:", error.message);
    }
}

// conectarBanco(); // Descomente para testar a conexão


// -------------------------------------------------------------------
// 5. SCHEMAS E MODELS (O "Molde" dos Dados)
// -------------------------------------------------------------------

/*
 * SCHEMA = Define a ESTRUTURA do documento (quais campos ele tem,
 *          quais são obrigatórios, qual tipo de dado, etc.)
 *
 * MODEL  = É a "classe" que representa a coleção no banco.
 *          A partir do Model, fazemos as operações CRUD.
 *
 * Pense assim:
 *   Schema = A planta (projeto) de uma casa
 *   Model  = A construtora que constrói casas a partir da planta
 *   Document = Uma casa específica já construída
 */

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,                              // Tipo: texto
        required: [true, "O nome é obrigatório."], // Validação
        trim: true                                 // Remove espaços extras
    },
    preco: {
        type: Number,                              // Tipo: número
        required: [true, "O preço é obrigatório."],
        min: [0, "O preço não pode ser negativo."] // Validação de mínimo
    },
    categoria: {
        type: String,
        default: "Geral"                           // Valor padrão
    },
    emEstoque: {
        type: Boolean,
        default: true
    }
});

// O Model é criado a partir do Schema:
// Primeiro argumento: nome da coleção (Mongoose pluraliza: "Produto" → "produtos")
const Produto = mongoose.model("Produto", ProdutoSchema);

/*
 * Agora 'Produto' é nosso Model. Com ele podemos:
 *   Produto.create()            → Criar
 *   Produto.find()              → Listar todos
 *   Produto.findById()          → Buscar por ID
 *   Produto.findByIdAndUpdate() → Atualizar por ID
 *   Produto.findByIdAndDelete() → Deletar por ID
 */


// -------------------------------------------------------------------
// 6. OPERAÇÕES CRUD COM MONGOOSE
// -------------------------------------------------------------------

/*
 * Todas as operações do Mongoose são ASSÍNCRONAS (retornam Promises).
 * Por isso usamos async/await.
 */

// 6a. CREATE — Criar um documento
async function criarProduto() {
    try {
        const novoProduto = await Produto.create({
            nome: "Arroz Integral",
            preco: 12.90,
            categoria: "Alimentos"
        });
        console.log("Produto criado:", novoProduto);
    } catch (error) {
        console.log("Erro ao criar:", error.message);
    }
}

// 6b. READ — Listar todos os documentos
async function listarProdutos() {
    try {
        const produtos = await Produto.find(); // Sem filtro = todos
        console.log("Todos os produtos:", produtos);
    } catch (error) {
        console.log("Erro ao listar:", error.message);
    }
}

// 6c. READ — Buscar por ID
async function buscarPorId(id) {
    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            console.log("Produto não encontrado.");
            return;
        }
        console.log("Produto encontrado:", produto);
    } catch (error) {
        console.log("Erro ao buscar:", error.message);
    }
}

// 6d. UPDATE — Atualizar por ID
async function atualizarProduto(id, novosDados) {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,                         // Qual documento
            novosDados,                 // O que atualizar
            { new: true }               // Retorna o documento ATUALIZADO (não o antigo)
        );
        if (!produtoAtualizado) {
            console.log("Produto não encontrado.");
            return;
        }
        console.log("Produto atualizado:", produtoAtualizado);
    } catch (error) {
        console.log("Erro ao atualizar:", error.message);
    }
}

// 6e. DELETE — Deletar por ID
async function deletarProduto(id) {
    try {
        const produtoDeletado = await Produto.findByIdAndDelete(id);
        if (!produtoDeletado) {
            console.log("Produto não encontrado.");
            return;
        }
        console.log("Produto deletado:", produtoDeletado);
    } catch (error) {
        console.log("Erro ao deletar:", error.message);
    }
}


// -------------------------------------------------------------------
// 7. VARIÁVEIS DE AMBIENTE COM DOTENV
// -------------------------------------------------------------------

/*
 * O pacote 'dotenv' carrega variáveis de um arquivo .env para
 * process.env, mantendo dados sensíveis FORA do código.
 *
 * Instalação:  npm install dotenv
 * Uso:         import dotenv from 'dotenv'; dotenv.config();
 *
 * ARQUIVO .env (na raiz):
 *   MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/banco
 *   PORT=3000
 *
 * No código:
 *   process.env.MONGO_URI  → "mongodb+srv://..."
 *   process.env.PORT       → "3000"
 *
 * ⚠️ REGRAS DE SEGURANÇA:
 *   1. NUNCA faça commit do arquivo .env no GitHub!
 *   2. Adicione ".env" ao .gitignore
 *   3. No Render/produção, configure as variáveis pela interface web
 */


// -------------------------------------------------------------------
// 8. ESTRUTURA MVC (Model — View — Controller)
// -------------------------------------------------------------------

/*
 * MVC é um padrão de organização de código. No nosso contexto
 * (API sem frontend), usamos uma versão simplificada:
 *
 * Projeto/
 * ├── models/
 * │   └── produto.js    ← Schema + Model (a "forma" dos dados)
 * ├── routes/
 * │   └── produto.js    ← Rotas/endpoints (define URLs e verbos HTTP)
 * ├── db.js             ← Conexão com o banco de dados
 * ├── server.js          ← Arquivo principal (Express + configurações)
 * └── .env              ← Variáveis de ambiente (NUNCA no GitHub!)
 *
 * Veja os exercicios_resolvidos/ para exemplos completos
 * com essa estrutura (feiraOnline e albumFigurinhas).
 */


// -------------------------------------------------------------------
// 9. RESUMO
// -------------------------------------------------------------------

/*
 * ┌──────────────────────┬────────────────────────────────────────────┐
 * │ Conceito             │ Descrição                                  │
 * ├──────────────────────┼────────────────────────────────────────────┤
 * │ MongoDB              │ Banco de dados NoSQL (documentos JSON)     │
 * │ MongoDB Atlas        │ MongoDB na nuvem (gratuito)                │
 * │ Mongoose             │ ODM — facilita usar MongoDB com Node.js    │
 * │ Schema               │ Define estrutura/validação do documento    │
 * │ Model                │ "Classe" para operar na coleção            │
 * │ .create()            │ Criar documento                            │
 * │ .find()              │ Buscar vários documentos                   │
 * │ .findById()          │ Buscar um documento pelo _id               │
 * │ .findByIdAndUpdate() │ Atualizar por _id                          │
 * │ .findByIdAndDelete() │ Deletar por _id                            │
 * │ dotenv               │ Carrega variáveis de ambiente do .env      │
 * │ async/await          │ Sintaxe para operações assíncronas         │
 * │ MVC                  │ Padrão de organização (Models/Routes/Server)│
 * └──────────────────────┴────────────────────────────────────────────┘
 */

console.log("================================================");
console.log("Módulo 09 — MongoDB e Mongoose");
console.log("Para testar, configure o .env e descomente");
console.log("as chamadas das funções acima.");
console.log("================================================");
