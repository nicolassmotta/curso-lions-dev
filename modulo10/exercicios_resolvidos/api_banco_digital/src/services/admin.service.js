import ContaRepository from "../repositories/conta.repository.js";
import EmprestimoRepository from "../repositories/emprestimo.repository.js";
import TransacaoRepository from "../repositories/transacao.repository.js";
import UsuarioRepository from "../repositories/usuario.repository.js";
import { listaSegura } from "../utils/serializar.js";

async function resumo() {
  const totalUsuarios = await UsuarioRepository.contar();
  const totalContas = await ContaRepository.contar();
  const totalContasAtivas = await ContaRepository.contar({ status: "ativa" });
  const totalEmprestimosSolicitados = await EmprestimoRepository.contar({ status: "solicitado" });
  const saldoTotalCentavos = await ContaRepository.somarSaldos();

  return {
    totalUsuarios,
    totalContas,
    totalContasAtivas,
    totalEmprestimosSolicitados,
    saldoTotalCentavos,
  };
}

async function listarTransacoes(filtros = {}) {
  const consulta = {};

  if (filtros.tipo) {
    consulta.tipo = filtros.tipo;
  }

  if (filtros.status) {
    consulta.status = filtros.status;
  }

  const transacoes = await TransacaoRepository.listar(consulta);
  const transacoesFiltradas = [];

  for (const transacao of transacoes) {
    const depoisDoInicio = !filtros.inicio || transacao.createdAt >= new Date(filtros.inicio);
    const antesDoFim = !filtros.fim || transacao.createdAt <= new Date(filtros.fim);

    if (depoisDoInicio && antesDoFim) {
      transacoesFiltradas.push(transacao);
    }
  }

  return listaSegura(transacoesFiltradas);
}

async function contasPendentes() {
  const contas = await ContaRepository.listar({ status: "pendente_aprovacao" });
  return listaSegura(contas);
}

async function emprestimosPendentes() {
  const emprestimos = await EmprestimoRepository.listar({ status: "solicitado" });
  return listaSegura(emprestimos);
}

export default {
  resumo,
  listarTransacoes,
  contasPendentes,
  emprestimosPendentes,
};
