// Exercícios 7, 9 e 10: rotas dos pratos num express.Router()
import { Router } from "express"
import { validarPrato } from "../middlewares.js"

const router = Router()
const pratos = [
  { id: 1, nome: "Lasanha", categoria: "massas", preco: 42 },
  { id: 2, nome: "Salada Caesar", categoria: "saladas", preco: 28 },
]
let proximoId = 3

router.get("/", (req, res) => {
  let lista = pratos
  if (req.query.categoria) lista = lista.filter((p) => p.categoria === req.query.categoria)
  if (req.query.precoMax) lista = lista.filter((p) => p.preco <= Number(req.query.precoMax))
  return res.status(200).json(lista)
})

router.get("/:id", (req, res) => {
  const prato = pratos.find((p) => p.id === Number(req.params.id))
  if (!prato) return res.status(404).json({ message: "Prato não encontrado." })
  return res.status(200).json(prato)
})

router.post("/", validarPrato, (req, res) => {
  const { nome, categoria, preco } = req.body
  const prato = { id: proximoId++, nome, categoria, preco }
  pratos.push(prato)
  return res.status(201).json(prato)
})

router.patch("/:id", (req, res) => {
  const prato = pratos.find((p) => p.id === Number(req.params.id))
  if (!prato) return res.status(404).json({ message: "Prato não encontrado." })
  const { preco } = req.body ?? {}
  if (typeof preco !== "number" || preco <= 0) return res.status(400).json({ message: "Informe um preço maior que zero." })
  prato.preco = preco
  return res.status(200).json(prato)
})

router.delete("/:id", (req, res) => {
  const i = pratos.findIndex((p) => p.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ message: "Prato não encontrado." })
  pratos.splice(i, 1)
  return res.status(204).send()
})

export default router
