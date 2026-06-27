# Módulo 10 - Deploy com Render

Este módulo separa a publicação da API em um momento próprio: preparar o projeto, configurar variáveis de ambiente e colocar a aplicação no ar usando Render.com.

Sequência sugerida para a aula:

1. `deploy_render.js`

   - O que é deploy e por que a API deixa de rodar só em `localhost`.
   - Checklist antes de publicar: GitHub, `npm start`, `process.env.PORT`, `.env` e `.gitignore`.
   - Passo a passo de criação de um Web Service no Render.
   - Deploy automático a cada `git push`.

2. `render.yaml`

   - Exemplo de configuração do Render como código.
   - Variáveis como `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `BCRYPT_SALT_ROUNDS` e `NODE_ENV`.
   - Uso de `sync: false` e `generateValue` para não versionar segredos.

3. `../lista_de_exercicios/api_banco_digital.md`

   - Projeto final do curso: API de banco digital com autenticação, autorização, regras financeiras e deploy.
   - Deve ser feito depois que a turma já entendeu autenticação, MVC, MongoDB e o fluxo de publicação.

4. `../exercicios_resolvidos/api_banco_digital`

   - Gabarito completo do projeto final.
   - Mantém `.env.example`, `requests.http`, `render.yaml` e `README.md` com instruções para rodar localmente e publicar no Render.
