import jwt from "jsonwebtoken";

import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";

export default async function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(criarErro("Token não informado.", 401));
  }

  const [tipo, token] = authHeader.split(" ");

  if (tipo !== "Bearer" || !token) {
    return next(criarErro("Formato do token inválido. Use: Bearer TOKEN.", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await UsuarioRepository.buscarPorId(payload.id);

    if (!usuario) {
      return next(criarErro("Usuário do token não encontrado.", 401));
    }

    if (usuario.status === "bloqueado" || usuario.status === "encerrado") {
      return next(criarErro("Usuário bloqueado ou encerrado.", 403));
    }

    req.usuario = {
      id: usuario._id.toString(),
      email: usuario.email,
      papel: usuario.papel,
      status: usuario.status,
    };

    return next();
  } catch (error) {
    return next(criarErro("Token inválido ou expirado.", 401));
  }
}
