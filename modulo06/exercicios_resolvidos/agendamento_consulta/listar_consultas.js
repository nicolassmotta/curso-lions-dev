import dados from "./dados.js";
import encontrarMedicoPorId from "./encontrarMedicoPorId.js";
import encontrarPacientePorId from "./encontrarPacientePorId.js";

function listarConsultasDoPaciente(idPaciente) {
  const consultasPaciente = dados.consultas.filter(
    (c) => c.idPaciente === idPaciente
  );

  if (consultasPaciente.length === 0) {
    console.log("Nenhuma consulta agendada para este paciente.");
    return;
  }

  console.log("\n--- Consultas do Paciente ---");

  consultasPaciente.forEach((consulta) => {
    const medico = encontrarMedicoPorId(consulta.idMedico);
    const paciente = encontrarPacientePorId(consulta.idPaciente);

    let nomeMedico = "Desconhecido";
    if (medico) {
      nomeMedico = medico.nome;
    }

    let nomePaciente = "Desconhecido";
    if (paciente) {
      nomePaciente = paciente.nome;
    }

    console.log(
      `- ID da Consulta: ${consulta.id}, Data: ${consulta.data}, Médico: ${nomeMedico}, Paciente: ${nomePaciente}, Descrição: ${consulta.descricao}`
    );
  });
}

export default listarConsultasDoPaciente;
