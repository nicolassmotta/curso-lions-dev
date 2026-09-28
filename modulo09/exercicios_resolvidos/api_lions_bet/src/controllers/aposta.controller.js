import ApostaService from "../services/aposta.service.js";

async function apostar(req, res, next) {
  try {
    const aposta = await ApostaService.apostar(req.usuario.id, req.body);
    return res.status(201).json({ aposta });
  } catch (error) {
    return next(error);
  }
}

async function listarMinhas(req, res, next) {
  try {
    const apostas = await ApostaService.listarMinhas(req.usuario.id);
    return res.status(200).json({ apostas });
  } catch (error) {
    return next(error);
  }
}

async function buscarMinha(req, res, next) {
  try {
    const aposta = await ApostaService.buscarMinha(req.usuario.id, req.params.id);
    return res.status(200).json({ aposta });
  } catch (error) {
    return next(error);
  }
}

async function listarTodas(req, res, next) {
  try {
    const apostas = await ApostaService.listarTodas();
    return res.status(200).json({ apostas });
  } catch (error) {
    return next(error);
  }
}

const ApostaController = {
  apostar,
  listarMinhas,
  buscarMinha,
  listarTodas,
};

export default ApostaController;
