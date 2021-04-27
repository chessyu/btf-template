<template>
    <div class="configure">

    </div>
</template>

<script>
import {skinCare} from '@/assets/js/skinCare.js' 
export default {
    data(){
      return{
        tableDataList : [],
      }  
    },
    methods:{
        
    },
    mounted(){
        this.tableDataList = skinCare;
        console.log(this.tableDataList);
    }
}
</script>

