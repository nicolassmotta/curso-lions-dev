/*
 * ===================================================================
 * MÓDULO 02: FUNDAMENTOS DE PROGRAMAÇÃO
 * -------------------------------------------------------------------
 * Aula 06: Objetos
 * ===================================================================
 *
 * Objetos são outro tipo de dado complexo. Eles nos permitem
 * agrupar informações relacionadas sobre uma "coisa" (um carro,
 * uma pessoa, um produto) usando "pares de chave-valor".
 *
 * Se Arrays são "armários" (listas numeradas), Objetos são "gaveteiros"
 * (etiquetados com nomes).
 */

// 1. Criando um Objeto
// Objetos são criados com chaves {}
const pessoa = {
    // chave: valor,
    nome: "Nicolas",
    idade: 30,
    temCnh: true,
    cidade: "São Paulo"
};

console.log("Objeto 'pessoa':", pessoa);

console.log("================================================");

// 2. Acessando Propriedades (Valores)
// Usamos a "notação de ponto" (ponto final) para acessar o valor de uma chave.

console.log("O nome da pessoa é:", pessoa.nome);       // Saída: Nicolas
console.log("A idade da pessoa é:", pessoa.idade);     // Saída: 30
console.log("Mora em:", pessoa.cidade);            // Saída: São Paulo

console.log("================================================");

// 3. Modificando Propriedades
// Você pode alterar o valor de uma propriedade da mesma forma:
console.log("Idade antiga:", pessoa.idade);
pessoa.idade = 31; // A pessoa fez aniversário
console.log("Idade nova:", pessoa.idade);

console.log("================================================");

// 4. Adicionando Novas Propriedades
// Você pode adicionar novas chaves/valores a qualquer momento:
console.log("Objeto antes de adicionar 'profissao':", pessoa);
pessoa.profissao = "Desenvolvedor";
console.log("Objeto depois de adicionar 'profissao':", pessoa);

console.log("================================================");

// 5. Objetos Complexos (Aninhamento)
// O valor de uma chave pode ser qualquer coisa, inclusive um Array ou outro Objeto.

const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2024,
    opcionais: ["Ar Condicionado", "Vidro Elétrico", "Câmera de Ré"], // Um Array
    motor: { // Um Objeto
        potencia: "177cv",
        combustivel: "Híbrido"
    }
};

console.log("Objeto 'carro':", carro);
console.log("O modelo do carro é:", carro.modelo);
console.log("O segundo opcional do carro é:", carro.opcionais[1]); // Acessando Array
console.log("O combustível do motor é:", carro.motor.combustivel); // Acessando Objeto aninhado