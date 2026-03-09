import express from 'express';
import connectDB from './db.js';
import produtoRoutes from './routes/produto.js';
const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API da Feira Online no ar!');
});

app.use('/produtos', produtoRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));