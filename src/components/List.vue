<template>
    <div v-if="lista">
        <table>
            <tr>
                <th>naziv</th>
                <th>autor</th>
                <th>starost</th>
                <th>zanr</th>
            </tr>
                <ListItem v-for="list in lista" :key="list.id" :item="list" @deleteItem="passEvent()">
                </ListItem>
        </table>
    </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
    name:'List',
    props:['lista'],
    components:{
        ListItem
    },
    methods:{
        passEvent(){
            this.$emit('deleteEvent')
        }
    }
}
</script>

<style scoped>
table{
    border:2px solid gray;
    margin:0 auto
}

</style>