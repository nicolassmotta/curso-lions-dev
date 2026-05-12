// Exemplo de try/catch
// Cenário: precisamos converter uma idade para número

function converterIdade(valor) {
  const idade = Number(valor);

  // Se não for um número válido, lançamos um erro
  if (Number.isNaN(idade)) {
    throw new Error('Idade inválida. Informe um número.');
  }

  return idade;
}

try {
  const entradaDoUsuario = 'vinte';
  const idadeConvertida = converterIdade(entradaDoUsuario);

  // Só executa se não houver erro
  console.log('Idade convertida com sucesso:', idadeConvertida);
} catch (erro) {
  // Executa quando ocorre erro dentro do try
  console.error('Ocorreu um problema:', erro.message);
}

