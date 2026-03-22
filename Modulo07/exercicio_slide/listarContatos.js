import contatos from './contatos.js';

function listarContatos(contatos) {
    
    contatos.forEach(contato => {
        console.log(`ID: ${contato.id}, Nome: ${contato.nome}, Email: ${contato.email}, Telefone: ${contato.telefone}`);
    });
}

export default listarContatos;