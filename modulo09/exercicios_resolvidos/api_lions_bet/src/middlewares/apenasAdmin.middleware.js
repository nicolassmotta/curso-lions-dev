import criarErro from "../utils/criarErro.js";

// Autorização: roda SEMPRE depois de autenticar, então req.usuario já existe.
// 401 = não sei quem é você (autenticar); 403 = sei, mas você não pode (este).
function apenasAdmin(req, res, next) {
  if (!req.usuario || req.usuario.tipo !== "admin") {
    return next(criarErro("Acesso restrito a administradores.", 403));
  }

  return next();
}

export default apenasAdmin;
