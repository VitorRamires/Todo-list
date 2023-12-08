
const tarefasAtivas = document.querySelector('.tarefas-ativas')
const addTarefa = document.querySelector('.adicionar')

function adicionandoTarefa(){
  const tarefa = document.createElement('p')
  tarefa.innerHTML = document.querySelector('#addTarefa').value
  tarefasAtivas.appendChild(tarefa)

  const removerTarefa = document.createElement('a')
  removerTarefa.innerHTML = ' remover '
  tarefa.appendChild(removerTarefa)
  removerTarefa.onclick = ()=>{
    tarefasAtivas.removeChild(tarefa)
  }

  const editarTarefa = document.crea
}


addTarefa.addEventListener('click', adicionandoTarefa)