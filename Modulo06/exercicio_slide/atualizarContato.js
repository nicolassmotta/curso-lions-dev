function atualizarContato(contatos, id, novosDados) {
    const index = contatos.findIndex(contato => contato.id === id)
    
    if (index === -1) {
        console.log("Erro: Contato não encontrado!")
        return false
    }

    // Validação de e-mail na atualização
    if (novosDados.email) {
        let emailEmUso = false
        for (let i = 0; i < contatos.length; i++) {
            let contatoAtual = contatos[i]
            // Verifica se o email é igual ao digitado E se não é o próprio usuário atualizando
            if (contatoAtual.email === novosDados.email && contatoAtual.id !== id) {
                emailEmUso = true
                break
            }
        }

        if (emailEmUso) {
            console.log("Erro: O novo e-mail já está em uso por outro usuário!")
            return false
        }
    }

    // Atualiza apenas os campos preenchidos
    contatos[index].nome = novosDados.nome || contatos[index].nome
    contatos[index].email = novosDados.email || contatos[index].email
    // Se o usuário digitou novos telefones (o array é maior que zero), nós substituímos
    if (novosDados.telefones.length > 0) {
        contatos[index].telefones = novosDados.telefones
    }

    return true
}

export default atualizarContato