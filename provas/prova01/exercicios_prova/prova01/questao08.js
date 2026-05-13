let palavra = "cachorro";

let letrasEncontradas = [];
let contagem = [];

for (i = 0; i < palavra.length; i++) {
  let letraAtual = palavra[i];

  let indice = letrasEncontradas.indexOf(letraAtual);

  if (indice != -1) {
    contagem[indice]++;
  } else {
    letrasEncontradas.push(letraAtual);
    contagem.push(1);
  }
}

console.log("Relatório de Frequência:");
for (let i = 0; i < letrasEncontradas.length; i++) {
  console.log(`${letrasEncontradas[i]}: ${contagem[i]}`);
}
