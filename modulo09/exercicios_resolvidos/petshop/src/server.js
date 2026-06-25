import dotenv from "dotenv";
import app from "./app.js";
import conectarDB from "./config/db.js"

dotenv.config();
const PORT = process.env.PORT;

try {
  conectarDB();

  app.listen(PORT, () => {
    console.log(`Conectado com a porta ${PORT} com sucesso!`);
  });
} catch (error) {
  console.log(`Erro ao iniciar a aplicação: ${error.message}`);
}


/*
app.get(("/agendamentos"), async (req, res) => {
  try {
    const todosAgendamentos = await Agendamento.find();
    res.status(200).json({mensagem: "Todos os agendamentos foram listados com sucesso!", agendamentos: todosAgendamentos});
  } catch (erro) {
    res.status(400).json({mensagem: `Erro ao listar os agendamentos: ${erro.message}`})
  }
});

app.get(("/agendamentos/busca"), async (req, res) => {
  try {
    const nome = req.query.nome;
    const agendamentos = await Agendamento.find({nomePet: 
      { $regex: nome, $options: "i"}}); 
    // regex busca por partes do texto
    // options ignora maiusculas e minusculas
    res.status(200).json({mensagem: "Busca efetuada com sucesso!", 
      agendamentos: agendamentos});
  } catch (erro) {
    res.status(400).json({mensagem: `Erro: ${erro.message}`})
  }
});

app.patch(("/agendamentos/:id"), async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(id, 
      {status: status}, {runValidators: true, new: true});

    if (!agendamentoAtualizado) {
      return res.status(404).json({mensagem: "Agendamento não encontrado!"});
    }

    res.status(200).json({mensagem: "Agendamento atualizado com sucesso!", 
      agendamentoAtualizado: agendamentoAtualizado});
  } catch (erro) {
    res.status(500).json({mensagem: `Erro do servidor: ${erro.message}`});
  }
});

app.delete(("/agendamentos/:id"), async (req, res) => {
  try {
    const id = req.params.id;
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

    if (!agendamentoDeletado) {
      return res.status(404).json({mensagem: "Agendamento não encontrado!"});
    }

    res.status(200).json({mensagem: "Agendamento deletado com sucesso!", agendamentoDeletado: agendamentoDeletado});
  } catch (erro) {
    res.status(500).json({mensagem: `Erro do servidor: ${erro.message}`});
  }
});
*/
