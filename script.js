const painelTarefas = document.querySelector('.painel-tarefas'),
      tarefasAtivas = document.querySelector('.tarefas-ativas'),
      tarefasCompletas = document.querySelector('.tarefas-completas')
      botaoAddTarefa = document.querySelector('.adicionar'),
      inputAddTarefa = document.querySelector('#addTarefa'),
      botaoLimpar = document.querySelector('.limpar'),
      createCaracterCount = document.querySelector('.caracter-count')


function adicionandoTarefa(){
  if(inputAddTarefa.value === "" || inputAddTarefa.value.length > 20){
    alert('Preencha o campo corretamente')
  } else {
    let tarefa = document.createElement('div'),
        descricaoTarefa = document.createElement('input')
    
    tarefasAtivas.appendChild(tarefa)
    tarefa.appendChild(descricaoTarefa)
    descricaoTarefa.value = inputAddTarefa.value
    descricaoTarefa.disabled = true
   
    tarefa.classList.add('tarefa', 'entrada-animada')
    descricaoTarefa.classList.add('descricao-tarefa')

    let botoes = document.createElement('div')
    botoes.classList.add('botoes')
    tarefa.appendChild(botoes)


    const divCompletarTarefa = document.createElement('div'),
          completarTarefa = document.createElement('input'),
          botaoCompletar = document.createElement('div'),
          verificarRemover = document.createElement('div')

   
    divCompletarTarefa.appendChild(completarTarefa)
    divCompletarTarefa.appendChild(botaoCompletar)
    botoes.appendChild(verificarRemover)

    verificarRemover.appendChild(divCompletarTarefa)
    verificarRemover.classList.add('verificar-remover')
    
    completarTarefa.setAttribute('type', 'checkbox')
    botaoCompletar.classList.add('botao-completar')
    divCompletarTarefa.classList.add('completar-box')
  

    const removerTarefa = document.createElement('a')
    verificarRemover.appendChild(removerTarefa)
    removerTarefa.classList.add('botao-remover')
    removerTarefa.onclick = ()=>{
      if(tarefa.classList.contains('completar')){
        tarefasCompletas.removeChild(tarefa)
      } else {
        tarefasAtivas.removeChild(tarefa)
      }
    }

    let todasTarefas = document.querySelectorAll('.tarefa')
    botaoLimpar.onclick = ()=>{
      todasTarefas.forEach(tarefaItem=>{
        if(tarefaItem.classList.contains('completar')){
          tarefasCompletas.removeChild(tarefaItem)
        } else {
          tarefasAtivas.removeChild(tarefaItem)
        }
      })
    }


    const valorInputSalvo = descricaoTarefa.value
    let botaoEditar = document.createElement('div')
    botaoEditar.classList.add('editar')
    verificarRemover.appendChild(botaoEditar)
    
    botaoEditar.onclick = ()=>{
      const salvarCancelar = document.createElement('div'),
            salvar = document.createElement('a'),
            cancelar = document.createElement('a')

      descricaoTarefa.disabled = false
      descricaoTarefa.focus()
      descricaoTarefa.setSelectionRange(descricaoTarefa.value.length, descricaoTarefa.value.length)

      verificarRemover.classList.add('esconder-botoes')
      salvarCancelar.classList.add('salvar-cancelar')
      botoes.appendChild(salvarCancelar)

      salvar.innerHTML = 'Salvar'
      cancelar.innerHTML = 'Cancelar'

      salvar.classList.add('salvar')
      cancelar.classList.add('cancelar')

      salvarCancelar.appendChild(salvar)
      salvarCancelar.appendChild(cancelar)

      salvar.addEventListener('click', ()=>{
        if(descricaoTarefa.value === '' || descricaoTarefa.value.length > 20){
          alert('preencha o campo de edição corretamente')
        } else {
          verificarRemover.classList.remove('esconder-botoes')
          salvarCancelar.classList.add('esconder-botoes')
          descricaoTarefa.disabled = true
        }
      })

      cancelar.addEventListener('click', ()=>{
        descricaoTarefa.value = valorInputSalvo
        verificarRemover.classList.remove('esconder-botoes')
        salvarCancelar.classList.add('esconder-botoes')
        descricaoTarefa.disabled = true
      })
    }


    completarTarefa.onclick = ()=>{
      if(completarTarefa.checked === true){
        tarefa.classList.add('completar')
        descricaoTarefa.setAttribute('disabled', true)
        tarefasCompletas.appendChild(tarefa)
      } else {
        tarefa.classList.remove('completar')
        descricaoTarefa.removeAttribute('disabled')
        tarefasAtivas.appendChild(tarefa)
      }
    }
    


  }
}



botaoAddTarefa.addEventListener('click', ()=>{
  adicionandoTarefa()
  inputAddTarefa.value = ''
  createCaracterCount.innerHTML = 0
  createCaracterCount.classList.add('disable-count')
})
inputAddTarefa.addEventListener('keyup', (event)=>{
  createCaracterCount.innerHTML = + inputAddTarefa.value.length + " / 20"
  inputAddTarefa.value.length === 0 ? createCaracterCount.classList.add('disable-count') : createCaracterCount.classList.remove('disable-count')
  if(event.key === "Enter"){
    adicionandoTarefa()
    inputAddTarefa.value = ''
    createCaracterCount.innerHTML = 0
    createCaracterCount.classList.add('disable-count')
  }
})