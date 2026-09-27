import consultas from "../dados.js";
import { posicaoValida } from "../validacao.js";

function atualizarConsulta(numero, novosDados) {
  if (!posicaoValida(numero)) {
    return false;
  }

  consultas[numero - 1] = novosDados;
  return true;
}

export default atualizarConsulta;
