import ContaRepository from "../repositories/conta.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";
import { calcularSaldoDisponivel } from "../utils/dinheiro.js";
import { garantirDonoOuEquipe } from "../utils/permissoes.js";

export async function buscarUsuarioOuErro(usuarioId) {
  const usuario = await UsuarioRepository.buscarPorId(usuarioId);

  if (!usuario) {
    throw criarErro("Usuário não encontrado.", 404);
  }

  return usuario;
}

export async function garantirUsuarioPodeOperar(usuarioId) {
  const usuario = await buscarUsuarioOuErro(usuarioId);

  if (usuario.status === "bloqueado" || usuario.status === "encerrado") {
    throw criarErro("Usuário não pode realizar operações financeiras.", 403);
  }

  return usuario;
}

export async function buscarContaOuErro(contaId) {
  const conta = await ContaRepository.buscarPorId(contaId);

  if (!conta) {
    throw criarErro("Conta não encontrada.", 404);
  }

  return conta;
}

export function garantirContaAtiva(conta) {
  if (!conta) {
    throw criarErro("Conta não encontrada.", 404);
  }

  if (conta.status !== "ativa") {
    throw criarErro("A conta precisa estar ativa para esta operação.", 403);
  }
}

export function garantirSaldoSuficiente(conta, valorCentavos) {
  if (calcularSaldoDisponivel(conta) < valorCentavos) {
    throw criarErro("Saldo insuficiente.", 400);
  }
}

export async function buscarContaAcessivel(contaId, usuarioLogado) {
  const conta = await buscarContaOuErro(contaId);
  garantirDonoOuEquipe(conta.usuarioId, usuarioLogado);
  return conta;
}

export async function buscarContaOperavel(contaId, usuarioLogado) {
  const conta = await buscarContaAcessivel(contaId, usuarioLogado);

  await garantirUsuarioPodeOperar(conta.usuarioId);
  garantirContaAtiva(conta);

  return conta;
}
