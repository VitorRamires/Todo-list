const inputTarefa = document.getElementById("tarefa"),
      addTarefa = document.querySelector(".adicionar"),
      marcarTarefa = document.querySelector(".marcar"),
      deletarTarefa = document.querySelector(".deletar"),
      atualizarTarefa = document.querySelector(".atualizar"),
      limparTarefas = document.querySelector(".limpar")
      originalItem = document.querySelector('.item-lista');



document.getElementById("descricao-tarefa").disabled = true

function adicionarTarefa () {
  if(inputTarefa.value === ''){
    alert('Preencha o campo')
  } else {
    const novoElemento = originalItem.cloneNode(true)
    const novaTarefa = novoElemento.querySelector('input[type="text"]')

    novaTarefa.value = inputTarefa.value
  
    document.querySelector('.tarefas-ativas').appendChild(novoElemento)
  }
}

addTarefa.addEventListener('click', adicionarTarefa)
