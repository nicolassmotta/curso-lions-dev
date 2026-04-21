/*
 * ===================================================================
 * MÓDULO 09: DEPLOY — COLOCANDO SUA APLICAÇÃO NO AR
 * ===================================================================
 *
 * Este arquivo serve como um guia prático dos conceitos de Deploy
 * vistos na aula, usando o Render.com como plataforma.
 *
 * Até aqui, nossos projetos rodavam apenas na sua máquina (localhost).
 * Neste módulo, vamos entender como publicar uma aplicação na internet
 * para que qualquer pessoa no mundo possa acessar.
 */

// -------------------------------------------------------------------
// 1. O QUE É DEPLOY?
// -------------------------------------------------------------------

/*
 * "Deploy" (ou "implantação") é o processo de colocar sua aplicação
 * em um SERVIDOR na nuvem para que ela fique acessível pela internet.
 *
 * Até agora, usávamos:
 *   - node index.js         → Roda no seu computador (localhost:3000)
 *   - npm run dev            → Mesmo conceito, mas com hot reload
 *
 * Após o deploy, sua API terá um endereço público, por exemplo:
 *   - https://minha-api.onrender.com
 *
 * Assim qualquer pessoa do mundo pode acessar, não só você!
 */

// -------------------------------------------------------------------
// 2. POR QUE RENDER.COM?
// -------------------------------------------------------------------

/*
 * Existem várias plataformas de deploy. As mais populares são:
 *
 * a) Render.com     → Gratuito para começar, fácil de usar ✅
 * b) Heroku         → Já foi gratuito, hoje é pago
 * c) Railway        → Boa alternativa, limite gratuito baixo
 * d) Vercel         → Excelente para frontend (Next.js, React)
 * e) AWS / GCP      → Para projetos grandes e profissionais
 *
 * Vamos usar o Render porque:
 *   ✅ Tem plano gratuito (ideal para aprender)
 *   ✅ Conecta direto com o GitHub
 *   ✅ Suporta Node.js nativamente
 *   ✅ Deploy automático a cada push
 */

// -------------------------------------------------------------------
// 3. PREPARANDO SEU PROJETO PARA O DEPLOY
// -------------------------------------------------------------------

/*
 * Antes de fazer o deploy, seu projeto precisa estar preparado.
 * Aqui está um checklist obrigatório:
 *
 * ✅ PASSO 1: Ter um repositório no GitHub
 *    - O Render vai clonar seu código direto do GitHub.
 *    - Certifique-se de que seu código está atualizado:
 *
 *    $ git add .
 *    $ git commit -m "Projeto pronto para deploy"
 *    $ git push origin main
 *
 *
 * ✅ PASSO 2: Ter um script "start" no package.json
 *    - O Render vai procurar pelo script "start" para saber
 *      como iniciar sua aplicação.
 *
 *    No package.json, adicione:
 *    {
 *      "scripts": {
 *        "start": "node server.js"
 *      }
 *    }
 *
 *
 * ✅ PASSO 3: Usar a variável PORT do ambiente
 *    - No localhost, usamos porta 3000.
 *    - No Render, a plataforma DEFINE a porta via variável de ambiente.
 *    - Seu código deve respeitar isso:
 */

// ❌ ERRADO (porta fixa):
// const PORT = 3000;

// ✅ CORRETO (porta dinâmica com fallback):
const PORT = process.env.PORT || 3000;

// Explicação:
// - process.env.PORT → variável de ambiente definida pelo Render
// - || 3000          → se não existir (localhost), usa 3000

console.log(`Servidor configurado para rodar na porta: ${PORT}`);

/*
 * ✅ PASSO 4: Variáveis de ambiente (.env)
 *    - NUNCA coloque senhas, tokens ou URLs de banco no código!
 *    - Use um arquivo .env para desenvolvimento local:
 *
 *      MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meubanco
 *      PORT=3000
 *
 *    - No Render, você configura essas variáveis na interface web.
 *    - O arquivo .env NUNCA vai para o GitHub (deve estar no .gitignore).
 *
 *
 * ✅ PASSO 5: Garantir que o .gitignore está correto
 *    - node_modules/     (NUNCA subir para o GitHub)
 *    - .env              (NUNCA subir para o GitHub)
 */

// -------------------------------------------------------------------
// 4. PASSO A PASSO DO DEPLOY NO RENDER.COM
// -------------------------------------------------------------------

/*
 * ETAPA 1: Criar conta no Render
 *   - Acesse https://render.com
 *   - Clique em "Get Started for Free"
 *   - Conecte com sua conta do GitHub
 *
 *
 * ETAPA 2: Criar um novo Web Service
 *   - No Dashboard, clique em "New" → "Web Service"
 *   - Selecione o repositório do GitHub que contém sua API
 *   - Configure:
 *     • Name:          minha-api (nome do seu serviço)
 *     • Region:        Oregon (US West) ou o mais próximo
 *     • Branch:        main
 *     • Runtime:       Node
 *     • Build Command: npm install
 *     • Start Command: npm start (ou node server.js)
 *     • Instance Type: Free (gratuito)
 *
 *
 * ETAPA 3: Configurar Variáveis de Ambiente
 *   - Ainda na página de criação, role até "Environment Variables"
 *   - Adicione todas as variáveis do seu .env:
 *
 *     | Key        | Value                                        |
 *     |------------|----------------------------------------------|
 *     | MONGO_URI  | mongodb+srv://usuario:senha@cluster/banco    |
 *     | NODE_ENV   | production                                   |
 *
 *   - ATENÇÃO: NÃO adicione PORT. O Render define automaticamente.
 *
 *
 * ETAPA 4: Fazer o Deploy
 *   - Clique em "Create Web Service"
 *   - O Render vai:
 *     1. Clonar seu repositório
 *     2. Rodar "npm install" (instalar dependências)
 *     3. Rodar "npm start" (iniciar a aplicação)
 *   - Acompanhe os logs em tempo real na aba "Logs"
 *
 *
 * ETAPA 5: Testar!
 *   - Após o deploy, o Render gera uma URL pública:
 *     https://minha-api.onrender.com
 *   - Abra no navegador ou teste com Postman!
 */

// -------------------------------------------------------------------
// 5. O ARQUIVO render.yaml (Infrastructure as Code)
// -------------------------------------------------------------------

/*
 * O arquivo 'render.yaml' é OPCIONAL, mas muito útil.
 * Ele permite definir TODA a configuração do deploy em um arquivo,
 * em vez de configurar pela interface web.
 *
 * Isso se chama "Infrastructure as Code" (IaC) — a infraestrutura
 * é definida como código, versionada no Git.
 *
 * Exemplo de render.yaml para nossa API:
 *
 * services:
 *   - type: web
 *     name: minha-api
 *     env: node
 *     buildCommand: 'npm install'
 *     startCommand: 'npm start'
 *     envVars:
 *       - key: DATABASE_URL
 *         fromService:
 *           type: psql
 *           name: meu-banco
 *           property: connectionString
 *       - key: NODE_ENV
 *         value: production
 *
 * Com esse arquivo na raiz do projeto, o Render detecta automaticamente
 * e configura tudo para você. Veja o arquivo render.yaml nesta pasta
 * para um exemplo completo.
 */

// -------------------------------------------------------------------
// 6. DEPLOY AUTOMÁTICO (Continuous Deployment)
// -------------------------------------------------------------------

/*
 * Uma das grandes vantagens do Render é o Deploy Automático:
 *
 *   1. Você faz uma alteração no código
 *   2. Faz git push para o GitHub
 *   3. O Render detecta o push automaticamente
 *   4. Um novo deploy é feito sem você precisar fazer nada!
 *
 * Esse conceito se chama "Continuous Deployment" (CD) e faz parte
 * do fluxo profissional de desenvolvimento de software (CI/CD).
 *
 * Para ativar: Na configuração do serviço no Render, marque
 * "Auto-Deploy" como "Yes".
 */

// -------------------------------------------------------------------
// 7. PROBLEMAS COMUNS E COMO RESOLVER
// -------------------------------------------------------------------

/*
 * ❌ ERRO: "Build failed"
 *    → Verifique se o package.json tem todas as dependências listadas
 *    → Rode "npm install" localmente e veja se funciona
 *
 * ❌ ERRO: "Port already in use" ou servidor não inicia
 *    → Garanta que está usando process.env.PORT (não porta fixa!)
 *
 * ❌ ERRO: "Cannot connect to MongoDB"
 *    → Verifique se a variável MONGO_URI está configurada no Render
 *    → No MongoDB Atlas, libere o IP 0.0.0.0/0 (acesso de qualquer IP)
 *
 * ❌ ERRO: "Module not found"
 *    → Verifique se a dependência está no package.json (dependencies, NÃO devDependencies)
 *    → Confirme que os imports no código usam os caminhos corretos
 *
 * ⚠️  AVISO: Plano gratuito do Render "dorme" após 15 min de inatividade
 *    → A primeira requisição após o "sono" pode demorar ~30 segundos
 *    → Isso é normal no plano gratuito
 *    → Em produção real, use um plano pago para evitar isso
 */

// -------------------------------------------------------------------
// 8. RESUMO DOS CONCEITOS
// -------------------------------------------------------------------

/*
 * ┌─────────────────────┬────────────────────────────────────────────┐
 * │ Conceito            │ Descrição                                  │
 * ├─────────────────────┼────────────────────────────────────────────┤
 * │ Deploy              │ Publicar a aplicação em um servidor remoto │
 * │ Render.com          │ Plataforma de deploy (PaaS)                │
 * │ Web Service         │ Tipo de serviço para APIs (backend)        │
 * │ render.yaml         │ Arquivo de configuração (IaC)              │
 * │ Variáveis de Amb.   │ Configurações sensíveis (senhas, URLs)     │
 * │ process.env.PORT    │ Porta dinâmica definida pela plataforma    │
 * │ Auto-Deploy / CD    │ Deploy automático a cada git push          │
 * │ .gitignore          │ Arquivos que NÃO vão para o GitHub         │
 * └─────────────────────┴────────────────────────────────────────────┘
 *
 * Parabéns! Após completar este módulo, você terá percorrido toda a
 * jornada: do "Olá, Mundo" no terminal até publicar uma API profissional
 * na internet. 🚀
 */

console.log("================================================");
console.log("Módulo 09 — Deploy concluído!");
console.log("Agora sua aplicação está pronta para o mundo! 🌎");
console.log("================================================");
