import criarErro from "./criarErro.js";

export function idIgual(idA, idB) {
  return String(idA) === String(idB);
}

export function ehAdmin(usuario) {
  return usuario && usuario.papel === "admin";
}

export function ehGerenteOuAdmin(usuario) {
  return usuario && (usuario.papel === "gerente" || usuario.papel === "admin");
}

export function garantirDonoOuEquipe(recursoUsuarioId, usuarioLogado) {
  if (ehGerenteOuAdmin(usuarioLogado)) {
    return;
  }

  if (!idIgual(recursoUsuarioId, usuarioLogado.id)) {
    throw criarErro("Você não tem permissão para acessar este recurso.", 403);
  }
}

export function garantirAdmin(usuarioLogado) {
  if (!ehAdmin(usuarioLogado)) {
    throw criarErro("Apenas admin pode realizar esta ação.", 403);
  }
}
