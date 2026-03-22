import promptSync from "prompt-sync";
const prompt = promptSync();

let op = 0;
let numero = Math.floor(Math.random() * 5) + 1;

while (op == 0) {
  let numero_usuario = prompt("Adivinhe o numero: ");

  if (numero == numero_usuario) {
    console.log("Parabéns, você adivinhou o número!");
    op++;
  } else {
    console.log("Você errou, tente novamente!");
  }

  console.log(numero);
}
