// Padrão CommonJS (CJS) - O Tradicional
// Exportando (soma.js)
module.exports = soma;

// Importando (app.js)
const soma = require("./soma");

// Padrão ES Modules (ESM) - O Moderno
// Exportando (soma.js)
export default soma;

// Importando (app.js)
import soma from "./soma.js";
