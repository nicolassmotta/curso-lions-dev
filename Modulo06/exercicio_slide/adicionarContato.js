function adicionarContato(contatos, novoContato) {

    // Validação: Não permitir e-mail duplicado
    let emailExiste = false
    for (let i = 0; i < contatos.length; i++) {
        if (contatos[i].email === novoContato.email) {
            emailExiste = true
            // Para a busca assim que encontrar
            break 
        }
    }
    
    if (emailExiste) {
        console.log("Erro: Este e-mail já está cadastrado!")
        return
    }

    // Gerar ID sequencial (pega o último ID e soma 1)
    if (contatos.length > 0) {
        let ultimoContato = contatos[contatos.length - 1]
        novoContato.id = ultimoContato.id + 1
    } else {
        // Se a lista estiver vazia, ele é o primeiro
        novoContato.id = 1
    }
    
    contatos.push(novoContato)
    return
}

export default adicionarContato