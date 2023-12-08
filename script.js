
const tarefasAtivas = document.querySelector('.tarefas-ativas')
const botaoAddTarefa = document.querySelector('.adicionar')
const inputAddTarefa = document.querySelector('#addTarefa')

function adicionandoTarefa(){
  if(inputAddTarefa.value === ""){
    alert('Preencha o campo')
  } else {
    let tarefa = document.createElement('p')
    tarefa.innerText = inputAddTarefa.value
    tarefasAtivas.appendChild(tarefa)

    const removerTarefa = document.createElement('a')
    removerTarefa.innerText = '    remover    '
    tarefa.appendChild(removerTarefa)
    removerTarefa.onclick = ()=>{
      tarefasAtivas.removeChild(tarefa)
    }
  }
}

  botaoAddTarefa.addEventListener('click', adicionandoTarefa)
  inputAddTarefa.addEventListener('keydown', (event)=>{
    if(event.key === "Enter"){
      adicionandoTarefa()
    }
  })
