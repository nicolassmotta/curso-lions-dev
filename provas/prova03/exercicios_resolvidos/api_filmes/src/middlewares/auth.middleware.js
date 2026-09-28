// Exercício 6: autenticar e autorizar
import { lerToken } from "../utils/auth.js";

export function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não informado." });

  const [tipo, token] = authHeader.split(" ");
  if (tipo !== "Bearer" || !token) return res.status(401).json({ message: "Formato do token inválido. Use: Bearer TOKEN." });

  try {
    const dados = lerToken(token);
    req.usuario = { id: dados.id, email: dados.email, papel: dados.papel };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

export function autorizar(...papeis) {
  return (req, res, next) => {
    if (!papeis.includes(req.usuario?.papel)) return res.status(403).json({ message: "Você não tem permissão para esta ação." });
    return next();
  };
}
