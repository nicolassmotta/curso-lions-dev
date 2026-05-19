import express from "express";
import Reserva from "../models/reserva.js";
import Imovel from "../models/imovel.js";

const router = express.Router();

// 1. Rota para Criar Reserva (POST /reservas)
// Essa rota contém todas as regras complexas de cálculo e validação no JavaScript.
router.post("/", async (req, res) => {
  try {
    // Desestruturação dos dados enviados no corpo da requisição (req.body)
    const { imovelId, nomeHospede, emailHospede, dataEntrada, dataSaida, hospedes, cupomDesconto } = req.body;

    // REGRA 1: Validação de Existência do Imóvel
    // Buscamos o imóvel no banco de dados para garantir que ele existe e obter o seu preço por noite base e capacidade.
    const imovel = await Imovel.findById(imovelId);
    if (!imovel) {
      // Se não achar o imóvel, interrompe a execução com status 404 (Not Found)
      return res.status(404).json({ message: "Imóvel não encontrado." });
    }

    // REGRA 2: Validação de Capacidade Máxima
    // O total de pessoas na reserva é o tamanho do array 'hospedes'.
    const totalHospedes = hospedes.length;
    if (totalHospedes > imovel.capacidadeMaxima) {
      // Se passar do limite, retorna erro 400 (Bad Request)
      return res.status(400).json({ 
        message: `A quantidade de hóspedes (${totalHospedes}) excede a capacidade máxima permitida (${imovel.capacidadeMaxima}).` 
      });
    }

    // REGRA 3: Cálculo das Diárias baseado no Dia da Semana
    // Precisamos percorrer dia por dia entre a data de entrada e a data de saída.
    // Criamos um objeto Date a partir do check-in para usarmos como contador do loop.
    let dataAtual = new Date(dataEntrada);
    // Criamos outro objeto Date para o check-out, indicando o final do loop.
    const dataFim = new Date(dataSaida);
    
    let noites = 0; // Guardará o número de noites da estadia
    let somaDiariasBase = 0; // Acumulará o valor somado das diárias base

    // Enquanto a data que estamos analisando for menor que a data de saída (check-out)
    while (dataAtual < dataFim) {
      // O método getDay() do JavaScript retorna o dia da semana como número:
      // 0 = Domingo, 1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
      const diaSemana = dataAtual.getDay(); 
      
      let precoDaNoite = imovel.precoNoite; // Começa com o preço base do imóvel

      // Se a noite atual for sexta-feira (5), sábado (6) ou domingo (0), cobramos acréscimo de 20%
      if (diaSemana === 5 || diaSemana === 6 || diaSemana === 0) {
        // Acréscimo de 20%
        precoDaNoite = precoDaNoite + (precoDaNoite * 0.20);
      }

      // Soma o valor calculado para essa diária específica no total acumulado
      somaDiariasBase = somaDiariasBase + precoDaNoite;

      // Avança o nosso contador de data em 1 dia
      dataAtual.setDate(dataAtual.getDate() + 1);
      
      // Incrementa a quantidade total de noites
      noites++;
    }

    // REGRA 4: Taxa de Hóspedes Adicionais por Idade
    // A diária básica cobre os 2 primeiros hóspedes. A partir do 3º, cobramos taxas extras.
    let taxaHospedesAdicionaisPorNoite = 0;

    if (totalHospedes > 2) {
      // Usamos slice(2) para pegar todos os hóspedes a partir do índice 2 (ou seja, do 3º em diante)
      const adicionais = hospedes.slice(2);

      // Percorremos cada hóspede extra para somar a taxa diária correspondente à sua idade
      adicionais.forEach((hospede) => {
        if (hospede.idade >= 12) {
          // Adolescentes e adultos (12 anos ou mais) pagam R$ 50 adicionais por noite
          taxaHospedesAdicionaisPorNoite = taxaHospedesAdicionaisPorNoite + 50;
        } else {
          // Crianças (menores de 12 anos) pagam R$ 25 adicionais por noite
          taxaHospedesAdicionaisPorNoite = taxaHospedesAdicionaisPorNoite + 25;
        }
      });
    }

    // Multiplica o valor total diário de hóspedes extras pelo número total de noites da reserva
    const totalTaxasAdicionais = taxaHospedesAdicionaisPorNoite * noites;

    // Somamos o total das diárias com as taxas adicionais calculadas
    let subtotal = somaDiariasBase + totalTaxasAdicionais;

    // REGRA 5: Desconto de Longa Estadia (5 noites ou mais = 10% de desconto)
    if (noites >= 5) {
      subtotal = subtotal - (subtotal * 0.10);
    }

    // REGRA 6: Cupom de Desconto Adicional (Cupom "LIONS10" = 10% extras de desconto)
    if (cupomDesconto === "LIONS10") {
      subtotal = subtotal - (subtotal * 0.10);
    }

    // Cria a reserva preenchendo todos os campos, inclusive o valorTotal calculado
    const novaReserva = new Reserva({
      imovelId,
      nomeHospede,
      emailHospede,
      dataEntrada,
      dataSaida,
      hospedes,
      cupomDesconto,
      valorTotal: subtotal
    });

    // Salva a reserva no banco de dados MongoDB
    await novaReserva.save();
    
    // Retorna a reserva criada com status 201 (Created)
    res.status(201).json(novaReserva);
  } catch (error) {
    // Trata erros de validação do banco ou outros problemas
    res.status(400).json({ message: "Erro ao criar reserva", error: error.message });
  }
});

// 2. Rota para Listar Todas as Reservas (GET /reservas)
router.get("/", async (req, res) => {
  try {
    // Usamos o método populate("imovelId") para fazer um "join" no banco de dados,
    // substituindo o ObjectId do imóvel por todos os detalhes do documento do imóvel correspondente.
    const reservas = await Reserva.find().populate("imovelId");
    
    // Retorna a lista completa com status 200 (OK)
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reservas", error: error.message });
  }
});

// 3. Rota para Alterar Status da Reserva (PATCH /reservas/:id/status)
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Atualiza apenas o campo status da reserva pelo seu ID
    // { new: true } faz retornar o documento atualizado
    // { runValidators: true } garante que o mongoose valide se o status está correto ("Pendente", "Confirmada" ou "Cancelada")
    const reservaAtualizada = await Reserva.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    // Se o ID da reserva não existir no banco
    if (!reservaAtualizada) {
      return res.status(404).json({ message: "Reserva não encontrada." });
    }

    res.status(200).json(reservaAtualizada);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar status", error: error.message });
  }
});

// 4. Rota de Relatório Financeiro e Estatísticas (GET /reservas/relatorio)
router.get("/relatorio", async (req, res) => {
  try {
    // Buscamos todas as reservas com status "Confirmada" no banco
    const reservasConfirmadas = await Reserva.find({ status: "Confirmada" });

    let faturamentoTotal = 0;
    let totalNoites = 0;
    let somaHospedes = 0;

    // Usamos o .forEach() para fazer as contas acumuladas no JavaScript
    reservasConfirmadas.forEach((reserva) => {
      // Soma o valor total da reserva no faturamento geral
      faturamentoTotal = faturamentoTotal + reserva.valorTotal;
      // Soma o total de pessoas registradas nessa estadia
      somaHospedes = somaHospedes + reserva.hospedes.length;

      // Para calcular as noites, subtraímos as datas.
      // A subtração de objetos Date no JS retorna a diferença em milissegundos.
      const entrada = new Date(reserva.dataEntrada);
      const saida = new Date(reserva.dataSaida);
      const diferencaTempo = saida - entrada;
      
      // Convertemos milissegundos para dias:
      // (1000 milissegundos * 60 segundos * 60 minutos * 24 horas)
      // Math.ceil() garante o arredondamento correto das diárias
      const noitesReserva = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
      
      totalNoites = totalNoites + noitesReserva;
    });

    // Calcula a média de hóspedes por reserva confirmada
    let mediaHospedes = 0;
    if (reservasConfirmadas.length > 0) {
      mediaHospedes = somaHospedes / reservasConfirmadas.length;
    }

    // Retorna o objeto com os resultados consolidados
    res.status(200).json({
      faturamentoTotal,
      totalNoites,
      mediaHospedes
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao gerar relatório", error: error.message });
  }
});

export default router;
