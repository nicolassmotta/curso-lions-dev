/*
 * Comparação lado a lado: CommonJS (CJS) x ES Modules (ESM).
 *
 * Este arquivo é só para leitura, NÃO execute com node.
 * Cada padrão mostra dois arquivos diferentes (soma.js e app.js),
 * e os dois padrões não podem ser misturados no mesmo arquivo.
 */

/*
 * Padrão CommonJS (CJS) - O Tradicional
 *
 * // soma.js (exportando)
 * function soma(a, b) {
 *   return a + b;
 * }
 * module.exports = soma;
 *
 * // app.js (importando)
 * const soma = require("./soma");
 * console.log(soma(2, 3)); // 5
 */

/*
 * Padrão ES Modules (ESM) - O Moderno (o que usamos no curso)
 *
 * // soma.js (exportando)
 * function soma(a, b) {
 *   return a + b;
 * }
 * export default soma;
 *
 * // app.js (importando)
 * import soma from "./soma.js"; // no ESM a extensão .js é obrigatória
 * console.log(soma(2, 3)); // 5
 */
