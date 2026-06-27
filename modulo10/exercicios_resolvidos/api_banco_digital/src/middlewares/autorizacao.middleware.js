import criarErro from "../utils/criarErro.js";

export default function autorizar(papeisPermitidos = []) {
  return function autorizarMiddleware(req, res, next) {
    if (!req.usuario) {
      return next(criarErro("Usuário não autenticado.", 401));
    }

    if (!papeisPermitidos.includes(req.usuario.papel)) {
      return next(criarErro("Você não tem permissão para acessar esta rota.", 403));
    }

    return next();
  };
}
