<style>
  :root {
    --lionsdev-titulo: #001A33;
    --lionsdev-texto: #000000;
    --lionsdev-muted: #6B7280;
    --lionsdev-bloco: #F4F6F7;
    --lionsdev-codigo: #F0F2F5;
  }

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--lionsdev-texto); }
  h1, h2, h3 { color: var(--lionsdev-titulo); }
  h1 { border-bottom: 2px solid var(--lionsdev-titulo); padding-bottom: 8px; font-size: 24px; }
  h2, h3 { margin-top: 24px; }
  p, li { line-height: 1.6; font-size: 15px; }
  hr { border: 0; border-top: 2px solid var(--lionsdev-titulo); margin: 24px 0; }
  blockquote { background-color: var(--lionsdev-bloco); border-left: 4px solid var(--lionsdev-titulo); padding: 12px 15px; margin: 15px 0; color: var(--lionsdev-texto); }
  code { background-color: var(--lionsdev-codigo) !important; color: var(--lionsdev-texto) !important; font-weight: bold; padding: 2px 4px; border-radius: 4px; }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
    .no-print { display: none; }
  }
</style>

# Lista de Revisão — Preparação para a Avaliação

**Turma:** LionsDev
**Tópicos:** Arrays, Strings, Estruturas de Repetição, Condicionais, Acumuladores, Contadores e Lógica de Programação.

---

> **Objetivo:** Esta lista serve como preparação para a avaliação. Os exercícios abordam conceitos e raciocínios semelhantes aos que serão cobrados na prova, mas com enunciados diferentes. Resolva todos com atenção e teste seu código antes de seguir em frente.

---

### 1. Somatório de Carrinho de Compras
Dada uma lista com 5 valores representando preços de produtos em um carrinho de compras, percorra todos os elementos, calcule a soma total e, ao final, exiba o valor médio gasto por produto.

---

### 2. Filtro de Números Ímpares
Dada uma lista de números inteiros, percorra todos os elementos e conte quantos deles são **ímpares**. Exiba a quantidade encontrada.

---

### 3. Descobrir o Menor Valor
Dada uma lista de números inteiros, percorra todos os elementos e identifique qual é o **menor** valor presente na lista. Exiba esse valor.

---

### 4. Contar Consoantes
Dada uma string, percorra cada caractere e verifique se ele é uma **consoante** (ou seja, uma letra do alfabeto que **não** é vogal). Considere apenas letras (`a-z`). Retorne a quantidade total de consoantes encontradas.

> **Dicas para manipulação de texto:**
> - Uma string pode ser percorrida como um array: use `for (let i = 0; i < texto.length; i++)` e acesse cada caractere com `texto[i]`.
> - Use `.toLowerCase()` para converter a string para minúsculas antes de comparar, assim você não precisa verificar maiúsculas e minúsculas separadamente.
> - Crie uma string ou array com todas as vogais (`"aeiou"`) e use `.includes()` para verificar se o caractere atual **não** está nessa lista: `if (!vogais.includes(texto[i]))`.
> - Lembre-se de ignorar espaços e caracteres especiais — verifique se o caractere é uma letra antes de contar.

---

### 5. Remover Espaços de uma Frase
Dada uma frase, percorra seus caracteres e construa uma nova string contendo apenas os caracteres que **não** são espaços em branco. Exiba a nova string resultante.

> **Dicas para manipulação de texto:**
> - Comece criando uma variável vazia: `let resultado = ""`.
> - Percorra a frase caractere por caractere usando um `for` com `frase[i]`.
> - Dentro do laço, verifique se o caractere atual é diferente de espaço: `if (frase[i] !== " ")`.
> - Se não for espaço, concatene ao resultado: `resultado += frase[i]` (o operador `+=` junta o caractere ao final da string).

---

### 6. Soma dos Números Ímpares
Dada uma lista de números inteiros, percorra todos os elementos e some **apenas** aqueles que são ímpares. Exiba o resultado da soma.

---

### 7. Elementos Únicos de uma Lista
Dada uma lista de números inteiros que pode conter valores repetidos, crie uma nova lista contendo apenas os valores que aparecem **uma única vez** (sem repetição). Exiba a lista resultante.

---

### 8. Frequência de Palavras
Dada uma frase, separe-a em palavras e conte quantas vezes cada palavra aparece. Exiba um relatório com cada palavra e sua respectiva frequência.

> **Dicas para manipulação de texto:**
> - O método `.split(" ")` divide uma string em um array usando o espaço como separador. Exemplo: `"oi mundo oi".split(" ")` retorna `["oi", "mundo", "oi"]`.
> - Depois de ter o array de palavras, a lógica é a mesma de contar frequência de números — use um objeto para armazenar as contagens.
> - Para cada palavra do array, verifique se ela já existe como chave no objeto. Se existir, incremente; se não, crie com valor `1`.

---

### 9. Verificar Anagrama
Dadas duas palavras, verifique se uma é **anagrama** da outra — ou seja, se ambas possuem exatamente as mesmas letras, na mesma quantidade, porém em ordem diferente. Exiba se são ou não anagramas.

> **Dicas para manipulação de texto:**
> - Use `.toLowerCase()` nas duas palavras para garantir que a comparação ignore maiúsculas/minúsculas.
> - Uma estratégia: transforme cada palavra em um array de letras com `.split("")`, ordene com `.sort()` e junte de volta com `.join("")`. Se os resultados forem iguais, são anagramas.
> - Exemplo passo a passo: `"Roma".toLowerCase().split("")` → `["r","o","m","a"]` → `.sort()` → `["a","m","o","r"]` → `.join("")` → `"amor"`.

---

### 10. Amplitude de uma Lista
Dada uma lista de números inteiros, calcule a **amplitude** — ou seja, a diferença entre o **maior** e o **segundo menor** valor da lista. Exiba o resultado.

> **Atenção:** Note que aqui não é a diferença entre o maior e o menor, e sim entre o maior e o **segundo menor**. Pense em como encontrar esse valor.

---

### Exercícios Extras (Opcional)

### 11. Capitalizar Primeira Letra
Dada uma frase em letras minúsculas, percorra cada palavra e transforme a primeira letra de cada uma em **maiúscula**. Exiba a frase formatada.

> **Dicas para manipulação de texto:**
> - Use `.split(" ")` para separar a frase em um array de palavras.
> - Para cada palavra, pegue a primeira letra com `palavra[0]` e use `.toUpperCase()` para transformá-la em maiúscula.
> - O método `.slice(1)` retorna todos os caracteres da string **a partir da posição 1** (ou seja, tudo menos a primeira letra).
> - Junte as partes: `palavra[0].toUpperCase() + palavra.slice(1)` transforma `"casa"` em `"Casa"`.
> - Ao final, use `.join(" ")` para juntar o array de palavras de volta em uma frase.

---

### 12. Segundo Maior Valor
Dada uma lista de números inteiros, encontre o **segundo maior** valor presente. O segundo maior deve ser diferente do maior (por exemplo, na lista `[5, 5, 3, 1]`, o segundo maior é `3`).

---

> **Dica geral:** Lembrem-se que os dados capturados pelo `prompt-sync` vêm como formato de Texto (String). Para fazer contas matemáticas como adição ou validações de limite, é muito importante converter a entrada para número (usando `Number()`, `parseInt()` ou `parseFloat()`).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Revisão — Preparação para a Avaliação</i>
</div>
