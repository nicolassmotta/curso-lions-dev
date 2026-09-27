import consultas from "../dados.js";
import { campoPreenchido } from "../validacao.js";

function adicionarConsulta(paciente, medico, data, hora) {
  if (!campoPreenchido(paciente) || !campoPreenchido(medico)) {
    return false;
  }

  consultas.push({ paciente, medico, data, hora });
  return true;
}

export default adicionarConsulta;
