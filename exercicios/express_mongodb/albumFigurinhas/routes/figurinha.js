const express = require('express');
const router = express.Router();
const Figurinha = require('../models/figurinha');

// Rota base para todas as operações: /figurinhas

/**
 * @route   POST /figurinhas
 * @desc    Adicionar nova figurinha
 */
router.post('/', async (req, res) => {
  try {
    const { numero, tema } = req.body;
    const novaFigurinha = new Figurinha({ numero, tema });
    await novaFigurinha.save();
    res.status(201).json(novaFigurinha);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar figurinha', error: error.message });
  }
});

/**
 * @route   GET /figurinhas
 * @desc    Listar todas as figurinhas
 */
router.get('/', async (req, res) => {
  try {
    const figurinhas = await Figurinha.find();
    res.status(200).json(figurinhas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar figurinhas', error: error.message });
  }
});

/**
 * @route   GET /figurinhas/busca
 * @desc    Buscar figurinhas por critérios (numero, tema)
 */
router.get('/busca', async (req, res) => {
    try {
      const { numero, tema } = req.query;
      const criteriosBusca = {};

      if (numero) {
        criteriosBusca.numero = numero;
      }
      if (tema) {
        // Usa uma expressão regular para buscar por temas que contenham o texto (case-insensitive)
        criteriosBusca.tema = { $regex: tema, $options: 'i' };
      }

      const figurinhas = await Figurinha.find(criteriosBusca);

      if (figurinhas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma figurinha encontrada com esses critérios.' });
      }
      res.status(200).json(figurinhas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao realizar a busca', error: error.message });
    }
});

/**
 * @route   PUT /figurinhas/:id
 * @desc    Atualizar figurinha existente
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, tema } = req.body;

    const figurinhaAtualizada = await Figurinha.findByIdAndUpdate(
      id,
      { numero, tema },
      { new: true, runValidators: true } // Opções: `new` retorna o doc atualizado, `runValidators` aplica as regras do Schema
    );

    if (!figurinhaAtualizada) {
      return res.status(404).json({ message: 'Figurinha não encontrada.' });
    }
    res.status(200).json(figurinhaAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar figurinha', error: error.message });
  }
});

/**
 * @route   DELETE /figurinhas/:id
 * @desc    Remover figurinha
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const figurinhaDeletada = await Figurinha.findByIdAndDelete(id);

    if (!figurinhaDeletada) {
      return res.status(404).json({ message: 'Figurinha não encontrada.' });
    }
    res.status(200).json({ message: 'Figurinha deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar figurinha', error: error.message });
  }
});

module.exports = router;