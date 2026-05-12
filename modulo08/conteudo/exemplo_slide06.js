// Sem o await

async function buscarUsuarioSemAwait() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // Aqui faltou await:
    const usuario = resposta.json();

    // Vai mostrar uma Promise pendente, não o objeto do usuário
    console.log('Usuário:', usuario);
  } catch (erro) {
    console.error('Erro ao buscar usuário:', erro.message);
  }
}

buscarUsuarioSemAwait();
