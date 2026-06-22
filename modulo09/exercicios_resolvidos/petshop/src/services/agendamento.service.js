import AgendamentoRepository from "../repositories/agendamento.repository.js";

async function cadastrar({ nomePet, especie, nomeDono, telefoneDono, servico, data }){
    
    let valor = 0;

    if (especie == "Cão") {
      switch (servico) {
        case "Banho":
          valor = 50;
          break;
        case "Tosa":
          valor = 60;
          break;
        case "Banho e Tosa":
          valor = 100;
          break;
        default:
          console.log("Serviço inválido!");
          break;
      }
    }

    if (especie == "Gato") {
      switch (servico) {
        case "Banho":
          valor = 60;
          break;
        case "Tosa":
          valor = 70;
          break;
        case "Banho e Tosa":
          valor = 110;
          break;
        default:
          console.log("Serviço inválido!");
          break;
      }
    }

    if (especie == "Outro") {
      switch (servico) {
        case "Banho":
          valor = 40;
          break;
        case "Tosa":
          valor = 50;
          break;
        case "Banho e Tosa":
          valor = 80;
          break;
        default:
          console.log("Serviço inválido!");
          break;
      }
    }

    const agendamento = await AgendamentoRepository.criar({ 
        nomePet, 
        especie, 
        nomeDono, 
        telefoneDono, 
        servico, 
        data,
        valor 
    });

    return agendamento;
}

const AgendamentoService = {
  cadastrar
};

export default AgendamentoService;