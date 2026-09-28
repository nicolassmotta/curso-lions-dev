import * as estoque from "./estoque.js"

estoque.cadastrar("Caneta azul", 10, 2.5)
estoque.cadastrar("Caderno", 3, 20)
estoque.cadastrar("Borracha", 0, 1.5)
console.log(estoque.cadastrar("", 5, 1))            // null (sem nome)
console.log(estoque.buscarPorNome("CAN").length)    // 1
console.log(estoque.atualizarQuantidade(99, 1))     // null (id não existe)
console.log(estoque.valorTotal())                   // 85
console.log(estoque.estoqueBaixo().map((p) => p.nome)) // [ 'Caderno', 'Borracha' ]
console.log(estoque.nomesEmMaiusculas())            // [ 'CANETA AZUL', 'CADERNO', 'BORRACHA' ]
console.log(estoque.temEsgotado())                  // true
console.log(estoque.remover(3), estoque.remover(3)) // true false
