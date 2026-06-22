import AgendamentoService from "../services/agendamento.service.js";

async function cadastrar(req, res, next) {
    try {
        const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

        const novoAgendamento = await AgendamentoService.cadastrar({ nomePet, 
            especie, 
            nomeDono, 
            telefoneDono, 
            servico, 
            data 
        });

        res.status(201).json({ mensagem: "Agendamento criado com sucesso!", agendamento: novoAgendamento });
    } catch (erro) {
        res.status(400).json({ mensagem: `Erro ao criar o agendamento: ${erro.message}` });
    }
}

const AgendamentoController = {
    cadastrar
};

export default AgendamentoController;