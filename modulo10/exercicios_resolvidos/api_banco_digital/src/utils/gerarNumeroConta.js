import { gerarDigitos } from "./gerarCodigo.js";

export default function gerarNumeroConta() {
  return `${gerarDigitos(6)}-${gerarDigitos(1)}`;
}
