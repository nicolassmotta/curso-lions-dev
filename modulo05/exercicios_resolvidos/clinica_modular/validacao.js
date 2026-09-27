import consultas from "./dados.js";

export function posicaoValida(numero) {
  const posicao = numero - 1;
  return !isNaN(numero) && posicao >= 0 && posicao < consultas.length;
}

export function campoPreenchido(texto) {
  return texto.trim() !== "";
}
