// declarar uma variável para o nome, sem atribuir nenhum valor inicial a ela
// usar o console.log() para imprimir a pergunta no terminal (ex: "Qual é o seu nome?")

// a estrutura process.stdin.on(...) já foi fornecida para capturar a digitação
// (dentro do bloco): converter a entrada (data) para texto usando .toString() e salvar na variável nome
// (dentro do bloco): declarar uma nova variável para a saudação, unindo o texto "Olá, " com a variável nome
// (dentro do bloco): usar o console.log() para imprimir a variável de saudação final

let nome;

console.log("Qual é o seu nome?");

process.stdin.on("data", function (data) {
  nome = data.toString().trim();
  let saudacao = "Olá, " + nome;
  console.log(saudacao);
  process.exit();
});
