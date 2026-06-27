import ContaService from "../services/conta.service.js";

async function solicitarAbertura(req, res, next) {
  try {
    const conta = await ContaService.solicitarAbertura(req.usuario, req.body);
    return res.status(201).json({ conta });
  } catch (error) {
    return next(error);
  }
}

async function listarMinhas(req, res, next) {
  try {
    const contas = await ContaService.listarMinhas(req.usuario);
    return res.status(200).json({ contas });
  } catch (error) {
    return next(error);
  }
}

async function detalhar(req, res, next) {
  try {
    const conta = await ContaService.detalhar(req.usuario, req.params.id);
    return res.status(200).json({ conta });
  } catch (error) {
    return next(error);
  }
}

async function atualizarStatus(req, res, next) {
  try {
    const conta = await ContaService.atualizarStatus(req.params.id, req.body);
    return res.status(200).json({ conta });
  } catch (error) {
    return next(error);
  }
}

async function extrato(req, res, next) {
  try {
    const resultado = await ContaService.extrato(req.usuario, req.params.id, req.query);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

export default {
  solicitarAbertura,
  listarMinhas,
  detalhar,
  atualizarStatus,
  extrato,
};
