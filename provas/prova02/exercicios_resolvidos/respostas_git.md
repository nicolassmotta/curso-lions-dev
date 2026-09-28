# Respostas dos exercícios de Git (1 e 2)

## Exercício 1
```bash
mkdir revisao-avaliacao2 && cd revisao-avaliacao2
git init
echo 'console.log("Olá, Git!")' > index.js
git add .
git commit -m "cria index com saudação"
git checkout -b saudacao
# edite o index.js para "Olá, GitHub!"
git add .
git commit -m "muda saudação para GitHub"
git checkout main
git merge saudacao
git remote add origin https://github.com/usuario/revisao-avaliacao2.git
git branch -M main
git push -u origin main
git log --oneline
```

## Exercício 2
1. `git pull`, resolva os conflitos se houver (`git add .` e `git commit`) e depois `git push`.
2. Acrescente `node_modules/` ao `.gitignore` e rode `git rm -r --cached node_modules`, depois `git commit -m "remove node_modules do repositório"` e `git push`.
3. `git commit --amend -m "mensagem certa"`.
4. `git restore index.js`.
