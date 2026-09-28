// Dados que simulam um banco de dados
let baralhos = [
  {
    id: 1,
    titulo: "JavaScript",
  },
  {
    id: 2,
    titulo: "Matemática",
  },
];

let flashcards = [
  {
    id: 1,
    pergunta: "Qual é o escopo de uma variável declarada com var?",
    resposta: "Escopo de função (ou global, se declarada fora de funções)",
    idBaralho: 1,
  },
  {
    id: 2,
    pergunta: "Quanto é 1+1?",
    resposta: "2",
    idBaralho: 2,
  },
];

export { baralhos, flashcards };
