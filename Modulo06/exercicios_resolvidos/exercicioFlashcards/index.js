import promptSync from 'prompt-sync';
const prompt = promptSync();

import baralho from './baralho.js';
import flashcard from './flashcard.js';

import adicionarBaralho from './adicionarBaralho.js';
import listarBaralho from './listarBaralho.js';
import atualizarBaralho from './atualizarBaralho.js';
import deletarBaralho from './deletarBaralho.js';

import adicionarFlashcard from './adicionarFlashcard.js';
import listarFlashcards from './listarFlashcard.js';
import listarFlashcardsEspecificos from './listarFlashcardsEspecificos.js';
import buscarFlashcards from './buscaFlashcards.js';
import deletarFlashcard from './deletarFlashcard.js';

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
    console.log("8. Buscar Flashcards");
    console.log("9. Deletar Flashcard");
    console.log("0. Sair");
    console.log("---------------------------------");
}

// Loop principal do programa
while (true) {
    exibirMenu();
    const opcao = prompt("Escolha uma opcao: ");

    switch (opcao) {
        case '1': {
            const titulo = prompt("Digite o titulo do novo baralho: ");
            const novoBaralho = {
                id: prompt("Digite o ID do novo baralho: "),
                titulo: titulo
            };
            adicionarBaralho(baralho, novoBaralho);
            console.log("Baralho adicionado com sucesso!");
            break;
        }
        case '2':
            console.log("\n--- Lista de Baralhos ---");
            listarBaralho(baralho);
            break;
        case '3': {
            const id = parseInt(prompt("Digite o ID do baralho a ser atualizado: "));
            const novoTitulo = prompt("Digite o novo titulo: ");
            atualizarBaralho(baralho, id, novoTitulo);
            break;
        }
        case '4': {
            const id = parseInt(prompt("Digite o ID do baralho a ser deletado: "));
            deletarBaralho(baralho, id);
            break;
        }
        case '5': {
            const pergunta = prompt("Digite a pergunta do flashcard: ");
            const resposta = prompt("Digite a resposta do flashcard: ");
            const idBaralho = parseInt(prompt("Digite o ID do baralho ao qual este flashcard pertence: "));
            const novoFlashcard = {
                id: prompt("Digite o ID do novo flashcard: "),
                pergunta: pergunta,
                resposta: resposta,
                idBaralho: idBaralho
            }
            adicionarFlashcard(flashcard, novoFlashcard);
            break;
        }
        case '6':
            console.log("\n--- Lista de Todos os Flashcards ---");
            listarFlashcards(flashcard);
            break;
        case '7': {
            const id = parseInt(prompt("Digite o ID do baralho para listar os flashcards: "));
            console.log(`\n--- Flashcards do Baralho ${id} ---`);
            listarFlashcardsEspecificos(flashcard, id);
            break;
        }
        case '8': {
            const termo = prompt("Digite o termo a ser buscado nas perguntas ou respostas: ");
            const resultados = buscarFlashcards(flashcard, termo);
            console.log("\n--- Resultados da Busca ---");
            if (resultados.length == 0) {
                console.log("Nenhum flashcard encontrado.");
            } else {
                console.log(resultados);
            }
            break;
        }
        case '9': {
            const id = parseInt(prompt("Digite o ID do flashcard a ser deletado: "));
            deletarFlashcard(flashcard, id);
            break;
        }
        case '0':
            console.log("Saindo do programa. Até mais!");
            return; // Encerra o programa
        default:
            console.log("Opção inválida. Tente novamente.");
            break;
    }
}

