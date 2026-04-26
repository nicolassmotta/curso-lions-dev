import dados from './dados.js';

function cancelarConsulta(id) {
  const index = dados.consultas.findIndex(c => c.id === id);

  if (index === -1) {
    console.log("Erro: Consulta não encontrada.");
    return;
  }

  dados.consultas.splice(index, 1);
  console.log("Consulta cancelada com sucesso!");
}

export default cancelarConsulta;
