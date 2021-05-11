<template>
<!-- 护肤方案 -->
    <div>
        <steps :current="current" :stepsData="stepsData" />

        <div class="care-box" ref="careBox" v-show="current == 0">  
            <RadioGroup  class="care-box-left" v-model="animal" @on-change="selectRadio">
                <Radio class="box-list" v-for="(item,index) in skinCareList" :key="index" :label="item.name">{{item.name}}</Radio>
            </RadioGroup>
            <div  class="care-box-right">
                <Form :model="formItem" :label-width="80">
                    <FormItem label="肌肤症状">
                        <Input v-model="formItem.symptom" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入肌肤症状..."></Input>
                    </FormItem>
                    <FormItem label="问题诊断">
                        <Input v-model="formItem.diagnosis" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入问题诊断..."></Input>
                    </FormItem>
                    <FormItem label="解决方案">
                        <Input v-model="formItem.solution" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入解决方案..."></Input>
                    </FormItem>
                    <FormItem label="温馨提示">
                        <Input v-model="formItem.hint" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入温馨提示..."></Input>
                    </FormItem>
                    <FormItem label="注意事项">
                        <Input v-model="formItem.attentions" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入注意事项..."></Input>
                    </FormItem>
                    <!-- <FormItem label="推荐产品" class="formItem">
                        <Icon type="ios-add-circle-outline item-add" :size="23" @click="showProductModal" />
                        <ul class="product-list">
                            <li v-for="(item,index) in productList" :key="index">
                                <div class="product-name">{{item.name}}</div>
                                <div class="product-content">{{item.content}}</div>
                                <div class="product-price"> {{item.price}}</div>
                                <div class="product-sub"> <InputNumber  v-model="item.sub" /></div>
                            </li>
                        </ul>
                    </FormItem> -->
                </Form>
                
            </div>
            <!-- <product-modal  :value="selecProdct" @input="changeSelectProdct"  @selectProductData="selectProductData" /> -->
            
        </div>

        <div class="care-prodct" v-show="current == 1">
            <div class="query">
                <Input class="search-list" style="margin-left:0;" search enter-button placeholder="输入产品名称进行查询" v-model="queryData" @on-search="change('name',queryData)" />
                <Select v-model="typeModel"  class="search-list" clearable placeholder="选择系列名称" style="width:200px;"  @on-change="change('type',typeModel)">
                    <Option v-for="(item,index) in typeList" :value="item" :key="item.value +'_'+ index">{{ item }}</Option>
                </Select>
                
            </div>
            <Table :height="tableHeight"  stripe :columns="titleConfig" :data="tableData" @on-selection-change="selectData">
                <template slot-scope="{ row }" slot="features">
                    <div @click="chckTextarea(row)" v-show="!row.edit">
                        {{row.features}}
                    </div>
                    <Input v-show="row.edit" v-model="row.features" type="textarea" :autosize="{minRows: 2,maxRows: 5}" @on-blur="onBlur(row)" ></Input>
                </template>

                <template slot-scope="{ row }" slot="weight">
                    <RadioGroup v-model="row.Milligram" @on-change="radioChange(row)">
                        <Radio :label="keys.Milligram" v-for="(keys,index) in row.weight" :key="index" style="display:'flex'" >
                            <span class="content-span">规格：{{keys.Milligram}}g</span><span  class="content-span">价格：¥{{keys.price}}.00</span>
                        </Radio>
                    </RadioGroup>
                </template>
            </Table>
        </div>


        <div class="bottom-box">
            <div class="next pre" @click="pre" v-show="current > 0">上一步</div>
            <div class="next" @click="next">{{current == 2 ? '生成报告' :'下一步'}}</div>
        </div>
    </div>
</template>

<script>
import { skinCare,productList } from '@/assets/js/skinCare.js'
// import productModal from '@/components/productModal.vue'
import { fuzzyQuery } from '@/assets/js/help.js'
import steps from '@/components/steps.vue'
import {mapActions} from 'vuex'
export default {
    components:{
        // productModal,
        steps
    },
    data(){
        return {
            current:0,
            selecProdct:false,
            skinCareList : [],
            animal:'敏感红血丝',
            formItem:{
                symptom:'',
                diagnosis:'',
                solution:'',
                hint:'',
                attentions:''
            },
            productList:[],
            stepsData:[
                {
                    current:0,
                    title:'编辑诊断'
                },
                {
                    current:1,
                    title:'修复产品'
                },
                {
                    current:2,
                    title:'生成模版'
                },
            ],
             titleConfig:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '产品名称',
                    key: 'name',
                    width:180,
                },
                {
                    title: '产品功效',
                    key: 'features',
                    slot:'features'
                },
                {
                    title: '规格/价格',
                    key: 'weight',
                    width: 240,
                    slot:'weight',
                    // render:function(h,{row,column,index}){
                    //     return h('div',{
                           
                    //     },row.weight.map(item=>{
                    //         return h('p',{
                    //             style:{
                    //                 display:'flex'
                    //             },
                    //             domProps: {
                    //                 innerHTML: `<span class="content-span">规格：${item.Milligram}g</span><span  class="content-span">价格：¥${item.price}.00</span>`
                    //             },
                    //         })
                    //     }))
                    // }
                },
                {
                    title:"系列",
                    key:"type",
                    width:110
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
        this.skinCareList = skinCare;
       
        this.formItem.symptom = skinCare[0].symptom;
        this.formItem.diagnosis = skinCare[0].diagnosis;
        this.formItem.solution = skinCare[0].solution;
        this.formItem.hint = skinCare[0].hint;
        this.formItem.attentions = skinCare[0].attentions;

        this.tableData = productList.map(item => {
            item.sub = 1;
            item.edit = false;
            item.Milligram = item.weight[0].Milligram;
            item.price = item.weight[0].price;
            if(this.typeList.indexOf(item.type) === -1){
                this.typeList.push(item.type);
            }
            return item;
        });
        
        this.tableHeight = window.screen.height - 420;
    },
    methods:{
        selectRadio(val){
            this.skinCareList.forEach(item => {
                if(val === item.name){
                    this.formItem.symptom = item.symptom;
                    this.formItem.diagnosis = item.diagnosis;
                    this.formItem.solution = item.solution;
                    this.formItem.hint = item.hint;
                }
            })
        },
        // showProductModal(){
        //     this.selecProdct = true;
        // },
        // changeSelectProdct(val){
        //     this.selecProdct = val;
        // },
        // selectProductData(data){
        //     this.productList = data;
        // },
        renderTemplate(){
            this.setSkinCareData({
                formItem:this.formItem,
                productList:this.selectionData
            });
            this.$router.push({name:'template'})
        },
        ...mapActions(["setSkinCareData"]),
        pre(){
            this.current -= 1;
        },
        next () {
            if(this.current === 2 ){
                this.renderTemplate();
            }else{
                this.current += 1;
            }
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
        chckTextarea(row){

            row.edit = true;
            this.$nextTick(()=>{
                window.event.target.parentNode.children[1].children[0].focus();
            })
            
        },
        onBlur(row){
            row.edit = false;
        },
        radioChange(row){
            this.tableData[row._index].price = row.weight.filter(item=>item.Milligram == row.Milligram)[0].price;
            this.tableData[row._index].Milligram = row.Milligram;
        }
    }
}
</script>

<style>
.care-box{
    width: 100%;
    height: 100%;
    display: flex;
}
.care-box-left{
    width: 180px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    text-align: left;
    overflow-y: auto;
}
.care-prodct{
    padding: 10px 30px;
}
.care-box-left .box-list{
    padding: 10px 20px;
}
.care-box-right{
    flex: 1;
    padding: 10px 20px;
    overflow: auto;
}
.bottom-box{
    display: flex;
    padding-bottom: 10px;
}
.pre{
    border: 1px solid var(--borderColor);
    background-color: var(--wite) !important;
    color:var(--black) !important;
}
.next{
    float: left;
    margin: auto;
    padding: 7px 15px;
    background-color: var(--blue);
    color: #fff;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
    
}
.next:hover{
    opacity: .9;
}
.formItem{
    text-align: left;
}
.item-add{
   cursor: pointer;
}
.product-list{
    list-style-type: none;
}
.product-list li{
    display: flex;
}
.product-name{
    width: 100px;
}
.product-content{
    flex: 1;
    overflow: hidden;
}
.product-price{
    width: 100px;
}
.product-sub{
    width: 150px;
}
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