// 1. Constantes Matemáticas
console.log(`O valor de Pi é: ${Math.PI}`); // 3.14159...

// 2. Os 4 Cavaleiros do Arredondamento
const numeroQuebrado = 4.7;
console.log(Math.round(numeroQuebrado)); // 5 (Arredonda para o mais próximo)
console.log(Math.ceil(numeroQuebrado));  // 5 (Força SEMPRE para cima)
console.log(Math.floor(numeroQuebrado)); // 4 (Força SEMPRE para baixo)
console.log(Math.trunc(numeroQuebrado)); // 4 (Ignora e corta a vírgula)

// 3. Raízes e Potências
console.log(Math.sqrt(81)); // 9 (Raiz quadrada)
console.log(Math.cbrt(27)); // 3 (Raiz cúbica)
console.log(Math.pow(2, 3)); // 8 (2 elevado à 3ª potência)

// 4. Valor Absoluto (Ignora o negativo)
const saldoDevedor = -1500;
console.log(`Você deve: R$ ${Math.abs(saldoDevedor)}`); // Você deve: R$ 1500

/*
// ---------------------------------------------------------------------

try {
    const palavra = "LionsDev";
    
    // Vamos tentar forçar um erro chamando uma função que não existe
    palavra.funcaoInexistente(); 
    
} catch (erro) {
    // Se falhar, o Node.js pula pra cá em vez de estourar a tela vermelha
    console.log("Ops! Aconteceu um erro inesperado, mas o sistema continua rodando.");
    console.log(`O que falhou exatamente: ${erro.message}`);
}

console.log("O programa chegou ao fim com sucesso, sem fechar no meio!");

// ---------------------------------------------------------------------

console.log("Preparando o ambiente...");

// Roda apenas UMA VEZ após 3 segundos (3000 milissegundos)
setTimeout(() => {
    console.log("Ambiente carregado após 3 segundos!");
}, 3000); 

let contador = 0;

// Repete CONTINUAMENTE a cada 1 segundo (1000 milissegundos)
const cronometro = setInterval(() => {
    contador++;
    console.log(`Passou ${contador} segundo(s)...`);

    // Precisamos de uma condição para parar o loop infinito
    if (contador === 5) {
        clearInterval(cronometro); // Interrompe o relógio
        console.log("O tempo esgotou!");
    }
}, 1000);

// ---------------------------------------------------------------------


const textoDigitado = "   Sim, Eu Quero APRENDER Node.js!   ";

// 1. Limpar espaços extras e converter tudo para letras minúsculas
const textoLimpo = textoDigitado.trim().toLowerCase();
console.log(`Texto limpo: "${textoLimpo}"`);

// 2. Separar uma frase inteira em um Array de palavras
const frase = "A turma é espetacular";
const palavras = frase.split(" ");
console.log("Palavras separadas:", palavras);

// 3. Substituir palavras (útil para filtro de xingamentos, por exemplo)
const fraseAlterada = frase.replace("espetacular", "***");
console.log(`Frase com censura: ${fraseAlterada}`);


// Importamos a ferramenta nativa do Node.js para manipular arquivos
import fs from 'fs'; 

const nomeDoArquivo = 'tarefas.txt';
const conteudo = '1. Estudar Node.js\n2. Praticar lógica\n3. Criar projeto final';

// Criamos o arquivo de texto fisicamente na pasta do projeto
fs.writeFileSync(nomeDoArquivo, conteudo);
console.log("Arquivo de texto salvo com sucesso!");

// Lemos o conteúdo do arquivo que acabou de ser criado
const textoLido = fs.readFileSync(nomeDoArquivo, 'utf-8');
console.log("\n--- Conteúdo lido do arquivo ---");
console.log(textoLido);

*/