<template>
  <div class="contiter" ref="contiter" id="contiter">
    <div class="header">
      <div class="company_logo">
        <img :src="require('@/assets/img/'+ baseData.logo +'.jpg')" v-if="baseData.logo" alt="">
      </div>
      <span class="info-name">护肤方案</span>
      <span class="code"> 
        <!-- <img id="barcode" />  -->
        <vue-qr  id="barcode" :logoSrc="require('@/assets/img/'+ baseData.logo +'.jpg')" v-if="baseData.mechChapter"  :text="baseData.prexi" :logoScale="50" :size="300"></vue-qr>
       </span>
    </div>
    <div class="info">
      <div class="info-cont">
        <p class="hoverName">姓名：
          <span class="hoverSpan">{{currtName}}</span>
          <input class="hoverInput" type="text" v-model="currtName" >
        </p>
        <p>编号：<span>{{baseData.prexi}}</span></p>
      </div>
      <div class="info-header">
        <!-- <img src="../assets/logo.png" alt=""> -->
        <!-- <a href="javascript;"> <input type="file"></a> -->
       
      </div>
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in skinCareData" :key="i" />
    </div>
    <div class="cace-table">
      <p  class="info-title">护肤方案</p>
      <table-report :titleConfig="titleConfig" :tableData="tableData" :mobile="mobile" />
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in skinCareDataAttentions" :key="i" />
    </div>
    <div class="btn-box">
      <span class="btn" @click="toCanvase">生成海报</span>
    </div>
  </div>
</template>

<script>
import {company} from '../config'
import {addWaterMarker, isMobile, getDateTime} from '../assets/js/help.js'
import List from '../components/list.vue'
import tableReport from '../components/tableReport.vue'
import VueQr from 'vue-qr'
import html2canvas from 'html2canvas'
import {mapGetters} from 'vuex'
// import jsbarcode from 'jsbarcode'
export default {
  name:"hf-template",
  components:{
    List,
    tableReport,
    VueQr
  },
  props:{
    customerInfo:{    //客户的基础资料
      type:Object,
      require:true
    },
    solution:{            //诊断结果及方案
      type:Array,
      require:true
    },
    productList:{       //产品列表数据
      type:Array,
      require:true
    }
  },
  data(){
    return{
      baseData:{},
      titleConfig:['产品名称','产品功能','单价','数量'],
      tableData:[],
      mobile:false,
      skinCareData:[],
      skinCareDataAttentions:[],
      currtName:'陈壮壮',

    }
  },
  mounted(){
    
    this.getCachData();
    addWaterMarker({content:this.baseData.waterMarker,container:this.$refs.contiter});

    this.init();
    this.mobile = isMobile();
    window.onresize = ()=> {
      this.mobile = isMobile();
    }
    // jsbarcode(
    //   '#barcode',
    //   'ABWDW20210304032100',
    //   {
    //     width:isMobile()? 1: 2,
    //     displayValue: true, // 是否在条形码下方显示文字
    //   }
    // )
  },
  methods:{
    init(){

      this.tableData = this.getSkinCareData.productList.map(item => {
        return {
          name:item.name,
          fun : item.content,
          unit:item.price,
          number:item.sub
        }
      })
      

      for( var key in  this.getSkinCareData.formItem){
        console.log(1)
        switch(key){
          case "symptom":
            this.skinCareData.push(
              {
                title:"肌肤症状",
                data:this.getSkinCareData.formItem[key]
              }
            )
            break;
          case "diagnosis":
           this.skinCareData.push( {
              title:"问题诊断",
              data:this.getSkinCareData.formItem[key]
            })
             break;
          case "solution":
           this.skinCareData.push( {
              title:"解决方案",
              data:this.getSkinCareData.formItem[key].split('\n')
            })
            break;
          case "hint":
           this.skinCareData.push( {
              title:"温馨提示",
              data:this.getSkinCareData.formItem[key].split('\n')
            })
             break;
          case "attentions":
            this.skinCareDataAttentions.push({
              title:"注意事项",
              data:this.getSkinCareData.formItem[key].split('\n')
            })
             break;
        }
      }

    },
    toCanvase(){
      var _this = this;
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.getElementsByClassName('btn')[0].style.display="none";

      html2canvas(document.getElementById("contiter"),{scale:4}).then(function(canvas) {
        const link = document.createElement('a')
        link.href = canvas.toDataURL()
        link.setAttribute('download', _this.baseData.prexi + '.png')
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        link.remove();
      });

      setTimeout(()=>{
        document.getElementsByClassName('btn')[0].style.display="block";
      },1000)
    },
    getCachData(){
      this.baseData = company;
      this.baseData.prexi = this.baseData.prexi +  getDateTime()
      console.log(this.baseData)
    },
    handleSuccess(){

    },
    handleFormatError(){

    },
    handleMaxSize(){

    },
    handleBeforeUpload(){

    }
  },
  computed:{
    ...mapGetters(['getSkinCareData']),
    
  }
}
</script>
