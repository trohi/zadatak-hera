export default {
    getZnanstvenePodatke:state=>{
        return state.znanstveniRadovi
    },
    getZnanstveniRadoviProvjera:state=>{
        return state.znanstveniRadoviProvjera
    },
    disableButtons:state=>{
        return state.disableMoveButtons
    },
    najcesciZanr:state=>{
        return state.najcesciZanr
    }
}