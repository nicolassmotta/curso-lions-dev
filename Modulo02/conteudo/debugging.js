/*
 * ===================================================================
 * MÓDULO 02: FUNDAMENTOS DE PROGRAMAÇÃO
 * -------------------------------------------------------------------
 * Aula 07: Introdução ao Debugging (Depuração)
 * ===================================================================
 *
 * "Debugging" (ou Depuração) é o processo de encontrar e
 * consertar "bugs" (erros) no seu código.
 *
 * É uma das habilidades mais importantes de um programador.
 *
 * POR QUE USAR UM DEBUGGER?
 * Usar 'console.log()' ajuda, mas o debugger é como uma
 * "máquina do tempo" e um "raio-X" para o seu código.
 * Ele permite pausar a execução e ver o valor de todas as
 * variáveis naquele exato momento.
 */

// 1. O QUE É UM "BREAKPOINT"?
// Um "Breakpoint" (Ponto de Parada) é um "sinal vermelho" que
// você coloca no seu código.
// Quando o programa é executado em modo Debug, ele vai PAUSAR
// automaticamente ao atingir essa linha.

// -------------------------------------------------------------------
// 2. ATIVIDADE PRÁTICA: VAMOS DEBUGAR!
// -------------------------------------------------------------------
//
// 1. Vá para o VSCode.
// 2. Ao lado do número da linha 55 (onde está `console.log("Iniciando o loop...")`),
//    clique com o mouse. Uma BOLA VERMELHA vai aparecer.
//    ISSO É UM BREAKPOINT!
//
// 3. Em vez de rodar o código com 'node debugging.js', vá até
//    a aba "Run and Debug" (Executar e Depurar) na barra lateral esquerda (ícone de play com um inseto).
//
// 4. Clique no botão verde "Run and Debug" (e selecione "Node.js" se ele perguntar).
//
// 5. O código vai começar a rodar e VAI PAUSAR na linha 55!
//    Note que a linha fica amarela.
//

let total = 0;
const numeros = [10, 20, 30, 40, 50];

console.log("Iniciando o loop..."); // <-- COLOQUE O BREAKPOINT AQUI (Linha 55)

for (let i = 0; i < numeros.length; i++) {
    let numeroAtual = numeros[i];
    
    console.log(`Loop ${i}: Valor de 'total' ANTES de somar: ${total}`);
    
    total = total + numeroAtual;
    
    console.log(`Loop ${i}: Somando ${numeroAtual}. 'total' AGORA é: ${total}`);
}

console.log("Loop finalizado.");
console.log("O valor total final é:", total);


// 6. PAINÉIS DE DEBUG:
//    - Com o código pausado, olhe o painel "VARIABLES" (Variáveis) no canto superior esquerdo.
//    - Você verá o valor de `total` (que é 0) e o array `numeros`.
//
// 7. CONTROLADORES DE EXECUÇÃO:
//    Uma pequena barra de controle aparecerá:
//
//    - [Continue (F5)]: Continua rodando até o próximo breakpoint (ou até o fim).
//    - [Step Over (F10)]: "Pule por cima". Executa a linha atual e pausa NA PRÓXIMA.
//    - [Step Into (F11)]: "Entre em". (Usado para entrar em funções, veremos no Módulo 5).
//    - [Stop (Shift+F5)]: Para o debug.
