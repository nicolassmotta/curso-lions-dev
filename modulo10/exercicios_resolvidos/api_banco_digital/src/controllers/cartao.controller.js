import CartaoService from "../services/cartao.service.js";

async function solicitar(req, res, next) {
  try {
    const cartao = await CartaoService.solicitar(req.usuario, req.body);
    return res.status(201).json({ cartao });
  } catch (error) {
    return next(error);
  }
}

async function listar(req, res, next) {
  try {
    const cartoes = await CartaoService.listar(req.usuario);
    return res.status(200).json({ cartoes });
  } catch (error) {
    return next(error);
  }
}

async function atualizarStatus(req, res, next) {
  try {
    const cartao = await CartaoService.atualizarStatus(req.params.id, req.body);
    return res.status(200).json({ cartao });
  } catch (error) {
    return next(error);
  }
}

async function registrarCompra(req, res, next) {
  try {
    const resultado = await CartaoService.registrarCompra(req.usuario, req.params.id, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function consultarFatura(req, res, next) {
  try {
    const fatura = await CartaoService.consultarFatura(req.usuario, req.params.id, req.query.mesReferencia);
    return res.status(200).json({ fatura });
  } catch (error) {
    return next(error);
  }
}

async function pagarFatura(req, res, next) {
  try {
    const resultado = await CartaoService.pagarFatura(req.usuario, req.params.id, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

export default {
  solicitar,
  listar,
  atualizarStatus,
  registrarCompra,
  consultarFatura,
  pagarFatura,
};
