<template>
    <Modal
        v-model="changeValue"
        title="选择销售产品"
        width="80%"
        fullscreen
        :mask-closable="false"
        @on-ok="ok">
        <div class="box"  ref="modal">
            <div class="query">
                <Input class="search-list" style="margin-left:0;" search enter-button placeholder="输入产品名称进行查询" v-model="queryData" @on-search="change('name',queryData)" />
                <Select v-model="typeModel"  class="search-list" clearable placeholder="选择系列名称" style="width:200px;"  @on-change="change('type',typeModel)">
                    <Option v-for="(item,index) in typeList" :value="item" :key="item.value +'_'+ index">{{ item }}</Option>
                </Select>
                
            </div>
            <Table :height="tableHeight"  stripe :columns="titleConfig" :data="tableData" @on-selection-change="selectData"></Table>

        </div>
    </Modal>
</template>

<script>
import { productList } from '@/assets/js/skinCare.js'
import { fuzzyQuery } from '@/assets/js/help.js'

export default {
    props:{
        value:{
            type:Boolean,
            default:false
        },

    },
    computed:{
        changeValue:{
            get(){
                return this.value;
            },
            set(){
                this.$emit("input",false)
            }
        }
    },
    data(){
        return {
            titleConfig:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '产吕名称',
                    key: 'name'
                },
                {
                    title: '产品功效',
                    key: 'features'
                },
                {
                    title: '规格/价格',
                    key: 'weight',
                    render:function(h,{row,column,index}){
                        return h('div',{
                           
                        },row.weight.map(item=>{
                            return h('p',{
                                style:{
                                    display:'flex'
                                },
                                domProps: {
                                    innerHTML: `<span class="content-span">规格：${item.Milligram}g</span><span  class="content-span">价格：¥${item.price}.00</span>`
                                },
                            })
                        }))
                    }
                },
                {
                    title:"系列",
                    key:"type"
                }
            ],
            tableData:[],
            queryData:'',
            tableHeight:0,
            selectionData:[],
            typeModel:'',
            typeList:[]
        }
    },
    mounted(){
        this.tableData = productList.map(item => {
            item.sub = 1;
            if(this.typeList.indexOf(item.type) === -1){
                this.typeList.push(item.type);
            }
            return item;
        });
        
        this.tableHeight = window.screen.height - 330;
    },
    methods:{
        ok(){
            this.$emit("selectProductData",this.selectionData)
        },
        change(type,value){
            if(value === ''){
                this.tableData = productList;
            }
            this.tableData = fuzzyQuery(productList,type,value);
        },
        selectData(selection,row){
            this.selectionData = selection;
        },
        

    },
}
</script>

<style>
.query{
    padding-bottom: 15px;
    overflow: hidden;
}
.box{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.tablePage{
    margin-top: 15px;
    text-align: right;
}
.content-span{
    flex: 1;
}
.search-list{
     width: auto;
    float: left;
    margin: 0 20px;

}
</style>