// -------------------------------------------------------------------
// 1. O QUE É O 'prompt-sync'?
// -------------------------------------------------------------------

/*
 * O 'prompt-sync' é um pacote NPM que permite que a gente peça
 * informações ao usuário via terminal (input).
 *
 * Ele é "sincrono" (sync) porque o programa "espera" o usuário
 * digitar algo antes de continuar.
*/

//Exemplo de uso:
// 1. Prepara a ferramenta
import promptSync from 'prompt-sync';
const prompt = promptSync();
// 2. Pergunta e guarda a resposta (sempre vira String!)
let nome = prompt("Qual seu nome? ");
let cidade = prompt("Onde você mora? ");

console.log("Olá " + nome + ", de " + cidade + "!");


// -------------------------------------------------------------------
// 2. COMO INSTALAR UM PACOTE NPM?
// -------------------------------------------------------------------
/*
 * Para usar o 'prompt-sync', primeiro precisamos INSTALAR ele no nosso projeto.
 *
 * Passos para instalar um pacote NPM:
 *
 * 1. Abra o terminal na pasta do seu projeto.
 * 2. Digite: npm install prompt-sync
 * 3. O NPM baixa o pacote e o adiciona à pasta 'node_modules'.
 * 4. O NPM também ATUALIZA o arquivo 'package.json' para incluir
 *    'prompt-sync' como uma dependência do projeto.
 *
 * Depois disso, você pode usar o código acima para pedir informações
 * ao usuário via terminal!
 */
