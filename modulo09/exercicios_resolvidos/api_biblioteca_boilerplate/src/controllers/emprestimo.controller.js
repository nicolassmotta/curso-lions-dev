import EmprestimoService from "../services/emprestimo.service.js";

async function registrar(req, res, next) {
  try {
    const emprestimo = await EmprestimoService.registrar(req.usuario.id, req.body);
    return res.status(201).json({ emprestimo });
  } catch (error) {
    return next(error);
  }
}

async function listarMeus(req, res, next) {
  try {
    const emprestimos = await EmprestimoService.listarMeus(req.usuario.id);
    return res.status(200).json({ emprestimos });
  } catch (error) {
    return next(error);
  }
}

async function relatorio(req, res, next) {
  try {
    const resultado = await EmprestimoService.relatorio(req.usuario.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function buscarMeu(req, res, next) {
  try {
    const emprestimo = await EmprestimoService.buscarMeu(req.usuario.id, req.params.id);
    return res.status(200).json({ emprestimo });
  } catch (error) {
    return next(error);
  }
}

async function alterarStatus(req, res, next) {
  try {
    const { status } = req.body || {};
    const emprestimo = await EmprestimoService.alterarStatus(req.usuario.id, req.params.id, status);
    return res.status(200).json({ emprestimo });
  } catch (error) {
    return next(error);
  }
}

async function removerMeu(req, res, next) {
  try {
    const resultado = await EmprestimoService.removerMeu(req.usuario.id, req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

const EmprestimoController = {
  registrar,
  listarMeus,
  relatorio,
  buscarMeu,
  alterarStatus,
  removerMeu,
};

export default EmprestimoController;
