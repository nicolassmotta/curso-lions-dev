function identificarRepetidos(lista) {
  let vistos = [];
  let repetidos = [];
  lista.forEach((valor) => {
    if (!vistos.includes(valor)) {
      //primeira vez que viu o valor, coloca no array
      vistos.push(valor);
    } else if (!repetidos.includes(valor)) {
      //caso ja foi visto, coloca nos repetidos apenas uma vez
      repetidos.push(valor);
    }
  });
  return repetidos;
}

const nums = [1, 2, 3, 4, 5, 7, 1, 2, 3, 4, 6, 2, 3, 5];
console.log(`Lista de números: ${nums}\nNúmeros repetidos: ${identificarRepetidos(nums)}`);
