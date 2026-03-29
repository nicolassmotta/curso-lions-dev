/*
 * ===================================================================
 * MÓDULO 08: APIs REST COM EXPRESS.JS
 * ===================================================================
 *
 * Neste módulo, aprendemos a criar uma API (Interface de Programação
 * de Aplicações) usando o framework Express.js.
 *
 * No Módulo 07, o CRUD rodava no terminal com prompt-sync.
 * Agora, vamos expor essas mesmas operações via HTTP, para que
 * QUALQUER cliente (Postman, navegador, app mobile) possa acessar.
 */


// -------------------------------------------------------------------
// 1. O QUE É UMA API?
// -------------------------------------------------------------------

/*
 * API = Application Programming Interface (Interface de Programação)
 *
 * É um "contrato" entre dois sistemas:
 *   - Um sistema OFERECE dados/serviços (o SERVIDOR, ou "backend")
 *   - Outro sistema CONSOME esses dados (o CLIENTE, ou "frontend")
 *
 * Pense numa API como o CARDÁPIO de um restaurante:
 *   - O cardápio lista o que está disponível (os endpoints)
 *   - Você faz um PEDIDO (request / requisição)
 *   - A cozinha prepara e ENTREGA (response / resposta)
 *
 * Exemplo do mundo real:
 *   - Quando seu celular mostra a previsão do tempo,
 *     ele está CONSUMINDO a API de um serviço meteorológico.
 *   - Quando o Instagram carrega fotos, está consumindo a API do Instagram.
 */


// -------------------------------------------------------------------
// 2. O QUE É REST?
// -------------------------------------------------------------------

/*
 * REST = Representational State Transfer
 *
 * É um PADRÃO (conjunto de regras) para construir APIs na web.
 * Uma API que segue essas regras é chamada de "API RESTful".
 *
 * Regras principais:
 *
 *   1. Usa verbos HTTP para definir a AÇÃO:
 *      GET    → Ler/buscar dados        ("Me dê a lista de produtos")
 *      POST   → Criar novo dado         ("Cadastre esse novo produto")
 *      PUT    → Atualizar dado existente ("Atualize o produto #5")
 *      DELETE → Deletar dado            ("Delete o produto #5")
 *
 *   2. Usa URLs (endpoints) para definir o RECURSO:
 *      /produtos     → Todos os produtos
 *      /produtos/5   → O produto com ID 5
 *
 *   3. Usa Status Codes para informar o RESULTADO:
 *      200 → OK (deu tudo certo)
 *      201 → Created (criado com sucesso)
 *      400 → Bad Request (requisição inválida)
 *      404 → Not Found (recurso não encontrado)
 *      500 → Internal Server Error (erro no servidor)
 */


// -------------------------------------------------------------------
// 3. VERBOS HTTP + CRUD
// -------------------------------------------------------------------

/*
 * A relação entre verbos HTTP e operações CRUD:
 *
 * ┌────────────┬──────────┬──────────────┬──────────────────────────┐
 * │ Operação   │ Verbo    │ Endpoint     │ Exemplo                  │
 * ├────────────┼──────────┼──────────────┼──────────────────────────┤
 * │ CREATE     │ POST     │ /produtos    │ Cadastrar novo produto   │
 * │ READ (all) │ GET      │ /produtos    │ Listar todos os produtos │
 * │ READ (one) │ GET      │ /produtos/:id│ Buscar produto por ID    │
 * │ UPDATE     │ PUT      │ /produtos/:id│ Atualizar produto por ID │
 * │ DELETE     │ DELETE   │ /produtos/:id│ Deletar produto por ID   │
 * └────────────┴──────────┴──────────────┴──────────────────────────┘
 */


// -------------------------------------------------------------------
// 4. O QUE É EXPRESS.JS?
// -------------------------------------------------------------------

/*
 * Express.js é o framework mais popular para criar servidores
 * web e APIs em Node.js.
 *
 * Ele simplifica MUITO o processo de:
 *   - Criar rotas (endpoints)
 *   - Receber requisições HTTP
 *   - Enviar respostas
 *   - Processar dados JSON
 *
 * Instalação: npm install express
 */

import express from 'express';
const app = express();
const porta = 3000;

// Middleware para entender JSON no corpo das requisições
app.use(express.json());

/*
 * ⚠️ express.json() é um MIDDLEWARE.
 * Middleware = função que roda ENTRE a requisição e a resposta.
 * O express.json() converte o corpo da requisição de texto para
 * um objeto JavaScript (JSON → req.body).
 * Sem ele, req.body seria undefined!
 */


// -------------------------------------------------------------------
// 5. CRIANDO ROTAS (ENDPOINTS)
// -------------------------------------------------------------------

console.log("--- 5. Definindo Rotas ---");

/*
 * Uma rota é a combinação de:
 *   VERBO HTTP + URL/Caminho + FUNÇÃO HANDLER
 *
 * Estrutura:
 *   app.verbo('/caminho', (req, res) => { ... });
 *
 *   req = Request  (requisição) → dados que VÊM do cliente
 *   res = Response (resposta)   → dados que VOLTAM para o cliente
 */

// Nosso "banco de dados" em memória
let produtos = [];
let proximoId = 1;


// 5a. GET / → Rota de teste (raiz)
app.get('/', (req, res) => {
    res.send('API de Produtos está no ar! 🚀');
});

// 5b. POST /produtos → Criar um produto
app.post('/produtos', (req, res) => {
    // req.body contém os dados enviados pelo cliente (JSON)
    const { nome, preco, categoria } = req.body;

    // Validação simples
    if (!nome || !preco) {
        return res.status(400).send({
            mensagem: "Os campos 'nome' e 'preco' são obrigatórios."
        });
    }

    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        categoria: categoria || "Geral"
    };

    produtos.push(novoProduto);

    // 201 = Created (recurso criado com sucesso)
    res.status(201).send(novoProduto);
});

// 5c. GET /produtos → Listar todos os produtos
app.get('/produtos', (req, res) => {
    // 200 = OK
    res.status(200).send(produtos);
});

// 5d. GET /produtos/:id → Buscar produto por ID
app.get('/produtos/:id', (req, res) => {
    /*
     * req.params contém os parâmetros da URL.
     * Na rota '/produtos/:id', se acessarmos '/produtos/3',
     * req.params.id será "3" (string!).
     * Precisamos converter para número com parseInt().
     */
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).send({ mensagem: "Produto não encontrado." });
    }

    res.status(200).send(produto);
});

// 5e. PUT /produtos/:id → Atualizar produto
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco, categoria } = req.body;

    const indice = produtos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).send({ mensagem: "Produto não encontrado." });
    }

    // Atualiza apenas os campos fornecidos
    if (nome) produtos[indice].nome = nome;
    if (preco) produtos[indice].preco = preco;
    if (categoria) produtos[indice].categoria = categoria;

    res.status(200).send(produtos[indice]);
});

// 5f. DELETE /produtos/:id → Deletar produto
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = produtos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).send({ mensagem: "Produto não encontrado." });
    }

    produtos.splice(indice, 1);
    res.status(200).send({ mensagem: "Produto deletado com sucesso." });
});


// -------------------------------------------------------------------
// 6. BUSCA com QUERY PARAMS
// -------------------------------------------------------------------

/*
 * Query params são parâmetros opcionais na URL após o '?'.
 * Exemplo: /produtos/busca?nome=arroz&categoria=alimentos
 *
 * Acessamos via req.query:
 *   req.query.nome       → "arroz"
 *   req.query.categoria  → "alimentos"
 *
 * DIFERENÇA:
 *   req.params → Parâmetros OBRIGATÓRIOS na rota (:id)
 *   req.query  → Parâmetros OPCIONAIS após o ? (filtros/busca)
 *   req.body   → Dados no CORPO da requisição (POST/PUT)
 */

app.get('/produtos/busca', (req, res) => {
    const { nome, categoria } = req.query;
    let resultados = produtos;

    if (nome) {
        resultados = resultados.filter(p =>
            p.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }
    if (categoria) {
        resultados = resultados.filter(p =>
            p.categoria.toLowerCase().includes(categoria.toLowerCase())
        );
    }

    res.status(200).send(resultados);
});


// -------------------------------------------------------------------
// 7. TESTANDO COM POSTMAN
// -------------------------------------------------------------------

/*
 * O Postman é uma ferramenta para TESTAR APIs sem precisar
 * de um frontend. Ele simula as requisições HTTP.
 *
 * Como testar cada endpoint:
 *
 * 1. POST /produtos (Criar):
 *    - Método: POST
 *    - URL: http://localhost:3000/produtos
 *    - Body > raw > JSON:
 *      { "nome": "Arroz", "preco": 12.90, "categoria": "Alimentos" }
 *
 * 2. GET /produtos (Listar):
 *    - Método: GET
 *    - URL: http://localhost:3000/produtos
 *
 * 3. GET /produtos/1 (Buscar por ID):
 *    - Método: GET
 *    - URL: http://localhost:3000/produtos/1
 *
 * 4. PUT /produtos/1 (Atualizar):
 *    - Método: PUT
 *    - URL: http://localhost:3000/produtos/1
 *    - Body > raw > JSON:
 *      { "preco": 14.50 }
 *
 * 5. DELETE /produtos/1 (Deletar):
 *    - Método: DELETE
 *    - URL: http://localhost:3000/produtos/1
 */


// -------------------------------------------------------------------
// 8. RESUMO
// -------------------------------------------------------------------

/*
 * ┌──────────────────────┬────────────────────────────────────────────┐
 * │ Conceito             │ Descrição                                  │
 * ├──────────────────────┼────────────────────────────────────────────┤
 * │ API                  │ Interface para comunicação entre sistemas   │
 * │ REST                 │ Padrão de arquitetura para APIs web         │
 * │ Express.js           │ Framework Node.js para criar servidores     │
 * │ express.json()       │ Middleware que parseia JSON no req.body     │
 * │ app.get/post/put/del │ Define rotas para cada verbo HTTP           │
 * │ req.params           │ Parâmetros da URL (:id)                     │
 * │ req.query            │ Parâmetros de busca (?nome=X)               │
 * │ req.body             │ Dados do corpo (POST/PUT)                   │
 * │ res.status().send()  │ Envia resposta com status HTTP              │
 * │ Postman              │ Ferramenta para testar APIs                 │
 * └──────────────────────┴────────────────────────────────────────────┘
 */


// -------------------------------------------------------------------
// 9. INICIANDO O SERVIDOR
// -------------------------------------------------------------------

/*
 * A linha abaixo faz o Express começar a "escutar" requisições
 * na porta definida. Enquanto o processo estiver rodando, a API
 * estará acessível em http://localhost:3000
 *
 * Para executar:
 *   $ node Modulo08/conteudo/express_api.js
 *
 * Para parar:
 *   Ctrl + C no terminal
 */

app.listen(porta, () => {
    console.log(`\n================================================`);
    console.log(`Servidor rodando em http://localhost:${porta}`);
    console.log(`Teste no Postman ou no navegador!`);
    console.log(`================================================`);
});
