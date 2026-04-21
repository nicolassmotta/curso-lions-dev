import promptSync from "prompt-sync";
const prompt = promptSync();

function somar(num1, num2) {
  return num1 + num2;
}

function subtrair(num1, num2) {
  return num1 - num2;
}

function multiplicar(num1, num2) {
  return num1 * num2;
}

function dividir(num1, num2) {
  return num1 / num2;
}

function porcentagem(num1, num2) {
  return (num1 / num2) * 100;
}

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
      } else {
        resultado = dividir(resultado, num);
        console.log("Resultado: " + resultado);
      }
      break;

    case 5:
      num = Number(prompt("Digite a porcentagem: "));
      if (isNaN(num)) {
        console.log("Da próxima vez digite um número correto!");
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
