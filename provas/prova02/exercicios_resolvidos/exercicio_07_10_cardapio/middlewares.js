// Exercício 8: middlewares
export function logar(req, res, next) {
  console.log(req.method, req.url)
  next()
}

export function validarPrato(req, res, next) {
  const { nome, preco } = req.body ?? {}
  if (!nome || typeof preco !== "number" || preco <= 0) {
    return res.status(400).json({ message: "Informe o nome e um preço maior que zero." })
  }
  next()
}
