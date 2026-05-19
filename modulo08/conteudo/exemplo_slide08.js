function buscarUsuario(id) {
  // A Promise representa uma operação assíncrona,
  // ou seja, uma operação que pode demorar para terminar.
  return new Promise((resolve, reject) => {
    // O setTimeout simula uma demora de 2 segundos,
    // como se estivéssemos esperando uma resposta externa.
    setTimeout(() => {
      // Condição usada para simular uma operação que deu certo.
      if (id === 1) {
        // O resolve é chamado quando a operação termina com sucesso.
        // O valor enviado aqui será recebido pelo then().
        resolve({ id: 1, nome: "Ana" });
      } else {
        // O reject é chamado quando a operação termina com erro.
        // O erro enviado aqui será recebido pelo catch().
        reject(new Error("Usuário não encontrado"));
      }
    }, 2000);
  });
}

// Chamada da função buscarUsuario.
// Como ela retorna uma Promise, podemos usar then, catch e finally.
buscarUsuario(1)
  // O then é executado quando a Promise é resolvida com sucesso.
  .then((usuario) => {
    console.log("Sucesso:", usuario);
  })
  // O catch é executado quando a Promise é rejeitada com erro.
  .catch((erro) => {
    console.log("Erro:", erro.message);
  })
  // O finally é executado no final da Promise,
  // independentemente de ter dado certo ou errado.
  .finally(() => {
    console.log("Operação finalizada.");
  });

  