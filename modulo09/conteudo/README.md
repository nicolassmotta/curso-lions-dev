# Módulo 09 - Autenticação, MVC e Deploy

Este módulo fecha a jornada de APIs com três peças que andam juntas em projetos reais: autenticação segura, organização em camadas e deploy.

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
   - Também pode ser usado como boilerplate base para os próximos exercícios de API.

5. `../lista_de_exercicios/api_autenticacao_mvc.md`

   - Proposta para os alunos construírem uma API parecida do zero.
   - Reforça cadastro, login, perfil protegido, atualização, listagem e remoção da própria conta.

6. `../lista_de_exercicios/api_banco_digital.md`

   - Projeto grande de encerramento: uma API de banco digital com contas, transações, PIX, boletos, cartões, empréstimos, permissões e deploy.
   - Deve ser feito depois que a turma já entendeu autenticação, MVC e MongoDB.

7. `../exercicios_resolvidos/api_banco_digital`

   - Gabarito completo do projeto final, mantendo o mesmo padrão de MVC, services, repositories, middlewares, `.env.example`, `requests.http` e `render.yaml`.

Observação importante: no conteúdo falamos "bcrypt" como algoritmo de hash de senha. No exemplo resolvido usamos a biblioteca `bcryptjs`, que implementa bcrypt em JavaScript puro e costuma ser mais tranquila para instalar em computadores de alunos e no deploy.
