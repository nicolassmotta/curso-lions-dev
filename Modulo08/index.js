const express = require('express');
const app = express();
const port = 3000;

// Middleware para habilitar o uso de JSON nas requisições
app.use(express.json());

// --- Importando a Lógica (Corrigido para a sua estrutura) ---
// (Importando a lógica de 'baralho' da pasta raiz)
const criarBaralho = require('./criarBaralho');
const listarBaralhos = require('./listarBaralhos');
const atualizarBaralho = require('./atualizarBaralho');
const deletarBaralho = require('./deletarBaralho');

// (Importando a lógica de 'flashcard' da pasta raiz)
const criarFlashcard = require('./criarFlashcard');
const listarFlashcards = require('./listarFlashcards.js');
const atualizarFlashcard = require('./atualizarFlashcard');
const deletarFlashcard = require('./deletarFlashcard');
const listarFlashcardsPorBaralho = require('./listarFlashcardPorBaralho'); 
const buscarFlashcards = require('./buscarFlashcards');


// --- Rota Inicial de Teste ---
app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando!');
});

// --- Rotas de Baralho (Handlers) ---
app.post('/baralho', (req, res) => {
    const { titulo } = req.body;
    // (Ainda estamos usando a lógica modularizada, mesmo que o arquivo esteja no root)
    const { data, error } = criarBaralho(titulo); 
    if (error) return res.status(400).send({ message: error });
    res.status(201).send({ message: "Baralho criado com sucesso!", baralho: data });
});

app.get('/baralho', (req, res) => {
    const data = listarBaralhos();
    res.status(200).send(data);
});

app.put('/baralho/:id', (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;
    const { data, error } = atualizarBaralho(id, titulo);
    if (error) return res.status(404).send({ message: error });
    res.status(200).send({ message: "Baralho atualizado com sucesso!", baralho: data });
});

app.delete('/baralho/:id', (req, res) => {
    const { id } = req.params;
    const { data, error } = deletarBaralho(id);
    if (error) return res.status(404).send({ message: error });
    res.status(200).send({ message: "Baralho deletado com sucesso!", baralho: data });
});

// --- Rotas de Flashcard (Handlers) ---
// 1. Criar Flashcard
app.post('/flashcard', (req, res) => {
    const { pergunta, resposta, idBaralho } = req.body;
    const { data, error } = criarFlashcard(pergunta, resposta, parseInt(idBaralho));

    if (error) {
        return res.status(404).send({ message: error });
    }
    res.status(201).send({ message: "Flashcard criado com sucesso!", flashcard: data });
});

// 2. Listar Todos os Flashcards (ou buscar por termo)
app.get('/flashcard', (req, res) => {
    const { termo } = req.query;
    let data;
    if (termo) {
        data = buscarFlashcards(termo);
    } else {
        data = listarFlashcards();
    }
    res.status(200).send(data);
});

// 3. Atualizar Flashcard
app.put('/flashcard/:id', (req, res) => {
    const { id } = req.params;
    const { pergunta, resposta, idBaralho } = req.body;
    
    const { data, error } = atualizarFlashcard(
        id, 
        pergunta, 
        resposta, 
        idBaralho ? parseInt(idBaralho) : undefined
    );

    if (error) {
        return res.status(404).send({ message: error });
    }
    res.status(200).send({ message: "Flashcard atualizado com sucesso!", flashcard: data });
});

// 4. Deletar Flashcard
app.delete('/flashcard/:id', (req, res) => {
    const { id } = req.params;
    const { data, error } = deletarFlashcard(id);
    if (error) {
        return res.status(404).send({ message: error });
    }
    res.status(200).send({ message: "Flashcard deletado com sucesso!", flashcard: data });
});

// 5. Listar Flashcards de um Baralho Específico
app.get('/baralho/:idBaralho/flashcards', (req, res) => {
    const { idBaralho } = req.params;
    const data = listarFlashcardsPorBaralho(idBaralho);
    res.status(200).send(data);
});


// --- Iniciando o Servidor ---
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});