import CreateElement from "./createElement.js"

const tarefasAtivas = document.querySelector('.tarefas-ativas')
const tarefasCompletas = document.querySelector('.tarefas-completas')
const botaoAddTarefa = document.querySelector('.adicionar')
const inputAddTarefa = document.querySelector('#addTarefa')
const botaoLimpar = document.querySelector('.limpar')
const caracterCount = document.querySelector('.caracter-count')
const mudarPainelBotao = document.querySelector('.mudar-painel p')

function criarTarefa(){

  let elements = new CreateElement('box-tarefa',  'box-editar', 'botoes-tarefa')
  elements.createDiv()

  if(inputAddTarefa.value === '' || inputAddTarefa.value.length > 30){
    alert('Preencha o campo corretamente')
    inputAddTarefa.value = ''
    caracterCount.innerHTML = 0 + " / 30"
    caracterCount.classList.remove('caracter-ok')
  } else {

    let createTexto = document.createElement('input')
    let newElements = elements.createDiv()
    
    let createNewTask = newElements[0]
    let newEditButton = newElements[1]
    let newBtnExtras = newElements[2]

    createTexto.classList.add("texto-tarefa")
    createTexto.disabled = true

    /* Lista as divs que serão anexas na div pai, e as anexa*/
    let appendItens = [createTexto, newEditButton, newBtnExtras]
    appendItens.forEach(itens => {
      createNewTask.appendChild(itens)
    })
    tarefasAtivas.appendChild(createNewTask)
    createTexto.value = inputAddTarefa.value

    /* lista as ações e anexa na div para ações da tarefa*/
    let allMethods = [completarTarefa(createNewTask), removerTarefa(createNewTask), editarTarefa(createNewTask, createTexto)]
    allMethods.forEach(method => {{
      newBtnExtras.appendChild(method)
    }})

    inputAddTarefa.value = ''
    caracterCount.innerHTML = 0 + " / 30"
  
  }
}

function completarTarefa(tarefa){
  let boxCompletar = document.createElement('div')
  let botaoCompletar = document.createElement('input')
  let botaoCompletarPersonalizado = document.createElement('div')
  
  botaoCompletar.setAttribute('type', 'checkbox')
  boxCompletar.classList.add('box-completar')
  botaoCompletar.classList.add('botao-completar')
  botaoCompletarPersonalizado.classList.add('personalizar-completar')
  
  boxCompletar.appendChild(botaoCompletar)
  boxCompletar.appendChild(botaoCompletarPersonalizado)

  botaoCompletar.onclick = ()=>{
    if(botaoCompletar.checked === false){
      tarefasAtivas.appendChild(tarefa)
      tarefa.classList.remove('completada')
    } else if (botaoCompletar.checked === true){
      tarefasCompletas.appendChild(tarefa)
      tarefa.classList.add('completada')
    }
  }
  return boxCompletar
}

function removerTarefa(tarefa){
  let botaoRemover = document.createElement('div')
  botaoRemover.classList.add('botao-remover')
  botaoRemover.onclick = ()=>{
    if(tarefa.classList.contains('completada')){
      tarefa.classList.add("anim-exit")
      let removerTarefaCompleta = () => { tarefasCompletas.removeChild(tarefa) }
      setTimeout(removerTarefaCompleta, 300)
    } else {
      let removerTarefaAtiva = () => { tarefasAtivas.removeChild(tarefa) }
      tarefa.classList.add("anim-exit")
      setTimeout(removerTarefaAtiva, 300)
    }
  }
  return botaoRemover
}

function editarTarefa(createTarefa, createTexto){
  let botaoEditar = document.createElement('div')
  botaoEditar.classList.add('botao-editar')
  botaoEditar.onclick = ()=>{
    if(createTexto.value === '' || createTexto.value.length > 30){
      alert('Preencha o campo corretamente')
    } else {
      if(createTexto.disabled === false){
        createTexto.disabled = true
        botaoEditar.classList.remove('salvar-edicão')
        createTarefa.classList.remove('destacar-tarefa-modificada')
      } else if (createTexto.disabled === true) {
        createTexto.disabled = false
        botaoEditar.classList.add('salvar-edicão')
        createTarefa.classList.add('destacar-tarefa-modificada')
        createTexto.focus()
        createTexto.setSelectionRange(createTexto.value.length, createTexto.value.length)
      }
    }
  }
  return botaoEditar
}

function limparPainelTarefas(){
  const todasTarefas = document.querySelectorAll('.box-tarefa')
  todasTarefas.forEach(tarefa=>{
    if(tarefa.classList.contains('completada')){
      tarefa.classList.add("anim-exit")
      let removerTarefaCompleta = () => {tarefasCompletas.removeChild(tarefa)}
      setTimeout(removerTarefaCompleta, 300)
    } else {
      tarefa.classList.add("anim-exit")
      let removerTarefaAtiva = () => {tarefasAtivas.removeChild(tarefa)}
      setTimeout(removerTarefaAtiva, 300)
    }
  })
}

function keyboardHandler(event){
  caracterCount.innerHTML = inputAddTarefa.value.length + " / 30"
  inputAddTarefa.value.length > 30 ? caracterCount.classList.add('caracter-ok') : caracterCount.classList.remove('caracter-ok')
  if(event.key === "Enter"){
    criarTarefa()
    inputAddTarefa.value = ''
    caracterCount.innerHTML = 0 + " / 30"
  } 
}

function mudarPainelHandler(){
  if(tarefasAtivas.classList.contains("mostrar-painel")){
    tarefasAtivas.classList.remove("mostrar-painel")
    tarefasAtivas.classList.remove("displayHandle")

    mudarPainelBotao.innerHTML = "Tarefas ativas"

    tarefasCompletas.classList.add("mostrar-painel")
    tarefasCompletas.classList.add("displayHandle")
  } else {
    tarefasAtivas.classList.add("mostrar-painel")
    tarefasAtivas.classList.add("displayHandle")

    mudarPainelBotao.innerHTML = "Tarefas completas"
    
    tarefasCompletas.classList.remove("mostrar-painel")
    tarefasCompletas.classList.remove("displayHandle")
  }
}


botaoAddTarefa.addEventListener('click', criarTarefa)
botaoLimpar.addEventListener('click', limparPainelTarefas)
inputAddTarefa.addEventListener('keyup', keyboardHandler)
mudarPainelBotao.addEventListener('click', mudarPainelHandler)