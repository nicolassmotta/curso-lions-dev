import MaterialRepository from "../repositories/material.repository.js";
import criarErro from "../utils/criarErro.js";

async function registrar(idDoUsuario, dados = {}) {
  const { titulo, tipo, autor, estoque } = dados;
  return MaterialRepository.criar({ titulo, tipo, autor, estoque, usuario: idDoUsuario });
}

async function listarMeus(idDoUsuario) {
  return MaterialRepository.listarPorUsuario(idDoUsuario);
}

async function listarDisponiveis(idDoUsuario) {
  return MaterialRepository.listarDisponiveisPorUsuario(idDoUsuario);
}

// Extra usado no passo 4 do fluxo de testes
async function buscarMeu(idDoUsuario, idMaterial) {
  const material = await MaterialRepository.buscarPorIdDoDono(idMaterial, idDoUsuario);

  if (!material) {
    throw criarErro("Material não encontrado.", 404);
  }

  return material;
}

const MaterialService = {
  registrar,
  listarMeus,
  listarDisponiveis,
  buscarMeu,
};

export default MaterialService;
