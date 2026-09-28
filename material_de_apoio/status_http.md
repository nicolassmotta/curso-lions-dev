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

# Tabela de Status HTTP

**Turma:** LionsDev  
**Use a partir do:** Módulo 07.

> O status é a primeira coisa que o cliente lê na resposta. Ele diz **o que aconteceu** antes mesmo de alguém abrir o corpo. Os exemplos abaixo vêm das APIs do curso.

---

## 1. Os códigos que usamos no curso

| Status | Nome | Quando usar | Exemplo no curso |
| ------ | ---- | ----------- | ---------------- |
| `200` | OK | deu certo e há algo para devolver | listar produtos, buscar por id, atualizar, remover com mensagem |
| `201` | Created | um recurso **novo** foi criado | `POST /pedidos` criou o pedido |
| `400` | Bad Request | o cliente mandou algo errado | campo obrigatório faltando, `enum` inválido, valor negativo, id em formato inválido |
| `401` | Unauthorized | **não sei quem é você** | sem token, token inválido ou expirado |
| `403` | Forbidden | **sei quem é você, mas você não pode** | usuário comum chamando rota de admin na Lions Bet |
| `404` | Not Found | o recurso não existe (ou não é seu) | `GET /produtos/:id` com um id que não existe |
| `409` | Conflict | o pedido é válido, mas conflita com o que já existe | email já cadastrado; remover barraca que ainda tem produtos |
| `500` | Internal Server Error | erro **do servidor**, não do cliente | um bug no código, o banco fora do ar |

Todo status começa com um dígito que indica a família: **2xx** deu certo, **4xx** o erro é de quem pediu, **5xx** o erro é do servidor.

---

## 2. Como escolher o status

Siga as perguntas na ordem. A primeira resposta "sim" define o status:

1. O cliente está autenticado, se a rota exige login? **Não** → `401`.
2. Ele tem permissão para esta ação? **Não** → `403`.
3. Os dados enviados estão completos e válidos? **Não** → `400`.
4. O recurso pedido existe (e pertence a ele)? **Não** → `404`.
5. A ação conflita com o estado atual (duplicado, dependência)? **Sim** → `409`.
6. Criou algo novo? **Sim** → `201`. Senão → `200`.

Se o código quebrou por um motivo que o cliente não causou, o middleware de erro responde `500`.

---

## 3. As dúvidas mais comuns

**`401` ou `403`?** O `401` é sobre **identidade**: sem token, a API não sabe quem está pedindo. O `403` é sobre **permissão**: a API sabe quem é, e essa pessoa não pode fazer aquilo. Trocar um pelo outro confunde o frontend, que costuma mandar o usuário para a tela de login ao receber `401`.

**Recurso de outro usuário: `403` ou `404`?** No curso, usamos `404`. Filtrando pelo dono na consulta (`{ _id, usuario }`), um recurso de outra pessoa simplesmente "não existe" para quem pediu. Assim a API não confirma que aquele id existe.

**Lista vazia é `404`?** Não. Uma listagem sem resultados responde `200` com array vazio (`[]`). O `404` é para quando se pede **um** recurso específico que não existe.

**Id em formato inválido: `400` ou `404`?** `400`. Um id como `abc` não é um id válido do MongoDB, então o erro está no pedido. Um id no formato certo que não existe no banco é `404`.

**Por que não responder tudo com `200` e uma mensagem?** Porque o frontend, o Postman e os testes automáticos decidem o que fazer pelo status. Um erro com `200` parece sucesso para quem não lê o corpo.

---

## 4. No código

```js
// criou: 201
return res.status(201).json(produto);

// deu certo: 200
return res.status(200).json({ produtos });

// erro do cliente: return para a rota parar aqui
if (!nome) {
  return res.status(400).json({ message: "O campo nome é obrigatório." });
}

if (!produto) {
  return res.status(404).json({ message: "Produto não encontrado." });
}
```

Com o boilerplate (Módulo 09), o service lança o erro com o status, e o middleware de erro responde:

```js
throw criarErro("Produto não encontrado.", 404);
```

> Sem o `return` antes de uma resposta de erro, a função continua e tenta responder de novo, gerando `Cannot set headers after they are sent to the client`.

---

## 5. Outros códigos que você vai encontrar

| Status | Nome | Onde aparece |
| ------ | ---- | ------------ |
| `204` | No Content | deu certo e não há corpo na resposta (alguns `DELETE`) |
| `301` / `302` | Redirect | o endereço mudou; o navegador segue sozinho |
| `422` | Unprocessable Content | algumas APIs usam para erro de validação no lugar do `400` |
| `429` | Too Many Requests | a API limitou o número de chamadas |
| `502` / `503` | Bad Gateway / Service Unavailable | o servidor está fora do ar ou subindo (comum no primeiro acesso a uma API gratuita no Render, que "dorme" sem uso) |

Para testar cada status no Postman, veja o [Guia de Testes de API](testando_apis.md).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Material de Apoio: Tabela de Status HTTP</i>
</div>
