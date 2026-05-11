import express from "express";

let router = express();
let port = 3000;

router.get(("/"), (req, res) => {
    res.send("Hello World!")
});

router.get(("/usuarios"), (req, res) => {
    res.send("Recebendo uma requisição em /usuarios")
});

router.get(("/flashcards"), (req, res) => {
    res.send("Recebendo uma requisição em /flashcards")
});

router.listen((port), () => {
    console.log(`Exemplo das rotas rodando na porta: ${port}`);
});

