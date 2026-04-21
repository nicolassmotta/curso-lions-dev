import PromptSync from "prompt-sync";
const prompt = PromptSync();

let aluno = {
  nome: "Felipe",
  pontosLeitura: 10,
  historicoDias: [
    {
      data: "11/04/2026",
      paginasLidas: 10,
    },
    {
      data: "12/04/2026",
      paginasLidas: 12,
    },
  ],
};

let data = "";
let paginasLidas = 0;

console.log("Qual a data de hoje?");
data = prompt("R: ");
console.log("Quantas páginas você leu hoje?");
paginasLidas = parseInt(prompt("R: "));

let historicoDia = {
  data: data,
  paginasLidas: paginasLidas,
};

aluno.historicoDias.push(historicoDia);

if (aluno.historicoDias[aluno.historicoDias.length - 1].paginasLidas > 50 && aluno.pontosLeitura > 0) {
  aluno.pontosLeitura = aluno.pontosLeitura * 2;
  aluno.historicoDias[aluno.historicoDias.length - 1].data = aluno.historicoDias[aluno.historicoDias.length - 1].data + " - Super Leitor!";
}

if (aluno.historicoDias[aluno.historicoDias.length - 1].paginasLidas < 10) {
  aluno.pontosLeitura = aluno.pontosLeitura / 2;
}

console.log(`O nome do aluno é: ${aluno.nome}`);
console.log(`A pontuação do aluno é: ${aluno.pontosLeitura}`);
aluno.historicoDias.forEach((dias) => {
  console.log(`Data: ${dias.data}`);
  console.log(`Páginas Lidas: ${dias.paginasLidas}`);
});
