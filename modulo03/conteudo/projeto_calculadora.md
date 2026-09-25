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

# Projeto Calculadora — Módulo 03

**Turma:** LionsDev  
**Tópicos:** Estruturas de Controle, Loops, Funções, Validação de Entrada, Menu Interativo, Acumulador de Resultado.

---

### 1. Visão Geral

Neste módulo você constrói o primeiro projeto com lógica de verdade do curso: uma calculadora de terminal em Node.js.

Objetivo de aula: ensinar, na prática, estruturas de controle de fluxo (`if`/`switch`), loops (`while`), funções e validação de entrada de dados, usando a calculadora como caso de uso.

O programa deve:

- Oferecer um menu de operações matemáticas;
- Ler números do usuário com `prompt`;
- Validar entradas inválidas (ex.: texto onde se espera número);
- Manter um resultado acumulado entre operações;
- Permitir encerrar o programa de forma explícita.

### 2. Por Que Definir Requisitos Antes de Codar?

Sem requisitos, "fazer uma calculadora" é tão vago quanto dizer **"vamos construir um carro"**: não sabemos se é popular, esportivo, elétrico, quantas portas, orçamento, etc.

Requisitos reduzem retrabalho: você sabe quando terminou e o que testar.

### 3. Escopo — Qual Calculadora Vamos Criar?

Para este projeto, o escopo inclui:

- Adição
- Subtração
- Multiplicação
- Divisão
- Porcentagem (em relação ao valor acumulado)
- Exibir o resultado atual ("Ver Resultado")
- Sair do programa

O que fica **fora do escopo** (a menos que você decida estender):

- Operações científicas (seno, log, potência com expoente variável);
- Histórico de todas as operações em arquivo;
- Interface gráfica (GUI).

### 4. Fluxo de Execução

1. Inicializar acumuladores (ex.: resultado em zero).
2. Repetir até o usuário pedir para sair:
   - Mostrar menu de operações no terminal.
   - Ler a opção escolhida (`prompt`).
   - Conforme a opção: pedir número(s), validar, chamar a função da operação e atualizar o acumulado; ou mostrar o resultado; ou encerrar.
   - Voltar ao menu (continua o loop).
3. Mensagem de encerramento.

```
    +------------------+
    |     INÍCIO       |
    +--------+---------+
             |
             v
    +------------------+
    | resultado := 0   |
    +--------+---------+
             |
             v
        +----+----+     op == sair?
        |  Menu   |<----------------+
        +----+----+                 |
             |                      |
             v                      |
        +----+----+                 |
        | Lê opção|                 |
        +----+----+                 |
             |                      |
             v                      |
        +----+----+   não           |
        | switch  +-----------------+
        +----+----+
             |
             v
    +------------------+     inválido
    | Prompt número    +--------+
    +--------+---------+        |
             | válido           |
             v                  v
    +------------------+   +---------+
    | Atualiza resultado|  |  Aviso  |
    +--------+---------+   +----+----+
             |                  |
             +--------+---------+
                      |
                      v
                 (volta ao Menu)
```

- **Interatividade:** a cada volta do loop o usuário vê o menu e decide.
- **Menu:** centraliza as escolhas numéricas (1..7) mapeadas no `switch`.
- **Múltiplas operações:** o `while` mantém o programa vivo; o acumulador guarda o estado entre uma operação e outra.
- **Persistência do resultado:** neste projeto é "em memória" apenas (variável que sobrevive enquanto o processo Node está rodando).

### 5. Validação de Entrada

- **Robustez:** evita `NaN` silencioso ou comportamento estranho em cálculos.
- **Experiência do usuário:** mensagens claras ("digite um número") em vez de travar.
- **Manutenção:** quando algo dá errado, fica mais fácil saber se foi a entrada.

Na prática do `prompt`, tudo chega como string; por isso o padrão do projeto é converter para número e depois validar:

```javascript
num = Number(prompt("..."));
if (isNaN(num)) {
  console.log("Da próxima vez digite um número correto!");
} else {
  // ... chama função matemática ...
}
```

### 6. Escopo Mínimo Obrigatório

Critérios para considerar o projeto completo:

- O programa exibe um menu numérico e aceita apenas opções válidas ou informa erro para opção inválida.
- Para cada operação que pede número, se o usuário digitar algo que não converte para número útil, o sistema avisa e não corrompe o estado.
- O laço principal só termina quando o usuário escolhe sair.
- Existe forma de ver o resultado acumulado sem precisar aplicar outra operação.
- Divisão trata divisão por zero com mensagem clara.
- Cada operação matemática está isolada em sua própria função (`somar`, `subtrair`, `multiplicar`, `dividir`, `porcentagem`).
- O resultado fica acumulado entre operações, sem resetar a cada chamada.

### 7. Indo Além (Opcional)

O escopo mínimo da seção 6 é obrigatório e precisa funcionar antes de qualquer extra. A partir daí, quem quiser pode acrescentar operações novas ao menu, seguindo o mesmo padrão do projeto: função isolada, validação de entrada, caso tratado no `switch`.

Exemplos de operações extras:

- **Teorema de Pitágoras:** hipotenusa a partir de dois catetos (`Math.sqrt(a**2 + b**2)`).
- **Potenciação e raiz quadrada:** `Math.pow`, `Math.sqrt`.
- **Limite de uma função:** aproximação numérica, avaliando a função com `x` cada vez mais próximo do ponto desejado.
- **Derivada de uma função:** aproximação por diferença finita (`(f(x + h) - f(x)) / h`, com `h` bem pequeno).
- Outras ideias por conta do aluno: média, fatorial, conversão de unidades, etc.

Essas extensões são opcionais e não substituem o escopo mínimo obrigatório.

---

> **Próximo passo no curso (código modular):**  
> `modulo05/conteudo/modulos.js` → `modulo05/exercicios_slides/calculadora/` (cada operação em arquivo separado)

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Projeto Calculadora — Módulo 03</i>
</div>
