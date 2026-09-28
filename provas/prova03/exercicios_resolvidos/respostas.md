# Respostas escritas (exercícios 2, 8, 9 e 10)

## Exercício 2
- (a) **Embedding**: os endereços pertencem ao cliente, são poucos e sempre lidos junto com ele.
- (b) **Referência**: as avaliações crescem sem limite e têm autor próprio (o usuário); ficam numa coleção com o `_id` do filme e do usuário.
- (c) **Referência**: o diretor existe sozinho e aparece em vários filmes; embutir duplicaria os dados dele.

## Exercício 8
- (a) O Render escolhe a porta e a informa em `process.env.PORT`; porta fixa faz o serviço não responder.
- (b) No painel do serviço, em **Environment** (ou no `render.yaml`, com `sync: false` para digitar o valor no painel). Nunca no GitHub.
- (c) Para conferir rapidamente se a API está no ar: responde `{ "status": "ok" }`.
- (d) Sem tráfego por cerca de 15 minutos, o serviço free dorme; a primeira requisição o acorda e pode levar perto de um minuto.
- (e) O acesso de rede (Network Access) do cluster, com senha forte no usuário do banco.

## Exercício 9
```js
"/filmes/{id}": {
  get: {
    summary: "Busca um filme pelo id",
    parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
    responses: {
      200: { description: "Filme encontrado" },
      400: { description: "ID com formato inválido" },
      404: { description: "Filme não encontrado ou excluído" },
    },
  },
},
```
No OpenAPI, o parâmetro de rota se escreve `{id}`, e não `:id`.

## Exercício 10
Um breakpoint no começo do middleware `autenticar`: olhe `req.headers.authorization` (o header chegou? tem a palavra `Bearer` e um espaço?), depois `tipo` e `token` logo após o `split`. Se o formato estiver certo, avance até o `jwt.verify` e veja o erro no `catch` (`error.message`): `invalid signature` indica um `JWT_SECRET` diferente entre quem gerou e quem confere o token; `jwt expired`, token vencido.
