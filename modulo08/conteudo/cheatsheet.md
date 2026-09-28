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

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); font-size: 12px; }
  h1 { color: var(--ld-preto); font-size: 21px; font-weight: 700; border-bottom: 3px solid var(--ld-laranja); padding-bottom: 6px; margin: 0 0 6px; }
  h2 { color: var(--ld-preto); font-size: 14px; font-weight: 700; margin: 12px 0 5px; padding-left: 8px; border-left: 4px solid var(--ld-laranja); break-after: avoid; }
  p, li { font-size: 11.5px; line-height: 1.45; margin: 3px 0; }
  ul, ol { padding-left: 18px; margin: 3px 0; }
  a { color: var(--ld-laranja); text-decoration: none; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 1px 4px; border-radius: 3px; border: 1px solid var(--ld-borda); font-size: 10.5px; }
  pre { background-color: var(--ld-bloco) !important; border: 1px solid var(--ld-borda); border-left: 3px solid var(--ld-laranja); border-radius: 4px; padding: 6px 8px; margin: 5px 0; break-inside: avoid; white-space: pre-wrap; }
  pre code { border: 0; padding: 0; background: none !important; font-size: 10px; line-height: 1.35; font-weight: 500; }
  table { border-collapse: collapse; width: 100%; margin: 5px 0; font-size: 10.5px; break-inside: avoid; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 4px 6px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 3px 6px; vertical-align: top; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }
  blockquote { background-color: var(--ld-laranja-suave); border-left: 4px solid var(--ld-laranja); padding: 5px 10px; margin: 6px 0; border-radius: 0 4px 4px 0; color: var(--ld-preto); }
  blockquote p { margin: 0; }
  .cols { }
  .intro { color: var(--ld-muted); font-size: 11px; margin: 0 0 8px; }
  .rodape { text-align: center; color: var(--ld-muted); font-size: 11px; margin-top: 18px; }
</style>

# Cheat sheet · Módulo 08: Banco de Dados com MongoDB e Mongoose

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Conceitos
| Relacional (SQL) | MongoDB |
|---|---|
| tabela | coleção |
| linha | documento (JSON) |
| colunas fixas | campos flexíveis |

**Embedding** (documento dentro do outro): dados que sempre andam juntos. **Referência** (guarda o `_id`): dados que crescem ou são usados sozinhos, como Flashcard → Baralho.

## Atlas e .env
1. Crie o cluster (plano free), o **usuário do banco** e libere o IP em **Network Access**.
2. Copie a connection string e coloque no `.env`:
```bash
MONGO_URI=mongodb+srv://usuario:senha@cluster0.xxxx.mongodb.net/flashcards
```
3. `.env` no `.gitignore`; um `.env.example` sem valores vai para o Git.

## Conexão
```js
import mongoose from "mongoose"

async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Conectado ao MongoDB")
  } catch (error) {
    console.error("Erro ao conectar:", error.message)
    process.exit(1)
  }
}
export default conectarBanco
```

## Schema e model
```js
const FlashcardSchema = new mongoose.Schema({
  pergunta: { type: String, required: [true, "A pergunta é obrigatória."], trim: true },
  resposta: { type: String, required: true },
  baralho: { type: mongoose.Schema.Types.ObjectId, ref: "Baralho", required: true },
}, { timestamps: true })          // createdAt e updatedAt

export default mongoose.model("Flashcard", FlashcardSchema)
```

## Operações (todas com await)
```js
await Flashcard.create(dados)
await Flashcard.find()                       // todos
await Flashcard.find({ baralho: id })        // com filtro
await Flashcard.findById(id)                 // um (ou null)
await Flashcard.findById(id).populate("baralho")
await Flashcard.findByIdAndUpdate(id, dados, { new: true, runValidators: true })
await Flashcard.findByIdAndDelete(id)
```

## Rota com banco
```js
app.get("/flashcards/:id", async (req, res) => {
  try {
    const card = await Flashcard.findById(req.params.id)
    if (!card) return res.status(404).json({ message: "Não encontrado." })
    return res.json(card)
  } catch (error) {
    return res.status(400).json({ message: "ID inválido." }) // CastError
  }
})
```

## Atualização parcial
- `findByIdAndUpdate` usa `$set` implícito: só os campos enviados mudam.
- **Nunca** passe o `req.body` inteiro: monte uma lista de campos permitidos.
- `$unset` remove o campo do documento; gravar `null` mantém o campo, vazio.

## Soft delete
```js
// excluir = marcar a data
await Flashcard.findByIdAndUpdate(id, { excluidoEm: new Date() })
// listar só os ativos
await Flashcard.find({ excluidoEm: null })
// buscar um ativo (o findById não sabe do soft delete!)
await Flashcard.findOne({ _id: id, excluidoEm: null })
// restaurar
await Flashcard.findByIdAndUpdate(id, { excluidoEm: null })
```
> LGPD: se a pessoa pedir a exclusão dos dados pessoais, o soft delete não basta.

## Armadilhas
- Sem `await`: vem uma consulta pendente, não os dados.
- `.env` não carregado → *MONGO_URI não configurada* / `undefined`.
- Timeout na conexão: IP não liberado no Atlas.
- Senha com `@` ou `#` na URI: codifique (`encodeURIComponent`).
- `ValidationError` (campo obrigatório) e `CastError` (id malformado) → responda 400.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Cheat sheet · Módulo 08</i>
</div>
