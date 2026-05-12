// Await na prática

async function buscarUsuario() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const usuario = await resposta.json();

    console.log('Usuário:', usuario);
  } catch (erro) {
    console.error('Erro ao buscar usuário:', erro.message);
  }
}

buscarUsuario();
