import dados from "./dados.js";

function encontrarMedicoPorId(idMedico) {
  const medicoEncontrado = dados.medicos.find((medico) => medico.id === idMedico);
  return medicoEncontrado;
}

export default encontrarMedicoPorId;
