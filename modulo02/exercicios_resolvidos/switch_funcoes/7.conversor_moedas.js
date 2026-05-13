import PromptSync from "prompt-sync";
const prompt = PromptSync();

const conversorMoedas = (total, moeda) => {
  let reaisConvertido = 0;

  switch (moeda) {
    case "USD":
      reaisConvertido = total / 5;
      console.log(`Conversão de moeda executada com sucesso! Total em USD: $${reaisConvertido.toFixed(2)}`);
      break;
    case "EUR":
      reaisConvertido = total / 6;
      console.log(`Conversão de moeda executada com sucesso! Total em EUR: $${reaisConvertido.toFixed(2)}`);
      break;
    case "GBP":
      reaisConvertido = total / 7;
      console.log(`Conversão de moeda executada com sucesso! Total em GBP: $${reaisConvertido.toFixed(2)}`);
      break;
    default:
      console.log(`Opção inválida, moeda não cadastrada! Total em reais: ${total}`);
      break;
  }
};

console.log("Quantos reais você tem para trocar?");
let totalReais = Number(prompt("R: "));
console.log("Para qual moeda você deseja converter?\n[USD] - Dólar\n[EUR] - Euro\n[GBP] - Libra");
let moedaEscolhida = prompt("R: ");

conversorMoedas(totalReais, moedaEscolhida);
