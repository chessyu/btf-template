<template>
  <div class="contiter" ref="contiter" id="contiter">
    <div class="header">
      <div class="company_logo">
        <img :src="require('@/assets/'+ baseData.logo +'.png')" v-if="baseData.logo" alt="">
      </div>
      <span class="info-name">陈壮壮护肤方案</span>
      <span class="code"> 
        <!-- <img id="barcode" />  -->
        <vue-qr  id="barcode" :logoSrc="imageUrl" :text="codeValue" :logoScale="50" :size="300"></vue-qr>
       </span>
    </div>
    <div class="info">
      <div class="info-cont">
        <p>姓名：<span>陈壮壮</span></p>
        <p>编号：<span>ABWDW20210304032100</span></p>
      </div>
      <div class="info-header">
        <img src="../assets/logo.png" alt="">
      </div>
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in data" :key="i" />
    </div>
    <div class="cace-table">
      <table-report />
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
import {addWaterMarker, isMobile} from '../assets/js/help.js'
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
      codeValue:"ABWDW20210304032100",
      imageUrl:require('../assets/logo.png')
    }
  },
  mounted(){
    addWaterMarker({content:"陈壮壮护理方案",container:this.$refs.contiter});
    this.getCachData();
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
    toCanvase(){
      var _this = this;
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.getElementsByClassName('btn')[0].style.display="none";

      html2canvas(document.getElementById("contiter"),{scale:5}).then(function(canvas) {
        const link = document.createElement('a')
        link.href = canvas.toDataURL()
        link.setAttribute('download', _this.codeValue + '.png')
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
      //生成编号。
    }
  }
}
</script>
