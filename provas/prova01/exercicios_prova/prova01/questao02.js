let numeros = [10, 15, 20, 25, 35];

let contadorPares = 0;

numeros.forEach((numero) => {
  if (numero % 2 == 0) {
    contadorPares++; //contadorPares = contadorPares + 1;
  }
});

console.log(contadorPares);
