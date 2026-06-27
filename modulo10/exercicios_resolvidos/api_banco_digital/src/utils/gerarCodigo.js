export function gerarDigitos(tamanho) {
  let codigo = "";

  for (let i = 0; i < tamanho; i++) {
    codigo += Math.floor(Math.random() * 10);
  }

  return codigo;
}

export function gerarCodigoBarras() {
  return gerarDigitos(47);
}

export function gerarChavePixAleatoria() {
  return `${gerarDigitos(8)}-${gerarDigitos(4)}-${gerarDigitos(4)}-${gerarDigitos(4)}-${gerarDigitos(12)}`;
}

export function gerarDadosCartao() {
  const ultimos4 = gerarDigitos(4);

  return {
    ultimos4,
    numeroMascarado: `**** **** **** ${ultimos4}`,
  };
}
