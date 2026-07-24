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

# Lista de Código: Objetos

**Turma:** LionsDev  
**Tópicos:** criação de objetos `{ }`, acesso por ponto, alterar e adicionar propriedades, objetos aninhados, array de objetos e percorrer com laço.

> Nesta lista você escreve o código. Cada item mostra o que preencher e a saída certa. Rode no Node e compare.

---

## Parte 0 — Treino rápido (aquecimento)

Rápidos, só pra fixar o acesso e a alteração de propriedades.

1. Crie um objeto `pessoa` com `nome` e `idade` e imprima o objeto inteiro.
2. Imprima só o nome da pessoa (**acesso por ponto**).
3. **Altere** a `idade` da pessoa e imprima o novo valor.
4. **Adicione** a propriedade `cidade` na pessoa e imprima o objeto.
5. Imprima a frase **"NOME tem IDADE anos"** usando as propriedades e template string.
6. Crie um objeto `produto` com `nome` e `preco` e imprima **"Produto: X custa R$ Y"**.
7. Crie um objeto `carro` com uma propriedade `motor` que é **outro objeto** (`{ combustivel: "flex" }`) e imprima o combustível.
8. Crie um objeto `aluno` com a propriedade `notas` sendo um **array** `[8, 6, 10]` e imprima a primeira nota.
9. Crie `const time = { nome: "Alpha", pontos: 0 }` e **some** 3 aos pontos.
10. Tente acessar uma propriedade que **não existe** e observe que imprime `undefined`.

---

## Parte 1 — Complete o código

### 1. Cartão de Visita
Crie o objeto e complete os acessos.

```js
const contato = {
  nome: "Marina",
  empresa: "LionsDev",
  telefone: "42 99999-0000",
};

// TODO: imprima o nome e a empresa acessando as propriedades
console.log(/* ? */, "trabalha na", /* ? */);
// Saída esperada: Marina trabalha na LionsDev
```

### 2. Atualizando o Perfil
Complete as operações de alterar e adicionar propriedade.

```js
const usuario = { nome: "João", nivel: 1 };

// TODO: mude o nivel para 2
// TODO: adicione a propriedade 'premium' com valor true

console.log(usuario);
// Saída esperada: { nome: 'João', nivel: 2, premium: true }
```

### 3. Objeto Aninhado
Acesse os dados dentro do objeto e do array internos.

```js
const carro = {
  modelo: "Uno",
  motor: { combustivel: "flex", potencia: 85 },
  opcionais: ["ar", "trava", "vidro"],
};

// TODO: imprima o combustível do motor
// TODO: imprima o segundo opcional
console.log(/* ? */); // flex
console.log(/* ? */); // trava
```

---

## Parte 2 — Ache o bug

### 4. Propriedade errada
Deveria imprimir o preço, mas aparece `undefined`. Encontre o erro.

```js
const produto = { nome: "Teclado", preco: 150 };

console.log("Preço:", produto.valor);  // BUG
// Esperado: Preço: 150
```

### 5. Ponto vs colchetes
Este código quebra. Explique por que e conserte para imprimir a cidade.

```js
const pessoa = { nome: "Ana", cidade: "Ponta Grossa" };

console.log(pessoa.nome);
console.log(pessoa.Cidade);  // BUG: repare na letra
```

---

## Parte 3 — Prever a saída

### 6. O que sai no console?
Sem rodar, escreva a saída de cada linha.

```js
const jogador = { nome: "Kaio", pontos: 100, ativo: true };

jogador.pontos = jogador.pontos + 50;
jogador.time = "Alpha";

console.log(jogador.nome);   // (a)
console.log(jogador.pontos); // (b)
console.log(jogador.time);   // (c)
console.log(jogador.ativo);  // (d)
```

---

## Parte 4 — Escreva do zero

### 7. Boletim em Objeto
Crie um objeto `aluno` com `nome`, `nota1` e `nota2`. Calcule a média das duas notas e imprima:

```
Exemplo: nota1 = 8, nota2 = 6
  -> Aluno: Pedro | Média: 7
```

### 8. Catálogo de Produtos (Desafio)
Crie um array de objetos `produtos`, cada um com `nome`, `preco` e `estoque` (pelo menos 4 produtos). Depois, percorrendo o array com um laço:
- imprima cada produto no formato `Teclado — R$ 150 (5 un.)`;
- calcule e mostre o valor total do estoque (soma de `preco * estoque` de todos).

```
Exemplo de saída:
  Teclado — R$ 150 (5 un.)
  Mouse — R$ 80 (10 un.)
  ...
  Valor total em estoque: R$ 1550
```

---

> **Dica:** propriedade de objeto diferencia maiúscula de minúscula, então `pessoa.cidade` e `pessoa.Cidade` são coisas diferentes. Acessar uma que não existe retorna `undefined` (não dá erro), então confira sempre a grafia exata do nome.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Objetos - Módulo 02</i>
</div>
