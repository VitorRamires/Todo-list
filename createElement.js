export default class CreateElement {
    constructor(...element){
        this.allDivs = [...element]
    }

    createDiv(){
        let itensCreation = [...this.allDivs]
        let createnow = itensCreation.map(item => {
            let createAction = document.createElement('div')
            return createAction
        })

        createnow.forEach((item, index)=>{
            item.classList.add(this.allDivs[index])
        })

        return createnow
    }

}
