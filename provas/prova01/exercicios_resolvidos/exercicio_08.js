/**
 * Exercício 8: Frequência de Palavras (Versão apenas com Arrays)
 * Objetivo: Contar quantas vezes cada palavra aparece sem usar métodos de objeto avançados.
 */

const frase = "o rato roeu a roupa do rei de roma o rato roeu";

// 1. Convertemos para minúsculas e dividimos a frase por espaços
const palavras = frase.toLowerCase().split(" ");

// 2. Criamos dois arrays paralelos:
// um para as palavras que já encontramos e outro para as suas respectivas contagens
const palavrasEncontradas = [];
const contagens = [];

// 3. Percorremos a lista de todas as palavras da frase
for (let i = 0; i < palavras.length; i++) {
  const palavraAtual = palavras[i];

  // 4. Verificamos em que posição (índice) essa palavra está no nosso array de encontradas
  const indice = palavrasEncontradas.indexOf(palavraAtual);

  if (indice !== -1) {
    // 5. Se o índice for diferente de -1, a palavra já existe.
    // Aumentamos o número na mesma posição no array de contagens.
    contagens[indice]++;
  } else {
    // 6. Se for -1, é a primeira vez que vemos a palavra.
    // Adicionamos a palavra no array de encontradas e o número 1 no array de contagens.
    palavrasEncontradas.push(palavraAtual);
    contagens.push(1);
  }
}

// 7. Agora exibimos o relatório percorrendo um dos arrays (ambos têm o mesmo tamanho)
console.log("Relatório de Frequência:");
for (let i = 0; i < palavrasEncontradas.length; i++) {
  console.log(`${palavrasEncontradas[i]}: ${contagens[i]}`);
}
