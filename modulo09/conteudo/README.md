# Módulo 09 - Autenticação, MVC e Deploy

Sequência sugerida para a aula:

1. `01_autenticacao_bcrypt_jwt.js`

   - Por que nunca gravamos senha pura no banco.
   - Como o bcrypt transforma a senha em hash.
   - Como o JWT representa uma sessão sem guardar estado no servidor.

2. `02_estrutura_mvc.js`

   - O papel de cada pasta em uma API organizada.
   - Fluxo de uma requisição: rota -> controller -> service -> repository -> model.
   - Onde colocar regra de negócio, acesso ao banco e middlewares.

3. `deploy_render.js`

   - Checklist de deploy no Render.
   - Uso correto de `PORT`, `.env`, `MONGO_URI` e `JWT_SECRET`.

4. `../exercicios_resolvidos/autenticacao_mvc`

   - Projeto completo com Express, MongoDB, Mongoose, bcryptjs, JWT, MVC, services e repositories.

5. `../lista_de_exercicios/api_autenticacao_mvc.md`
   - Proposta para os alunos construirem uma API parecida do zero.

Observação importante: no conteúdo falamos "bcrypt" como algoritmo de hash de senha. No exemplo resolvido usamos a biblioteca `bcryptjs`, que implementa bcrypt em JavaScript puro e costuma ser mais tranquila para instalar em computadores de alunos e no deploy.
