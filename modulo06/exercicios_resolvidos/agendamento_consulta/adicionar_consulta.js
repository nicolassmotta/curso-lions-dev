import dados from "./dados.js";
import encontrarMedicoPorId from "./encontrar_medico_por_id.js";
import encontrarPacientePorId from "./encontrar_paciente_por_id.js";

function adicionarConsulta(idMedico, idPaciente, data, descricao) {
  const medico = encontrarMedicoPorId(idMedico);
  const paciente = encontrarPacientePorId(idPaciente);

  if (!medico) {
    console.log("Erro: Médico não encontrado.");
    return false;
  }
  if (!paciente) {
    console.log("Erro: Paciente não encontrado.");
    return false;
  }

  let novoId = 1;
  if (dados.consultas.length > 0) {
    novoId = dados.consultas[dados.consultas.length - 1].id + 1;
  }

  const novaConsulta = {
    id: novoId,
    idMedico: idMedico,
    idPaciente: idPaciente,
    data: data,
    descricao: descricao,
  };

  dados.consultas.push(novaConsulta);
  console.log("Consulta agendada com sucesso!");
  return true;
}

export default adicionarConsulta;
