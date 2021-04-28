<template>
  <div class="contiter" ref="contiter" id="contiter">
    <div class="header">
      <div class="company_logo">
        <img :src="require('@/assets/'+ baseData.logo +'.png')" v-if="baseData.logo" alt="">
      </div>
      <span class="info-name">护肤方案</span>
      <span class="code"> 
        <!-- <img id="barcode" />  -->
        <vue-qr  id="barcode" :logoSrc="require('@/assets/'+ baseData.logo +'.png')" v-if="baseData.logo"  :text="baseData.prexi" :logoScale="50" :size="300"></vue-qr>
       </span>
    </div>
    <div class="info">
      <div class="info-cont">
        <p>姓名：<span>陈壮壮</span></p>
        <p>编号：<span>{{baseData.prexi}}</span></p>
      </div>
      <div class="info-header">
        <img src="../assets/logo.png" alt="">
      </div>
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in data" :key="i" />
    </div>
    <div class="cace-table">
      <table-report :titleConfig="titleConfig" :tableData="tableData" :mobile="mobile" :sum="1500" />
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in tip" :key="i" />
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
      data :[
        {
          title:'肌肤症状:',
          data:[
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            }
          ]
        },
        {
          title:'问题诊断:',
          data:[
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            }
          ]
        },
        {
          title:'解决方案:',
          data:[
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
          ]
        },
        {
          title:'温馨提示:',
          data:[
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            }
          ]
        },
      ],
      tip:[
        {
          title:'注意事项:',
          data:[
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            },
            {
              content:'aaaajalksdfjlas;kfjas;lfkjas;dfkkjkj;l'
            }
          ]
        },
      ],

    }
  },
  mounted(){
    addWaterMarker({content:"陈壮壮护理方案",container:this.$refs.contiter});
    this.init();
    this.getCachData();
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
      for(var i =0; i<10; i++){
        this.tableData.push({
          name:"产品名称"+ (i+1),
          fun:'XXXXXXXXXXXXXXXXXXXXXXXXX',
          unit:i+ 10,
          number:1
        })
      }

    },
    toCanvase(){
      var _this = this;
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.getElementsByClassName('btn')[0].style.display="none";

      html2canvas(document.getElementById("contiter"),{scale:5}).then(function(canvas) {
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
    }
  }
}
</script>
