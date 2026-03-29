import contatos from './contatos.js';

function removerContato(contatos, id) {

    const index = contatos.findIndex(contato => contato.id === id);
    
    if (index !== -1) {
        contatos.splice(index, 1);
    }
}

export default removerContato;