const prompt = require("prompt-sync")();

function atualizarEntrega(codigo) {
  switch (codigo) {
    case "P":
      return "Pendente de Envio";
    case "E":
      return "Em Rota de Entrega";
    case "C":
      return "Cancelado";
    default:
      return "Status Inválido";
  }
}

let codigo = "";
let entrega = {
  id: "54873892826",
  status: "",
};

console.log("Qual o código do status da entrega?\n[P] - Pendente de Envio\n[E] - Em Rota de Entrega\n[C] - Cancelado");
codigo = prompt("R: ");

entrega.status = atualizarEntrega(codigo);

console.log(entrega);
