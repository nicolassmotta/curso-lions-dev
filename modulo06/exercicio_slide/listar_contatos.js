function listarContatos(contatos) {
  //Caso o Array esteja vazio não fazemos nada
  if (contatos.length === 0) {
    console.log("Nenhum contato cadastrado.");
    return;
  }
  //Laço de repetição para imprimir todos os dados
  contatos.forEach((contato) => {
    console.log(`\nID: ${contato.id}`);
    console.log(`Nome: ${contato.nome}`);
    console.log(`Email: ${contato.email}`);
    console.log(`Telefones: ${contato.telefones.join(" | ")}`);
  });
}

export default listarContatos;
