import MatriculaRepository from "../repositories/matricula.repository.js";
import criarErro from "../utils/criarErro.js";

// Tabelas das regras de negócio: trocar um preço é mudar uma linha.
const PRECOS = { Musculação: 90, Funcional: 120, Dança: 100 };
const MESES = { Mensal: 1, Trimestral: 3, Semestral: 6 };
const DESCONTO = { Mensal: 0, Trimestral: 0.1, Semestral: 0.15 };

function calcularValores(modalidade, plano) {
  // Modalidade ou plano fora da tabela: deixamos o enum do Schema
  // responder o 400 com a mensagem certa, sem calcular nada.
  if (PRECOS[modalidade] === undefined || MESES[plano] === undefined) {
    return {};
  }

  const valorMensal = PRECOS[modalidade];
  const valorTotal = Math.round(valorMensal * MESES[plano] * (1 - DESCONTO[plano]) * 100) / 100;

  return { valorMensal, valorTotal };
}

// Campos que o cliente pode enviar. valorMensal, valorTotal e usuario ficam de fora.
function pegarCamposPermitidos(dados = {}) {
  const campos = ["nomeAluno", "idade", "modalidade", "plano", "dataMatricula", "status"];
  const permitidos = {};

  for (const campo of campos) {
    if (dados[campo] !== undefined) {
      permitidos[campo] = dados[campo];
    }
  }

  return permitidos;
}

async function registrar(idDoUsuario, dados) {
  const matricula = pegarCamposPermitidos(dados);

  // Bônus 3: um aluno não pode ter duas matrículas Ativas do mesmo dono
  const status = matricula.status || "Ativa";
  if (status === "Ativa" && matricula.nomeAluno) {
    const ativa = await MatriculaRepository.buscarAtivaPorNome(matricula.nomeAluno.trim(), idDoUsuario);
    if (ativa) {
      throw criarErro("Este aluno já tem uma matrícula ativa.", 409);
    }
  }

  const valores = calcularValores(matricula.modalidade, matricula.plano);

  return MatriculaRepository.criar({
    ...matricula,
    ...valores,
    usuario: idDoUsuario,
  });
}

async function listarMinhas(idDoUsuario, filtro = {}) {
  return MatriculaRepository.listarPorUsuario(idDoUsuario, filtro);
}

async function buscarMinha(idDoUsuario, idMatricula) {
  const matricula = await MatriculaRepository.buscarPorIdDoDono(idMatricula, idDoUsuario);

  if (!matricula) {
    throw criarErro("Matrícula não encontrada.", 404);
  }

  return matricula;
}

async function atualizarMinha(idDoUsuario, idMatricula, dados) {
  const dadosAtualizados = pegarCamposPermitidos(dados);

  if (Object.keys(dadosAtualizados).length === 0) {
    throw criarErro("Envie ao menos um campo para atualizar.", 400);
  }

  // Se mudar modalidade ou plano, os valores precisam ser recalculados.
  // Sem isso, trocar de Mensal para Semestral manteria o valor antigo.
  if (dadosAtualizados.modalidade !== undefined || dadosAtualizados.plano !== undefined) {
    const atual = await buscarMinha(idDoUsuario, idMatricula);
    const modalidade = dadosAtualizados.modalidade || atual.modalidade;
    const plano = dadosAtualizados.plano || atual.plano;
    Object.assign(dadosAtualizados, calcularValores(modalidade, plano));
  }

  const matricula = await MatriculaRepository.atualizarPorIdDoDono(idMatricula, idDoUsuario, dadosAtualizados);

  if (!matricula) {
    throw criarErro("Matrícula não encontrada.", 404);
  }

  return matricula;
}

async function removerMinha(idDoUsuario, idMatricula) {
  const matricula = await MatriculaRepository.deletarPorIdDoDono(idMatricula, idDoUsuario);

  if (!matricula) {
    throw criarErro("Matrícula não encontrada.", 404);
  }

  return { message: "Matrícula removida com sucesso." };
}

// Bônus 2
async function resumoMeu(idDoUsuario) {
  const matriculas = await MatriculaRepository.listarPorUsuario(idDoUsuario);

  const porStatus = { Ativa: 0, Pausada: 0, Cancelada: 0 };
  let totalAtivas = 0;

  for (const matricula of matriculas) {
    porStatus[matricula.status] = porStatus[matricula.status] + 1;
    if (matricula.status === "Ativa") {
      totalAtivas = totalAtivas + matricula.valorTotal;
    }
  }

  return {
    quantidade: matriculas.length,
    porStatus,
    valorTotalAtivas: Math.round(totalAtivas * 100) / 100,
  };
}

const MatriculaService = {
  registrar,
  listarMinhas,
  buscarMinha,
  atualizarMinha,
  removerMinha,
  resumoMeu,
};

export default MatriculaService;
