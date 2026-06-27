# Módulo 09 - Autenticação, JWT e MVC

Este módulo consolida APIs com autenticação segura, organização em camadas e uso do boilerplate LionsDev.

Sequência sugerida para a aula:

1. `01_autenticacao_bcrypt_jwt.js`

   - Por que nunca gravamos senha pura no banco.
   - Como o bcrypt transforma a senha em hash.
   - Como o JWT representa uma sessão sem guardar estado no servidor.

2. `02_estrutura_mvc.js`

   - Como o boilerplate LionsDev separa responsabilidades em pastas.
   - O papel de cada pasta em uma API organizada.
   - Fluxo de uma requisição: rota -> controller -> service -> repository -> model.
   - Onde colocar regra de negócio, acesso ao banco e middlewares.

3. Boilerplate externo: <https://github.com/nicolassmotta/lionsdev-boilerplate>

   - Projeto base com Express, MongoDB, Mongoose, bcryptjs, JWT, MVC, services e repositories.
   - Deve ser usado como ponto de partida para novos exercícios de API com autenticação.
   - Fica em um repositório separado para os alunos clonarem sem trazer todo o material do curso.

4. `../lista_de_exercicios`

   - Exercícios para criar novos recursos a partir do boilerplate.
   - Cada recurso pertence ao usuário logado via `req.usuario.id`.
   - A lista reforça rotas protegidas, dono do recurso, services, repositories, controllers e middlewares.

Observação importante: no conteúdo falamos "bcrypt" como algoritmo de hash de senha. Nos exemplos usamos a biblioteca `bcryptjs`, que implementa bcrypt em JavaScript puro e costuma ser mais tranquila para instalar em computadores de alunos.
