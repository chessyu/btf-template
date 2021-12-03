<template>
  <div class="contiter" ref="contiter" id="contiter">
    <div class="header">
      <div class="company_logo">
        <img :src="require('@/assets/img/'+ baseData.logo +'.png')" v-if="baseData.logo" alt="">
      </div>
      <input type='text' :value="currtName + '方案'" class="info-name" />
      <span class="code"> 
        <!-- <img id="barcode" />  -->
        <vue-qr  id="barcode" :logoSrc="require('@/assets/img/'+ baseData.logo +'.png')" v-if="baseData.mechChapter"  :text="codeNo" :logoScale="50" :size="300"></vue-qr>
       </span>
    </div>
    <div class="info">
      <div class="info-cont">
        <p class="hoverName">姓名：
          <input class="hoverInput" type="text" v-model="currtName" >
        </p>
        <p class="info-code">编号：<span>{{codeNo}}</span></p>
      </div>
      <div class="info-header">
        <!-- <img src="../assets/logo.png" alt=""> -->
        <div :class="['file-box', !base64Image ? 'file-null':'']">
          <Icon class="file-icon" type="md-cloud-upload" :size="25" v-if="!base64Image" />
          <img class="file-img" :src="base64Image" alt="" v-else >
          <input type="file" class="upload_file" id="upload_file">
        </div>
        
      </div>
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in skinCareData" :key="i" />
    </div>
    <div class="cace-table">
      <p  class="info-title">护肤方案</p>
      <table-report :titleConfig="titleConfig" :tableData="tableData" :mobile="mobile" />
      <img class="table-report-img" :src="require('@/assets/img/'+ baseData.mechChapter +'.png')"  v-if="baseData.logo" alt="">
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
      titleConfig:['产品名称','产品功效','单价','数量'],
      tableData:[],
      mobile:false,
      skinCareData:[],
      skinCareDataAttentions:[],
      currtName:'输入客户姓名',
      base64Image:'',
      codeNo:'',
      hasData : false
    }
  },
  created(){
    if(this.getSkinCareData.productList === undefined){
      this.$router.push({name:'care'});
      this.hasData = true;
    }
  },
  mounted(){
    if(this.hasData) return;
    this.getCachData();
    addWaterMarker({content:this.baseData.waterMarker,container:this.$refs.contiter});

    this.init();
    this.mobile = isMobile();
    window.onresize = ()=> {
      this.mobile = isMobile();
    }
    this.handleUpload();
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
          fun : item.features,
          unit: '¥' + item.price +'.00',
          number:item.sub
        }
      })
      

      for( var key in  this.getSkinCareData.formItem){

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
        link.setAttribute('download', _this.codeNo + '.png')
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
      this.codeNo = this.baseData.prexi +  getDateTime();
    },
    handleUpload(){
      var _this = this;
      var upload = document.getElementById("upload_file");
      const ACCEPT = ['image/jpg','image/png','image/jpeg'];  //支持上传文件类型
      // const MAXSIZE = 1024 * 1024;                                        //文件大小
      // const MAXSIZE_STR = "1MB"
      upload.addEventListener("change",function(e){
        const [file] = e.target.files;
        if(!file){
            return;
        }
        const {type:fileType, size: fileSize} = file;  //重新定义属性名

        if(!ACCEPT.includes(fileType)){  //判断文件类型
          alert("不支持["+fileType+"]文件类型！")
          upload.value = "";
          return;
        }
        // if(fileSize  > MAXSIZE){   //判断文件大小
        //   alert(`文件超出${MAXSIZE_STR}`)
        //   upload.value = "";
        //   return;
        // }
        
        let reader = new FileReader();
        reader.addEventListener('load',function(ev){
          const base64Image = ev.target.result;
          _this.base64Image = base64Image;
          reader = null;
        })
        reader.readAsDataURL(file);
      })
    },

  },
  computed:{
    ...mapGetters(['getSkinCareData']),
    
  }
}
</script>
