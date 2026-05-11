import express from "express";

let router = express();
let port = 3000;

router.use(express.json());

router.get(("/"), (req, res) => {
    res.send("Hello World!")
});

router.listen((port), () => {
    console.log(`Exemplo das funções rodando na porta: ${port}`);
});

