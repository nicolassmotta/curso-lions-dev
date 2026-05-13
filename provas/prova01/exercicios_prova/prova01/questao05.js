let palavra = "computador";
let palavraInvertida = "";

for (let i = palavra.length - 1; i >= 0; i--) {
  palavraInvertida = palavraInvertida + palavra[i];
}

console.log(palavra);
console.log(palavraInvertida);
