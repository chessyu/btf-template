<template>
    <div class="product-list" >
        <h6>{{title}}</h6>
        <template v-if="isArray">
            <p v-for="(item,index) in data" :key="index" >{{item}}</p>
        </template>
        <p v-else>{{data}}</p>
    </div>
    
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            require:true
        },
        data:{
            type:String | Array,
            require:true
        }
    },
    data(){
        return{

        }
    },
    computed:{
        isArray(){
            return this.data instanceof Array ;
        }
    }
}
</script>


<style>
    .product-list{
        padding-top: 10px;
        color: var(--fontColor);
        text-align: left;
    }
    .product-list h6{
        font-size: 13px;
        font-weight: bold;
        padding-bottom: 5px;
        color: var(--black);
    }
    .product-list p{
        line-height: 2;
        font-size: 12px;
    }
</style>