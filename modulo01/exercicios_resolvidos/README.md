# Módulo 1: Solução do Desafio - Explorando o Espaço

Este arquivo contém a sequência de comandos de terminal para completar o desafio "Explorando o Espaço".

---

### Solução Passo a Passo

```bash
# 1. Crie o diretório principal
mkdir EstacaoEspacial

# 2. Entre no novo diretório
cd EstacaoEspacial

# 3. Crie os módulos (seções)
mkdir Habitacao Laboratorio Hangar

# 4. Crie os quartos dentro de Habitacao
mkdir Habitacao/Quarto1 Habitacao/Quarto2 Habitacao/Quarto3

# 5. Crie as áreas de pesquisa dentro de Laboratorio
mkdir Laboratorio/Pesquisa1 Laboratorio/Pesquisa2

# 6. Crie os espaços para as naves dentro de Hangar
mkdir Hangar/Nave1 Hangar/Nave2 Hangar/Nave3

# 7. Remova o Hangar (a opção -r é necessária para remover um diretório com conteúdo)
rm -r Hangar

# 8. Crie o arquivo de boas-vindas
echo "Bem-vindos à Estação Espacial!" > BoasVindas.txt

# 9. Faça uma cópia do arquivo para o Laboratorio
cp BoasVindas.txt Laboratorio/

# 10. (BÔNUS) Altere o conteúdo do arquivo copiado no Laboratorio
echo "Bem-vindos à Estação Espacial! Este é o laboratório!" > Laboratorio/BoasVindas.txt