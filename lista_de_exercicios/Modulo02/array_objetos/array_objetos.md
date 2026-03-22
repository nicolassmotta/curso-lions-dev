<style>
  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #000000; }
  h1 { color: #001A33; border-bottom: 2px solid #001A33; padding-bottom: 8px; font-size: 24px; }
  h2, h3 { color: #002B5E; margin-top: 24px; }
  p, li { line-height: 1.6; font-size: 15px; }
  blockquote { background-color: #f4f6f7; border-left: 4px solid #002B5E; padding: 12px 15px; margin: 15px 0; color: #000000; }
  code { background-color: #f0f2f5 !important; color: #000000 !important; font-weight: bold; padding: 2px 4px; border-radius: 4px; }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
  }
</style>

# Exercícios com Lógica, Arrays e Objetos

**Turma:** Lions Startups/LionsDev  
**Tópicos:** Arrays, Objetos, Estruturas Condicionais, Variáveis e Entrada/Saída de dados (prompt-sync).

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

Após capturar os três dados, acesse o array dentro do objeto e calcule a média das três temperaturas (somando os três valores e dividindo por 3). 
Regra de negócio do sistema: Caso a média calculada seja maior que 35 graus, crie dinamicamente uma nova propriedade no objeto chamada `alerta` com o valor `true` e exiba "PERIGO: Média de temperatura extrema ([media] graus) detectada no [local]!". Caso a média seja de 35 graus para baixo, crie a propriedade `alerta` com valor `false` e exiba "Temperaturas dentro da normalidade.". 
No final, imprima o objeto `estacao` inteiro para provar que todas as propriedades e o array estão corretos.

---

> **Dica:** Lembrem-se que os dados capturados pelo prompt-sync vêm como formato de Texto (String). Para fazer contas matemáticas ou analisar limites de valores em regras de negócio, é muito importante converter a entrada para número (usando `Number()`, `parseInt()` ou `parseFloat()`).

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>Lions Startups/LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercícios dos Fundamentos da Programação - Módulo 02</i>
</div>