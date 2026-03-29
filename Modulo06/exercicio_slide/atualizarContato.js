import contatos from './contatos.js';

function atualizarContato(contatos, id, novosContatos) {
    
    const index = contatos.findIndex(contato => contato.id === id);
    if (index !== -1) {
        contatos[index] = { id, ...novosContatos };
    }
}

export default atualizarContato;