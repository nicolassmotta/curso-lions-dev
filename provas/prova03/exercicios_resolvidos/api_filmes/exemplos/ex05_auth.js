// Exercício 5: o hash muda a cada vez, mas o compare continua funcionando
import { gerarHash, conferirSenha, gerarToken, lerToken } from "../src/utils/auth.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "segredo-de-exemplo";

const hash1 = await gerarHash("123456");
const hash2 = await gerarHash("123456");
console.log(hash1 === hash2);                       // false: salts diferentes
console.log(await conferirSenha("123456", hash1));  // true
console.log(await conferirSenha("errada", hash1));  // false

const token = gerarToken({ _id: "u1", email: "ana@email.com", papel: "admin" });
const dados = lerToken(token);
console.log(dados.email, dados.papel);              // ana@email.com admin
