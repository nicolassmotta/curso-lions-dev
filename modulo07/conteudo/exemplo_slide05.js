import express from "express";

let router = express();
let port = 3000;

router.get(("/"), (req, res) => {
    // Forçando um erro para testar o tratamento abaixo
    throw new Error("CÓDIGO QUEBROU");
});

router.listen((port), () => {
    console.log(`Exemplo das funções rodando na porta: ${port}`);
});

// Middleware de tratamento de erro (sempre com 4 argumentos)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Alguma coisa deu errado!");
});

