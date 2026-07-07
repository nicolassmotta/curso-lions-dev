# Módulo 11 - Frontend com FlutterFlow e IA

Este módulo conecta as APIs dos módulos anteriores a uma interface visual. A turma não precisa estudar uma stack frontend em profundidade agora; o objetivo é criar uma primeira interface funcional, testar requests reais e entender o fluxo entre tela, API e banco de dados.

Sequência sugerida para a aula:

1. `frontend_com_ia.md`

   - Como transformar rotas da API em telas usando IA.
   - Diferença entre IA via web, IA via terminal e plataformas visuais.
   - Como escrever prompts com contexto suficiente para a IA não inventar endpoints.
   - Como testar `fetch`/`axios`, mensagens de erro, token JWT e integração com o backend.

2. `flutterflow.md`

   - Conceito de NoCode/LowCode.
   - Interface do FlutterFlow: Widget Tree, canvas, propriedades, páginas e API Calls.
   - Widgets principais: `Column`, `Row`, `Stack`, `Container`, `Text`, `Button`, `ListView` e `AppBar`.
   - Navegação entre telas e consumo de API.
   - Data Schema, Backend Query e Dynamic Children.

3. `../lista_de_exercicios/frontend_com_ia.md`

   - Atividade para gerar uma tela de cadastro com IA.
   - O aluno parte de uma rota `POST` real do próprio backend.
   - A entrega inclui print, prompt usado e registro dos erros corrigidos.

4. `../lista_de_exercicios/flutterflow_listagem_api.md`

   - Atividade para montar uma tela de listagem no FlutterFlow consumindo uma rota `GET`.
   - A entrega é a tela funcionando com dados reais vindos da API.

Observação importante: o frontend só conta se consumir a API de verdade. Tela bonita com dados fixos não substitui request real, status code, JSON correto e persistência no MongoDB.
