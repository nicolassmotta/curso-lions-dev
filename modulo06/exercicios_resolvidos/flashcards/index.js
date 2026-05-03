import promptSync from "prompt-sync";
const prompt = promptSync();

import baralhos from "./baralho.js";
import flashcards from "./flashcard.js";

import adicionarBaralho from "./adicionar_baralho.js";
import listarBaralho from "./listar_baralho.js";
import atualizarBaralho from "./atualizar_baralho.js";
import deletarBaralho from "./deletar_baralho.js";

import adicionarFlashcard from "./adicionar_flashcard.js";
import listarFlashcards from "./listar_flashcard.js";
import listarFlashcardsEspecificos from "./listar_flashcards_especificos.js";
import buscarFlashcards from "./buscar_flashcards.js";
import deletarFlashcard from "./deletar_flashcard.js";
import atualizarFlashcard from "./atualizar_flashcard.js";

function exibirMenu() {
  console.log("\n------ MENU DE FLASHCARDS ------");
  console.log("--- Gerenciar Baralhos ---");
  console.log("1. Adicionar Baralho");
  console.log("2. Listar Baralhos");
  console.log("3. Atualizar Baralho");
  console.log("4. Deletar Baralho");
  console.log("--- Gerenciar Flashcards ---");
  console.log("5. Adicionar Flashcard");
  console.log("6. Listar Todos os Flashcards");
  console.log("7. Listar Flashcards de um Baralho Específico");
  console.log("8. Atualizar Flashcard");
  console.log("9. Buscar Flashcards");
  console.log("10. Deletar Flashcard");
  console.log("0. Sair");
  console.log("---------------------------------");
}

let executando = true;

while (executando) {
  exibirMenu();
  const opcao = prompt("Escolha uma opcao: ");

  switch (opcao) {
    case "1": {
      const titulo = prompt("Digite o titulo do novo baralho: ");
      const novoBaralho = {
        titulo: titulo,
      };
      adicionarBaralho(baralhos, novoBaralho);
      console.log("Baralho adicionado com sucesso!");
      break;
    }
    case "2":
      console.log("\n--- Lista de Baralhos ---");
      listarBaralho(baralhos);
      break;
    case "3": {
      const id = parseInt(prompt("Digite o ID do baralho a ser atualizado: "));
      const novoTitulo = prompt("Digite o novo titulo: ");
      atualizarBaralho(baralhos, id, novoTitulo);
      break;
    }
    case "4": {
      const id = parseInt(prompt("Digite o ID do baralho a ser deletado: "));
      deletarBaralho(baralhos, flashcards, id);
      break;
    }
    case "5": {
      const pergunta = prompt("Digite a pergunta do flashcard: ");
      const resposta = prompt("Digite a resposta do flashcard: ");
      const idBaralho = parseInt(prompt("Digite o ID do baralho ao qual este flashcard pertence: "));
      const novoFlashcard = {
        pergunta: pergunta,
        resposta: resposta,
        idBaralho: idBaralho,
      };
      adicionarFlashcard(flashcards, baralhos, novoFlashcard);
      break;
    }
    case "6":
      console.log("\n--- Lista de Todos os Flashcards ---");
      listarFlashcards(flashcards);
      break;
    case "7": {
      const id = parseInt(prompt("Digite o ID do baralho para listar os flashcards: "));
      console.log(`\n--- Flashcards do Baralho ${id} ---`);
      listarFlashcardsEspecificos(flashcards, id);
      break;
    }
    case "8": {
      const id = parseInt(prompt("Digite o ID do flashcard a ser atualizado: "));
      const pergunta = prompt("Digite a nova pergunta (ou Enter para manter): ");
      const resposta = prompt("Digite a nova resposta (ou Enter para manter): ");
      atualizarFlashcard(flashcards, id, { pergunta, resposta });
      break;
    }
    case "9": {
      const termo = prompt("Digite o termo a ser buscado nas perguntas ou respostas: ");
      const resultados = buscarFlashcards(flashcards, termo);
      console.log("\n--- Resultados da Busca ---");
      if (resultados.length === 0) {
        console.log("Nenhum flashcard encontrado.");
      } else {
        resultados.forEach((cartao) => {
          console.log(`Flashcard ID: ${cartao.id}`);
          console.log(`Pergunta: ${cartao.pergunta}`);
          console.log(`Resposta: ${cartao.resposta}`);
          console.log(`ID do Baralho: ${cartao.idBaralho}`);
          console.log("-----------------------");
        });
      }
      break;
    }
    case "10": {
      const id = parseInt(prompt("Digite o ID do flashcard a ser deletado: "));
      deletarFlashcard(flashcards, id);
      break;
    }
    case "0":
      console.log("Saindo do programa. Até mais!");
      executando = false;
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
      break;
  }
}
