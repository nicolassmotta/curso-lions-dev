# Módulo 08: Lista de Exercícios

Persistência com MongoDB via Mongoose: schemas, models e as operações de banco com `async/await`.

## Lista de código

Comece por aqui. A lista tem exercícios de fixação, código para completar, bugs para corrigir, uma previsão de comportamento e um desafio no final.

| Lista | Foco | Arquivo |
| ----- | ---- | ------- |
| MongoDB com Mongoose | `Schema`, `model`, `create`/`find`/`findById...` | [codigo_mongoose.md](codigo_mongoose.md) |

## Listas aplicadas

Projetos descritos em texto, em que o aluno interpreta o enunciado e escreve o código do zero. A API Biblioteca Lions e a API Imóvel Lions têm mais de um model. A API Feira Online é a mais avançada: separa as rotas com `express.Router()` e relaciona os models com `ObjectId`, `ref` e `populate`.

| Lista | Foco | Arquivo |
| ----- | ---- | ------- |
| API Academia Lions | API conectada ao banco | [academia_lions/api_academia_lions.md](academia_lions/api_academia_lions.md) |
| API Biblioteca Lions | API conectada ao banco | [biblioteca_lions/api_biblioteca_lions.md](biblioteca_lions/api_biblioteca_lions.md) |
| API Cantina Lions | API conectada ao banco | [cantina_lions/api_cantina_lions.md](cantina_lions/api_cantina_lions.md) |
| API Feira Online | Router, `ObjectId` + `ref`, `populate` | [feira_online/api_feira_online.md](feira_online/api_feira_online.md) |
| API Imóvel Lions | API conectada ao banco | [imovel_lions/api_imovel_lions.md](imovel_lions/api_imovel_lions.md) |
| API Petshop | API conectada ao banco | [petshop/api_petshop.md](petshop/api_petshop.md) |

As soluções de referência das listas aplicadas estão em `../exercicios_resolvidos/`, em uma pasta com o nome do projeto (por exemplo, `cantina_lions/`). A resposta da lista de código está em `../exercicios_resolvidos/codigo_mongoose.md`.

## Ordem sugerida

1. Resolva a lista de código para praticar schemas e consultas.
2. Depois, escolha uma das APIs aplicadas e conecte-a ao MongoDB. Comece por Academia, Cantina ou Petshop antes de Biblioteca e Imóvel. Deixe a Feira Online por último.
