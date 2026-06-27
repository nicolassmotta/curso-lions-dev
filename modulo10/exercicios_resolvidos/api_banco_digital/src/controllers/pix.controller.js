import PixService from "../services/pix.service.js";

async function cadastrarChave(req, res, next) {
  try {
    const chave = await PixService.cadastrarChave(req.usuario, req.body);
    return res.status(201).json({ chave });
  } catch (error) {
    return next(error);
  }
}

async function listarChaves(req, res, next) {
  try {
    const chaves = await PixService.listarMinhasChaves(req.usuario);
    return res.status(200).json({ chaves });
  } catch (error) {
    return next(error);
  }
}

async function removerChave(req, res, next) {
  try {
    const resultado = await PixService.removerChave(req.usuario, req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function consultarLimites(req, res, next) {
  try {
    const limites = await PixService.consultarLimites(req.usuario);
    return res.status(200).json({ limites });
  } catch (error) {
    return next(error);
  }
}

async function enviarPix(req, res, next) {
  try {
    const resultado = await PixService.enviarPix(req.usuario, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

export default {
  cadastrarChave,
  listarChaves,
  removerChave,
  consultarLimites,
  enviarPix,
};
