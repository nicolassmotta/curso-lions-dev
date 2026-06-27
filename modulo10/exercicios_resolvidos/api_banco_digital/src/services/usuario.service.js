import bcrypt from "bcryptjs";

import UsuarioRepository from "../repositories/usuario.repository.js";
import criarErro from "../utils/criarErro.js";
import { garantirAdmin } from "../utils/permissoes.js";
import { documentoSeguro, listaSegura } from "../utils/serializar.js";
import { buscarUsuarioOuErro } from "./regrasBanco.service.js";

function validarSenha(senha) {
  if (!senha || senha.length < 6) {
    throw criarErro("A senha deve ter pelo menos 6 caracteres.", 400);
  }
}

async function perfil(usuarioLogado) {
  const usuario = await buscarUsuarioOuErro(usuarioLogado.id);
  return documentoSeguro(usuario);
}

async function atualizarPerfil(usuarioLogado, dados = {}) {
  const dadosAtualizados = {};

  if (dados.nome) {
    dadosAtualizados.nome = dados.nome.trim();
  }

  if (dados.telefone) {
    dadosAtualizados.telefone = dados.telefone.trim();
  }

  if (dados.senha) {
    validarSenha(dados.senha);
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    dadosAtualizados.senhaHash = await bcrypt.hash(dados.senha, saltRounds);
  }

  if (Object.keys(dadosAtualizados).length === 0) {
    throw criarErro("Envie nome, telefone e/ou senha para atualizar.", 400);
  }

  const usuario = await UsuarioRepository.atualizarPorId(usuarioLogado.id, dadosAtualizados);

  if (!usuario) {
    throw criarErro("Usuário não encontrado.", 404);
  }

  return documentoSeguro(usuario);
}

async function encerrarPerfil(usuarioLogado) {
  const usuario = await UsuarioRepository.atualizarPorId(usuarioLogado.id, {
    status: "encerrado",
  });

  if (!usuario) {
    throw criarErro("Usuário não encontrado.", 404);
  }

  return { message: "Cadastro encerrado com sucesso.", usuario: documentoSeguro(usuario) };
}

async function listarUsuarios() {
  const usuarios = await UsuarioRepository.listar();
  return listaSegura(usuarios);
}

async function alterarStatus(usuarioLogado, usuarioId, { status }) {
  garantirAdmin(usuarioLogado);

  const statusPermitidos = ["ativo", "bloqueado", "pendente_verificacao", "encerrado"];

  if (!statusPermitidos.includes(status)) {
    throw criarErro("Status inválido.", 400);
  }

  const usuario = await UsuarioRepository.atualizarPorId(usuarioId, { status });

  if (!usuario) {
    throw criarErro("Usuário não encontrado.", 404);
  }

  return documentoSeguro(usuario);
}

export default {
  perfil,
  atualizarPerfil,
  encerrarPerfil,
  listarUsuarios,
  alterarStatus,
};
