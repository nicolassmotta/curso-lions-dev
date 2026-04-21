import PromptSync from "prompt-sync";
const prompt = PromptSync();

import numeros from "./numeros.js";
import adicionarNumero from "./adicionarNumero.js";
import removerNumero from "./removerNumero.js";
import calcularMedia from "./media.js";
import calcularMediana from "./mediana.js";

let operacao = 1;
let num = 0;

while (operacao != 0) {
  console.log("Qual operação você deseja realizar?\n[1] - Adicionar Número\n[2] - Remover Número\n[3] - Listar Números\n[4] - Calcular Média\n[5] - Calcular Mediana\n[0] - Sair do Programa");
  operacao = parseInt(prompt("R: "));

  switch (operacao) {
    case 1:
      console.log("Qual número você deseja adicionar a lista?");
      num = parseFloat(prompt("R: "));
      adicionarNumero(num);
      break;
    case 2:
      removerNumero();
      break;
    case 3:
      console.table(numeros);
      break;
    case 4:
      console.log(`A media é: ${calcularMedia()}`);
      break;
    case 5:
      // let numeros = [10, 20, 30, 40, 50]
      // let frutas = ["maça", "banana", "abacaxi"]
      numeros.sort((num1, num2) => num1 - num2);
      console.log(`A mediana é: ${calcularMediana()}`);
      break;
    case 0:
      console.log("Programa fechando...");
      break;
    default:
      break;
  }
}
