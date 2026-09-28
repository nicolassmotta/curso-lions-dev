import MaterialService from "../services/material.service.js";

async function registrar(req, res, next) {
  try {
    const material = await MaterialService.registrar(req.usuario.id, req.body);
    return res.status(201).json({ material });
  } catch (error) {
    return next(error);
  }
}

async function listarMeus(req, res, next) {
  try {
    const materiais = await MaterialService.listarMeus(req.usuario.id);
    return res.status(200).json({ materiais });
  } catch (error) {
    return next(error);
  }
}

async function listarDisponiveis(req, res, next) {
  try {
    const materiais = await MaterialService.listarDisponiveis(req.usuario.id);
    return res.status(200).json({ materiais });
  } catch (error) {
    return next(error);
  }
}

async function buscarMeu(req, res, next) {
  try {
    const material = await MaterialService.buscarMeu(req.usuario.id, req.params.id);
    return res.status(200).json({ material });
  } catch (error) {
    return next(error);
  }
}

const MaterialController = {
  registrar,
  listarMeus,
  listarDisponiveis,
  buscarMeu,
};

export default MaterialController;
