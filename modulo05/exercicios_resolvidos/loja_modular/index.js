import promptSync from "prompt-sync";
import cadastrarProduto from "./operacoes/cadastrar_produto.js";
import listarProdutos from "./operacoes/listar_produtos.js";
import venderProduto from "./operacoes/vender_produto.js";
import relatorioEstoque from "./operacoes/relatorio_estoque.js";
import reporEstoque from "./operacoes/repor_estoque.js";

// Só o index.js conversa com o usuário. As operações recebem tudo por parâmetro.
const prompt = promptSync();

let opcao = "";

while (opcao !== "0") {
  console.log("\n1 - Cadastrar produto\n2 - Listar produtos\n3 - Vender\n4 - Relatório de estoque\n5 - Repor estoque\n0 - Sair");
  opcao = prompt("Opção: ");

  if (opcao === "1") {
    const nome = prompt("Nome: ");
    const preco = Number(prompt("Preço: "));
    const estoque = Number(prompt("Estoque inicial: "));
    if (cadastrarProduto(nome, preco, estoque)) {
      console.log("Produto cadastrado.");
    } else {
      console.log("Dados inválidos.");
    }
  } else if (opcao === "2") {
    listarProdutos();
  } else if (opcao === "3") {
    const id = Number(prompt("ID do produto: "));
    const quantidade = Number(prompt("Quantidade: "));
    console.log(venderProduto(id, quantidade));
  } else if (opcao === "4") {
    relatorioEstoque();
  } else if (opcao === "5") {
    const id = Number(prompt("ID do produto: "));
    const quantidade = Number(prompt("Quantidade a repor: "));
    console.log(reporEstoque(id, quantidade));
  } else if (opcao === "0") {
    console.log("Loja fechada. Até logo!");
  } else {
    console.log("Opção inválida.");
  }
}
