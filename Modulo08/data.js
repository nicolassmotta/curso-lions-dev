// Dados que simulam um banco de dados
let baralhos = [
    {
        id: 1,
        titulo: "JavaScript"
    },
    {
        id: 2,
        titulo: "Matematica"
    }
];

let flashcards = [
    {
        id: 1,
        pergunta: "Porque usar VAR em Javascript?",
        resposta: "Escopo global",
        idBaralho: 1
    },
    {
        id: 2,
        pergunta: "Quanto é 1+1?",
        resposta: "2",
        idBaralho: 2
    }
];

module.exports = { baralhos, flashcards };