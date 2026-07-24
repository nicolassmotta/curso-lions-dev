<style>
  :root {
    --ld-preto: #000000;
    --ld-branco: #FFFFFF;
    --ld-laranja: #E16D34;
    --ld-laranja-suave: #FBEDE5;
    --ld-muted: #6B7280;
    --ld-bloco: #F7F7F8;
    --ld-codigo: #F0F0F2;
    --ld-borda: #E5E7EB;
  }

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); }
  h1, h2, h3, h4 { color: var(--ld-preto); font-weight: 700; }
  h1 { border-bottom: 3px solid var(--ld-laranja); padding-bottom: 10px; font-size: 26px; letter-spacing: -0.01em; }
  h2 { margin-top: 28px; padding-left: 12px; border-left: 4px solid var(--ld-laranja); }
  h3 { margin-top: 22px; }
  p, li { line-height: 1.65; font-size: 15px; }
  a { color: var(--ld-laranja); text-decoration: none; }
  a:hover { text-decoration: underline; }
  strong { color: var(--ld-preto); }
  hr { border: 0; border-top: 2px solid rgba(225, 109, 52, 0.35); margin: 26px 0; }
  blockquote { background-color: var(--ld-bloco); border-left: 4px solid var(--ld-laranja); padding: 12px 16px; margin: 16px 0; color: var(--ld-preto); border-radius: 0 6px 6px 0; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--ld-borda); }
  pre code { border: 0; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 10px 12px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 8px 12px; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
    .no-print { display: none; }
  }
</style>

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

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Simulação de Entrevista com o Cliente - Módulo 12</i>
</div>
