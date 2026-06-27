import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";
import { documentoSeguro } from "../utils/serializar.js";

function validarSenha(senha) {
  if (!senha || senha.length < 6) {
    throw criarErro("A senha deve ter pelo menos 6 caracteres.", 400);
  }
}

function gerarToken(usuario) {
  if (!process.env.JWT_SECRET) {
    throw criarErro("JWT_SECRET não configurado no ambiente.", 500);
  }

  return jwt.sign(
    {
      id: usuario._id.toString(),
      email: usuario.email,
      papel: usuario.papel,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

async function cadastrar({ nome, email, cpf, telefone, senha }) {
  if (!nome || !email || !cpf || !telefone || !senha) {
    throw criarErro("Nome, email, CPF, telefone e senha são obrigatórios.", 400);
  }

  validarSenha(senha);

  const emailNormalizado = email.trim().toLowerCase();
  const cpfNormalizado = cpf.trim();

  const usuarioPorEmail = await UsuarioRepository.buscarPorEmail(emailNormalizado);
  if (usuarioPorEmail) {
    throw criarErro("Email já cadastrado.", 409);
  }

  const usuarioPorCpf = await UsuarioRepository.buscarPorCpf(cpfNormalizado);
  if (usuarioPorCpf) {
    throw criarErro("CPF já cadastrado.", 409);
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  const senhaHash = await bcrypt.hash(senha, saltRounds);

  const usuario = await UsuarioRepository.criar({
    nome: nome.trim(),
    email: emailNormalizado,
    cpf: cpfNormalizado,
    telefone: telefone.trim(),
    senhaHash,
    papel: "cliente",
    status: "ativo",
  });

  return {
    usuario: documentoSeguro(usuario),
    token: gerarToken(usuario),
  };
}

async function login({ email, senha }) {
  if (!email || !senha) {
    throw criarErro("Email e senha são obrigatórios.", 400);
  }

  const usuario = await UsuarioRepository.buscarPorEmail(email, true);

  if (!usuario) {
    throw criarErro("Email ou senha incorretos.", 401);
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaCorreta) {
    throw criarErro("Email ou senha incorretos.", 401);
  }

  if (usuario.status === "bloqueado" || usuario.status === "encerrado") {
    throw criarErro("Usuário bloqueado ou encerrado.", 403);
  }

  return {
    usuario: documentoSeguro(usuario),
    token: gerarToken(usuario),
  };
}

async function logout() {
  return { message: "Logout realizado com sucesso. Descarte o token no cliente." };
}

export default {
  cadastrar,
  login,
  logout,
};
