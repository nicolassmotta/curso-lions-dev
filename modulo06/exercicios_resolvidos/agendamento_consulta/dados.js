const medicos = [
  { id: 1, nome: "Dr. House", especialidade: "Diagnóstico" },
  { id: 2, nome: "Dra. Grey", especialidade: "Cirurgia" },
];

const pacientes = [
  { id: 1, nome: "John Doe", dataNascimento: "1985-01-15" },
  { id: 2, nome: "Jane Smith", dataNascimento: "1990-05-30" },
];

let consultas = [
  { id: 1, data: "2023-01-10", idMedico: 1, idPaciente: 1, descricao: "Consulta inicial" },
  { id: 2, data: "2023-02-15", idMedico: 2, idPaciente: 1, descricao: "Seguimento" },
  { id: 3, data: "2023-03-20", idMedico: 1, idPaciente: 2, descricao: "Consulta de rotina" },
];

export default { medicos, pacientes, consultas };
