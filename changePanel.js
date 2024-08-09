export default class ChangePanel {
    constructor(...classes){
        this.allClasses = [...classes]
        this.changePanelText = document.querySelector('.mudar-painel p')
    }

      handleChangePanel(tarefasAtivas, tarefasCompletas){
        if(tarefasAtivas.classList.contains("mostrar-painel")){
            this.allClasses.forEach(itens => {
              tarefasAtivas.classList.remove(itens)
              tarefasCompletas.classList.add(itens)
              this.changePanelText.innerText = "Trocar ativas"
            })
        } else {
            this.allClasses.forEach(itens => {
              tarefasAtivas.classList.add(itens)
              tarefasCompletas.classList.remove(itens)
              this.changePanelText.innerText = "Trocar completas"
            })
        }
    }
}
