/**
 * Exercícios 5 e 6: estoque em memória (CRUD) e relatórios
 */
const produtos = []
let proximoId = 1

export function cadastrar(nome, quantidade, preco) {
  if (!nome || quantidade < 0) return null
  const produto = { id: proximoId++, nome, quantidade, preco }
  produtos.push(produto)
  return produto
}

export function listar() {
  return produtos
}

export function buscarPorNome(termo) {
  return produtos.filter((p) => p.nome.toLowerCase().includes(termo.toLowerCase()))
}

export function atualizarQuantidade(id, quantidade) {
  const produto = produtos.find((p) => p.id === id)
  if (!produto) return null
  produto.quantidade = quantidade
  return produto
}

export function remover(id) {
  const i = produtos.findIndex((p) => p.id === id)
  if (i === -1) return false
  produtos.splice(i, 1)
  return true
}

// ---------- Exercício 6: relatórios ----------
export function valorTotal() {
  return produtos.reduce((soma, p) => soma + p.quantidade * p.preco, 0)
}

export function estoqueBaixo() {
  return produtos.filter((p) => p.quantidade < 5)
}

export function nomesEmMaiusculas() {
  return produtos.map((p) => p.nome.toUpperCase())
}

export function temEsgotado() {
  return produtos.some((p) => p.quantidade === 0)
}
