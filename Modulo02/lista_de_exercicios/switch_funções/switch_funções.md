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
    .no-print { display: none; }
  }
</style>

# Exercícios: Funções e Estruturas de Seleção

**Turma:** Lions Startups/LionsDev  
**Tópicos:** Funções Tradicionais, Arrow Functions, Switch e todo conteúdo já visto no curso.

> **⚠️ Aviso:** Todos os exercícios desta lista devem ser resolvidos obrigatoriamente utilizando **funções** e sempre que houver múltiplas condições, utilize o comando **switch** para organizar a lógica.

---

### 1. Calculadora de Bônus de RH 
Crie uma função que receba duas informações: o nível do cargo de um funcionário e o seu salário atual. 

Dentro dessa função, utilize uma estrutura de seleção de casos para avaliar o nível do cargo. Caso seja "Estagiário", calcule um bônus de 10% sobre o salário. Caso seja "Júnior", o bônus é de 15%. Para "Pleno", 20%. Para qualquer outro caso não mapeado, o bônus deve ser zero. A função deve devolver (retornar) o valor final do bônus. Fora da função, peça para o usuário digitar os dados, acione a função e exiba o resultado.

### 2. Validador de Acesso Rápido 
Um sistema precisa de uma validação ágil de credenciais. Crie uma função no formato de uma arrow function que receba o nome de um usuário e o código do seu crachá.

A regra para liberar o acesso é: o nome precisa ter mais de 5 letras E o código do crachá deve ser maior que 1000. A função deve analisar esse cenário e retornar verdadeiro caso a regra seja atendida, ou falso caso contrário. Peça os dados no terminal **(use uma forma de entrada de dados, prompt-sync, stdin ou readline)**, execute a função e, dependendo do retorno, exiba "Acesso Concedido" ou "Acesso Negado".

### 3. Menu de Loja de Eletrônicos 
Crie o registro de um pedido de compra (um objeto) que comece apenas com o nome do cliente. 

Exiba um pequeno menu (para a criação de menus o comando switch é o mais indicado) no console com 3 opções de produtos (ex: 1 - Fone, 2 - Teclado, 3 - Mouse). Peça ao usuário para digitar o código numérico da sua escolha. Utilize uma seleção de casos para analisar esse código. Dependendo da escolha, adicione no registro do pedido duas novas propriedades: o nome do produto escolhido e o seu preço fixo. Se o usuário digitar um código inválido, registre o produto como "Desconhecido" e valor zero. Imprima o registro final.

### 4. Monitoramento Climático
Um laboratório de robótica armazena as temperaturas do dia em uma lista. Crie uma arrow function chamada `avaliarTemperaturas` que receba uma lista de três valores numéricos.

A função deve calcular a média desses três valores. Caso a média seja superior a 30 graus, a função deve retornar o texto "Alerta de Aquecimento". Caso seja 30 graus ou menos, deve retornar "Clima Estável". No programa principal, peça ao usuário para digitar três temperaturas, guarde-as em uma lista, repasse essa lista para a arrow function e exiba a resposta dela.

### 5. Status de Encomenda Logística
Crie uma função tradicional que atualize o rastreio de um pacote. Ela deve receber um código de status (letras como "P", "E", "C").

Use uma seleção de casos para traduzir o código: "P" significa "Pendente de Envio", "E" significa "Em Rota de Entrega" e "C" significa "Cancelado". Qualquer outra letra deve resultar em "Status Inválido". Crie um registro (objeto) de uma encomenda contendo um ID e peça ao usuário qual o código do status atual. Chame a função passando esse código e salve o texto retornado como uma nova propriedade dentro do registro da encomenda (ou seja, dentro do objeto). Mostre como ficou o registro final.

### 6. Sistema de Pontuação de Games 
Crie uma arrow function que receba a lista de pontuações de um jogador nas últimas três partidas. 

A função deve somar os três valores. Caso a soma total ultrapasse 200 pontos OU a última partida registrada (a que fica na ponta final da lista) tenha sido maior que 90 pontos, a função deve retornar a palavra "Veterano". Do contrário, retorna "Iniciante". Capture três pontuações do usuário, monte a lista e passe para a função, exibindo a classificação final.

### 7. Conversor Universal de Moedas 
Construa uma arrow function que atue como casa de câmbio. Ela deve receber um valor em Reais e uma moeda de destino (ex: "USD" para Dólar, "EUR" para Euro, "GBP" para Libra).

Dentro da função, avalie a moeda de destino com uma seleção de casos e divida o valor em Reais pela cotação correspondente (invente cotações fixas para cada caso, exemplo: 1 USD = 5 BRL, 1 EUR = 6 BRL, 1 GBP = 7 BRL). Se a moeda informada não existir nos casos, retorne o próprio valor em Reais. Peça as entradas ao usuário, acione a rotina e exiba o valor convertido.

### 8. Gestão de Capacidade de Servidor 
Crie uma entidade representando um servidor com nome, espaço total (em GB) e espaço já ocupado (em GB), faça em números inteiros. 

Crie uma função  que receba esse servidor inteiro como parâmetro, junto com o tamanho de um novo arquivo que se deseja salvar. A função deve analisar a situação: se o espaço ocupado somado ao novo arquivo for menor ou igual ao espaço total, atualize o espaço ocupado do servidor e retorne verdadeiro (sucesso). Caso ultrapasse, não altere os dados e retorne falso (falha). Avalie o retorno fora da função para avisar o usuário se o upload foi aceito ou rejeitado.

### 9. Roteamento de Chamados de TI 
Crie uma rotina  que atue como triagem de chamados. Ela deve receber a criticidade de um problema técnico (níveis 1, 2 ou 3).

Avalie a criticidade com seleção de casos. Nível 1 retorna o setor "Atendimento Básico". Nível 2 retorna "Equipe Especializada". Nível 3 retorna "Gestão de Crise". Crie uma lista vazia de "Fila de Atendimento". Peça ao usuário a criticidade de um novo problema, descubra o setor responsável usando sua função e adicione o nome desse setor ao final da lista. Mostre a lista atualizada.

### 10. O Grande Painel de Controle 
Crie um sistema central. Inicie com um registro de um "Caixa de Loja" contendo o nome do operador, o saldo inicial de R$ 100,00 e uma lista vazia de "Histórico de Transações".

Crie duas funções separadas: uma chamada `registrarVenda` (que recebe o valor e soma ao saldo) e outra chamada `registrarDespesa` (que recebe o valor e subtrai do saldo). Ambas as funções devem devolver o novo saldo calculado.

Exiba um menu perguntando a operação desejada: "V" para Venda ou "D" para Despesa. Utilize uma seleção de casos no programa principal para ler a escolha. Caso seja "V", peça o valor, acione a rotina de venda, atualize o saldo no registro do caixa e adicione a palavra "Entrada" na lista de histórico. Caso seja "D", peça o valor, acione a rotina de despesa, atualize o saldo e adicione "Saída" no histórico. Imprima o registro do caixa inteiro no final para auditoria. Lembrando, utilize um laço de repetição para criar este menu do usuário, é preciso ter uma opção para que ele pare de registrar as operações.

---

> **Dica:** Lembrem-se que os dados capturados pelo prompt-sync vêm como formato de Texto (String). Para repassar valores numéricos para as suas funções, é muito importante realizar a conversão da entrada (usando `Number()`, `parseInt()` ou `parseFloat()`) antes de enviá-los como parâmetros.

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>Lions Startups/LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercícios dos Fundamentos da Programação - Módulo 02</i>
</div>