
const painelTarefas = document.querySelector('.painel-tarefas'),
      tarefasAtivas = document.querySelector('.tarefas-ativas'),
      tarefasCompletas = document.querySelector('.tarefas-completas')
      botaoAddTarefa = document.querySelector('.adicionar'),
      inputAddTarefa = document.querySelector('#addTarefa')
      botaoLimpar = document.querySelector('.limpar'),
      mostrarCaracteres = document.querySelector(".caracter-count p")


function adicionandoTarefa(){
  if(inputAddTarefa.value === "" || inputAddTarefa.value.length > 32){
    alert('Preencha o campo ou diminua a quantidade de carcteres')
    mostrarCaracteres.innerHTML = 0
  } else {
    let tarefa = document.createElement('div'),
        descricaoTarefa = document.createElement('input')
    
    tarefasAtivas.appendChild(tarefa)
    tarefa.appendChild(descricaoTarefa)
    descricaoTarefa.value = inputAddTarefa.value
   
    tarefa.classList.add('tarefa')
    descricaoTarefa.classList.add('descricao-tarefa')

    let botoes = document.createElement('div')
    botoes.classList.add('botoes')
    tarefa.appendChild(botoes)


    const divCompletarTarefa = document.createElement('div'),
          completarTarefa = document.createElement('input'),
          botaoCompletar = document.createElement('div')

    
    divCompletarTarefa.appendChild(completarTarefa)
    divCompletarTarefa.appendChild(botaoCompletar)
    botoes.appendChild(divCompletarTarefa)
    
    completarTarefa.setAttribute('type', 'checkbox')
    botaoCompletar.classList.add('botao-completar')
    divCompletarTarefa.classList.add('completar-box')
  
    completarTarefa.onclick = ()=>{
      if(completarTarefa.checked === true){
        tarefa.classList.add('completa')
        descricaoTarefa.setAttribute('disabled', true)
        tarefasCompletas.appendChild(tarefa)
      } else {
        tarefa.classList.remove('completa')
        descricaoTarefa.removeAttribute('disabled')
        tarefasAtivas.appendChild(tarefa)
      }
    }
    

    const removerTarefa = document.createElement('a')
    botoes.appendChild(removerTarefa)
    removerTarefa.classList.add('botao-remover')
    removerTarefa.onclick = ()=>{
      if(tarefa.classList.contains('completa')){
        tarefasCompletas.removeChild(tarefa)
      } else {
        tarefasAtivas.removeChild(tarefa)
      }
    }

    let todasTarefas = document.querySelectorAll('.tarefa')
    botaoLimpar.onclick = ()=>{
      todasTarefas.forEach(tarefaItem=>{
        if(tarefaItem.classList.contains('completa')){
          tarefasCompletas.removeChild(tarefaItem)
        } else {
          tarefasAtivas.removeChild(tarefaItem)
        }
      })
    }
    
    mostrarCaracteres.innerHTML = 0

  }

}



botaoAddTarefa.addEventListener('click', ()=>{
  adicionandoTarefa()
  inputAddTarefa.value = ''

})
inputAddTarefa.addEventListener('keydown', (event)=>{
  mostrarCaracteres.innerHTML = inputAddTarefa.value.length
  if(event.key === "Enter"){
    adicionandoTarefa()
    inputAddTarefa.value = ''
  }
})