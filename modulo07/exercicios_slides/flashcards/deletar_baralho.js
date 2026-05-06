import { baralhos, flashcards } from "./data.js";

function deletarBaralho(id) {
    const idNum = parseInt(id);
    const index = baralhos.findIndex((b) => b.id === idNum);

    if (index === -1) {
        return { error: "Baralho não encontrado." };
    }

    // 1. Guarda o baralho que será removido
    const baralhoRemovido = baralhos[index];

    // 2. Remove o baralho do array de baralhos
    baralhos.splice(index, 1);

    // 3. Remove os flashcards que pertencem ao baralho deletado
    for (let i = flashcards.length - 1; i >= 0; i--) {
        if (flashcards[i].idBaralho === idNum) {
            flashcards.splice(i, 1);
        }
    }

    return { data: baralhoRemovido };
}

export default deletarBaralho;

