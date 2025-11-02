/* * DOMÍNIO DO GIT E GITHUB (MÓDULO 4)
 * O Git é um sistema de "Controle de Versão". 
 * Pense nele como um "salvar" super avançado para o seu código. Ele permite
 * que você salve "fotos" (snapshots) do seu projeto ao longo do tempo,
 * volte para versões antigas e trabalhe em equipe. 
 *
 * Git (Local) vs. GitHub (Remoto):
 * - Git: É o programa na sua máquina (Repositório Local). 
 * - GitHub: É o site na nuvem onde você guarda seu código (Repositório Remoto). 
 */

// -------------------------------------------------------------------
// 1. CONFIGURAÇÃO INICIAL (Só precisa fazer uma vez na vida)
// -------------------------------------------------------------------

console.log("--- 1. Configuração Inicial ---");
console.log("Definindo sua identidade (nome e email) no Git:");

// $ git config --global user.name "Seu Nome" 
// $ git config --global user.email "seu@email.com" 

console.log("---------------------------------");

// -------------------------------------------------------------------
// 2. O FLUXO DE TRABALHO BÁSICO (O dia a dia)
// -------------------------------------------------------------------

console.log("\n--- 2. O Fluxo de Trabalho Local ---");

// 2.1. INICIAR (Começar a "rastrear" o projeto)
console.log("Iniciando um repositório na pasta atual...");
// $ git init 

// 2.2. AS TRÊS ÁREAS (Conceitual)
console.log("Entendendo as 3 áreas do Git:");
console.log("  1. Working Directory: Onde você edita seus arquivos (sua pasta)."); 
console.log("  2. Staging Area ('Palco'): Onde você prepara os arquivos para a 'foto'."); 
console.log("  3. Git Repository (.git): Onde o Git armazena as 'fotos' (commits) salvos."); 

// 2.3. VERIFICAR (Ver o que mudou)
console.log("Verificando o status dos arquivos...");
// $ git status 

// 2.4. PREPARAR (Adicionar ao "Palco" ou "Staging")
console.log("Adicionando um arquivo específico ao 'palco'...");
// $ git add nome-do-arquivo.js 

console.log("Adicionando TODOS os arquivos modificados ao 'palco'...");
// $ git add . 

// 2.5. SALVAR (Fazer a "Foto" ou "Commit")
console.log("Salvando a 'foto' (commit) dos arquivos que estão no palco...");
// $ git commit -m "Uma mensagem clara do que eu fiz"

console.log("------------------------------------");

// -------------------------------------------------------------------
// 3. BRANCHES (Trabalho paralelo)
// -------------------------------------------------------------------

console.log("\n--- 3. Branches (Linhas de Desenvolvimento) ---");
console.log("Branches são linhas independentes de desenvolvimento."); 
console.log("Útil para criar novas funcionalidades sem quebrar o código principal."); 

// 3.1. Criar uma nova branch (um novo "ramo")
// $ git branch nome-da-nova-branch 

// 3.2. Mudar para a nova branch
// $ git checkout nome-da-nova-branch 

// 3.3. Atalho: Criar e Mudar ao mesmo tempo
console.log("Criando e já mudando para a nova branch 'minha-funcionalidade'...");
// $ git checkout -b minha-funcionalidade 

console.log("-----------------------------------------------");

// -------------------------------------------------------------------
// 4. JUNTANDO O TRABALHO (Merge e Conflitos)
// -------------------------------------------------------------------

console.log("\n--- 4. Juntando o Trabalho (Merge) ---");

// 4.1. Voltar para a branch principal (geralmente 'main')
console.log("Voltando para a branch principal...");
// $ git checkout main 

// 4.2. "Puxar" (Merge) as mudanças da outra branch para a 'main'
console.log("Juntando a 'minha-funcionalidade' com a 'main'...");
// $ git merge minha-funcionalidade 

// 4.3. Conflitos! (O que fazer?)
console.log("Ocorreu um conflito! O Git não soube qual linha manter."); 
console.log("  1. Abra o(s) arquivo(s) com conflito no seu editor."); 
console.log("  2. Edite o arquivo manualmente, escolhendo o código correto e apagando as marcações do Git (<<<, ===, >>>)."); 
console.log("  3. Salve o arquivo.");
console.log("  4. Adicione o arquivo resolvido: git add nome-do-arquivo"); 
console.log("  5. Faça um novo commit para finalizar o merge: git commit -m 'Resolve conflito'"); 

console.log("-----------------------------------------");

// -------------------------------------------------------------------
// 5. GITHUB (O Repositório Remoto na Nuvem)
// -------------------------------------------------------------------

console.log("\n--- 5. GitHub (Colaboração) ---");

// 5.1. Conectar seu repositório local com o do GitHub
console.log("Linkando o repositório local com o repositório na nuvem (remoto)...");
// $ git remote add origin <URL_DO_SEU_REPOSITORIO_NO_GITHUB> [cite: 714]

// 5.2. Enviar seus commits (locais) para o GitHub (remoto)
console.log("Enviando seus 'salvamentos' (commits) para a nuvem...");
// $ git push -u origin nome-da-sua-branch

// 5.3. Pull Request (PR)
console.log("Pull Request (PR) é um 'Pedido de Merge' feito no site do GitHub.");
console.log("É onde sua equipe pode revisar seu código antes de aprovar e juntar (merge) na branch principal.");

console.log("---------------------------------");