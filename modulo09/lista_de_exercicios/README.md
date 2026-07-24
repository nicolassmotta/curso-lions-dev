# Módulo 09 — Lista de Exercícios

Exercícios de API com **autenticação (bcrypt + JWT)** e **arquitetura em camadas** (model, repository, service, controller e routes), a partir do **boilerplate LionsDev**: <https://github.com/nicolassmotta/boilerplate-lions-dev.git>

O boilerplate já traz a camada de `Usuario`, cadastro/login com bcrypt/JWT, o middleware `autenticar` e o tratamento central de erros. Em cada exercício o aluno **cria um novo recurso** e o amarra ao **dono** (usuário logado, via `req.usuario.id`).

## Listas de código (treino direto)

Comece por aqui. São as listas de treino: uns drills de aquecimento, código pra completar, um bug pra achar e um desafio no fim.

| Lista | Foco | Arquivo |
| ----- | ---- | ------- |
| Autenticação e MVC | bcrypt, JWT, middleware, separação em camadas | [codigo_auth_mvc.md](codigo_auth_mvc.md) |

## Listas aplicadas (desafios em contexto)

Depois do treino: problemas em prosa, onde o aluno lê o enunciado e escreve o código do zero.

| Lista | Foco | Arquivo |
| ----- | ---- | ------- |
| Tarefas — Meu To-Do | dono via token (básico) | [api_tarefas.md](api_tarefas.md) |
| Petshop — Meus Agendamentos | adaptação do M08 com login (básico) | [api_petshop_boilerplate.md](api_petshop_boilerplate.md) |
| Academia — Minhas Matrículas | adaptação do M08 com login (básico) | [api_academia_boilerplate.md](api_academia_boilerplate.md) |
| Finanças — Meu Controle de Gastos | cálculo de resumo (intermediário) | [api_financas.md](api_financas.md) |
| Biblioteca — Meu Acervo e Empréstimos | dois recursos, `ref`, estoque (avançado) | [api_biblioteca_boilerplate.md](api_biblioteca_boilerplate.md) |
| Lions Bet — Casa de Apostas com Admin | autorização por papel (desafio) | [api_lions_bet.md](api_lions_bet.md) |

## Ordem sugerida

1. Faça a lista de código para fixar hash, token, middleware e MVC.
2. **Tarefas** (mais simples, fixa o padrão dono-via-token).
3. **Petshop** e **Academia** (adaptação direta do Módulo 08).
4. **Finanças** (cálculo de resumo em JavaScript).
5. **Biblioteca** (dois recursos, `ObjectId`/`ref` e regra de estoque).
6. **Lions Bet** (o mais difícil: autorização por papel/admin).
