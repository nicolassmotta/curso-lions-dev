const { baralhos } = require('./data');

function criarBaralho(titulo) {
    if (!titulo) {
        return { error: "O título é obrigatório." };
    }
    
    const novoBaralho = {
        id: baralhos.length > 0 ? Math.max(...baralhos.map(b => b.id)) + 1 : 1,
        titulo: titulo,
    };
    
    baralhos.push(novoBaralho);
    return { data: novoBaralho };
}

module.exports = criarBaralho;