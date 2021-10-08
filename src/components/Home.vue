<template>
  <div>
    <div>
      <button @click="brisanjeDuplikata()">Izbaci duple elemente</button>
    </div>
    <div v-if="this.prosjecnaStarost > 0">
      <p>Prosjecna starost je :
        {{this.prosjecnaStarost}} godina
      </p>
    </div>
    <div>
      <button class="move-up" :disabled="this.disableMoveButtons" @click="moveElementUp()">+</button>
      <button class="move-down" :disabled="this.disableMoveButtons" @click="moveElementDown()">-</button>
      <Lista :lista="this.znanstveniPodaci" @deleteEvent="updateList()"></Lista>
      <button class="delete-button" @click="brisanjeSvihOdabranihClanova()">Delete all selected items </button>
    </div>
    <div>
      <h5>Najcesci zanrovi:</h5>
      <div v-for="(zanr,index) in zanrovi" :key="index">
        {{zanr}}
      </div>
    </div>
    <h5>Najduzi podzanr</h5>
    <div v-for="najduzi in najduziPodZanr" :key="najduzi">{{najduzi}}</div>

  </div>
</template>

<script>
import Lista from './List.vue'

export default {
  name: 'Home',
  data(){
    return{
    prosjecnaStarost:0,
    kopijaZnanstveniPodaci:[],
    heighest:'',
    zanrovi:[],
    najduziPodZanr:[]  
    }
  },
  components:{
    Lista
  },
  mounted(){
    setTimeout(()=>{
      this.prosjecnaVrijednost()
      this.sortByAge()
      this.najcesciZanrovi()
      this.podZanroviProvjera()
    },2000)
  },
  methods:{
    updateList(){
      this.prosjecnaVrijednost()
      this.sortByAge()
      this.najcesciZanrovi()
      this.podZanroviProvjera()
    },
    brisanjeDuplikata(){
     function comparer(otherArray){
      return function(current){
        return otherArray.filter(function(other){
          return other.id == current.id 
          }).length !== 0;
        }
      }
    const matchingIDs = this.znanstveniPodaci.filter(comparer(this.znanstveniPodaciProvjera)); 
    this.$store.dispatch('brisanjeDuplihPodataka',matchingIDs)
    this.prosjecnaVrijednost()
    this.najcesciZanrovi()
    this.najduziPodZanr()
    },
    prosjecnaVrijednost(){
      const trenutniDatum =  new Date()
      const trenutniMjesec = trenutniDatum.getUTCMonth()
      const trenutniDan = trenutniDatum.getDate()
      const trenutnaGodina = trenutniDatum.getFullYear()
      const fullYear = trenutniMjesec + "/" + trenutniDan + "/" + trenutnaGodina 


      const datumiIzdavanja =[] 
      this.kopijaZnanstveniPodaci = this.znanstveniPodaci.map(a => {return {...a}})

      this.kopijaZnanstveniPodaci.forEach(element=>{
        const splited =  element.datum.datumIzdanja.split('.')
        const convertedDate = new Date(splited)

        const mjesec = convertedDate.getMonth()+1
        const dan = convertedDate.getDate()
        const godina = convertedDate.getFullYear()
        const shortDate = mjesec + "/" + dan + "/" + godina;

        const currentDate = new Date(fullYear)
        const publishDate = new Date(shortDate)

        const differenceInTime = (currentDate.getTime() - publishDate.getTime()) / (1000 * 3600 * 24) / 360
        datumiIzdavanja.push(differenceInTime)
        element.starost = differenceInTime.toFixed(2)
      })

      console.log(this.kopijaZnanstveniPodaci)

      const sum = (datumiIzdavanja.reduce((partialSum, a) => partialSum + a,0)) / (datumiIzdavanja.length)
      this.prosjecnaStarost = sum.toFixed(2)
    },
     sortByAge(){
      this.kopijaZnanstveniPodaci.sort((a,b)=>{
        return a.starost - b.starost
      })
      console.log(this.kopijaZnanstveniPodaci)
      this.$store.dispatch('updatePodatke', this.kopijaZnanstveniPodaci)
    }, 
    brisanjeSvihOdabranihClanova(){
      this.$store.dispatch('brisanjeSvihOdabranih');
      this.prosjecnaVrijednost()
      this.najcesciZanrovi()
      this.najduziPodZanr()
    },
    moveElementUp(){
      this.$store.dispatch('moveElement','up')
    },
    moveElementDown(){
      this.$store.dispatch('moveElement','down')
    },
    najcesciZanrovi(){
      this.zanrovi=[]
      const podaci = this.znanstveniPodaci 
        
        const holder = {}

        for(let i = 0; i<podaci.length; i++){
            if(podaci[i].zanr.length > 1){
              for(let j = 0; j<podaci[i].zanr.length; j++){
                if( !holder[podaci[i].zanr[j]]){
                  holder[podaci[i].zanr[j]] = 1
                } else {
                  holder[podaci[i].zanr[j]]++
                }
              } 
            }
            else{
              if(!holder[podaci[i].zanr]){
                holder[podaci[i].zanr] = 1
              } else {
                holder[podaci[i].zanr]++
              }
            }
        }
        console.log(holder)
        for(let zanr in holder){
          if(holder[zanr] >= 3){
            this.zanrovi.push(zanr)
          }
        }
        this.bojenjeZanra()
    },
    bojenjeZanra(){
      let heighest = this.zanrovi[0]
      this.zanrovi.forEach(element=>{
        if(element > heighest){
            heighest = element
          }
      })
      this.$store.dispatch('najcesciZanr', heighest)
    },
     podZanroviProvjera(){
      let najduziClan = []
      let podZanrovi = this.znanstveniPodaci
      podZanrovi.map(element=>{
        if(element.podZanrovi){
            element.podZanrovi.map(el =>{
              if(el.naziv.length > 17){
                najduziClan.push(el.naziv)
              }
            })
        }
      })
      this.najduziPodZanr = najduziClan 
    } 
  },

  computed:{
    znanstveniPodaci(){
      return this.$store.getters.getZnanstvenePodatke
    },
    znanstveniPodaciProvjera(){
      return this.$store.getters.getZnanstveniRadoviProvjera
    },
    disableMoveButtons(){
      return this.$store.getters.disableButtons
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.move-up{
  height:36px;
  border:1px solid green;
  margin:16px;
  border-radius: 4px;
  padding:10px
}

.move-up:disabled{
  border:0px 
}

.move-up:hover{
  color:white;
  background-color: green;
}

.move-up:disabled:hover{
  background-color:grey
}

.move-down{
  height:36px;
  border:1px solid red;
  margin:16px;
  border-radius: 4px;
  padding:10px
}

.move-down:disabled{
  border:0px
}

.move-down:hover{
  color:white;
  background-color:red
}

.move-down:disabled:hover{
  background-color:grey;
}
</style>
