// Exercícios 3, 4 e 6: rotas de filmes
import express from "express";
import Filme from "./models/filme.model.js";
import { autenticar, autorizar } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());

const CAMPOS_PERMITIDOS = ["titulo", "ano", "generos", "nota"];

function tratarErro(error, res) {
  if (error.name === "CastError") return res.status(400).json({ message: "ID inválido." });
  if (error.name === "ValidationError") return res.status(400).json({ message: Object.values(error.errors).map((e) => e.message).join(" ") });
  return res.status(500).json({ message: "Erro interno." });
}

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.get("/filmes", async (req, res) => {
  try {
    const filmes = await Filme.find({ excluidoEm: null });
    return res.status(200).json(filmes);
  } catch (error) {
    return tratarErro(error, res);
  }
});

app.get("/filmes/:id", async (req, res) => {
  try {
    const filme = await Filme.findOne({ _id: req.params.id, excluidoEm: null });
    if (!filme) return res.status(404).json({ message: "Filme não encontrado." });
    return res.status(200).json(filme);
  } catch (error) {
    return tratarErro(error, res);
  }
});

app.post("/filmes", autenticar, autorizar("admin"), async (req, res) => {
  try {
    const dados = {};
    for (const campo of CAMPOS_PERMITIDOS) if (req.body?.[campo] !== undefined) dados[campo] = req.body[campo];
    const filme = await Filme.create(dados);
    return res.status(201).json(filme);
  } catch (error) {
    return tratarErro(error, res);
  }
});

app.patch("/filmes/:id", autenticar, autorizar("admin"), async (req, res) => {
  try {
    const dados = {};
    for (const campo of CAMPOS_PERMITIDOS) if (req.body?.[campo] !== undefined) dados[campo] = req.body[campo];
    if (Object.keys(dados).length === 0) return res.status(400).json({ message: "Nada para atualizar." });
    const filme = await Filme.findOneAndUpdate({ _id: req.params.id, excluidoEm: null }, dados, { new: true, runValidators: true });
    if (!filme) return res.status(404).json({ message: "Filme não encontrado." });
    return res.status(200).json(filme);
  } catch (error) {
    return tratarErro(error, res);
  }
});

app.delete("/filmes/:id", autenticar, autorizar("admin"), async (req, res) => {
  try {
    const filme = await Filme.findOneAndUpdate({ _id: req.params.id, excluidoEm: null }, { excluidoEm: new Date() }, { new: true });
    if (!filme) return res.status(404).json({ message: "Filme não encontrado." });
    return res.status(204).send();
  } catch (error) {
    return tratarErro(error, res);
  }
});

export default app;
