import BoletoService from "../services/boleto.service.js";

async function gerar(req, res, next) {
  try {
    const boleto = await BoletoService.gerarBoleto(req.usuario, req.body);
    return res.status(201).json({ boleto });
  } catch (error) {
    return next(error);
  }
}

async function listar(req, res, next) {
  try {
    const boletos = await BoletoService.listarMeusBoletos(req.usuario);
    return res.status(200).json({ boletos });
  } catch (error) {
    return next(error);
  }
}

async function detalhar(req, res, next) {
  try {
    const boleto = await BoletoService.detalhar(req.usuario, req.params.id);
    return res.status(200).json({ boleto });
  } catch (error) {
    return next(error);
  }
}

async function pagar(req, res, next) {
  try {
    const resultado = await BoletoService.pagar(req.usuario, req.params.id, req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function cancelar(req, res, next) {
  try {
    const boleto = await BoletoService.cancelar(req.usuario, req.params.id);
    return res.status(200).json({ boleto });
  } catch (error) {
    return next(error);
  }
}

export default {
  gerar,
  listar,
  detalhar,
  pagar,
  cancelar,
};
