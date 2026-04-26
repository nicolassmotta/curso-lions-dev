import dados from "./dados.js";
import buscarMedicoPorId from "./buscar_medico_por_id.js";
import buscarPacientePorId from "./buscar_paciente_por_id.js";

function imprimirConsulta(consulta) {
  const medico = buscarMedicoPorId(consulta.idMedico);
  const paciente = buscarPacientePorId(consulta.idPaciente);

  let nomeMedico = "Desconhecido";
  if (medico) {
    nomeMedico = medico.nome;
  }

  let nomePaciente = "Desconhecido";
  if (paciente) {
    nomePaciente = paciente.nome;
  }

  console.log(`- ID da Consulta: ${consulta.id}, Data: ${consulta.data}, Médico: ${nomeMedico}, Paciente: ${nomePaciente}, Descrição: ${consulta.descricao}`);
}

function listarConsultas() {
  if (dados.consultas.length === 0) {
    console.log("Nenhuma consulta agendada.");
    return;
  }

  console.log("\n--- Todas as Consultas ---");
  dados.consultas.forEach(imprimirConsulta);
}

export function listarConsultasDoPaciente(idPaciente) {
  const consultasPaciente = dados.consultas.filter((consulta) => consulta.idPaciente === idPaciente);

  if (consultasPaciente.length === 0) {
    console.log("Nenhuma consulta agendada para este paciente.");
    return;
  }

  console.log("\n--- Consultas do Paciente ---");
  consultasPaciente.forEach(imprimirConsulta);
}

export default listarConsultas;
