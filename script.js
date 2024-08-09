import CreateElement from "./createElement.js"
import ChangePanel from "./changePanel.js"

const tarefasAtivas = document.querySelector('.tarefas-ativas')
const tarefasCompletas = document.querySelector('.tarefas-completas')
const botaoAddTarefa = document.querySelector('.adicionar')
const inputAddTarefa = document.querySelector('#addTarefa')
const botaoLimpar = document.querySelector('.limpar')
const caracterCount = document.querySelector('.caracter-count')
const mudarPainelBotao = document.querySelector('.mudar-painel p')

function criarTarefa(){
  if(inputAddTarefa.value === '' || inputAddTarefa.value.length > 30){
    alert('Preencha o campo corretamente')
    inputAddTarefa.value = ''
    caracterCount.innerHTML = 0 + " / 30"
    caracterCount.classList.remove('caracter-ok')
  } else {
    
    let elements = new CreateElement('box-tarefa',  'box-editar', 'botoes-tarefa')
    let newElements = elements.createDiv()
    let createTexto = document.createElement('input')
    
    let createNewTask = newElements[0]
    let newEditButton = newElements[1]
    let newBtnExtras = newElements[2]

    createTexto.classList.add("texto-tarefa")
    createTexto.disabled = true

    let appendItens = [createTexto, newEditButton, newBtnExtras]
    appendItens.forEach(itens => {
      createNewTask.appendChild(itens)
    })
    tarefasAtivas.appendChild(createNewTask)
    createTexto.value = inputAddTarefa.value

    let allMethods = [completarTarefa(createNewTask), removerTarefa(createNewTask), editarTarefa(createNewTask, createTexto)]
    allMethods.forEach(method => {{
      newBtnExtras.appendChild(method)
    }})

    inputAddTarefa.value = ''
    caracterCount.innerHTML = 0 + " / 30"
  }
}

function completarTarefa(tarefa){
  let elements = new CreateElement('box-completar',  'personalizar-completar')
  let newElements = elements.createDiv()

  let boxCompletar = newElements[0]
  let newPersonalizateBtn = newElements[1]
  let botaoCompletar = document.createElement('input')
  
  botaoCompletar.setAttribute('type', 'checkbox')
  botaoCompletar.classList.add('botao-completar')

  let completeActions = [botaoCompletar, newPersonalizateBtn]
  completeActions.forEach(item=>{
    boxCompletar.appendChild(item)
  })

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
  let elements = new CreateElement('botao-remover')
  let newElements = elements.createDiv()
  let botaoRemover = newElements[0]
  newElements[0].onclick = ()=>{
    if(tarefa.classList.contains('completada')){
      tarefa.classList.add("anim-exit")
      setTimeout(()=>{ tarefasCompletas.removeChild(tarefa) }, 300)
    } else {
      tarefa.classList.add("anim-exit")
      setTimeout(()=> { tarefasAtivas.removeChild(tarefa) }, 300)
    }
  }
  return botaoRemover
}

function editarTarefa(createTarefa, createTexto){
  let elements = new CreateElement('botao-editar')
  let newElements = elements.createDiv()
  let botaoEditar = newElements[0]
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
  let changePanelClass = new ChangePanel("mostrar-painel", "displayHandle")
  changePanelClass.handleChangePanel(tarefasAtivas, tarefasCompletas)
}

botaoAddTarefa.addEventListener('click', criarTarefa)
botaoLimpar.addEventListener('click', limparPainelTarefas)
inputAddTarefa.addEventListener('keyup', keyboardHandler)
mudarPainelBotao.addEventListener('click', mudarPainelHandler)

export {tarefasAtivas, tarefasCompletas}