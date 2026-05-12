// Simulação de função assíncrona com timeout

console.log('Antes do timeout');

setTimeout(() => {
  console.log('Executou depois de 2 segundos');
}, 2000);

console.log('Depois do timeout');
