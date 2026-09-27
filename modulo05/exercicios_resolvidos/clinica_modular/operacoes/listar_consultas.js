import consultas from "../dados.js";

function listarConsultas() {
  if (consultas.length === 0) {
    console.log("Nenhuma consulta agendada.");
    return;
  }

  for (let i = 0; i < consultas.length; i++) {
    const c = consultas[i];
    console.log(`${i + 1}. ${c.paciente} - ${c.medico} - ${c.data} - ${c.hora}`);
  }
}

export default listarConsultas;
