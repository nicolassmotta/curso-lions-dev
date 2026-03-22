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

# Exercícios com a Lógica Inicial

**Turma:** Lions Startups/LionsDev
**Tópicos:** Variáveis, Tipos de Dados, Operações Matemáticas, Estruturas Condicionais (if/else) e Entrada/Saída de dados (prompt-sync).

---

### 1. Margem de Lucro
Uma fábrica produz componentes eletrônicos. Peça ao usuário para digitar o **custo de produção** de um lote e o **valor de venda** desse mesmo lote.
Calcule o lucro bruto (venda - custo). Se o lucro for menor que R$ 500,00, exiba no console a mensagem **"Atenção: Margem de lucro perigosamente baixa"**. Caso contrário, exiba **"Margem de lucro saudável: R$ [valor do lucro]"**.

### 2. Orçamento de Projetos
Uma empresa júnior de desenvolvimento de software cobra por hora de trabalho. Peça para o cliente digitar a **quantidade de horas estimadas** para um novo sistema web e pergunte: "O cliente é uma ONG? (sim/nao)".
Considere que o valor da hora é R$ 45,00. Calcule o valor total do projeto. Se o projeto custar mais de R$ 5.000,00 E o cliente for uma ONG, aplique um desconto comercial de 10% e exiba o valor final. Caso contrário, exiba o valor sem desconto.

### 3. Rendimento de Fundos Imobiliários
Crie um simulador de investimentos. Peça ao usuário para digitar a **quantidade de cotas** que ele possui de um fundo imobiliário e o **valor do dividendo (rendimento)** pago por cada cota neste mês.
Calcule o rendimento total. Se o valor recebido for maior ou igual a R$ 100,00, exiba **"Você já tem saldo suficiente para comprar uma nova cota e reinvestir!"**. Caso contrário, exiba **"Rendimento recebido: R$ [valor]. Acumule mais para reinvestir."**.

### 4. Consumo de Automóvel
Uma empresa precisa monitorar o consumo dos seus veículos com motor 170 TSI. Peça ao motorista para digitar a **distância percorrida (em km)** e a **quantidade de combustível consumido (em litros)**.
Calcule a média de consumo (km/l). Se a média for inferior a 10 km/l, exiba **"Alerta: Veículo consumindo muito combustível. Necessário agendar revisão mecânica."**. Se for 10 km/l ou mais, exiba **"Consumo dentro do padrão operacional."**.

### 5. Análise de Risco de Crédito Bancário
Para aprovar um empréstimo, a parcela não pode comprometer mais do que 30% da renda do cliente. Peça ao usuário para digitar o seu **salário líquido**, o **valor da parcela** do empréstimo desejado e pergunte: "O cliente possui restrição no nome? (sim/nao)".
Calcule o limite de 30% do salário. Use `if/else` com operadores lógicos para verificar: se a parcela for menor ou igual ao limite de 30% E NÃO houver restrição no nome, exiba **"Crédito Aprovado!"**. Caso a parcela ultrapasse o limite OU o cliente tenha restrição, exiba **"Crédito Negado: Parcela acima do limite ou restrição no CPF"**.

### 6. Gestão de Ponto e Horas Extras
Desenvolva um sistema simples de RH. Peça ao usuário para informar o seu **valor ganho por hora normal** e a **quantidade de horas extras** trabalhadas no mês.
A regra da CLT diz que a hora extra vale 50% a mais que a hora normal (ou seja, hora normal * 1.5). Calcule o valor total a receber apenas pelas horas extras e exiba na tela: **"O valor a receber de horas extras este mês é: R$ [valor]"**.

### 7. Alerta de Reposição de Estoque
Um e-commerce precisa controlar seu inventário. Peça ao gerente para digitar a **quantidade atual** de um produto no estoque e a **quantidade mínima** de segurança.
Se a quantidade atual for menor que a quantidade mínima, calcule a diferença e exiba **"Alerta: Estoque baixo! É necessário solicitar a compra de [quantidade] unidades"**. Se estiver tudo certo, exiba **"Estoque regularizado."**.

### 8. Cálculo de Frete Logístico
Uma transportadora calcula o frete com uma taxa fixa de R$ 20,00 mais R$ 1,50 por quilômetro rodado. Peça ao usuário para informar a distância em km até o cliente e pergunte: "A entrega é considerada de risco ou urgente? (sim/nao)".
Calcule o valor base do frete. Regra de negócio: se a distância for maior que 100 km OU se a entrega for classificada como urgente, o sistema deve adicionar uma taxa extra de R$ 15,00 no valor final. Exiba o custo total do frete no console.

### 9. Sistema de Comissão de Vendas
Uma loja de eletrônicos paga comissão de acordo com o desempenho. Peça ao vendedor para digitar o **valor total em vendas** que ele realizou no mês.
- Se ele vendeu R$ 20.000,00 ou mais, sua comissão é de 5% sobre o valor total.
- Se ele vendeu menos de R$ 20.000,00, a comissão cai para 2%.
Calcule o valor da comissão e mostre na tela.

### 10. Multa por Atraso no Condomínio
O sistema financeiro de uma administradora de condomínios precisa calcular boletos atrasados. Peça ao morador para informar o valor original do condomínio, a quantidade de dias de atraso e pergunte: "O vencimento original caiu em um feriado ou final de semana? (sim/nao)".
Se os dias de atraso forem maiores que zero **E** o vencimento não tiver sido em um feriado **ou** final de semana, adicione uma multa fixa de 2% sobre o valor original, além de R$ 1,00 de juros para cada dia de atraso. Caso não haja atraso real (0 dias ou exceção de feriado), o valor permanece o mesmo. Exiba o valor atualizado do boleto.

---
> **Dica:** Lembrem-se que os dados capturados pelo `prompt-sync` vêm como formato de Texto (String). Para fazer contas matemáticas como adição ou validações de limite, é muito importante converter a entrada para número (usando `Number()`, `parseInt()` ou `parseFloat()`).

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>Lions Startups/LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercícios dos Fundamentos da Programação - Módulo 02</i>
</div>