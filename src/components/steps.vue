<template>
    <ul class="steps-ul">
        <li v-for="( item, index ) in stepsData" :key="index" :class="['stepAfter','stepBefoer',current > index? 'success':'']">
            <div>
                <img class="steps-img ul-li-img" src="../assets/img/success.png" alt="" v-if="current > index">
                <span :class="['steps-img', current >= index? 'steps-success' :'']" v-else>{{index + 1}}</span>
                <span :class="['steps-title']">{{current > index ? '已完成' : item.title}}</span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        stepsData:{
            type:Array,
            require:true
        },
        current:{
            type:Number,
            default:0
        }
    }
}
</script>

<style scoped>
.steps-ul{
    list-style-type: none;
    display: flex;
    padding: 10px 20px;
}
.steps-ul li{
    flex:1;
    padding: 10px 20px;
}
/* .steps-ul li:first-child{
    text-align: left;
}
.steps-ul li:last-child{
    text-align: right;
} */
.steps-img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    background-color: var(--borderColor);
    color:var(--wite);
}
.steps-success{
    background-color: var(--blue);
}
.steps-ul li .ul-li-img{
    border: none;
    vertical-align: middle;
    background-color: unset !important;
}
.steps-title{
    margin-left: 5px;
}
.success{
    color :var(--blue);
}
.stepAfter,.stepBefoer{
    position:relative;

}
.success.stepAfter::after, .success.stepBefoer::before{
    background-color:var(--blue) !important;
}

.steps-ul .stepAfter:first-child::after {
    position: unset !important;
}
.steps-ul .stepBefoer:last-child::before {
    position: unset !important;
}
.stepAfter::after{
    content: '';
    position:absolute;
    top:50%;
    left: 0px;
    width: 35%;
    height: 2px;
    background-color:var(--borderColor);
}
.stepBefoer::before{
    content: '';
    position:absolute;
    top:50%;
    right: 0px;
    width: 35%;
    height: 2px;
    background-color:var(--borderColor);
}
</style>