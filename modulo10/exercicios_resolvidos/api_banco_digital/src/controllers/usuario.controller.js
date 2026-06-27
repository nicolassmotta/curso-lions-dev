import UsuarioService from "../services/usuario.service.js";

async function perfil(req, res, next) {
  try {
    const usuario = await UsuarioService.perfil(req.usuario);
    return res.status(200).json({ usuario });
  } catch (error) {
    return next(error);
  }
}

async function atualizarPerfil(req, res, next) {
  try {
    const usuario = await UsuarioService.atualizarPerfil(req.usuario, req.body);
    return res.status(200).json({ usuario });
  } catch (error) {
    return next(error);
  }
}

async function encerrarPerfil(req, res, next) {
  try {
    const resultado = await UsuarioService.encerrarPerfil(req.usuario);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function listar(req, res, next) {
  try {
    const usuarios = await UsuarioService.listarUsuarios();
    return res.status(200).json({ usuarios });
  } catch (error) {
    return next(error);
  }
}

async function alterarStatus(req, res, next) {
  try {
    const usuario = await UsuarioService.alterarStatus(req.usuario, req.params.id, req.body);
    return res.status(200).json({ usuario });
  } catch (error) {
    return next(error);
  }
}

export default {
  perfil,
  atualizarPerfil,
  encerrarPerfil,
  listar,
  alterarStatus,
};
