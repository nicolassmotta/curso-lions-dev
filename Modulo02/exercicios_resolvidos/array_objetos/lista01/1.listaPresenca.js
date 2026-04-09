import PromptSync from "prompt-sync"
const prompt = PromptSync()

let novoAluno = ""
let listaAlunos = ["Pedro"]

novoAluno = prompt("Qual o nome do novo aluno? R: ")

listaAlunos.push(novoAluno)

if (listaAlunos.length == 3) {
    console.log(`Turma formada com sucesso: ${listaAlunos}`)
}