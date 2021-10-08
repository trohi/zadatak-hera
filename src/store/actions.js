import axios from 'axios'

export default {
    dohvatiZnanstvenPodatke({commit}){
        axios.get('https://mocki.io/v1/53083792-ee35-4ec5-bebb-44e802bd62a0')
        .then(res=>{
            commit('ucitajZnanstvenePodatke', res.data)
        })
        .catch(error=>{
            console.log(error.message)
        })
    },
    dohvatiPodatkeProvjera({commit}){
        axios.get('https://mocki.io/v1/45d27447-2b84-4355-bc89-7758b6498d78')
        .then(res=>{
            commit('ucitajProvjeru',res.data)
        })
        .catch(error=>{
            console.log(error.message)
        })
    },
    brisanjeDuplihPodataka({commit, getters}, payload){
        const podaci = getters.getZnanstvenePodatke
        const match = podaci.filter(element => payload.includes(element))
        match.forEach(element=>{
            const index = podaci.indexOf(element)
            podaci.splice(index, 1)
        })
        console.log(podaci)
        commit('updateZnanstveniPodaci', podaci)
    },
    prosjecnaStaros({commit},payload){
        commit('updateZnanstveniPodaci', payload)
    },
    brisanjeOdabranihPodataka({commit}, payload){
        console.log(payload)
        commit('brisanjePodataka', payload)
    },
    updatePodatke({commit}, payload){
        commit('updateZnanstveniPodaci', payload)
    },
    addToSelected({commit},payload){
        commit('addToSelected',payload)
    },
    deletFromSelected({commit},payload){
        commit('deleteFromSelected', payload)
    },
    brisanjeSvihOdabranih({commit}){
        commit('brisanjeSvihOdabranih')
    },
    moveElement({commit},payload){
        if(payload === "up"){
            commit('moveUp')
        }else {
            commit('moveDown')
        }
    },
    najcesciZanr({commit},payload){
        commit('najscesciZanr', payload)
    }
}