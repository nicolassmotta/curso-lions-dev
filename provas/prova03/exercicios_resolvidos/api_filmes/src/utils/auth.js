// Exercício 5: bcrypt e JWT
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function gerarHash(senha) {
  return bcrypt.hash(senha, 10);
}

export async function conferirSenha(senha, hash) {
  return bcrypt.compare(senha, hash);
}

export function gerarToken(usuario) {
  return jwt.sign({ id: String(usuario._id), email: usuario.email, papel: usuario.papel }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export function lerToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET); // lança erro se for inválido ou expirado
}
