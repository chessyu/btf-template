<template>
    <div class="product-list" >
        <h6>{{title}}</h6>
        <p v-for="(item,index) in data" :key="index">{{item.content}}</p>
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
            type:Array,
            require:true
        }
    },
    data(){
        return{

        }
    }
}
</script>


<style>
    .product-list{
        padding: 20px 0;
        color: var(--fontColor);
        text-align: left;
    }
    .product-list h6{
        font-size: 13px;
        font-weight: bold;
        padding-bottom: 10px;
        color: var(--black);
    }
    .product-list p{
        line-height: 2;
        font-size: 12px;
    }
</style>