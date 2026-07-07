# Atividade Prática - FlutterFlow Consumindo API

## Objetivo

Montar uma tela de listagem no FlutterFlow consumindo uma rota `GET` real da API construída nos módulos anteriores.

A entrega precisa mostrar dados reais vindos da API, não dados digitados manualmente na tela.

## 1. Antes de abrir o FlutterFlow

Escolha uma rota de listagem do seu backend.

Exemplos:

```txt
GET /api/tarefas
GET /api/agendamentos
GET /api/produtos
GET /api/livros
```

Preencha:

```txt
Nome do projeto:
URL completa da rota:
A rota precisa de token? Sim/Não
Exemplo do JSON retornado:
Campos que quero exibir na tela:
```

Teste a rota no Postman antes de configurar no FlutterFlow.

## 2. Criar a tela

Monte uma página com:

- `AppBar` com título curto.
- `Column` ou `ListView` para a listagem.
- Um `Container` como card de cada item.
- `Row` e `Text` para organizar as informações.
- Um botão no rodapé ou no card, se fizer sentido.

## 3. Criar a API Call

No FlutterFlow:

1. Abra a área de API Calls.
2. Clique em `Add`.
3. Escolha `Create API Call`.
4. Nomeie a chamada, por exemplo `GET tarefas`.
5. Selecione o método `GET`.
6. Cole a URL completa.
7. Configure headers se necessário.
8. Salve.

Se a rota exigir JWT:

```txt
Authorization: Bearer SEU_TOKEN
```

Use token de teste apenas durante a atividade.

## 4. Testar a API Call

Na aba de teste:

1. Clique em `Test API Call`.
2. Confirme status `200`.
3. Confira o JSON.
4. Verifique se a resposta é uma lista direta ou se a lista vem dentro de uma propriedade.

Exemplo de lista direta:

```json
[
  {
    "_id": "abc123",
    "titulo": "Estudar API",
    "prioridade": "alta"
  }
]
```

Exemplo de lista dentro de propriedade:

```json
{
  "tarefas": [
    {
      "_id": "abc123",
      "titulo": "Estudar API",
      "prioridade": "alta"
    }
  ]
}
```

## 5. Mapear o Data Schema

Crie um Data Type com os campos retornados pela API.

Exemplo:

| Campo | Tipo |
| ----- | ---- |
| `_id` | String |
| `titulo` | String |
| `prioridade` | String |
| `concluida` | Boolean |

Marque `is List` quando o retorno for uma lista.

## 6. Ligar a API à tela

1. Selecione a página ou o widget principal.
2. Adicione uma Backend Query do tipo API Call.
3. Configure para executar ao abrir a página.
4. Selecione a API Call criada.
5. Use o resultado da query como fonte da lista.

## 7. Gerar cards dinâmicos

1. Crie um card de exemplo.
2. Selecione a `Column` ou `ListView`.
3. Ative `Generate Dynamic Children`.
4. Aponte para a lista retornada pela API.
5. Em cada `Text`, escolha `Set from Variable`.
6. Ligue cada texto ao campo correto do item.

## 8. Entrega

Entregue:

- Print da API Call testada com status `200`.
- Print da tela com dados reais.
- Nome da rota consumida.
- Campos mapeados no Data Schema.
- Breve explicação do fluxo: tela -> API Call -> response -> card.

## 9. Critérios de aceite

- A rota foi testada antes no FlutterFlow.
- A resposta retorna dados reais.
- A tela usa Dynamic Children ou estrutura equivalente para repetir itens.
- Os textos exibem campos vindos da API.
- O aluno consegue explicar o request e o response.
