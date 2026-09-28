import TransacaoService from "../services/transacao.service.js";

async function registrar(req, res, next) {
  try {
    const transacao = await TransacaoService.registrar(req.usuario.id, req.body);
    return res.status(201).json({ transacao });
  } catch (error) {
    return next(error);
  }
}

async function listarMinhas(req, res, next) {
  try {
    const filtro = {};

    // Bônus 1: ?tipo=saida
    if (req.query.tipo) {
      filtro.tipo = req.query.tipo;
    }

    // Bônus 3: ?de=2026-06-01&ate=2026-06-30
    // $gte = maior ou igual; $lte = menor ou igual.
    if (req.query.de || req.query.ate) {
      filtro.data = {};
      if (req.query.de) filtro.data.$gte = req.query.de;
      if (req.query.ate) filtro.data.$lte = req.query.ate;
    }

    const transacoes = await TransacaoService.listarMinhas(req.usuario.id, filtro);
    return res.status(200).json({ transacoes });
  } catch (error) {
    return next(error);
  }
}

async function resumo(req, res, next) {
  try {
    const resultado = await TransacaoService.resumoDoUsuario(req.usuario.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function buscarMinha(req, res, next) {
  try {
    const transacao = await TransacaoService.buscarMinha(req.usuario.id, req.params.id);
    return res.status(200).json({ transacao });
  } catch (error) {
    return next(error);
  }
}

async function atualizarMinha(req, res, next) {
  try {
    const transacao = await TransacaoService.atualizarMinha(req.usuario.id, req.params.id, req.body);
    return res.status(200).json({ transacao });
  } catch (error) {
    return next(error);
  }
}

async function removerMinha(req, res, next) {
  try {
    const resultado = await TransacaoService.removerMinha(req.usuario.id, req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

const TransacaoController = {
  registrar,
  listarMinhas,
  resumo,
  buscarMinha,
  atualizarMinha,
  removerMinha,
};

export default TransacaoController;
