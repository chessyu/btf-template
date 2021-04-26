<template>
    <table>
        <tr>
            <td v-for="(title,i) in titleConfig" :key="i">title</td>
        </tr>
        <tr>
            
        </tr>
    </table>
</template>

<script>

export default {
    data(){
        return{
            titleConfig:['产品名称','产品功能','单价','数量'],
            tableData:[]
        }
    },
    mounted(){
        for(var i =0; i<10; i++){
            this.tableData.push({
                name:"产品名称"+ (i+1),
                fun:'XXXXXXXXXXXXXXXXXXXXXXXXX',
                unit:i+ 10,
                number:1
            })
        }
    },
}
</script>
