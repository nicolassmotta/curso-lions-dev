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

# Exercícios: Estruturas de Repetição

**Turma:** Lions Startups/LionsDev
**Tópicos:** Estruturas de Repetição (for, while, do-while), Arrays e Lógica de Programação.

---

### 1. Autenticação de Cofre Digital
Um sistema de segurança bancária exige uma senha numérica para liberar o acesso a um cofre de alta segurança. Defina uma senha correta no sistema (por exemplo, `9876`). Peça ao segurança para inserir a tentativa de senha.
Enquanto a senha inserida não for exatamente igual à senha pré-estabelecida, o painel deve exibir **"Acesso negado: Senha incorreta"** e solicitar a digitação novamente. Assim que a senha correta for fornecida, interrompa a verificação e exiba **"Cofre liberado com sucesso"**.

### 2. Calibração de Sensores Industriais
Uma máquina de montagem industrial precisa calibrar seus sensores térmicos registrando uma sequência de 5 leituras. Peça ao operador para informar um valor de temperatura inicial.
A partir desse valor de partida, utilize um laço `for` para registrar e exibir as próximas 5 calibragens no painel, incrementando a temperatura em 2 graus a cada novo passo. Mostre claramente na tela cada um dos 5 valores gerados ao longo do processo.

### 3. Totem de Pedidos Contínuos
Um restaurante fast-food quer automatizar seu totem de autoatendimento para que os clientes montem seus combos sem interrupção.
O sistema deve capturar o valor de um item do cardápio e somá-lo ao total da compra atual. Após registrar esse item, pergunte ao cliente: "Deseja adicionar mais algum item? (sim/nao)". O sistema deve obrigatoriamente registrar o primeiro item (utilizando `do-while`) e, em seguida, continuar aceitando novos valores e somando ao total de forma contínua, enquanto a resposta do cliente for "sim". Ao finalizar, exiba o valor total a ser pago.

### 4. Atualização de Salários no RH
O departamento de recursos humanos de uma empresa de tecnologia possui uma lista (array) contendo os salários atuais de cinco desenvolvedores: `[2500, 3200, 4100, 5000, 6200]`.
O sindicato da categoria aprovou um reajuste de 10% que deve ser aplicado a todos os funcionários. Utilize um laço de repetição para percorrer o array de salários e aplicar o aumento de 10% sobre cada montante original. Após o recálculo, exiba a nova lista de salários atualizada no console.

### 5. Carregamento de Frota Logística
Uma transportadora está organizando a carga de um caminhão que possui uma capacidade máxima estrita de **1000 kg**. O estoquista começará a colocar caixas no veículo uma a uma.
Peça repetidamente o peso de cada caixa que está sendo carregada e some ao peso acumulado do caminhão. Caso o peso de uma nova caixa faça o total ultrapassar a capacidade limite (1000 kg), o sistema deve exibir uma mensagem de alerta informando que a carga máxima foi atingida e interromper o carregamento imediatamente (sem adicionar a caixa que estourou o limite). Ao final, exiba o peso total carregado e informe quantas caixas foram alocadas com sucesso.

### 6. Desafio Final: Fechamento de Caixa do E-commerce
Um e-commerce está processando os carrinhos de compras pendentes no fim do dia. Você possui um registro (array de objetos) contendo três carrinhos: cada um tem o nome do cliente e uma lista (array) de preços dos produtos.

Para cada carrinho, siga as etapas:
1. Calcule o valor total devido somando todos os preços dos produtos daquele cliente.
2. Inicie o sistema de pagamento: peça ao operador para informar o valor em dinheiro recebido. O sistema deve continuar solicitando pagamentos (em um laço) até que a soma dos valores recebidos seja maior ou igual ao total da compra.
3. Se o total pago for maior que o devido, informe o valor do troco.
4. Ao concluir todos os carrinhos, exiba um relatório confirmando os nomes dos clientes que concluíram o pagamento com sucesso.

---

> **Dica:** Lembrem-se que os dados capturados pelo `prompt-sync` vêm como formato de Texto (String). Para fazer contas matemáticas como adição ou validações de limite, é muito importante converter a entrada para número (usando `Number()`, `parseInt()` ou `parseFloat()`).

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>Lions Startups/LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercícios dos Fundamentos da Programação - Módulo 02</i>
</div>