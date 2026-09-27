import consultas from "../dados.js";
import { posicaoValida } from "../validacao.js";

function cancelarConsulta(numero) {
  if (!posicaoValida(numero)) {
    return false;
  }

  consultas.splice(numero - 1, 1);
  return true;
}

export default cancelarConsulta;
