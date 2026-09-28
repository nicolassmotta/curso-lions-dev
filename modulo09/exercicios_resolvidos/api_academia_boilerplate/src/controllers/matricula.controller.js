import MatriculaService from "../services/matricula.service.js";

async function registrar(req, res, next) {
  try {
    const matricula = await MatriculaService.registrar(req.usuario.id, req.body);
    return res.status(201).json({ matricula });
  } catch (error) {
    return next(error);
  }
}

async function listarMinhas(req, res, next) {
  try {
    const matriculas = await MatriculaService.listarMinhas(req.usuario.id);
    return res.status(200).json({ matriculas });
  } catch (error) {
    return next(error);
  }
}

// Bônus 1: ?modalidade=func (parte do nome, sem diferenciar maiúsculas)
async function buscarPorModalidade(req, res, next) {
  try {
    const filtro = {};
    if (req.query.modalidade) {
      filtro.modalidade = { $regex: req.query.modalidade, $options: "i" };
    }
    const matriculas = await MatriculaService.listarMinhas(req.usuario.id, filtro);
    return res.status(200).json({ matriculas });
  } catch (error) {
    return next(error);
  }
}

async function resumo(req, res, next) {
  try {
    const resultado = await MatriculaService.resumoMeu(req.usuario.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function buscarMinha(req, res, next) {
  try {
    const matricula = await MatriculaService.buscarMinha(req.usuario.id, req.params.id);
    return res.status(200).json({ matricula });
  } catch (error) {
    return next(error);
  }
}

async function atualizarMinha(req, res, next) {
  try {
    const matricula = await MatriculaService.atualizarMinha(req.usuario.id, req.params.id, req.body);
    return res.status(200).json({ matricula });
  } catch (error) {
    return next(error);
  }
}

async function removerMinha(req, res, next) {
  try {
    const resultado = await MatriculaService.removerMinha(req.usuario.id, req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

const MatriculaController = {
  registrar,
  listarMinhas,
  buscarPorModalidade,
  resumo,
  buscarMinha,
  atualizarMinha,
  removerMinha,
};

export default MatriculaController;
