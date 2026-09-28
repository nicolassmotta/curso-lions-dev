import TarefaRepository from "../repositories/tarefa.repository.js";
import criarErro from "../utils/criarErro.js";

// Só estes campos podem vir do body. Assim ninguém troca o dono
// (usuario) nem os campos automáticos pelo body.
function pegarCamposPermitidos(dados = {}) {
  const permitidos = {};

  if (dados.titulo !== undefined) permitidos.titulo = dados.titulo;
  if (dados.descricao !== undefined) permitidos.descricao = dados.descricao;
  if (dados.prioridade !== undefined) permitidos.prioridade = dados.prioridade;
  if (dados.dataLimite !== undefined) permitidos.dataLimite = dados.dataLimite;
  if (dados.concluida !== undefined) permitidos.concluida = dados.concluida;

  return permitidos;
}

async function registrar(idDoUsuario, dados) {
  const tarefa = pegarCamposPermitidos(dados);

  // O dono vem SEMPRE do token, nunca do body.
  tarefa.usuario = idDoUsuario;

  return TarefaRepository.criar(tarefa);
}

async function listarMinhas(idDoUsuario, filtro = {}) {
  // Listagem nunca dá 404: sem tarefas, volta um array vazio.
  return TarefaRepository.listarPorUsuario(idDoUsuario, filtro);
}

async function buscarMinha(idDoUsuario, idTarefa) {
  const tarefa = await TarefaRepository.buscarPorIdDoDono(idTarefa, idDoUsuario);

  if (!tarefa) {
    throw criarErro("Tarefa não encontrada.", 404);
  }

  return tarefa;
}

async function atualizarMinha(idDoUsuario, idTarefa, dados) {
  const dadosAtualizados = pegarCamposPermitidos(dados);

  if (Object.keys(dadosAtualizados).length === 0) {
    throw criarErro("Envie ao menos um campo para atualizar.", 400);
  }

  const tarefa = await TarefaRepository.atualizarPorIdDoDono(idTarefa, idDoUsuario, dadosAtualizados);

  if (!tarefa) {
    throw criarErro("Tarefa não encontrada.", 404);
  }

  return tarefa;
}

async function concluirMinha(idDoUsuario, idTarefa) {
  const tarefa = await TarefaRepository.atualizarPorIdDoDono(idTarefa, idDoUsuario, { concluida: true });

  if (!tarefa) {
    throw criarErro("Tarefa não encontrada.", 404);
  }

  return tarefa;
}

async function removerMinha(idDoUsuario, idTarefa) {
  const tarefa = await TarefaRepository.deletarPorIdDoDono(idTarefa, idDoUsuario);

  if (!tarefa) {
    throw criarErro("Tarefa não encontrada.", 404);
  }

  return { message: "Tarefa removida com sucesso." };
}

// Bônus 3: resumo calculado em JavaScript
async function resumoMeu(idDoUsuario) {
  const tarefas = await TarefaRepository.listarPorUsuario(idDoUsuario);

  let concluidas = 0;
  for (const tarefa of tarefas) {
    if (tarefa.concluida) {
      concluidas = concluidas + 1;
    }
  }

  return {
    total: tarefas.length,
    concluidas,
    pendentes: tarefas.length - concluidas,
  };
}

const TarefaService = {
  registrar,
  listarMinhas,
  buscarMinha,
  atualizarMinha,
  concluirMinha,
  removerMinha,
  resumoMeu,
};

export default TarefaService;
