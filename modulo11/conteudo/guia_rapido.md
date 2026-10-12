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

# Guia rápido · Módulo 11: Frontend NoCode com FlutterFlow

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Quando usar NoCode
**Prós:** protótipo rápido, interface visual, gera código Flutter. **Limites:** lógica complexa, dependência da plataforma, plano pago para alguns recursos.

## O editor
**Widget Tree** (estrutura da tela) · **canvas** (a tela) · **Properties** (cor, tamanho, ações) · **Action Flow Editor** (o que acontece ao tocar).

## Widgets essenciais
| Widget | Para quê |
|---|---|
| `Column` / `Row` | empilhar na vertical / horizontal |
| `Stack` | sobrepor (texto sobre imagem) |
| `Container` | caixa com cor, borda, espaçamento |
| `AppBar` | barra do topo |
| `ListView` | lista rolável |
| `TextField` | campo de formulário |

## Estado
**Page State:** vale só na tela (ex.: `carregando`). **App State:** vale no app todo (ex.: o **token** do login). Atualize com a ação **Update Page State** / **Update App State**.

## Navegação
Botão → Actions → **Navigate To** → escolha a página (e passe parâmetros, como o id do baralho).

## Integrando com a API
1. **API Calls → +**: nome, método, URL (a do **Render**).
2. Headers: `Authorization: Bearer [token]` (variável).
3. Body JSON com variáveis para POST: `{"email": "<email>", "senha": "<senha>"}`.
4. **Response & Test**: rode e veja o JSON.
5. Mapeie campos com **JSON Path**: `$.token`, `$.message`, `$[:].titulo`.
6. Na tela: **Backend Query** na lista + **Generate Dynamic Children**.

## Os quatro estados de uma tela com API
| Estado | Como tratar |
|---|---|
| Carregando | **Backend Query → Loading Widget** |
| Vazio | **Show Empty List Widget** com uma mensagem |
| Erro | ação com **Action Output** → se não **Succeeded**, Snack Bar com `$.message` |
| Sucesso | a lista preenchida |

## Login no app
Botão Entrar → API Call de login → se **Succeeded**: salva `$.token` no App State e **Navigate To** a tela principal; senão, Snack Bar com a mensagem da API.

## Cuidados
- **localhost não existe no celular**: use a URL pública da API.
- A API precisa aceitar o navegador (**CORS**) para o app web funcionar.
- **401 no meio do uso**: token expirou → limpe o App State e volte ao login.
- **Clique duplo**: Page State `carregando = true` desabilita o botão até a resposta chegar.

## Publicando
| Caminho | Como |
|---|---|
| Web Publishing | publica direto pelo FlutterFlow |
| Baixar o código | `flutter pub get` e `flutter run` |
| Versão web própria | `flutter build web` → pasta `build/web` → **Static Site** no Render |

Frontend e API são **dois serviços** separados: cada um com sua URL.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 11</i>
</div>
