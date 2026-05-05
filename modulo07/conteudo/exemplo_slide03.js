import express from "express";

let router = express();
let port = 3000;

router.get(("/"), (req, res) => {
    res.send("Hello World!")
});

router.post(("/"), (req, res) => {
    res.send("Recebendo uma requisição de POST")
});

router.listen((port), () => {
    console.log(`Exemplo das rotas rodando na porta: ${port}`);
});

