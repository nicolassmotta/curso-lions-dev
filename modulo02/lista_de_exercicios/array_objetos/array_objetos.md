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

# Exercícios: Lógica, Arrays e Objetos

**Turma:** LionsDev  
**Tópicos:** Arrays (push, shift, pop, splice, includes), Objetos, Aninhamento Estático, Estruturas Condicionais e I/O de dados.

---

### 1. Lista de Presença
Para organizar um evento acadêmico, crie um array chamado `listaAlunos` que já comece com dois nomes preenchidos em formato de texto. 

Peça ao usuário para digitar o nome de um terceiro aluno que acabou de chegar. Adicione esse novo nome ao final do array. Em seguida, verifique a quantidade de alunos registrados. Caso a lista tenha exatamente 3 alunos, exiba no console: "Turma formada com sucesso! Alunos: [listaAlunos]".

### 2. Baixa no Estoque
Uma loja precisa atualizar seu estoque diário. Crie um array chamado `estoqueTamanhos` contendo três números que representam as quantidades de camisetas nos tamanhos P, M e G, respectivamente (exemplo: `[10, 15, 8]`).

Peça ao usuário para informar quantas camisetas do tamanho P (que estão na primeira posição do array) foram vendidas hoje. Subtraia esse valor da quantidade atual registrada no array. Feito isso, analise a situação: caso a nova quantidade do tamanho P seja menor que 5, exiba "Alerta: Estoque de luvas tamanho P está crítico!". Do contrário, exiba "Estoque atualizado. Quantidade restante do tamanho P: [quantidade]".

### 3. Ficha Médica Veterinária
Vamos criar a ficha de um paciente em uma clínica veterinária. Peça ao usuário para digitar o nome de um cachorro e a sua raça. Em seguida, peça para digitar a idade do animal.

Crie um objeto vazio chamado `paciente`. Adicione a esse objeto três propriedades: `nome`, `raca` e `idade`, atribuindo a elas os valores que o usuário digitou. Agora, avalie os dados da ficha: se a idade for maior OU igual a 8 anos, exiba "O paciente [nome] já é sênior e precisa de exames de rotina.". Caso não seja, exiba "Paciente na faixa de idade regular.". Por fim, exiba o objeto completo no console.

### 4. Orçamento de Projetos
Uma agência de software está montando sua fila de orçamentos. Comece criando um array vazio chamado `filaProjetos`. Peça ao usuário para digitar o nome de uma empresa cliente e o valor estimado do projeto em reais.

Crie um objeto contendo essas duas informações (`cliente` e `valorEstimado`) e insira esse objeto dentro do array `filaProjetos`. Em seguida, pergunte ao usuário: "O projeto possui prazo de entrega urgente? (sim/nao)". Se a resposta for "sim" E o valor do projeto for maior que R$ 3.000,00, acesse o objeto dentro do array e adicione uma taxa extra de 15% ao valor do projeto. Exiba no console o array final contendo o objeto atualizado.

### 5. Estação de Monitoramento
Um sensor meteorológico precisa registrar e processar variações climáticas. Crie um objeto chamado `estacao` com as propriedades `id` (ex: "Sensor-01"), `local` (ex: "Laboratório") e `temperaturas` (um array vazio).

Peça ao usuário para digitar três leituras de temperatura ao longo do dia, uma de cada vez. Adicione cada temperatura digitada ao array `temperaturas` que está dentro do objeto `estacao`. 

Após capturar os três dados, acesse o array dentro do objeto e calcule a média das três temperaturas (somando os três valores da lista manualmente e dividindo por 3). 
Regra de negócio do sistema: Caso a média calculada seja maior que 35 graus, crie dinamicamente uma nova propriedade no objeto chamada `alerta` com o valor `true` e exiba "PERIGO: Média de temperatura extrema ([media] graus) detectada no [local]!". Caso a média seja de 35 graus para baixo, crie a propriedade `alerta` com valor `false` e exiba "Temperaturas dentro da normalidade.". 
No final, imprima o objeto `estacao` inteiro para provar que todas as propriedades e o array estão corretos.

---

> **Dica:** Lembrem-se que os dados capturados pelo prompt-sync vêm como formato de Texto (String). Para fazer contas matemáticas ou analisar limites de valores em regras de negócio, é muito importante converter a entrada para número (usando `Number()`, `parseInt()` ou `parseFloat()`).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercícios dos Fundamentos da Programação - Módulo 02</i>
</div>