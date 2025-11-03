// ======================================================
// 1️⃣ Criação e Acesso de Elementos
// ======================================================

let frutas = ['maçã', 'banana', 'abacaxi', 'laranja'];

console.log('Lista de frutas:', frutas);
console.log('Primeira fruta:', frutas[0]);
console.log('Tamanho do array:', frutas.length); // propriedade length


// ======================================================
// 2️⃣ Adicionar Elementos
// ======================================================

// .push() → adiciona um elemento ao final do array
frutas.push('manga');
console.log('Após push:', frutas);

// .unshift() → adiciona um elemento no início do array
frutas.unshift('uva');
console.log('Após unshift:', frutas);


// ======================================================
// 3️⃣ Remover Elementos
// ======================================================

// .pop() → remove o último elemento
frutas.pop();
console.log('Após pop:', frutas);

// .shift() → remove o primeiro elemento
frutas.shift();
console.log('Após shift:', frutas);


// ======================================================
// 4️⃣ Remover Elemento Específico
// ======================================================

// .splice(posição, quantidade)
frutas.splice(1, 1); // remove 1 elemento a partir do índice 1
console.log('Após splice (remover índice 1):', frutas);


// ======================================================
// 5️⃣ Verificar se contém um elemento
// ======================================================

// .includes(valor)
if (frutas.includes('banana')) {
  console.log('Tem banana na lista!');
} else {
  console.log('Não tem banana na lista!');
}


// ======================================================
// 6️⃣ Descobrir posição de um elemento
// ======================================================

// .indexOf(valor)
console.log('Índice do "abacaxi":', frutas.indexOf('abacaxi'));


// ======================================================
// 7️⃣ Tamanho do array
// ======================================================

console.log('Total de frutas:', frutas.length);


// ======================================================
// 🧪 Atividade 1 - Minha Mesa
// ======================================================

let minhaMesa = ['Nicolas', 'João', 'Eduardo', 'Jhonatan'];
console.log(`Meu nome é ${minhaMesa[0]}, meus colegas são ${minhaMesa[1]}, ${minhaMesa[2]} e ${minhaMesa[3]}.`);


// ======================================================
// 🧪 Atividade 2 - Média de Notas com Array
// ======================================================

// Simulação sem entrada de usuário
let notas = [];

let prova1 = 8.5;
let prova2 = 7.0;

notas.push(prova1);
notas.push(prova2);

let media = (notas[0] + notas[1]) / 2;
console.log(`Notas: ${notas}`);
console.log(`Média final: ${media}`);


// ======================================================
// 🧪 Atividade 3 - Cores Favoritas
// ======================================================

// Cores mais votadas
let coresFavoritas = ['preto', 'azul', 'verde'];
let coresEspeciais = [];

let corDoUsuario = 'vermelho'; // simulação de entrada

if (coresFavoritas.includes(corDoUsuario)) {
  console.log('A sua cor favorita é uma das favoritas da turma!');
} else {
  console.log('A sua cor favorita é diferente, vamos adicionar à lista!');
  coresEspeciais.push(corDoUsuario);
}

console.log('Cores favoritas:', coresFavoritas);
console.log('Cores especiais:', coresEspeciais);
console.log('Total de cores favoritas:', coresFavoritas.length);


// ======================================================
// 🧩 Desafio extra - Revisão
// ======================================================
// Crie um array com números de 1 a 10, e gere um novo array só com os ímpares

let numeros = [1,2,3,4,5,6,7,8,9,10];
let impares = [];

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] % 2 !== 0) {
    impares.push(numeros[i]);
  }
}

console.log('Números ímpares:', impares);