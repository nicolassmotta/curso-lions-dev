# Simulação de Entrevista com o Cliente

Dinâmica de coleta de requisitos em duplas.

## Como funciona

A turma se divide em dois papéis:

- Cliente: inventa um projeto ou negócio e responde como uma pessoa que não sabe programar. Ele tem um problema, não uma solução técnica pronta.
- Dev: entrevista o cliente, anota respostas e depois preenche o template de levantamento de requisitos.

Regras:

- O dev não pode ler a página do cliente.
- O cliente não entrega tudo de bandeja.
- O dev precisa perguntar, confirmar e organizar as informações.
- Ao final, troquem os papéis e rodem de novo com outro projeto.

## Parte A - Cliente

### Seu papel

- Fale como uma pessoa comum, do dia a dia.
- Você não precisa saber termos técnicos.
- Você tem um problema, não uma solução pronta.
- Não diga "quero um app com banco de dados"; explique o que te incomoda.
- Não conte tudo de uma vez.
- Responda o que for perguntado e deixe o dev investigar.
- Seja consistente com a história escolhida.

### Antes de começar

Monte sua história:

```txt
Quem é você? Pessoa ou tipo de negócio.
Exemplo: dono de uma pequena cafeteria.

Escreva aqui.
```

```txt
Qual problema ou dor te incomoda hoje?
Exemplo: perco o controle das encomendas que anoto num caderno.

Escreva aqui.
```

```txt
Como você resolve isso hoje, sem sistema?
Exemplo: anoto tudo no caderno e às vezes esqueço de avisar o cliente.

Escreva aqui.
```

```txt
O que você gostaria que melhorasse?
Exemplo: não perder pedido e avisar o cliente quando ficar pronto.

Escreva aqui.
```

```txt
Quem mais usaria isso além de você?
Exemplo: minha funcionária que atende o balcão.

Escreva aqui.
```

### Se travar, use um cenário

- Dono de cafeteria que perde o controle das encomendas anotadas no caderno.
- Professor de várias turmas que se enrola com entregas e notas de trabalhos.
- Personal trainer que monta treinos para alunos e perde o histórico no papel.
- Organizador de eventos que controla convidados e confirmações por mensagens soltas.

## Parte B - Dev entrevistador

Seu objetivo é descobrir o que o cliente precisa conversando, e depois preencher o template de levantamento de requisitos.

### Técnicas úteis

- Comece com perguntas abertas: "me conta como você faz isso hoje".
- Deixe perguntas de sim/não para o final.
- Quando o cliente pedir uma solução pronta, pergunte: "por que você precisa disso?"
- Palavra vaga precisa de exemplo: rápido, fácil, simples, seguro.
- Confirme repetindo: "então o que você precisa é...".
- Separe o essencial do "seria legal".
- Não proponha solução técnica cedo demais.

## Roteiro da entrevista

Use como guia. Não precisa seguir exatamente na ordem.

### 1. Contexto atual

Perguntas:

- Me conta um pouco sobre o seu dia a dia.
- Como você faz isso hoje, sem nenhum sistema?
- O que costuma dar mais trabalho ou dar errado nesse processo?

```txt
Anotações:
```

### 2. Problema / dor

Perguntas:

- O que mais te incomoda na forma como você faz hoje?
- Se você pudesse resolver uma coisa, qual seria?
- Por que isso é um problema para você?

```txt
Anotações:
```

### 3. Quem usa

Perguntas:

- Além de você, quem mais usaria isso?
- Essas pessoas têm facilidade com tecnologia?
- Alguém faria coisas diferentes no sistema?

```txt
Anotações:
```

### 4. O que espera

Perguntas:

- Imagina que o sistema já existe: o que você faria nele primeiro?
- O que ele precisa ter para te ajudar de verdade?
- Tem algo que seria legal ter, mas não é essencial?

```txt
Anotações:
```

### 5. Restrições e limites

Perguntas:

- Tem alguma regra que eu preciso saber?
- Existe prazo, custo ou alguma exigência específica?
- Tem algo que o sistema não deve fazer?

```txt
Anotações:
```

### 6. Prioridades

Perguntas:

- De tudo que a gente falou, o que é mais urgente?
- Se tivesse que entregar só três coisas primeiro, quais seriam?

```txt
Anotações:
```

## Checklist antes de encerrar

```txt
[ ] Consigo descrever o problema com as palavras do cliente.
[ ] Sei quem vai usar o sistema.
[ ] Sei o que está dentro e fora do escopo.
[ ] Tenho requisitos essenciais.
[ ] Sei regras e limites do negócio.
[ ] Sei o que é prioridade para o cliente.
```

## Da entrevista para o template

Use este mapa para preencher o levantamento de requisitos:

| Bloco da entrevista | Vira no template |
| ------------------- | ---------------- |
| Contexto atual | Público-alvo e problema |
| Problema / dor | Problema, solução proposta e objetivos |
| Quem usa | Público-alvo e atores |
| O que espera | Escopo, telas/endpoints, entidades e requisitos funcionais |
| Restrições e limites | Escopo fora, restrições técnicas, requisitos não funcionais e regras de negócio |
| Prioridades | Coluna de prioridade dos requisitos |

Dica: cliente quase nunca fala "minha entidade é Pedido". O dev traduz. O que o cliente guarda vira entidade; o que ele faz vira tela, endpoint e requisito funcional.
