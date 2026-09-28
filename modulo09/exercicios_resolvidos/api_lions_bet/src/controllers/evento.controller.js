import EventoService from "../services/evento.service.js";

async function listarAbertos(req, res, next) {
  try {
    const eventos = await EventoService.listarAbertos();
    return res.status(200).json({ eventos });
  } catch (error) {
    return next(error);
  }
}

async function listarTodos(req, res, next) {
  try {
    const eventos = await EventoService.listarTodos();
    return res.status(200).json({ eventos });
  } catch (error) {
    return next(error);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const evento = await EventoService.buscarPorId(req.params.id);
    return res.status(200).json({ evento });
  } catch (error) {
    return next(error);
  }
}

async function criar(req, res, next) {
  try {
    const evento = await EventoService.criar(req.usuario.id, req.body);
    return res.status(201).json({ evento });
  } catch (error) {
    return next(error);
  }
}

async function atualizarOdds(req, res, next) {
  try {
    const evento = await EventoService.atualizarOdds(req.params.id, req.body);
    return res.status(200).json({ evento });
  } catch (error) {
    return next(error);
  }
}

async function encerrar(req, res, next) {
  try {
    const { resultado } = req.body || {};
    const resumo = await EventoService.encerrar(req.params.id, resultado);
    return res.status(200).json(resumo);
  } catch (error) {
    return next(error);
  }
}

async function relatorio(req, res, next) {
  try {
    const resultado = await EventoService.relatorio();
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

const EventoController = {
  listarAbertos,
  listarTodos,
  buscarPorId,
  criar,
  atualizarOdds,
  encerrar,
  relatorio,
};

export default EventoController;
