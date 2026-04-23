import promptSync from "prompt-sync";
import adicionarConsulta from "./adicionar_consulta.js";
import listarConsultas, { listarConsultasDoPaciente } from "./listar_consultas.js";
import atualizarConsulta from "./atualizar_consulta.js";
import cancelarConsulta from "./cancelar_consulta.js";

const prompt = promptSync();

function exibirMenu() {
  console.log("\n--- Sistema de Agendamento ---");
  console.log("1. Agendar nova consulta");
  console.log("2. Listar todas as consultas");
  console.log("3. Listar consultas de um paciente");
  console.log("4. Atualizar uma consulta");
  console.log("5. Cancelar consulta");
  console.log("0. Sair");
  return prompt("Escolha uma opção: ");
}

let sair = false;

while (!sair) {
  const opcao = exibirMenu();

  switch (opcao) {
    case "1":
      const idMedico = parseInt(prompt("ID do Médico: "), 10);
      const idPaciente = parseInt(prompt("ID do Paciente: "), 10);
      const data = prompt("Data da consulta (ex: 2023-12-01): ");
      const descricao = prompt("Descrição: ");
      adicionarConsulta(idMedico, idPaciente, data, descricao);
      break;

    case "2":
      listarConsultas();
      break;

    case "3":
      const idPacienteListar = parseInt(prompt("ID do Paciente: "), 10);
      listarConsultasDoPaciente(idPacienteListar);
      break;

    case "4":
      const idAtualizar = parseInt(prompt("ID da Consulta para atualizar: "), 10);
      console.log("Deixe a data ou descrição em branco para não alterar.");
      const novaData = prompt("Nova data (ex: 2023-12-01): ");
      const novaDescricao = prompt("Nova descrição: ");
      atualizarConsulta(idAtualizar, novaData, novaDescricao);
      break;

    case "5":
      const idCancelar = parseInt(prompt("ID da Consulta para cancelar: "), 10);
      cancelarConsulta(idCancelar);
      break;

    case "0":
      console.log("Saindo do sistema...");
      sair = true;
      break;

    default:
      console.log("Opção inválida. Tente novamente.");
  }
}
