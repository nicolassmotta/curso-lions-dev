/**
 * Exercício 4: utilitários de texto com exports nomeados e default
 */
export function capitalizar(frase) {
  return frase
    .split(" ")
    .map((palavra) => (palavra ? palavra[0].toUpperCase() + palavra.slice(1) : palavra))
    .join(" ")
}

export function contarVogais(frase) {
  const vogais = "aeiouáéíóúâêôãõ"
  let total = 0
  for (const letra of frase.toLowerCase()) {
    if (vogais.includes(letra)) total++
  }
  return total
}

export default function slug(frase) {
  return frase.trim().toLowerCase().split(" ").filter((p) => p !== "").join("-")
}
