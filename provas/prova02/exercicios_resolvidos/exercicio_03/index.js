/**
 * Exercício 3: os três erros corrigidos
 * 1. dobro é export default: importa SEM chaves.
 * 2. triplo é export nomeado: importa COM chaves, e o caminho precisa do .js.
 * 3. Em ES Modules não existe require: use import.
 */
import dobro, { triplo } from "./matematica.js"
import fs from "node:fs"

console.log(dobro(2), triplo(2), typeof fs.readFileSync) // 4 6 function
