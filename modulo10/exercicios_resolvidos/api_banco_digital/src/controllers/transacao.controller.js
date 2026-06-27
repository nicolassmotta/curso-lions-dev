import TransacaoService from "../services/transacao.service.js";

async function depositar(req, res, next) {
  try {
    const resultado = await TransacaoService.depositar(req.usuario, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function sacar(req, res, next) {
  try {
    const resultado = await TransacaoService.sacar(req.usuario, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function transferir(req, res, next) {
  try {
    const resultado = await TransacaoService.transferir(req.usuario, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function detalhar(req, res, next) {
  try {
    const transacao = await TransacaoService.buscarPorId(req.usuario, req.params.id);
    return res.status(200).json({ transacao });
  } catch (error) {
    return next(error);
  }
}

async function estornar(req, res, next) {
  try {
    const resultado = await TransacaoService.estornar(req.params.id);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function aprovarPendente(req, res, next) {
  try {
    const resultado = await TransacaoService.aprovarPendente(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function recusarPendente(req, res, next) {
  try {
    const resultado = await TransacaoService.recusarPendente(req.params.id, req.body);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

export default {
  depositar,
  sacar,
  transferir,
  detalhar,
  estornar,
  aprovarPendente,
  recusarPendente,
};
