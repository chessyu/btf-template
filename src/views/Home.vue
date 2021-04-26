<template>
  <div class="contiter">
    <div class="header">
      <div class="company_logo">
        <img   src="../assets/logo.png" alt="">
      </div>
      <span class="info-name">陈壮壮方案</span>
      <span class="code"> 二维码 </span>
    </div>
    <div class="info">
      <div class="info-cont">
        <p>姓名：陈壮壮</p>
        <p>编号：ABCKDEKLJ8K9237UEN</p>
      </div>
    </div>
    <div class="cace-report">
      <list :title="item.title" :data="item.data" v-for="(item,i) in data" :key="i" />
    </div>
  </div>
</template>

<script>
import config from '../config'
import List from '../components/list.vue'

export default {
  components:{
    List
  },
  data(){
    return{
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
      ]
    }
  }
}
</script>
