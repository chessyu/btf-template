<template>
    <table :class="['table-report', mobile ? 'mobeil-table':'']">
        <thead>
            <tr class="table-header">
                <th v-for="(title,i) in titleConfig" :key="i" :class="[mobile ? 'mobeil-thead':'']">{{title}}</th>
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
                            <span>导师签名：<img :src="require('@/assets/'+ baseData.autograph +'.png')"  v-if="baseData.logo" alt=""></span>
                        </div>
                        <div class="chapter">
                            <span>护理机构：xxxx护理机构 <img :src="require('@/assets/'+ baseData.mechChapter +'.png')"  v-if="baseData.logo" alt=""> </span>
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
import { isMobile } from '../assets/js/help.js'
import {company} from '../config'
export default {
    data(){
        return{
            baseData:{},
            mobile:false,
            titleConfig:['产品名称','产品功能','单价','数量'],
            tableData:[],
            sum:1200
        }
    },
    mounted(){
        this.baseData = company;
        this.mobile = isMobile();
        for(var i =0; i<10; i++){
            this.tableData.push({
                name:"产品名称"+ (i+1),
                fun:'XXXXXXXXXXXXXXXXXXXXXXXXX',
                unit:i+ 10,
                number:1
            })
        }
        window.onresize = ()=> {
            this.mobile = isMobile();
        }
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
    width: 50px;
    position: absolute;
    top: -18px;
}
 .chapter>span>img{
    left: 70px;
 }



</style>