import EmprestimoService from "../services/emprestimo.service.js";

async function simular(req, res, next) {
  try {
    const simulacao = await EmprestimoService.simular(req.body);
    return res.status(200).json({ simulacao });
  } catch (error) {
    return next(error);
  }
}

async function solicitar(req, res, next) {
  try {
    const emprestimo = await EmprestimoService.solicitar(req.usuario, req.body);
    return res.status(201).json({ emprestimo });
  } catch (error) {
    return next(error);
  }
}

async function listar(req, res, next) {
  try {
    const emprestimos = await EmprestimoService.listar(req.usuario);
    return res.status(200).json({ emprestimos });
  } catch (error) {
    return next(error);
  }
}

async function detalhar(req, res, next) {
  try {
    const emprestimo = await EmprestimoService.detalhar(req.usuario, req.params.id);
    return res.status(200).json({ emprestimo });
  } catch (error) {
    return next(error);
  }
}

async function aprovar(req, res, next) {
  try {
    const resultado = await EmprestimoService.aprovar(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function reprovar(req, res, next) {
  try {
    const emprestimo = await EmprestimoService.reprovar(req.params.id, req.body);
    return res.status(200).json({ emprestimo });
  } catch (error) {
    return next(error);
  }
}

async function pagarParcela(req, res, next) {
  try {
    const resultado = await EmprestimoService.pagarParcela(req.usuario, req.params.id, req.params.numero);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

export default {
  simular,
  solicitar,
  listar,
  detalhar,
  aprovar,
  reprovar,
  pagarParcela,
};
