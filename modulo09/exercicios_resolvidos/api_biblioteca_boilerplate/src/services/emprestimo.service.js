import EmprestimoRepository from "../repositories/emprestimo.repository.js";
import MaterialRepository from "../repositories/material.repository.js";
import criarErro from "../utils/criarErro.js";

const DIAS_SEM_MULTA = 7;
const MULTA_POR_DIA = 2;

async function registrar(idDoUsuario, dados = {}) {
  const { material: idMaterial, nomeAluno, turma, dataEmprestimo, diasEmprestimo } = dados;

  // 1. O material existe e é seu? (material de outro usuário também volta null)
  const material = await MaterialRepository.buscarPorIdDoDono(idMaterial, idDoUsuario);
  if (!material) {
    throw criarErro("Material não encontrado.", 404);
  }

  // 2. Tem exemplar?
  if (material.estoque <= 0) {
    throw criarErro("Material sem exemplares disponíveis.", 400);
  }

  // Bônus 3: o mesmo aluno não pega o mesmo material duas vezes sem devolver
  if (nomeAluno) {
    const emAberto = await EmprestimoRepository.buscarEmAberto(idMaterial, nomeAluno.trim(), idDoUsuario);
    if (emAberto) {
      throw criarErro("Este aluno já está com este material emprestado.", 409);
    }
  }

  // 3. Multa prevista
  let multaPrevista = 0;
  if (diasEmprestimo > DIAS_SEM_MULTA) {
    multaPrevista = (diasEmprestimo - DIAS_SEM_MULTA) * MULTA_POR_DIA;
  }

  // 5. Cria o empréstimo. Fazemos isso ANTES da baixa no estoque (passo 4):
  // se faltar algum campo, o create falha e o estoque continua intacto.
  const emprestimo = await EmprestimoRepository.criar({
    material: idMaterial,
    nomeAluno,
    turma,
    dataEmprestimo,
    diasEmprestimo,
    multaPrevista,
    usuario: idDoUsuario,
  });

  // 4. Baixa no estoque
  material.estoque = material.estoque - 1;
  await MaterialRepository.salvar(material);

  return emprestimo;
}

async function listarMeus(idDoUsuario) {
  return EmprestimoRepository.listarPorUsuario(idDoUsuario);
}

async function buscarMeu(idDoUsuario, idEmprestimo) {
  const emprestimo = await EmprestimoRepository.buscarPorIdDoDono(idEmprestimo, idDoUsuario);

  if (!emprestimo) {
    throw criarErro("Empréstimo não encontrado.", 404);
  }

  return emprestimo;
}

async function alterarStatus(idDoUsuario, idEmprestimo, novoStatus) {
  const emprestimo = await buscarMeu(idDoUsuario, idEmprestimo);
  const statusAnterior = emprestimo.status;

  // Grava primeiro: se o status for inválido, o enum recusa e o estoque não muda
  emprestimo.status = novoStatus;
  await EmprestimoRepository.salvar(emprestimo);

  // Só devolve ao estoque na PRIMEIRA vez que vira "Devolvido"
  if (novoStatus === "Devolvido" && statusAnterior !== "Devolvido") {
    const material = await MaterialRepository.buscarPorIdDoDono(emprestimo.material, idDoUsuario);
    if (material) {
      material.estoque = material.estoque + 1;
      await MaterialRepository.salvar(material);
    }
  }

  return emprestimo;
}

async function removerMeu(idDoUsuario, idEmprestimo) {
  const emprestimo = await EmprestimoRepository.deletarPorIdDoDono(idEmprestimo, idDoUsuario);

  if (!emprestimo) {
    throw criarErro("Empréstimo não encontrado.", 404);
  }

  return { message: "Empréstimo removido com sucesso." };
}

// Bônus 1
async function relatorio(idDoUsuario) {
  const emprestimos = await EmprestimoRepository.listarPorUsuario(idDoUsuario);

  let totalMultas = 0;
  const porStatus = { Emprestado: 0, Devolvido: 0, Atrasado: 0 };

  for (const emprestimo of emprestimos) {
    totalMultas = totalMultas + emprestimo.multaPrevista;
    porStatus[emprestimo.status] = porStatus[emprestimo.status] + 1;
  }

  return {
    totalEmprestimos: emprestimos.length,
    totalMultasPrevistas: totalMultas,
    porStatus,
  };
}

const EmprestimoService = {
  registrar,
  listarMeus,
  buscarMeu,
  alterarStatus,
  removerMeu,
  relatorio,
};

export default EmprestimoService;
