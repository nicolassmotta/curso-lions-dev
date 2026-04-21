/* * ENTRADA DE DADOS EM JAVASCRIPT
 * A forma de obter entrada de dados depende muito do ambiente de execução:
 * - Node.js: Console/Terminal
 * - Browser: HTML e APIs do navegador
 */

// ===================================================================
// PARTE I: ENTRADA DE DADOS NO CONSOLE (NODE.JS)
// ===================================================================

// -------------------------------------------------------------------
// 1. Método 'process.stdin' (A forma mais rudimentar/direta - já presente no seu código)
// -------------------------------------------------------------------

console.log("--- 1. process.stdin (Entrada de baixo nível) ---");
console.log("Aguardando entrada no console. Digite algo:");

let entradaUsuario = "";

// O evento 'data' é disparado quando o usuário digita algo e pressiona Enter.
// O 'data' é um Buffer, por isso precisa de .toString().
process.stdin.on("data", function (data) {
  entradaUsuario = data.toString().trim(); // Converte, remove espaços extras

  // console.log("Você digitou: " + entradaUsuario);
  // Para não parar o script aqui, vamos apenas armazenar e continuar...

  // NOTA: Para um script real, você colocaria toda a lógica aqui dentro
  // ou usaria 'readline' (próximo exemplo) para um controle melhor.

  // Vamos comentar o process.exit() para permitir que o próximo bloco execute
  // process.exit();
});

// -------------------------------------------------------------------
// 2. Módulo 'readline' (A forma mais controlada e moderna no Node.js)
// -------------------------------------------------------------------

// O 'readline' facilita a leitura linha por linha.
import * as readline from "readline"; // Necessita do módulo 'readline' do Node.js

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function obterNomeUsuario() {
  rl.question("\n--- 2. readline --- \nQual é o seu nome? ", (nome) => {
    console.log(`Olá, ${nome}! O readline simplifica a entrada.`);

    // 3. Método 'close()' é crucial para liberar o processo de entrada
    rl.close();
  });
}

// Chame a função para executar o prompt do readline
// AVISO: Em um ambiente real, você só chamaria um método de entrada por vez.
// obterNomeUsuario();

// -------------------------------------------------------------------
// 3. Argumentos de Linha de Comando (Passando dados ao executar o script)
// -------------------------------------------------------------------

/*
 * Estes dados são fornecidos quando você executa o script no terminal:
 * Exemplo de execução: node entradadedados.js Valor1 Valor2
 * Os argumentos ficam em process.argv
 */

console.log("\n--- 3. process.argv (Linha de Comando) ---");

// process.argv[0] é o caminho do node
// process.argv[1] é o caminho do script
// process.argv[2] é o primeiro argumento do usuário, e assim por diante.
if (process.argv.length > 2) {
  const primeiroArg = process.argv[2];
  console.log(`Primeiro argumento recebido na execução: ${primeiroArg}`);
} else {
  console.log("Nenhum argumento de linha de comando foi fornecido (além do script).");
}

console.log("-------------------------------------------");

// ===================================================================
// PARTE II: ENTRADA DE DADOS NO BROWSER (FRONT-END)
// ===================================================================

// -------------------------------------------------------------------
// 4. Função 'prompt()' (Nativa do Browser - Simples, mas bloqueia o código)
// -------------------------------------------------------------------

/*
 * Esta função NÃO EXISTE no Node.js, apenas no ambiente do navegador!
 * Para fins de demonstração, vamos apenas ilustrar o CÓDIGO.
 */

/*
function entradaNavegador() {
    // Isso abriria uma caixa de diálogo pedindo o nome.
    const idade = prompt("4. prompt(): Digite sua idade:"); 

    if (idade !== null) {
        console.log(`Idade digitada (no Browser): ${idade}`);
    } else {
        console.log("O usuário cancelou.");
    }
}
// entradaNavegador(); // Descomente para rodar no navegador (via <script>)
*/

// -------------------------------------------------------------------
// 5. Entrada via Formulários HTML (O Padrão Web)
// -------------------------------------------------------------------

/*
 * O método mais comum e moderno na Web é a interação com elementos HTML.
 * O JavaScript ESCUTA eventos (como 'click' ou 'change') em um campo <input>
 * e lê o valor desse campo. Isso não é aplicável diretamente aqui no Node.js,
 * mas é a forma POSSÍVEL na linguagem em ambiente web.
 */

/*
// Exemplo de como o JS LERIA um campo HTML (CÓDIGO Conceitual)
document.getElementById('campo-texto').addEventListener('change', function(event) {
    const valorInput = event.target.value;
    console.log("5. HTML Input: O valor mudou para: " + valorInput);
});
*/

console.log("\n--- 4. e 5. Browser/HTML (Conceitual) ---");
console.log("Os métodos 'prompt()' e 'Formulários HTML' só funcionam em navegadores.");
console.log("------------------------------------------");
