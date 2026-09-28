// Exercício 1: validateSync() confere as regras do schema sem conectar no banco
import Filme from "../src/models/filme.model.js";

const invalido = new Filme({ ano: 1500, nota: 12 });
const erro = invalido.validateSync();
console.log(Object.values(erro.errors).map((e) => e.message));

const valido = new Filme({ titulo: "Cidade de Deus", ano: 2002, generos: ["drama"], nota: 9 });
console.log(valido.validateSync()); // undefined: nenhum erro
console.log(valido.excluidoEm);     // null (valor padrão)
