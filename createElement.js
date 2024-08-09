export default class CreateElement {
    constructor(div1, div2, div3){
        this.allDivs = [div1, div2, div3]
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
