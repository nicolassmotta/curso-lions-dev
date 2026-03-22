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

# Exercícios Avançados: Lógica, Arrays e Objetos

**Turma:** Lions Startups/LionsDev
**Tópicos:** Arrays, Objetos, Estruturas Condicionais, Variáveis e Entrada/Saída de dados.

---

### 1. Carrinho de Compras de E-commerce

Crie uma entidade que represente um carrinho de compras online, contendo o nome do cliente, o tipo de assinatura ("Prime" ou "Padrão") e uma lista de preços dos itens escolhidos. Essa lista deve começar vazia.

Peça ao usuário para registrar o preço de três produtos diferentes, um de cada vez, e insira-os na lista do carrinho. Após os registros, calcule o valor total da compra somando os itens da lista. Aplique a seguinte regra de negócio: caso o total ultrapasse R$ 200,00 OU o cliente seja assinante "Prime", crie dinamicamente um selo de "Frete Grátis" ativado no carrinho e exiba uma mensagem de comemoração. Do contrário, adicione uma taxa fixa de R$ 30,00 ao total da compra e ative o selo como falso. Mostre o carrinho e o valor final a ser pago.

### 2. Tracker de Atletas Profissionais

Um aplicativo de saúde monitora o exercício de corredores. Crie o registro de um atleta contendo o nome, peso atual, uma meta ("Emagrecimento" ou "Performance") e uma lista com as distâncias percorridas nas últimas três maratonas.

Peça ao usuário para atualizar a distância corrida de hoje. Insira essa nova distância no final da lista. Agora, calcule a quilometragem média do corredor usando apenas os três _últimos_ registros da lista (ignorando o mais antigo). Se a média for acima de 20 km E a meta for "Emagrecimento", reduza o peso atual do atleta em 1 kg e adicione um selo "Meta Atingida" no registro. Se a meta for "Performance" e a corrida de hoje for maior que a corrida anterior, crie o selo "Novo Recorde Pessoal". Exiba o perfil atualizado.

### 3. Programa de Milhas Aéreas

Crie o perfil de fidelidade de um cliente vip de uma companhia aérea comercial contendo o nome e um histórico de viagens. O histórico deve ser uma lista e começar com dois voos já realizados (cada voo deve ser um objeto contendo o `destino` e a `quantidade` de milhas acumuladas daquela viagem).

Peça ao usuário para registrar um terceiro voo (destino e milhas) e adicione à lista. Calcule a soma de todas as milhas acumuladas na lista de histórico. Regra de upgrade: se a soma de milhas passar de 5.000, diminua 5.000 milhas do saldo (como se ele tivesse resgatado), insira uma propriedade no perfil do cliente chamada "Categoria" com o valor "Platinum" e exiba um alerta parabenizando. Caso não tenha milhas suficientes, mantenha a "Categoria" como "Gold" e exiba quantas milhas faltam para o upgrade. Mostre o objeto final.

### 4. Sistema de Lanchonete de Fast Food

Para automatizar opções de cardápio virtual (totem em autoatendimento), crie o registro de um pedido virtual contendo o nome do cliente, o valor base de um hambúrguer premium (exemplo: R$ 30,00), a quantidade de lanches comprados e uma lista vazia para "Ingredientes Extras" (como "Bacon", "Cheddar", etc.).

Peça ao usuário para digitar o nome de dois ingredientes extras desejados e o valor unitário de cada extra. Adicione as strings (apenas os nomes) na lista de extras. Some os valores dos extras ao cálculo: `(valor base do hambúrguer + valor extra 1 + valor extra 2) * quantidade`. Se a lista de extras conter exatamente 2 itens E o cliente levar mais de 2 lanches, aplique um desconto automático de 20% no valor total do pedido. Exiba o subtotal e o valor total na tela com a lista de ingredientes.

### 5. Sistema de Mentoria Acadêmica

Para organizar um programa de extensão universitária, crie a ficha de um projeto que contém o nome do coordenador, o limite máximo de vagas, a área de estudo (ex: "Tecnologia") e uma lista com objetos representando os mentores já confirmados (inicie com dois mentores, cada um tendo `nome` e `areaDeAtuacao`).

Peça ao usuário para tentar cadastrar um novo voluntário (nome e área de atuação). Regra corporativa: o cadastro só é permitido se a lista de mentores atual tiver menos participantes que o limite máximo de vagas E a área de atuação do novo voluntário for exatamente igual à área de estudo do projeto. Se aprovado, insira o objeto do novo mentor no array e mostre o projeto. Caso contrário, não adicione à lista e altere uma chave `status` do projeto para "Bloqueado para Inscrições". Imprima a ficha no console.

### 6. Sistema de Segurança de Voo / Aeronave Doméstica

O painel elétrico de uma aeronave monitora o funcionamento das turbinas. Crie a entidade de uma turbina contendo seu lado (ex: "Motor Esquerdo"), um status (ex: "Desligado") e uma lista contendo exatamente três leituras críticas dos sensores: a primeira sendo a `temperatura` atual (graus Celsius), a segunda a `pressão` do óleo (PSI) e a terceira o nível de `combustível` (porcentagem).

Peça ao mecânico de voo para inserir três novos valores de sensores atualizar o painel. Substitua diretamente as leituras antigas na lista pelos novos números. A trava de segurança de acionamento funciona da seguinte forma: o status da turbina só pode ser alterado dinamicamente para "Ligado" se o nível de combustível for maior que 20%, E a pressão for maior que 50 PSI, E a temperatura estiver entre 20 e 90 graus. Caso _qualquer_ um desses limites vitais seja violado, mude o status para "Falha Crítica" e adicione uma nova propriedade ao objeto chamada `bloqueioAtivado: true`. Mostre o painel atualizado no final.

### 7. Controle de Imigração Governamental

Crie a ficha de um passageiro internacional recém-chegado. A ficha deve conter o `nome`, a `nacionalidade`, se ele está a trabalho (`boolean`) e uma lista contendo exatamente dois documentos que ele apresentou (exemplo: documento no índice 0 é o "Passaporte", no índice 1 é o "Visto").

A alfândega exige uma terceira comprovação de saúde. Peça ao fiscal qual o terceiro documento apresentado (ex: "Certificado de Vacina") e coloque-o como último item desta lista. A regra de liberação estrita diz: Se o passageiro não for do Brasil, ele _deve_ ter obrigatoriamente um "Visto" na segunda posição da lista E o documento da terceira posição não pode ser vazio. Caso ele seja do Brasil, ele é liberado apenas verificando se possui "Passaporte" no índice 0. Adicione uma propriedade "Entrada Permitida" (true ou false) com base nessa complexa validação e exiba todo o objeto imigratório.

### 8. Gestão de Eventos para Festival de Música

Para coordenar os ingressos VIPs de um festival, crie o pacote de um grupo corporativo contendo o `nome da empresa`, o `orçamentoTotal` da noite, uma chave booleana `openBarFechado` (inicie falsa) e uma lista vazia de `consumoExtras` (que guardará o nome das bebidas que os executivos pedirem fora do pacote).

Peça ao promotor do evento para lançar o nome de duas bebidas importadas e o valor total que essas duas somadas custaram. Adicione as bebidas no array de extras. Verifique a planilha financeira: subtraia o valor gasto com essas bebidas do `orçamentoTotal`. Se após esse abatimento o saldo restante do orçamento for menor que R$ 0,00, altere a chave `openBarFechado` para `true` (cortando a bebida deles) e crie uma propriedade "Multa Excedente" de R$ 500,00 no registro. Se sobrar dinheiro, apenas atualize o orçamento restante. Imprima o fechamento financeiro do camarote.

### 9. Diário de Leituras em Aplicativos de Educação Literária

Uma escola digital quer gamificar o hábito de leitura com um BookTracker. Crie o registro de leitura de um aluno contendo o `nome`, os `pontosDeLeitura` (inicie em 10) e uma lista chamada `historicoDias` contendo o registro dos dois últimos dias lidos (cada item é um objeto com `data` e `paginasLidas`).

Peça ao aluno para registrar sua leitura de hoje informando a data atual e as páginas lidas. Crie o novo registro e o inclua na lista do histórico. Avalie a constância: verifique o objeto focado apenas _neste último dia que acabou de ser inserido_. Se a quantidade de páginas for maior que 50 E ele já tiver mais de 0 pontos de leitura, multiplique os pontos dele por 2 e altere a propriedade `data` desse registro inserindo no final " - Super Leitor!". Se a leitura for inferior a 10 páginas, diminua os pontos de leitura pela metade. Exiba o painel interativo do aluno com os pontos atualizados e o histórico.

### 10. Computadores em Cluster / Nuvem Virtual

Imagine que você precisa gerenciar sistemas de Hospedagem de Sites em Nuvem (Servidores Cloud). Crie o registro digital de um Servidor. Ele deve ter um `nome` (ex: "Servidor Principal AWS"), a `capacidadeMaximaGigabytes` (ex: 500), e uma lista chamada `sitesHospedados`. Inicie essa lista contendo um objeto representando um site já online (ele deve ter `dominio` e o `tamanhoOcupadoGB`).

O cliente quer fazer upload de um site novo. Peça pelo prompt o domínio e o tamanhoGB desse novo projeto web.
A regra corporativa da nuvem dita as contas: Você precisa somar o tamanho do site que já estava lá, adicionado ao tamanho do candidato recém chegado. Se essa conta de megabytes totais for **menor ou igual** à capacidade máxima daquele Servidor, crie o objeto deste novo site, insira-o na lista `sitesHospedados` e escreva no terminal: "Upload Concluído! Sistema Operacional".
Porém, caso estoure o limite da nuvem física, não adicione o site dentro da lista, crie uma chave nova no objeto chefe do servidor chamada `alertaSobrecarga` definida como verdadeira (`true`), e exiba a string: "Falha: Falta de Espaço Físico. Cancele o deploy". No final das validações, exiba o objeto grande completo para o engenheiro analisar a nuvem.

---

> **Dica:** Lembrem-se que os dados capturados pelo prompt-sync vêm como formato de Texto (String). Para fazer contas matemáticas como adição ou validações de limite em regras de negócio, é muito importante converter a entrada para número (usando `Number()`, `parseInt()` ou `parseFloat()`).

---

<div style="text-align: center; color: #777; font-size: 13px; margin-top: 50px;">
  <b>Lions Startups/LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercícios dos Fundamentos da Programação - Módulo 02</i>
</div>
