import express from "express";

let router = express();
let port = 3000;

router.get("/", (req, res) => {
    res.send("Hello World!")
});

router.listen((port), () => {
    console.log("API rodando!");
});