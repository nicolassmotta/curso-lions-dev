import contatosIniciais from "./contatos.js";

// Contador que só cresce: remover o último contato não faz o próximo reaproveitar o ID.
// Ele começa no maior ID que já existe na lista quando o programa inicia.
let ultimoId = 0;
for (let i = 0; i < contatosIniciais.length; i++) {
  if (contatosIniciais[i].id > ultimoId) ultimoId = contatosIniciais[i].id;
}

function adicionarContato(contatos, novoContato) {
  // Padroniza o e-mail: "Ana@Gmail.com " e "ana@gmail.com" são o mesmo e-mail
  novoContato.email = novoContato.email.trim().toLowerCase();

  // Validação: Não permitir e-mail duplicado
  let emailExiste = false;
  for (let i = 0; i < contatos.length; i++) {
    if (contatos[i].email === novoContato.email) {
      emailExiste = true;
      // Para a busca assim que encontrar
      break;
    }
  }

  if (emailExiste) {
    console.log("Erro: Este e-mail já está cadastrado!");
    return false;
  }

  // Gerar ID sequencial sem reaproveitar IDs de contatos removidos
  ultimoId = ultimoId + 1;
  novoContato.id = ultimoId;

  contatos.push(novoContato);
  return true;
}

export default adicionarContato;
