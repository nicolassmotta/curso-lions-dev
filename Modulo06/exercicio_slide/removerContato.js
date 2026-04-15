function removerContato(contatos, id) {
  const indice = contatos.findIndex((contato) => contato.id === id);

  if (indice !== -1) {
    contatos.splice(indice, 1);
  }
}

export default removerContato;
