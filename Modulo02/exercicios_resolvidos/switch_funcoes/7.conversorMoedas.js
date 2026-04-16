import PromptSync from "prompt-sync";
const prompt = PromptSync();

const conversorMoedas  = ((total, moeda) => {
  
  let reaisConvertido = 0
  switch (moeda) {
    case 1:
      reaisConvertido = total / 5;
      console.log(`Conversão de moeda executada com sucesso! Total em USD: $${reaisConvertido.toFixed(2)}`);
      break;
    case 2:
      reaisConvertido = total / 6;
      console.log(`Conversão de moeda executada com sucesso! Total em EUR: $${reaisConvertido.toFixed(2)}`);
      break;
    case 3:
      reaisConvertido = total / 7;
      console.log(`Conversão de moeda executada com sucesso! Total em GBP: $${reaisConvertido.toFixed(2)}`);
      break;
    default:
      console.log(`Opção inválida, moeda não cadastrada! Total em reais: ${total}`);
      break;
  }
})

console.log("Quantos reais você tem para trocar?");
let totalReias = Number(prompt("R: "));
console.log("Para qual moeda você deseja converter?\n[1] - USD\n[2] - EUR\n[3] - GBP");
let moedaEscolhida = parseInt(prompt("R: "));

conversorMoedas(totalReias, moedaEscolhida)