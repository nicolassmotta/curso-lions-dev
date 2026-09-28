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

# Gabarito: Objetos

**Lista:** `modulo02/lista_de_exercicios/objetos/codigo_objetos.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
// 1
const pessoa = { nome: "Ana", idade: 20 };
console.log(pessoa);

// 2
console.log(pessoa.nome);

// 3
pessoa.idade = 21;
console.log(pessoa.idade);

// 4
pessoa.cidade = "Ponta Grossa";
console.log(pessoa);

// 5
console.log(`${pessoa.nome} tem ${pessoa.idade} anos`);

// 6
const produto = { nome: "Mouse", preco: 80 };
console.log(`Produto: ${produto.nome} custa R$ ${produto.preco}`);

// 7
const carro = { modelo: "Uno", motor: { combustivel: "flex" } };
console.log(carro.motor.combustivel);

// 8
const aluno = { nome: "Pedro", notas: [8, 6, 10] };
console.log(aluno.notas[0]);

// 9
const time = { nome: "Alpha", pontos: 0 };
time.pontos = time.pontos + 3;
console.log(time.pontos); // 3

// 10
console.log(pessoa.telefone); // undefined
```

> No item 9, o objeto é `const`, mas suas propriedades podem ser alteradas. O que o `const` impede é reatribuir a variável inteira (`time = { ... }`).

---

## Parte 1

**1.** `console.log(contato.nome, "trabalha na", contato.empresa);`

**2.**

```js
const usuario = { nome: "João", nivel: 1 };

usuario.nivel = 2;
usuario.premium = true;

console.log(usuario); // { nome: 'João', nivel: 2, premium: true }
```

**3.**

```js
console.log(carro.motor.combustivel); // flex
console.log(carro.opcionais[1]);      // trava
```

---

## Parte 2

**4. Propriedade errada.** O objeto não tem a propriedade `valor`; o nome certo é `preco`. Correção: `produto.preco`.

**5. Maiúscula faz diferença.** Nomes de propriedade diferenciam maiúsculas de minúsculas: `Cidade` e `cidade` são propriedades diferentes, e `Cidade` não existe. Correção: `pessoa.cidade`.

---

## Parte 3

| Linha | Saída |
| ----- | ----- |
| (a) | `Kaio` |
| (b) | `150` |
| (c) | `Alpha` |
| (d) | `true` |

---

## Parte 4

**7. Boletim em Objeto**

```js
const aluno = { nome: "Pedro", nota1: 8, nota2: 6 };
const media = (aluno.nota1 + aluno.nota2) / 2;

console.log(`Aluno: ${aluno.nome} | Média: ${media}`); // Aluno: Pedro | Média: 7
```

**8. Catálogo de Produtos**

```js
const produtos = [
  { nome: "Teclado", preco: 150, estoque: 5 },
  { nome: "Mouse", preco: 80, estoque: 10 },
  { nome: "Monitor", preco: 900, estoque: 2 },
  { nome: "Headset", preco: 200, estoque: 3 },
];

let valorTotal = 0;

for (let i = 0; i < produtos.length; i++) {
  const p = produtos[i];
  console.log(`${p.nome}: R$ ${p.preco} (${p.estoque} un.)`);
  valorTotal += p.preco * p.estoque;
}

console.log(`Valor total em estoque: R$ ${valorTotal}`); // R$ 3950
```

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Objetos - Módulo 02</i>
</div>
