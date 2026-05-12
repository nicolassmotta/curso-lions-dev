// @ts-nocheck
// Antes: armazenamento em memória
let baralhos = [];

// Depois: armazenamento no MongoDB
const baralhos = await Baralho.find();

