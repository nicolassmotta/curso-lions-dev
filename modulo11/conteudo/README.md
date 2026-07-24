# Módulo 11 — Frontend com IA e FlutterFlow

Este módulo conecta as APIs construídas nos módulos anteriores a uma interface visual. A turma não precisa dominar uma stack frontend inteira agora; o objetivo é criar uma primeira interface funcional, testar requests reais e entender o fluxo entre tela, API e banco de dados.

O módulo tem dois caminhos complementares:

| Material | Papel na aula | Arquivo |
| -------- | ------------- | ------- |
| Guia Prático - Frontend com IA | Mostra como usar IA via web, terminal/editor ou plataformas visuais para gerar frontend a partir de rotas reais. | [frontend_com_ia.md](frontend_com_ia.md) |
| Desenvolvimento NoCode com FlutterFlow | Apresenta FlutterFlow como ferramenta visual para criar telas, configurar API Calls e exibir dados da API. | [flutterflow.md](flutterflow.md) |

## Ordem sugerida

1. Revisar uma API já construída nos módulos 07 a 10.
2. Conferir rotas, métodos HTTP, body, response e necessidade de token JWT.
3. Estudar [frontend_com_ia.md](frontend_com_ia.md) para transformar endpoints em telas com ajuda de IA.
4. Estudar [flutterflow.md](flutterflow.md) para montar telas NoCode/LowCode consumindo APIs.
5. Fazer as atividades da pasta [`../lista_de_exercicios`](../lista_de_exercicios).
6. Validar tudo com Postman, navegador e dados reais no backend.

## Atividades relacionadas

| Atividade | Objetivo | Arquivo |
| --------- | -------- | ------- |
| Frontend com IA | Gerar uma tela de cadastro usando uma rota `POST` real do backend. | [../lista_de_exercicios/frontend_com_ia.md](../lista_de_exercicios/frontend_com_ia.md) |
| FlutterFlow consumindo API | Criar uma tela de listagem no FlutterFlow usando uma rota `GET` real. | [../lista_de_exercicios/flutterflow_listagem_api.md](../lista_de_exercicios/flutterflow_listagem_api.md) |

## Resultado esperado

Ao final do módulo, o aluno deve conseguir:

- Escolher uma rota real da própria API.
- Descrever para a IA ou para o FlutterFlow quais dados a rota recebe e retorna.
- Criar tela de cadastro ou listagem.
- Configurar request, headers, body e tratamento de erro.
- Usar token JWT quando a rota for protegida.
- Mostrar dados persistidos no MongoDB, sem depender de dados fixos na tela.

Observação importante: o frontend só conta se consumir a API de verdade. Tela bonita com dados fixos não substitui request real, status code, JSON correto e persistência no banco.
