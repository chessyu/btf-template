<template>
    <table :class="['table-report', mobile ? 'mobeil-table':'']">
        <thead>
            <tr class="table-header">
                <th v-for="(title,i) in titleConfig" :key="i" :class="[mobile ? 'mobeil-thead':'']">{{ i == 2 ? title +'(¥)' : title}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in tableData" :key="index">
                <td v-for="keys in item" :key="keys">{{keys}}</td>
            </tr>
            <tr class="sum-tr">
                <td colspan="4">合计：<span>¥{{sum}}</span></td>
            </tr>
            <tr class="autograph">
                <td colspan="4">
                    <div class="td-autograph">
                        <div class="tutor">
                            <span>导师签名：<img :src="require('@/assets/img/'+ baseData.autograph +'.png')"  v-if="baseData.logo" alt=""></span>
                        </div>
                        <div class="chapter">
                            <span>护理机构：<span class="botten">{{baseData.chapter}}</span><img :src="require('@/assets/img/'+ baseData.mechChapter +'.png')"  v-if="baseData.logo" alt=""> </span>
                        </div>
                        <div class="report-date">
                            <span>报告日期：2021-04-21</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
        
    </table>
</template>

<script>
import {company} from '../config'
export default {
    props:{
        titleConfig:{
            type:Array,
            require:true
        },
        mobile:{
            type:Boolean,
            default:false
        },
        tableData:{
            type:Array,
            require:true
        },
        
        
    },
    data(){
        return{
            baseData:{},
            
        }
    },
    computed:{
        sum(){
            var sub = 0;
            this.tableData.forEach(item => {
                sub += Number(item.unit) * item.number
            })
            return sub;
        }
    },
    mounted(){
        this.baseData = company;
        
    },
}
</script>

<style>
.table-report{
    border-collapse: collapse;
    width: 100%;
}
.table-header{
    
    min-width: 25px;
    border-radius: 5px 5px 0 0 ;
}
.table-header th{
    padding: 5px 10px;
    border:1px solid var(--black-700);
    background: var(--pink);
    color: var(--wite);
    font-size: 14px;
}
.table-header th:first-child{
    min-width: 120px;
}
.table-header th:nth-child(2){
    min-width: 200px;
}
.table-header th:nth-child(3){
    min-width: 100px;
}
.table-header th:nth-child(4){
    min-width: 80px;
}
.table-report td{
    border:1px solid var(--black-700);
    font-size: 12px;
    padding: 10px 5px;
}

.mobeil-table{
    table-layout: fixed;
    width: unset !important;
}
.mobeil-thead{
    position: sticky;
    top: 0;
    z-index: 6;
}
.table-report>tbody>tr>td:first-child{
    text-decoration: underline;
    font-weight: bold;
}
.table-report .sum-tr > td{
    text-decoration: unset !important;
    text-align: right;
}
.table-report .sum-tr > td>span{
    color:var(--red);
}

.autograph{
    height: 80px;
}
.autograph .td-autograph{
    display: flex;
}
.tutor, .chapter, .report-date{
    flex:1;
}

.tutor{
    text-align: left;
    padding-left: 20px;
}
.report-date{
    text-align: right;
    padding-right: 20px;
}

.tutor>span , .chapter>span{
    position: relative;
}
.tutor>span>img, .chapter>span>img{
    width: 100px;
    position: absolute;
    top: -11px;
}
 .chapter>span>img{
    left: 64px;
    top: -54px;
 }
 .table-report .autograph > td{
    text-decoration: unset !important;
}
.botten{
    text-decoration: underline;
}


</style>