import { flashcards } from "./data.js";

function deletarFlashcard(id) {
    const idNum = parseInt(id);
    const index = flashcards.findIndex((f) => f.id === idNum);

    if (index === -1) {
        return { error: "Flashcard não encontrado." };
    }

    const flashcardRemovido = flashcards[index];

    flashcards.splice(index, 1);

    return { data: flashcardRemovido };
}

export default deletarFlashcard;

