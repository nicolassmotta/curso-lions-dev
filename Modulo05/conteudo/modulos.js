/*
 * ===================================================================
 * MÓDULO 05: MÓDULOS ES (IMPORT / EXPORT)
 * ===================================================================
 *
 * Este arquivo explica como MODULARIZAR o código JavaScript,
 * ou seja, dividir o código em vários arquivos menores e organizados.
 *
 * No Módulo 03, vocês construíram a calculadora toda em um único
 * arquivo. Funcionou, mas imagine um projeto GRANDE com milhares
 * de linhas... Seria impossível de manter!
 *
 * A solução é: MÓDULOS.
 */


// -------------------------------------------------------------------
// 1. O PROBLEMA: CÓDIGO MONOLÍTICO
// -------------------------------------------------------------------

/*
 * "Monolítico" = tudo em um lugar só.
 *
 * Problemas de ter tudo em um arquivo:
 *   ❌ Difícil de ler (centenas ou milhares de linhas)
 *   ❌ Difícil de encontrar bugs
 *   ❌ Difícil de trabalhar em equipe (conflitos no Git)
 *   ❌ Impossível de reutilizar partes do código em outros projetos
 *
 * A solução: dividir o código em MÓDULOS (arquivos separados),
 * cada um com uma responsabilidade clara.
 *
 * Exemplo da Calculadora:
 *   ANTES (Módulo 03): 1 arquivo com tudo (funções + menu + lógica)
 *   DEPOIS (Módulo 05): 1 arquivo por função + 1 arquivo principal
 */


// -------------------------------------------------------------------
// 2. O QUE SÃO MÓDULOS ES (ES MODULES)?
// -------------------------------------------------------------------

/*
 * ES Modules é o sistema OFICIAL de módulos do JavaScript moderno.
 * "ES" vem de "ECMAScript" (o nome oficial do JavaScript).
 *
 * Existem dois conceitos fundamentais:
 *
 *   📤 EXPORT → "Eu estou DISPONIBILIZANDO este código para outros arquivos"
 *   📥 IMPORT → "Eu estou TRAZENDO código de outro arquivo para cá"
 *
 * Para usar ES Modules no Node.js, é necessário adicionar no package.json:
 *
 *   {
 *     "type": "module"
 *   }
 *
 * Sem isso, o Node.js usará o sistema antigo (CommonJS com require()).
 */


// -------------------------------------------------------------------
// 3. EXPORT DEFAULT (Exportação Padrão)
// -------------------------------------------------------------------

/*
 * Cada arquivo pode ter UM export default.
 * É o valor "principal" que o arquivo exporta.
 *
 * ARQUIVO: somar.js
 * ─────────────────
 * function somar(a, b) {
 *     return a + b;
 * }
 *
 * export default somar;
 *
 * ─────────────────────
 *
 * Forma alternativa (mais curta):
 *
 * export default function somar(a, b) {
 *     return a + b;
 * }
 */

// Simulando um export default para demonstração:
function somar(a, b) {
    return a + b;
}
// export default somar; // ← Descomente isso se este arquivo for um módulo real


// -------------------------------------------------------------------
// 4. IMPORT (Importação)
// -------------------------------------------------------------------

/*
 * Para usar algo que foi exportado de outro arquivo, usamos import.
 *
 * ARQUIVO: index.js (arquivo principal)
 * ─────────────────
 * import somar from './somar.js';
 *
 * console.log(somar(10, 5)); // 15
 * ─────────────────────
 *
 * REGRAS IMPORTANTES:
 *
 * 1. O caminho DEVE começar com './' (arquivo local)
 *    ✅ import somar from './somar.js';
 *    ❌ import somar from 'somar.js';  // Node procuraria no node_modules!
 *
 * 2. A extensão '.js' é OBRIGATÓRIA no Node.js com ES Modules
 *    ✅ import somar from './somar.js';
 *    ❌ import somar from './somar';    // Erro no Node.js!
 *
 * 3. Com export default, o nome na importação é LIVRE:
 *    import somar from './somar.js';      // ✅ Funciona
 *    import minhaFuncao from './somar.js'; // ✅ Também funciona (mesmo arquivo!)
 */


// -------------------------------------------------------------------
// 5. EXPORT NOMEADO (Named Export)
// -------------------------------------------------------------------

/*
 * Diferente do default, você pode exportar MÚLTIPLOS valores
 * de um mesmo arquivo usando exports nomeados.
 *
 * ARQUIVO: matematica.js
 * ─────────────────
 * export function somar(a, b) { return a + b; }
 * export function subtrair(a, b) { return a - b; }
 * export const PI = 3.14159;
 * ─────────────────────
 *
 * ARQUIVO: index.js
 * ─────────────────
 * import { somar, subtrair, PI } from './matematica.js';
 *
 * console.log(somar(10, 5));   // 15
 * console.log(subtrair(10, 5)); // 5
 * console.log(PI);              // 3.14159
 * ─────────────────────
 *
 * ⚠️ ATENÇÃO: Com named exports, as CHAVES {} são obrigatórias
 * e o NOME deve ser EXATAMENTE igual ao que foi exportado!
 */


// -------------------------------------------------------------------
// 6. COMPARAÇÃO: DEFAULT vs. NOMEADO
// -------------------------------------------------------------------

/*
 * ┌────────────────────┬────────────────────┬────────────────────────┐
 * │                    │ Export Default      │ Named Export           │
 * ├────────────────────┼────────────────────┼────────────────────────┤
 * │ Quantidade         │ 1 por arquivo      │ Vários por arquivo     │
 * │ Sintaxe Export     │ export default X   │ export function X()    │
 * │ Sintaxe Import     │ import X from '.'  │ import { X } from '.' │
 * │ Nome livre?        │ ✅ Sim             │ ❌ Não (deve ser igual)│
 * │ Quando usar?       │ Valor principal    │ Utilitários/múltiplos  │
 * └────────────────────┴────────────────────┴────────────────────────┘
 */


// -------------------------------------------------------------------
// 7. IMPORTANDO PACOTES DO NPM
// -------------------------------------------------------------------

/*
 * A mesma sintaxe de import funciona para pacotes instalados via NPM.
 * A diferença: NÃO usamos './' no início!
 *
 *   import express from 'express';       // Pacote do NPM (sem ./)
 *   import somar from './somar.js';      // Arquivo local (com ./)
 *
 * O Node.js sabe que sem './' ele deve procurar na pasta node_modules.
 */

import promptSync from 'prompt-sync'; // ← Exemplo real: importando do NPM

const prompt = promptSync();
console.log("Pacote 'prompt-sync' importado com sucesso via ES Modules!");


// -------------------------------------------------------------------
// 8. ORGANIZAÇÃO DE ARQUIVOS NA PRÁTICA
// -------------------------------------------------------------------

/*
 * Exemplo da Calculadora Modularizada (veja no exercicios_slides/):
 *
 * Modulo06/
 * └── exercicios_slides/
 *     ├── index.js          ← Arquivo principal (importa tudo)
 *     ├── somar.js          ← export default function somar(a, b)
 *     ├── subtrair.js       ← export default function subtrair(a, b)
 *     ├── multiplicar.js    ← export default function multiplicar(a, b)
 *     ├── dividir.js        ← export default function dividir(a, b)
 *     └── porcentagem.js    ← export default function porcentagem(a, b)
 *
 * Cada arquivo tem UMA responsabilidade (uma operação).
 * O index.js importa todos e monta o menu.
 *
 * VANTAGENS:
 *   ✅ Cada operação pode ser testada individualmente
 *   ✅ Fácil de adicionar novas operações (criar novo arquivo)
 *   ✅ Código limpo e organizado
 *   ✅ Em equipe, cada pessoa pode trabalhar em um arquivo
 */


// -------------------------------------------------------------------
// 9. DICAS E ERROS COMUNS
// -------------------------------------------------------------------

/*
 * ❌ ERRO: "SyntaxError: Cannot use import statement outside a module"
 *    → Faltou "type": "module" no package.json
 *
 * ❌ ERRO: "ERR_MODULE_NOT_FOUND"
 *    → Verifique se o caminho tem './' e a extensão '.js'
 *
 * ❌ ERRO: "SyntaxError: The requested module does not provide
 *          an export named 'default'"
 *    → Você fez import SEM chaves, mas o arquivo usa named export
 *    → Solução: use import { nomeFuncao } from '...'
 *
 * 💡 DICA: Um arquivo pode ter AMBOS — um default e vários nomeados:
 *
 *    export default function principal() { ... }
 *    export function auxiliar1() { ... }
 *    export function auxiliar2() { ... }
 *
 *    import principal, { auxiliar1, auxiliar2 } from './arquivo.js';
 */


// -------------------------------------------------------------------
// 10. RESUMO
// -------------------------------------------------------------------

/*
 * ┌──────────────────────┬────────────────────────────────────────────┐
 * │ Conceito             │ Descrição                                  │
 * ├──────────────────────┼────────────────────────────────────────────┤
 * │ Módulo               │ Um arquivo JS que exporta/importa código   │
 * │ export default       │ Exportação principal (1 por arquivo)        │
 * │ export (nomeado)     │ Exportação múltipla (vários por arquivo)    │
 * │ import X from '.'    │ Importar o default de um módulo             │
 * │ import { X } from    │ Importar export nomeado                     │
 * │ "type": "module"     │ Habilita ES Modules no Node.js              │
 * │ ./ no caminho        │ Indica arquivo local (não pacote NPM)       │
 * │ .js na extensão      │ Obrigatório em imports no Node.js           │
 * └──────────────────────┴────────────────────────────────────────────┘
 */

console.log("\n================================================");
console.log("Fim do conteúdo: Módulos ES (Import/Export)");
console.log("================================================");
