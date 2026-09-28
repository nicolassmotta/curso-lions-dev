import promptSync from "prompt-sync";
const prompt = promptSync();

import somar from "./somar.js";
import subtrair from "./subtrair.js";
import multiplicar from "./multiplicar.js";
import dividir from "./dividir.js";
import porcentagem from "./porcentagem.js";

let op = 0;
let resultado = 0;
let resultado_porcentagem = 0;
let num;

while (op != 7) {
  console.log(
    "\nQual operação você deseja executar?\n" + "[1] - Somar\n" + "[2] - Subtrair\n" + "[3] - Multiplicar\n" + "[4] - Dividir\n" + "[5] - Porcentagem\n" + "[6] - Ver Resultado\n" + "[7] - Sair"
  );

  op = Number(prompt("Escolha uma opção: "));

  switch (op) {
    case 1:
      num = Number(prompt("Digite o número para somar: "));
      if (isNaN(num)) {
        console.log("Da próxima vez digite um número correto!");
      } else {
        resultado = somar(resultado, num);
        console.log("Resultado: " + resultado);
      }
      break;

    case 2:
      num = Number(prompt("Digite o número para subtrair: "));
      if (isNaN(num)) {
        console.log("Da próxima vez digite um número correto!");
      } else {
        resultado = subtrair(resultado, num);
        console.log("Resultado: " + resultado);
      }
      break;

    case 3:
      num = Number(prompt("Digite o número para multiplicar: "));
      if (isNaN(num)) {
        console.log("Da próxima vez digite um número correto!");
      } else {
        resultado = multiplicar(resultado, num);
        console.log("Resultado: " + resultado);
      }
      break;

    case 4:
      num = Number(prompt("Digite o número para dividir: "));
      if (isNaN(num)) {
        console.log("Da próxima vez digite um número correto!");
      } else if (num === 0) {
        console.log("Não é possível dividir por zero!");
      } else {
        resultado = dividir(resultado, num);
        console.log("Resultado: " + resultado);
      }
      break;

    case 5:
      num = Number(prompt("Digite o valor para saber quantos % ele representa do resultado atual: "));
      if (isNaN(num)) {
        console.log("Da próxima vez digite um número correto!");
      } else if (resultado === 0) {
        console.log("Não é possível calcular porcentagem com o resultado atual igual a zero!");
      } else {
        resultado_porcentagem = porcentagem(num, resultado);
        console.log("Resultado: " + resultado_porcentagem + "%");
        resultado_porcentagem = 0;
      }
      break;

    case 6:
      console.log("Resultado: " + resultado);
      break;

    case 7:
      console.log("Encerrando...");
      break;

    default:
      console.log("Opção inválida, tente novamente!");
      break;
  }
}
