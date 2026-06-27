import AdminService from "../services/admin.service.js";

async function resumo(req, res, next) {
  try {
    const resumoGeral = await AdminService.resumo();
    return res.status(200).json({ resumo: resumoGeral });
  } catch (error) {
    return next(error);
  }
}

async function listarTransacoes(req, res, next) {
  try {
    const transacoes = await AdminService.listarTransacoes(req.query);
    return res.status(200).json({ transacoes });
  } catch (error) {
    return next(error);
  }
}

async function contasPendentes(req, res, next) {
  try {
    const contas = await AdminService.contasPendentes();
    return res.status(200).json({ contas });
  } catch (error) {
    return next(error);
  }
}

async function emprestimosPendentes(req, res, next) {
  try {
    const emprestimos = await AdminService.emprestimosPendentes();
    return res.status(200).json({ emprestimos });
  } catch (error) {
    return next(error);
  }
}

export default {
  resumo,
  listarTransacoes,
  contasPendentes,
  emprestimosPendentes,
};
