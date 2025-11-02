const express = require('express');
const connectDB = require('./db');
const figurinhasRoutes = require('./routes/figurinha');

// Inicializa o Express
const app = express();

// Conecta ao Banco de Dados
connectDB();

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Rota principal para teste
app.get('/', (req, res) => {
  res.send('API do Álbum de Figurinhas no ar!');
});

// Usa as rotas definidas no arquivo de rotas
app.use('/figurinhas', figurinhasRoutes);

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));