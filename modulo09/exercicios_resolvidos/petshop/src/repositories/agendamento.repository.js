import Agendamento from "../models/agendamento.js";

async function criar(dadosAgendamento) {
    return Agendamento.create(dadosAgendamento);
}

const AgendamentoRepository = {
    criar
};

export default AgendamentoRepository;
