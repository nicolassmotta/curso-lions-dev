import { baralhos, flashcards } from "./data.js";

function deletarBaralho(id) {
    const index = baralhos.findIndex((b) => b.id === parseInt(id));

    if (index === -1) {
        return { error: "Baralho não encontrado." };
    }

    // 1. Remove o baralho do array de baralhos
    const baralhoRemovido = baralhos.splice(index, 1)[0];

    // 2. Lógica de "Cascata": Filtra o array de flashcards para manter 
    // apenas aqueles que NÃO pertencem ao baralho deletado.
    for (let i = flashcards.length - 1; i >= 0; i--) {
        if (flashcards[i].idBaralho === parseInt(id)) {
            flashcards.splice(i, 1);
        }
    }

    return { data: baralhoRemovido };
}

export default deletarBaralho;

