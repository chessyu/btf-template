<template>
<!-- 护肤方案 -->
    <div class="care-box">  
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
                <FormItem label="推荐产品" class="formItem">
                    <Icon type="ios-add-circle-outline item-add" :size="23" />
                    <div>
                        <p></p>
                        
                    </div>
                </FormItem>
            </Form>
            <div class="next">
               生成报告
            </div>
        </div>
    </div>
</template>

<script>
import { skinCare } from '@/assets/js/skinCare.js'
export default {
    data(){
        return {
            skinCareList : [],
            animal:'敏感红血丝',
            formItem:{
                symptom:'',
                diagnosis:'',
                solution:'',
                hint:''
            }
        }
    },
    mounted(){
        this.skinCareList = skinCare;
        this.formItem.symptom = skinCare[0].symptom;
        this.formItem.diagnosis = skinCare[0].diagnosis;
        this.formItem.solution = skinCare[0].solution;
        this.formItem.hint = skinCare[0].hint;
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
.care-box-left .box-list{
    padding: 10px 20px;
}
.care-box-right{
    flex: 1;
    padding: 10px 20px;
    overflow: auto;
}
.next{
    position: absolute;
    bottom: 40px;
    right: 60px;
    padding: 10px 15px;
    background-color: var(--pink);
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

}
</style>