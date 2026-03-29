import { baralhos } from './data.js';

function atualizarBaralho(id, novoTitulo) {
    const idNum = parseInt(id);
    const baralho = baralhos.find(b => b.id === idNum);

    if (!baralho) {
        return { error: "Baralho não encontrado!" };
    }

    if (novoTitulo) {
        baralho.titulo = novoTitulo;
    }
    
    return { data: baralho };
}

export default atualizarBaralho;