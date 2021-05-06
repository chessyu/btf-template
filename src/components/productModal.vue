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
                <Input search enter-button placeholder="输入产品名称进行查询" v-model="queryData" @on-search="change" style="width: auto" />
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
                    key: 'content'
                },
                {
                    title: '价格',
                    key: 'price'
                }
            ],
            tableData:[],
            queryData:'',
            tableHeight:0,
            selectionData:[]
        }
    },
    mounted(){
        this.tableData = productList.map(item => {
            item.sub = 1;
            return item;
        });
        this.tableHeight = window.screen.height - 330;
    },
    methods:{
        ok(){
            this.$emit("selectProductData",this.selectionData)
        },
        change(){
            if(this.queryData === ''){
                this.tableData = productList;
            }
            this.tableData = fuzzyQuery(productList,"name",this.queryData);
        },
        selectData(selection,row){
            this.selectionData = selection;
        }

    },
}
</script>

<style>
.query{
    padding-bottom: 15px;
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
</style>