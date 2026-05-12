// Exemplo de try/catch com async/await

async function buscarUsuarioPorId(id) {
  // Simula uma validação simples
  if (id !== 1) {
    throw new Error('Usuário não encontrado.');
  }

  return { id: 1, nome: 'Ana' };
}

async function executarExemplo() {
  try {
    const usuario = await buscarUsuarioPorId(2); 
    console.log('Usuário encontrado:', usuario);
  } catch (erro) {
    console.error('Erro ao buscar usuário:', erro.message);
  }
}

executarExemplo();
