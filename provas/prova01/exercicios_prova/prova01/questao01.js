let numeros = [5, 5, 5, 5, 5];

let somaTotal = 0;
let media = 0;

for (let i = 0; i < numeros.length; i++) {
  somaTotal = somaTotal + numeros[i];
}

media = somaTotal / numeros.length;

console.log(media);

numeros.forEach((numero) => {
  somaTotal = somaTotal + numero;
});
