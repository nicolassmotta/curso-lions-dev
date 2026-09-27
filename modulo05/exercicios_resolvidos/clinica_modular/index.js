import promptSync from "prompt-sync";
import adicionarConsulta from "./operacoes/adicionar_consulta.js";
import listarConsultas from "./operacoes/listar_consultas.js";
import atualizarConsulta from "./operacoes/atualizar_consulta.js";
import cancelarConsulta from "./operacoes/cancelar_consulta.js";

const prompt = promptSync();

function lerDadosConsulta() {
  const paciente = prompt("Paciente: ");
  const medico = prompt("Médico: ");
  const data = prompt("Data (AAAA-MM-DD): ");
  const hora = prompt("Hora (HH:MM): ");
  return { paciente, medico, data, hora };
}

let opcao = "";

while (opcao !== "0") {
  console.log("\n1 - Adicionar consulta\n2 - Listar consultas\n3 - Atualizar consulta\n4 - Cancelar consulta\n0 - Sair");
  opcao = prompt("Escolha uma opção: ");

  if (opcao === "1") {
    const d = lerDadosConsulta();
    if (adicionarConsulta(d.paciente, d.medico, d.data, d.hora)) {
      console.log("Consulta adicionada.");
    } else {
      console.log("Paciente e médico são obrigatórios.");
    }
  } else if (opcao === "2") {
    listarConsultas();
  } else if (opcao === "3") {
    const numero = Number(prompt("Número da consulta: "));
    const d = lerDadosConsulta();
    if (atualizarConsulta(numero, d)) {
      console.log("Consulta atualizada.");
    } else {
      console.log("Consulta não encontrada.");
    }
  } else if (opcao === "4") {
    const numero = Number(prompt("Número da consulta: "));
    if (cancelarConsulta(numero)) {
      console.log("Consulta cancelada.");
    } else {
      console.log("Consulta não encontrada.");
    }
  } else if (opcao === "0") {
    console.log("Encerrando o sistema da clínica.");
  } else {
    console.log("Opção inválida.");
  }
}
