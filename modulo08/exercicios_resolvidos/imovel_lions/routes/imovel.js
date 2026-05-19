import express from "express";
import Imovel from "../models/imovel.js";

const router = express.Router();

// 1. Rota para Cadastrar Imóvel (POST /imoveis)
router.post("/", async (req, res) => {
  try {
    // Desestrutura os dados do corpo da requisição
    const { titulo, descricao, localizacao, precoNoite, capacidadeMaxima } = req.body;

    // Instancia o modelo com as informações enviadas
    const novoImovel = new Imovel({
      titulo,
      descricao,
      localizacao,
      precoNoite,
      capacidadeMaxima
    });

    // Salva o novo imóvel no banco de dados MongoDB
    await novoImovel.save();
    
    // Retorna com status 201 (Created) e o imóvel recém-criado em formato JSON
    res.status(201).json(novoImovel);
  } catch (error) {
    // Retorna erro 400 (Bad Request) caso haja erro de validação (ex: campos obrigatórios vazios)
    res.status(400).json({ message: "Erro ao cadastrar imóvel", error: error.message });
  }
});

// 2. Rota para Listar Todos os Imóveis (GET /imoveis)
router.get("/", async (req, res) => {
  try {
    // Busca todos os imóveis salvos no banco de dados usando find() sem parâmetros
    const imoveis = await Imovel.find();
    
    // Retorna com status 200 (OK)
    res.status(200).json(imoveis);
  } catch (error) {
    // Retorna erro 500 (Internal Server Error) em caso de falha no banco
    res.status(500).json({ message: "Erro ao buscar imóveis", error: error.message });
  }
});

// 3. Rota para Buscar Imóveis por Localização (GET /imoveis/busca)
// Esta rota lê filtros via Query Params (ex: /imoveis/busca?localizacao=ubatuba)
router.get("/busca", async (req, res) => {
  try {
    const { localizacao } = req.query;

    // Inicializa um objeto de filtro vazio
    let filtro = {};

    // Se o Query Param 'localizacao' foi fornecido na URL:
    if (localizacao) {
      // Configuramos o filtro com $regex para fazer busca parcial (equivalente ao .includes() ou LIKE)
      // A opção "i" serve para ignorar maiúsculas/minúsculas na busca
      filtro.localizacao = { $regex: localizacao, $options: "i" };
    }

    // Busca no MongoDB utilizando o objeto de filtro configurado
    const imoveis = await Imovel.find(filtro);
    
    // Retorna com status 200 (OK)
    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imóveis", error: error.message });
  }
});

export default router;
