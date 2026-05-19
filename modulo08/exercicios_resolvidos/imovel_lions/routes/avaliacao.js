import express from "express";
import Avaliacao from "../models/avaliacao.js";
import Imovel from "../models/imovel.js";
import Reserva from "../models/reserva.js";

const router = express.Router();

// 1. Rota para Criar Avaliação (POST /avaliacoes)
// Esta rota possui validações relacionais entre os Schemas.
router.post("/", async (req, res) => {
  try {
    const { imovelId, nomeUsuario, nota, comentario } = req.body;

    // REGRA 1: Validação de Existência do Imóvel
    // Garantimos que o imóvel que está recebendo a avaliação realmente existe cadastrado no banco de dados.
    const imovel = await Imovel.findById(imovelId);
    if (!imovel) {
      return res.status(404).json({ message: "Imóvel não encontrado." });
    }

    // REGRA 2 (Apenas Hóspedes Reais): Verifica se o usuário de fato tem uma reserva "Confirmada" nesse imóvel.
    // Buscamos se há alguma reserva associada a esse 'imovelId', onde o titular 'nomeHospede' seja igual ao 
    // avaliador 'nomeUsuario' e o status da reserva esteja como "Confirmada".
    const reservaConfirmada = await Reserva.findOne({
      imovelId: imovelId,
      nomeHospede: nomeUsuario,
      status: "Confirmada"
    });

    // Se não encontrar nenhuma reserva com esses critérios, bloqueamos a avaliação.
    if (!reservaConfirmada) {
      return res.status(400).json({ 
        message: "Apenas hóspedes que possuem reservas confirmadas para este imóvel podem avaliá-lo." 
      });
    }

    // Instancia a nova avaliação
    const novaAvaliacao = new Avaliacao({
      imovelId,
      nomeUsuario,
      nota,
      comentario
    });

    // Salva a avaliação no MongoDB
    await novaAvaliacao.save();
    
    // Retorna a avaliação criada com status 201 (Created)
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar avaliação", error: error.message });
  }
});

// 2. Rota para Listar Avaliações de um Imóvel com Média (GET /avaliacoes/imovel/:imovelId)
router.get("/imovel/:imovelId", async (req, res) => {
  try {
    const { imovelId } = req.params;

    // Busca todas as avaliações que pertencem ao imóvel do parâmetro
    const avaliacoes = await Avaliacao.find({ imovelId });

    // Lógica para calcular a média aritmética das notas no JavaScript
    let somaNotas = 0;
    
    // Percorre cada avaliação e acumula o valor do campo 'nota'
    avaliacoes.forEach((avaliacao) => {
      somaNotas = somaNotas + avaliacao.nota;
    });

    // Calcula a média das notas (soma dividido pelo total de avaliações)
    let mediaGeral = 0;
    
    // Só divide se houver pelo menos 1 avaliação cadastrada para evitar divisão por 0
    if (avaliacoes.length > 0) {
      mediaGeral = somaNotas / avaliacoes.length;
    }

    // Retorna as avaliações encontradas e a média calculada
    res.status(200).json({
      avaliacoes,
      mediaGeral
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar avaliações", error: error.message });
  }
});

// 3. Rota para Excluir Avaliação com Validação de Segurança (DELETE /avaliacoes/:id)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // O usuário que está tentando apagar a avaliação deve enviar seu próprio nome no corpo (req.body)
    const { nomeUsuario } = req.body;

    // Busca a avaliação no banco de dados para analisar o autor original
    const avaliacao = await Avaliacao.findById(id);

    // Se o ID da avaliação não for encontrado no banco de dados
    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliação não encontrada." });
    }

    // REGRA DE SEGURANÇA: Comparamos o autor da avaliação com quem está tentando deletar.
    // Se o autor original gravado na avaliação for DIFERENTE do nomeUsuario enviado na requisição:
    if (avaliacao.nomeUsuario !== nomeUsuario) {
      // Bloqueamos a remoção com status 403 (Forbidden / Proibido)
      return res.status(403).json({ 
        message: "Você não tem permissão para deletar a avaliação de outro usuário." 
      });
    }

    // Se passar na validação de segurança, removemos a avaliação pelo ID
    await Avaliacao.findByIdAndDelete(id);

    res.status(200).json({ message: "Avaliação removida com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir avaliação", error: error.message });
  }
});

export default router;
