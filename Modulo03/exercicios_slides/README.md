# Módulo 4: Solução da Atividade - Exercitando o Git em Dupla

Este documento descreve o fluxo de trabalho esperado para a "Atividade: Exercitando o Git em Dupla". Como esta atividade é um processo de colaboração, não há um "arquivo de código" único como resposta.

Abaixo está um cenário de exemplo de como a Dupla (Aluno A e Aluno B) resolveria o exercício.

-----

### Cenário de Exemplo

  * **Dupla:** Aluno A, Aluno B.
  * **Exercícios do Aluno A:** `media_notas.js` (do Módulo 2).
  * **Exercícios do Aluno B:** `par_impar.js` (do Módulo 2).

-----

### Passo 1: Configuração Inicial (Aluno A) 

1.  **Aluno A:** Cria um novo repositório no GitHub chamado `cursolionsdev-dupla`.
2.  **Aluno A:** No repositório, vai em `Settings` \> `Collaborators`.
3.  **Aluno A:** Adiciona o nome de usuário do `Aluno B` como colaborador.
4.  **Aluno A:** Clona o repositório para sua máquina local:
    ```bash
    git clone https://github.com/AlunoA/cursolionsdev-dupla.git
    cd cursolionsdev-dupla
    ```
5.  **Aluno A:** Cria um arquivo `README.md` inicial.
    ```bash
    echo "# Projeto da Dupla - Módulo 4" > README.md
    git add README.md
    git commit -m "Commit inicial"
    git push origin main
    ```

### Passo 2: Configuração Inicial (Aluno B)

1.  **Aluno B:** Aceita o convite de colaborador que chegou por e-mail ou na interface do GitHub.
2.  **Aluno B:** Clona o mesmo repositório para sua máquina:
    ```bash
    git clone https://github.com/AlunoA/cursolionsdev-dupla.git
    cd cursolionsdev-dupla
    ```

### Passo 3: Desenvolvimento (Ambos os Alunos)

Os dois alunos agora trabalham em paralelo, cada um em sua própria branch.

**Aluno A (Exercício Média de Notas):**

1.  Garante que está na branch `main` e com o código atualizado:
    ```bash
    git checkout main
    git pull origin main
    ```
2.  Cria uma nova branch para seu exercício:
    ```bash
    git checkout -b exercicio-media-notas
    ```
3.  Adiciona o arquivo do exercício (ex: `media_notas.js`) na pasta.
4.  Faz o commit e o push da sua branch:
    ```bash
    git add media_notas.js
    git commit -m "Adiciona solução do exercício Média de Notas"
    git push origin exercicio-media-notas
    ```

**Aluno B (Exercício Par ou Ímpar):**

1.  Garante que está na branch `main` e com o código atualizado:
    ```bash
    git checkout main
    git pull origin main
    ```
2.  Cria uma nova branch para seu exercício:
    ```bash
    git checkout -b exercicio-par-impar
    ```
3.  Adiciona o arquivo do exercício (ex: `par_impar.js`) na pasta.
4.  Faz o commit e o push da sua branch:
    ```bash
    git add par_impar.js
    git commit -m "Adiciona solução do exercício Par ou Ímpar"
    git push origin exercicio-par-impar
    ```

### Passo 4: Abertura e Revisão dos Pull Requests (PRs)

1.  **Ambos os Alunos:** Vão ao repositório no GitHub. O GitHub mostrará um aviso para criar um Pull Request (PR) para as branches que acabaram de ser enviadas.
2.  **Aluno A:** Cria um PR da branch `exercicio-media-notas` para a branch `main`. Na descrição, explica o que fez e marca o `Aluno B` como revisor.
3.  **Aluno B:** Cria um PR da branch `exercicio-par-impar` para a branch `main`. Na descrição, explica o que fez e marca o `Aluno A` como revisor.
4.  **Aluno A (Revisão):** Abre o PR do `Aluno B`. Ele revisa o código (`par_impar.js`), deixa um comentário (ex: "Código limpo\!") e clica em "Approve" (Aprovar).
5.  **Aluno B (Revisão):** Abre o PR do `Aluno A`. Ele revisa o código (`media_notas.js`), aprova.

### Passo 5: Merge 

1.  **Aluno A:** Após ter seu PR aprovado, ele clica no botão "Merge pull request" no GitHub.
2.  **Aluno B:** Após ter seu PR aprovado, ele clica no botão "Merge pull request" no GitHub.

### Passo 6: Conclusão

Ambos os códigos agora estão na branch `main` do repositório. Para finalizar, ambos os alunos devem atualizar suas máquinas locais:

```bash
git checkout main
git pull origin main
```

Agora, a pasta local de ambos os alunos contém os arquivos `README.md`, `media_notas.js` e `par_impar.js`. O exercício foi concluído com sucesso.