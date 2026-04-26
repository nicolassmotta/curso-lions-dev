import dados from './dados.js';

function atualizarConsulta(id, data, descricao) {
  const consulta = dados.consultas.find(c => c.id === id);

  if (!consulta) {
    console.log("Erro: Consulta não encontrada.");
    return;
  }

  consulta.data = data || consulta.data;
  // Operador curto-circuito (||) para manter o dado antigo
  consulta.descricao = descricao || consulta.descricao;

  console.log("Consulta atualizada com sucesso!");
}

export default atualizarConsulta;
