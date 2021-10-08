<template>
    <tr @click="toggleClasses()">
        <th class="gray-border" :class="{'red-border':isActive}">
        {{item.naziv}}
        </th>
        <th class="gray-border" :class="{'red-border':isActive}">
        {{item.autor}}
        </th>
        <th class="gray-border" :class="{'red-border':isActive}">
        {{item.starost}}
        </th>
        <th class="gray-border" :class="{'red-border':isActive}">
            <div  v-for="zan in item.zanr" :key="zan">
                <p :class="najcesciZanr === zan ? 'red-text' : '' ">{{zan}}</p>
            </div>
        </th>
        <th class="gray-border" :class="{'red-border':isActive}">
            <button class="delete-button" @click.stop="deleteItem()">
                Delete
            </button>
        </th>
    </tr>
</template>

<script>
export default {
    name:'ListItem',
    props:['item'],
    data(){
        return{
            isActive:false
        }
    },
    methods:{
        toggleClasses(){
            if(this.isActive){
                this.isActive = false
                this.$store.dispatch('deletFromSelected',this.item)
            } else {
                this.isActive = true
                this.$store.dispatch('addToSelected', this.item)
            }
        },
        deleteItem(){
            this.$emit('deleteItem')
            this.$store.dispatch('brisanjeOdabranihPodataka', this.item.id)
            this.$store.dispatch('deletFromSelected',this.item) 
        }
    },
    computed:{
        najcesciZanr(){
            return this.$store.getters.najcesciZanr
        }
    }
}
</script>

<style>

th{
    padding:4px
}

.gray-border{
    border:2px solid gray;
}

.red-border{
    border: 2px solid red;
}

.delete-button{
    height:36px;
    border:1px solid red;
    margin:12px;
    border-radius: 4px;
}

.delete-button:hover{
    background-color:red;
    color:white
}

.red-text{
    color:red
}
</style>