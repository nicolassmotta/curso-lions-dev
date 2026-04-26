import dados from "./dados.js";

function encontrarPacientePorId(idPaciente) {
  const pacienteEncontrado = dados.pacientes.find((paciente) => paciente.id === idPaciente);
  return pacienteEncontrado;
}

export default encontrarPacientePorId;
