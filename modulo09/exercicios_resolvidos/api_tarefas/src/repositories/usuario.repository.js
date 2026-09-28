// Repository é a camada responsável por conversar com o banco de dados.
// Ela usa o Model do Mongoose, mas esconde esses detalhes das outras camadas.
import Usuario from "../models/usuario.model.js";

// Cria um usuário no MongoDB.
async function criar(dadosDoUsuario) {
  // create recebe um objeto JavaScript e salva esse objeto como documento.
  // Ex.: { nome, email, senhaHash } vira um usuário na coleção do MongoDB.
  return Usuario.create(dadosDoUsuario);
}

// Busca um usuário pelo email sem trazer a senhaHash.
async function buscarPorEmail(email) {
  // Normalizamos o email para evitar diferenças como "TESTE@email.com"
  // e "teste@email.com".
  // findOne procura o PRIMEIRO documento que bater com o filtro informado.
  // O filtro abaixo quer dizer: encontre um usuário cujo campo email seja igual
  // ao email normalizado.
  return Usuario.findOne({ email: email.trim().toLowerCase() });
}

// Busca um usuário pelo email trazendo também a senhaHash.
// Usamos esta função apenas no login, para comparar a senha digitada.
async function buscarPorEmailComSenha(email) {
  const query = Usuario.findOne({ email: email.trim().toLowerCase() });

  // select("+senhaHash") altera a consulta para incluir um campo escondido.
  // O sinal de + significa: "traga este campo mesmo que ele esteja oculto".
  return query.select("+senhaHash");
}

// Busca um usuário pelo ID do MongoDB.
async function buscarPorId(id) {
  // findById é um atalho para buscar pelo campo _id do MongoDB.
  return Usuario.findById(id);
}

// Lista todos os usuários.
// sort({ createdAt: -1 }) mostra os mais recentes primeiro.
async function listarTodos() {
  // find() sem filtro busca todos os documentos da coleção.
  // sort recebe um objeto com o campo de ordenação:
  // -1 = ordem decrescente, 1 = ordem crescente.
  return Usuario.find().sort({ createdAt: -1 });
}

// Atualiza um usuário pelo ID.
async function atualizarPorId(id, dadosAtualizados) {
  // findByIdAndUpdate recebe:
  // 1) o id do documento,
  // 2) os campos que serão alterados,
  // 3) opções de comportamento da atualização.
  return Usuario.findByIdAndUpdate(id, dadosAtualizados, {
    // new: true faz retornar o documento já atualizado.
    new: true,

    // runValidators: true garante que as validações do Schema também rodem no update.
    runValidators: true,
  });
}

// Remove um usuário pelo ID.
async function deletarPorId(id) {
  // findByIdAndDelete busca pelo _id e remove o documento encontrado.
  // Se não achar ninguém, o Mongoose devolve null.
  return Usuario.findByIdAndDelete(id);
}

// Exportamos todas as funções do repository em um objeto.
const UsuarioRepository = {
  criar,
  buscarPorEmail,
  buscarPorEmailComSenha,
  buscarPorId,
  listarTodos,
  atualizarPorId,
  deletarPorId,
};

export default UsuarioRepository;
