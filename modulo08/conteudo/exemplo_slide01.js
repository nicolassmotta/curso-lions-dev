// @ts-nocheck
// Antes: armazenamento em memória
let baralhos = [];

// Depois: armazenamento no MongoDB
baralhos = await Baralho.find();
