// Estilos de escrita
const sublinhado = "\x1b[4m";
const invertido = "\x1b[7m"; // Inverte cor da letra com a do fundo
const italico = "\x1b[3m";   // (Nem todo terminal suporta, mas a maioria sim)
const reset = "\x1b[0m";
const negrito = "\x1b[1m";

// Cores Padrão (Mais escuras/fechadas)
const preto = "\x1b[30m";
const vermelho = "\x1b[31m";
const verde = "\x1b[32m";
const amarelo = "\x1b[33m";
const roxo = "\x1b[34m";
const rosa = "\x1b[35m";
const ciano = "\x1b[36m";
const laranja = "\x1b[38;5;208m"; // Uma cor muito usada
const cinza = "\x1b[90m";

// Cores de Fundo (Background) - Ótimas para destacar avisos
const bg_vermelho = "\x1b[41m";
const bg_verde = "\x1b[42m";
const bg_amarelo = "\x1b[43m";
const bg_roxo = "\x1b[44m";
const bg_branco = "\x1b[47m";

console.log(`╭────────────────╮`);
console.log(`${negrito}│  CORES PADRÃO  │${reset}`);
console.log(`╰────────────────╯`);
console.log(`${vermelho}⦙ Este texto é Vermelho${reset}`);
console.log(`${verde}⦙ Este texto é Verde${reset}`);
console.log(`${amarelo}⦙ Este texto é Amarelo${reset}`);
console.log(`${roxo}⦙ Este texto é Roxo${reset}`);
console.log(`${rosa}⦙ Este texto é Rosa${reset}`);
console.log(`${ciano}⦙ Este texto é Ciano${reset}`);

console.log(`\n${negrito}${roxo}⦙ DICA: Roxo Escuro com Negrito fica assim${reset}\n`);

console.log(`╭──────────────────────────────╮`);
console.log(`${negrito}│  ESTILOS E FUNDOS POPULARES  │${reset}`);
console.log(`╰──────────────────────────────╯`);

// Alerta crítico (Fundo vermelho com texto branco negrito)
console.log(`${bg_vermelho}${negrito}⦙ ERRO CRÍTICO ${reset}- Algo deu muito errado!`);

// Sucesso (Fundo verde com texto preto)
console.log(`${bg_verde}${preto}⦙ SUCESSO ${reset}- Operação concluída.`);

// Efeito de Destaque Invertido
console.log(`${invertido}⦙ DESTAQUE INVERTIDO ${reset} (Inverte fundo e letra)`);

console.log(`${negrito}${bg_roxo}⦙ INFO ${reset} O roxo de fundo ajuda a ler o que o roxo de letra esconde.`);

// Aviso/Warning (Laranja)
console.log(`${laranja}⦙ Aviso:${reset} Este é um tom de laranja bem comum.`);

// Texto em itálico ou sublinhado
console.log(`${italico}⦙ Este texto está em itálico (se o seu terminal permitir)${reset}`);
console.log(`⦙ ${sublinhado}Este texto está sublinhado${reset}\n\n`);



export { reset, negrito, sublinhado, italico, invertido, 
         preto, vermelho, verde, amarelo, roxo, rosa, ciano, laranja, cinza,
         bg_vermelho, bg_verde, bg_amarelo, bg_roxo, bg_branco };