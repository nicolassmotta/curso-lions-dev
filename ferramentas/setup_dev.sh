#!/bin/bash

# Atualiza a lista de pacotes do sistema
echo "Atualizando repositórios..."
sudo apt update && sudo apt upgrade -y

# Instala ferramentas básicas e o Git
echo "Instalando Git, curl e wget..."
sudo apt install git curl wget software-properties-common -y

# Instala o Node.js (Versão LTS via NodeSource para desenvolvimento)
echo "Instalando Node.js LTS..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Instala o Visual Studio Code (Via Snap, padrão do Ubuntu)
echo "Instalando VS Code..."
sudo snap install code --classic

# Instala o Postman (Via Snap)
echo "Instalando Postman..."
sudo snap install postman

# Instala o MongoDB Compass (Baixando o .deb oficial)
echo "Instalando MongoDB Compass..."
wget https://downloads.mongodb.com/compass/mongodb-compass_1.42.1_amd64.deb -O compass.deb
sudo apt install ./compass.deb -y
rm compass.deb # Limpa o instalador

# Instala as extensões do Visual Studio Code
echo "Instalando extensões do VS Code..."
code --install-extension PKIEF.material-icon-theme
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension Gruntfuggly.todo-tree

echo "========================================"
echo "Instalação concluída com sucesso!"
echo "Versão do Node:"
node -v
echo "Versão do Git:"
git --version
echo "========================================"