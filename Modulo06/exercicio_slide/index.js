import promptSync from "prompt-sync";
const prompt = promptSync();

// Importando nossos dados e funções
import contatos from "./contatos.js";
import listarContatos from "./listarContatos.js";
import adicionarContato from "./adicionarContato.js";
import atualizarContato from "./atualizarContato.js";
import removerContato from "./removerContato.js";

function mainMenu() {
  console.log("\n--- Menu de Contatos ---");
  console.log("1. Listar Contatos (READ)");
  console.log("2. Adicionar Contato (CREATE)");
  console.log("3. Atualizar Contato (UPDATE)");
  console.log("4. Remover Contato (DELETE)");
  console.log("5. Sair");
}

let opcao = "0";

// O loop mantém o programa rodando até o usuário escolher sair
while (opcao != "5") {
  mainMenu();
  opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1":
      // Operação: READ
      listarContatos(contatos);
      break;
    case "2":
      // Operação: CREATE
      let novoContato = {
        nome: prompt("Novo Nome (ou Enter para manter): "),
        email: prompt("Novo Email (ou Enter para manter): "),
        telefones: [],
      };

      // Loop para múltiplos telefones
      let addMais = "sim";
      while (addMais.toLowerCase() === "sim") {
        novoContato.telefones.push(prompt("Telefone: "));
        addMais = prompt("Adicionar outro telefone? (sim/nao): ");
      }

      const adicionou = adicionarContato(contatos, novoContato);

      if (adicionou) {
        console.log("Contato adicionado com sucesso!");
      }
      break;
    case "3":
      // Operação: UPDATE
      let idAtualizar = parseInt(prompt("ID do contato a ser atualizado: "));

      let novosDados = {
        nome: prompt("Novo Nome (ou Enter para manter): "),
        email: prompt("Novo Email (ou Enter para manter): "),
        telefones: [],
      };

      //Lógica para atualizar os telefones
      let atualizaTel = prompt("Deseja atualizar os telefones? (sim/nao): ");

      if (atualizaTel.toLowerCase() === "sim") {
        let editMais = "sim";
        while (editMais.toLowerCase() === "sim") {
          novosDados.telefones.push(prompt("Novo Telefone: "));
          editMais = prompt("Adicionar outro telefone? (sim/nao): ");
        }
      }

      const atualizou = atualizarContato(contatos, idAtualizar, novosDados);

      if (atualizou) {
        console.log("Contato atualizado com sucesso!");
      }
      break;
    case "4":
      // Operação: DELETE
      let idRemover = parseInt(prompt("ID do contato a ser removido: "));

      // Requisito de Confirmação
      let confirmar = prompt("Tem certeza que deseja remover este contato? (sim/nao): ");

      if (confirmar.toLowerCase() === "sim") {
        removerContato(contatos, idRemover);
      } else {
        console.log("Operação cancelada.");
      }
      break;
    case "5":
      console.log("Saindo...");
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
      break;
  }
}
