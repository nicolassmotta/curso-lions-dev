import express from "express";

let router = express();
let port = 3000;

// 1. Esta rota será executada
router.get(("/"), (req, res) => {
    res.send("Primeira rota!");
});

// 2. Esta rota NUNCA será alcançada
router.get(("/"), (req, res) => {
    res.send("Segunda rota!");
});

router.listen((port), () => {
    console.log(`Exemplo das funções rodando na porta: ${port}`);
});

