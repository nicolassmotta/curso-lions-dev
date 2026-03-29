import baralho from './baralho.js';

function atualizarBaralho(baralho, idBaralho, novoTitulo) {
    
    baralho.forEach((baralho, index) => {
        if (baralho.id == idBaralho) {
            baralho.titulo = novoTitulo;
            console.log(`Baralho ${index + 1} atualizado:`);
            console.log(`Título Atualizado: ${baralho.titulo}`);
            console.log('-----------------------');
            return;
        }
    });
}

export default atualizarBaralho;