# Lista de exercícios: Módulo 9B

Testes automatizados, documentação com Swagger e debug da API. Faça tudo no seu projeto do **boilerplate**. O gabarito está em [`../exercicios_resolvidos`](../exercicios_resolvidos).

## Parte 1: testes sem banco

1. **Primeiro teste.** Instale `vitest` e `supertest`, crie o script `test` e escreva um teste unitário para o `criarErro`: mensagem, status e `instanceof Error`.
2. **Rotas básicas.** Teste que `GET /` responde 200 com a mensagem do boilerplate e que uma rota inexistente responde 404 com `{ message: "Rota não encontrada." }`.
3. **Validação.** Teste que o cadastro sem `nome` e sem `email` responde 400, com a mensagem de cada caso.
4. **Autenticação.** Teste o perfil sem token, com o formato errado (`Token abc`) e com um token falso: os três respondem 401.

## Parte 2: testes com mock

5. **Cadastro.** Com o repository mockado (`vi.mock`), teste o cadastro de sucesso (201, sem `senhaHash` na resposta, com `token`) e o e-mail repetido (409, sem chamar o `criar`).
6. **Login e perfil.** Teste o login com senha errada (401) e o perfil com um token gerado no próprio teste (200, e o repository chamado com o id do token).
7. **Leia a falha.** Troque de propósito um `toBe(404)` por `toBe(400)`, rode e explique, com as suas palavras, o que o Expected e o Received mostram. Desfaça a mudança.

## Parte 3: Swagger e debug

8. **Documentação.** Instale o `swagger-ui-express`, documente cadastro, login e perfil em `src/docs/openapi.js` e teste pelo **Try it out** e pelo **Authorize**.
9. **A documentação não mente.** Escreva um teste que percorre `openapi.paths` e confere que nenhuma rota documentada responde 404.
10. **Caça ao bug.** Mande o cadastro sem body nenhum (Postman: Body → none). A API responde 500. Descubra a causa com um breakpoint no `validarCadastro`, corrija e escreva um teste que garanta o 400.

## Desafio

11. **Flashcards testado.** Escreva os testes das rotas de baralhos do desafio do Módulo 9: 401 sem token, 400 sem título, 201 com mock e a listagem chamando o repository com o id do token.
