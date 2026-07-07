# Desenvolvimento NoCode com FlutterFlow

## 1. Objetivo

Neste módulo, o FlutterFlow entra como uma forma visual de criar o frontend que consome as APIs construídas nos módulos anteriores.

Ao final, o aluno deve conseguir:

- Entender o conceito de NoCode/LowCode e quando faz sentido usar.
- Conhecer a interface principal do FlutterFlow.
- Montar telas com widgets básicos.
- Criar navegação entre telas.
- Configurar uma API Call.
- Testar a resposta JSON de uma rota.
- Exibir dados reais da API em uma tela.

## 2. O que é NoCode

NoCode é uma forma de criar aplicações por meio de uma interface visual, arrastando e configurando componentes prontos, em vez de escrever código linha por linha.

Características:

- Visual: você monta a tela vendo o resultado.
- Componentes prontos: botões, listas, formulários e layouts já existem.
- Integração: a aplicação pode conversar com APIs sem escrever todo o frontend manualmente.

Vantagens:

- Mais acessível para quem ainda não domina frontend.
- Ajuda a validar uma ideia rapidamente.
- Reduz o esforço inicial para criar telas.

Limitações:

- Customizações complexas podem ser difíceis.
- Projetos grandes podem esbarrar em limites da plataforma.
- Existe dependência da ferramenta usada.

## 3. Onde o FlutterFlow entra

Pense no projeto em três camadas:

```txt
FlutterFlow        -> Frontend, telas e interação do usuário
API Node/Express   -> Backend, regras de negócio e rotas
MongoDB            -> Banco de dados
```

O foco do módulo é a primeira seta:

```txt
Tela do FlutterFlow -> request HTTP -> sua API -> MongoDB -> response JSON -> tela
```

Tela com dados fixos não é suficiente. O aluno precisa fazer uma requisição real para a API.

## 4. Interface do FlutterFlow

Partes principais do editor:

| Área | Para que serve |
| ---- | -------------- |
| Widget Tree | Mostra a árvore com todos os widgets aninhados. |
| Canvas central | Mostra a prévia da tela como o usuário verá. |
| Painel de propriedades | Ajusta texto, cor, tamanho, espaçamento, borda e ações. |
| Menu lateral | Acesso a páginas, APIs, banco de dados, assets e configurações. |

## 5. Widgets principais

Widget é qualquer elemento visual da tela: texto, botão, imagem, container, lista ou formulário.

| Widget | Uso |
| ------ | --- |
| `Column` | Empilha widgets na vertical. |
| `Row` | Alinha widgets na horizontal. |
| `Stack` | Sobrepõe widgets em camadas. |
| `Container` | Caixa com tamanho, cor, borda, margem e padding. |
| `Text` | Exibe texto fixo ou dados vindos da API. |
| `Button` | Executa uma ação, como navegar ou chamar uma API. |
| `ListView` | Exibe uma lista com rolagem. |
| `AppBar` | Barra superior da tela, com título e ações. |

Dica: mantenha títulos curtos na `AppBar` para não quebrar em telas pequenas.

## 6. Navegação entre telas

Para chamar uma tela a partir de um botão:

1. Selecione o botão.
2. Abra a aba de ações.
3. Adicione uma ação `On Tap`.
4. Escolha `Navigate To`.
5. Selecione a página de destino.
6. Ajuste a transição e a opção de voltar, se necessário.

Use nomes claros para as telas: `LoginPage`, `ListaAgendamentos`, `NovoAgendamento`, `DetalhesAgendamento`.

## 7. Request e Response

Toda integração é uma conversa:

```txt
FlutterFlow faz request:
GET /api/agendamentos

API devolve response:
Status 200
[
  {
    "_id": "...",
    "nomePet": "Rex",
    "servico": "Banho"
  }
]
```

No FlutterFlow, cada request vira uma API Call reutilizável.

## 8. Fluxo de integração com API

A ordem recomendada é sempre a mesma:

1. Criar uma API Call.
2. Configurar método e URL.
3. Testar a API Call.
4. Mapear o Data Schema.
5. Executar a chamada na tela.
6. Exibir os dados nos widgets.

## 9. Criar uma API Call

Passo a passo:

1. Abra a área de API Calls no menu lateral.
2. Clique em `Add`.
3. Escolha `Create API Call`.
4. Dê um nome claro, por exemplo `GET agendamentos`.
5. Escolha o método HTTP.
6. Cole a URL da API.
7. Adicione headers, params ou body quando necessário.
8. Salve.

Use `API Group` quando várias rotas compartilharem a mesma base URL.

## 10. Configurar e testar

Exemplo de rota:

```txt
GET https://sua-api.onrender.com/api/agendamentos
```

Ao testar:

- Confirme se o status é `200`.
- Confira se o JSON voltou no formato esperado.
- Verifique se o array está na raiz da resposta ou dentro de uma chave, como `agendamentos`.
- Se a rota exigir login, configure o header:

```txt
Authorization: Bearer SEU_TOKEN
```

## 11. Mapear o response

Mapear significa dizer ao FlutterFlow quais campos existem no JSON.

Exemplo de item retornado:

```json
{
  "_id": "abc123",
  "nomePet": "Rex",
  "especie": "Cachorro",
  "servico": "Banho",
  "data": "2026-06-28"
}
```

Data Type sugerido:

| Campo | Tipo |
| ----- | ---- |
| `_id` | String |
| `nomePet` | String |
| `especie` | String |
| `servico` | String |
| `data` | String |

Marque `is List` quando a resposta for uma lista de itens.

## 12. Executar a chamada na tela

Para carregar dados quando a página abre:

1. Selecione a página ou o widget principal.
2. Adicione uma Backend Query do tipo API Call.
3. Configure para executar ao carregar a tela.
4. Selecione a API Call criada.
5. Use o resultado da chamada nos widgets da tela.

## 13. Gerar itens dinâmicos

Para transformar um card de exemplo em vários cards vindos da API:

1. Crie um card visual com `Container`, `Row`, `Column` e `Text`.
2. Selecione a `Column` ou `ListView` que contém o card.
3. Ative `Generate Dynamic Children`.
4. Aponte para a lista retornada pela API Call.
5. Edite apenas o primeiro card, que vira o modelo de todos.
6. Em cada `Text`, use `Set from Variable` para escolher o campo real.

Exemplo:

```txt
Text "Rex" -> Set from Variable -> item.nomePet
Text "Banho" -> Set from Variable -> item.servico
Text "2026-06-28" -> Set from Variable -> item.data
```

## 14. Boas práticas

- Nomeie bem API Calls e Data Types.
- Teste a API fora do FlutterFlow antes, usando Postman.
- Não deixe tokens fixos em telas finais.
- Trate erro quando a resposta não for `200`.
- Lembre que APIs gratuitas no Render podem demorar na primeira chamada por cold start.
- Não mude nomes de campos no frontend sem ajustar o backend.

## 15. Glossário rápido

| Termo | Significado |
| ----- | ----------- |
| NoCode | Criar apps por interface visual. |
| FlutterFlow | Plataforma visual baseada em Flutter. |
| Widget | Elemento visual de uma tela. |
| Widget Tree | Árvore de widgets aninhados. |
| API Call | Requisição HTTP configurada no FlutterFlow. |
| Response | Resposta do servidor, geralmente JSON. |
| Data Schema | Mapa dos campos que a API retorna. |
| Backend Query | Execução de API Call ao carregar uma tela. |
| Dynamic Children | Repetição de um widget para cada item de uma lista. |
