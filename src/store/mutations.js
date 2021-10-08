export default {
    ucitajZnanstvenePodatke(state, payload){
        state.znanstveniRadovi = payload
    },
    ucitajProvjeru(state, payload){
        state.znanstveniRadoviProvjera = payload
    },
    updateZnanstveniPodaci(state, payload){
        state.znanstveniRadovi = payload
    },
    brisanjePodataka(state, payload){
        for(let i = 0; i< state.znanstveniRadovi.length; i++ ){
            if(state.znanstveniRadovi[i].id === payload){
                let index = state.znanstveniRadovi.indexOf(state.znanstveniRadovi[i])
                state.znanstveniRadovi.splice(index,1)
            }
        }
    },
    addToSelected(state, payload){
        state.selectedItems.push(payload)
        if(state.selectedItems.length == 1){
            state.disableMoveButtons = false
        } else {
            state.disableMoveButtons = true
        }
    },
    deleteFromSelected(state, payload){
        for(let i = 0; i < state.selectedItems.length; i++){
            const index = state.selectedItems.indexOf(payload)
            if(index >-1){
                state.selectedItems.splice(index, 1)
            }
            if(state.selectedItems.length == 1){
                state.disableMoveButtons = false
            } else {
                state.disableMoveButtons = true
            }
        }
    },
    brisanjeSvihOdabranih(state){
            state.znanstveniRadovi = state.znanstveniRadovi.filter(element => !state.selectedItems.includes(element))
            state.selectedItems = []

    },
    moveUp(state){
       const index = state.znanstveniRadovi.indexOf(state.selectedItems[0])
       state.znanstveniRadovi.splice(index, 1)
       if(index === 0){
            state.znanstveniRadovi.splice(state.znanstveniRadovi.length, 0, state.selectedItems[0])
       } else {
        state.znanstveniRadovi.splice(index-1, 0, state.selectedItems[0])
       }
    },
    moveDown(state){
       const index = state.znanstveniRadovi.indexOf(state.selectedItems[0])
       state.znanstveniRadovi.splice(index, 1)
       if(index === (state.znanstveniRadovi.length)){
           state.znanstveniRadovi.splice(0, 0, state.selectedItems[0])
       } else {
        state.znanstveniRadovi.splice(index+1, 0, state.selectedItems[0])
       }
    },
    najscesciZanr(state, payload){
        state.najcesciZanr = payload
    }
}