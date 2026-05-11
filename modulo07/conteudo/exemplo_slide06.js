import express from "express";

let router = express();
let port = 3000;

// Permite que o Express leia dados em JSON enviados no body
router.use(express.json());


// Exemplo de req.body
// Usado quando o cliente envia dados no corpo da requisição
router.post("/baralho", (req, res) => {
    const titulo = req.body.titulo;

    res.status(201).send({
        mensagem: "Dados recebidos pelo req.body",
        titulo: titulo
    });
});


// Exemplo de req.params
// Usado quando o dado vem direto na rota
router.get("/baralho/:id", (req, res) => {
    const id = req.params.id;

    res.status(200).send({
        mensagem: "Parâmetro recebido pelo req.params",
        id: id
    });
});


// Exemplo de req.query
// Usado quando o dado vem depois do ? na URL
router.get("/flashcards", (req, res) => {
    const termo = req.query.termo;

    res.status(200).send({
        mensagem: "Parâmetro de busca recebido pelo req.query",
        termo: termo
    });
});


// Middleware de tratamento de erro
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Alguma coisa deu errado!");
});


router.listen(port, () => {
    console.log(`Exemplo rodando na porta: ${port}`);
});