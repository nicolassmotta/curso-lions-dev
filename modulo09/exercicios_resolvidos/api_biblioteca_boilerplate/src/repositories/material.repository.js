import Material from "../models/material.model.js";

async function criar(dados) {
  return Material.create(dados);
}

async function listarPorUsuario(idUsuario) {
  return Material.find({ usuario: idUsuario }).sort({ createdAt: -1 });
}

// $gt = "maior que" (greater than)
async function listarDisponiveisPorUsuario(idUsuario) {
  return Material.find({ usuario: idUsuario, estoque: { $gt: 0 } }).sort({ createdAt: -1 });
}

async function buscarPorIdDoDono(idMaterial, idUsuario) {
  return Material.findOne({ _id: idMaterial, usuario: idUsuario });
}

// Grava as mudanças feitas em memória (ex.: estoque - 1)
async function salvar(material) {
  return material.save();
}

const MaterialRepository = {
  criar,
  listarPorUsuario,
  listarDisponiveisPorUsuario,
  buscarPorIdDoDono,
  salvar,
};

export default MaterialRepository;
