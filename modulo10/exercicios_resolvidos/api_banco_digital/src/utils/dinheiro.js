import criarErro from "./criarErro.js";

export function validarValorCentavos(valor, campo = "valorCentavos") {
  const numero = Number(valor);

  if (!Number.isInteger(numero) || numero <= 0) {
    throw criarErro(`${campo} deve ser um número inteiro maior que zero.`, 400);
  }

  return numero;
}

export function validarValorNaoNegativo(valor, campo = "valorCentavos") {
  const numero = Number(valor || 0);

  if (!Number.isInteger(numero) || numero < 0) {
    throw criarErro(`${campo} deve ser um número inteiro maior ou igual a zero.`, 400);
  }

  return numero;
}

export function calcularSaldoDisponivel(conta) {
  return conta.saldoCentavos + conta.limiteChequeEspecialCentavos;
}

export function inicioDoDia(data = new Date()) {
  const inicio = new Date(data);
  inicio.setHours(0, 0, 0, 0);
  return inicio;
}

export function mesAtual() {
  return new Date().toISOString().slice(0, 7);
}

export function adicionarMeses(data, quantidade) {
  const resultado = new Date(data);
  resultado.setMonth(resultado.getMonth() + quantidade);
  return resultado;
}
