/*
 * ===================================================================
 * MÓDULO 01: INTRODUÇÃO AO AMBIENTE DE DESENVOLVIMENTO
 * ===================================================================
 *
 * Este arquivo serve como um resumo prático dos conceitos de Node.js e NPM
 * vistos na aula.
 */

// -------------------------------------------------------------------
// 1. O QUE É NODE.JS?
// -------------------------------------------------------------------

/*
 * Node.js é um ambiente que permite executar código JavaScript
 * FORA do navegador (no "servidor" ou, no nosso caso, no terminal).
 *
 * O comando `console.log()` é a forma principal de "imprimir"
 * informações no terminal.
 */

console.log("Olá, Mundo! Este código está rodando com Node.js.");
console.log("================================================");

// -------------------------------------------------------------------
// 2. O QUE É O NPM (NODE PACKAGE MANAGER)?
// -------------------------------------------------------------------

/*
 * O NPM é o Gerenciador de Pacotes do Node.
 * Pense nele como uma "loja de aplicativos" para código.
 *
 * Comandos principais do NPM vistos na aula:
 *
 * a) npm init
 * - Inicia um novo projeto Node.js.
 * - Ele faz perguntas (nome do projeto, versão, etc.) e
 * CRIA o arquivo 'package.json'.
 *
 * b) npm install <nome-do-pacote>
 * - Baixa um pacote (código de outra pessoa) da internet (o "Registro NPM")
 * e o salva na pasta 'node_modules'.
 * - Também ATUALIZA os arquivos 'package.json' e 'package-lock.json'.
 * - Ex: npm install hello-world-npm
 */

// -------------------------------------------------------------------
// 3. O QUE É O 'package.json'?
// -------------------------------------------------------------------

/*
 * O 'package.json' (que já existe nesta pasta) é a "identidade" ou
 * "carteira de motorista" do seu projeto.
 *
 * Ele armazena metadados importantes:
 * - "name": O nome do seu projeto.
 * - "version": A versão atual (ex: 1.0.0).
 * - "main": O arquivo principal de entrada (ex: "index.js").
 * - "scripts": Atalhos de terminal (veremos mais tarde).
 * - "dependencies": A LISTA de pacotes que seu projeto precisa para
 * funcionar (ex: "hello-world-npm").
 *
 * Quando você baixa um projeto de outra pessoa (ex: do GitHub),
 * você só precisa rodar 'npm install' e o NPM lerá as 'dependencies'
 * deste arquivo e baixará todas elas automaticamente.
 */

// -------------------------------------------------------------------
// 4. O QUE É O 'package-lock.json'?
// -------------------------------------------------------------------

/*
 * O 'package-lock.json' (que também já existe) é um arquivo
 * gerado AUTOMATICAMENTE pelo NPM quando você roda 'npm install'.
 *
 * Se o 'package.json' é a *lista de compras*, o 'package-lock.json'
 * é a *nota fiscal detalhada*.
 *
 * Ele "trava" (locks) a versão EXATA de cada pacote que foi instalado,
 * incluindo os pacotes que os pacotes usam (sub-dependências).
 *
 * IMPORTÂNCIA: Ele garante que o projeto funcione exatamente igual
 * na sua máquina, na máquina do seu colega e no servidor.
 *
 * REGRA: Você NUNCA edita o 'package-lock.json' manualmente.
 * O NPM cuida dele.
 */

// -------------------------------------------------------------------
// 5. ATIVIDADE PRÁTICA: USANDO UM PACOTE
// -------------------------------------------------------------------

/*
 * O comando 'require()' é como o Node.js "importa" um pacote
 * que foi instalado (ou outro arquivo que você criou).
 *
 * (Se este 'require' der erro, rode 'npm install hello-world-npm' no
 * terminal desta pasta 'Modulo01')
 */

// Importa o pacote que instalamos
import hello from "hello-world-npm";

// Executa a função que veio dentro do pacote
const mensagem = hello();

// Imprime o resultado no terminal
console.log("Mensagem vinda do pacote 'hello-world-npm':");
console.log(mensagem);

console.log("================================================");
console.log("Fim do script do Módulo 01.");
