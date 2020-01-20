<template>
    <div>
        <div class="header">
            <van-icon name="arrow-left" class="leftA" size="22" v-if="showL" @click="back"/>     
            <div class="title">{{tit}}</div> 
        </div>
        <div class="zhanwei"></div>
    </div>   
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:{
        tit:{},
        showL:{
            default:false
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.header{background: #157FCA;height: 1.17rem;line-height: 1.17rem;text-align: center;font-size: .5rem;
    color: #fff;position: relative;display: flex;flex-flow: row;align-content: center;justify-content: center;z-index: 100;position:fixed;left:0;top:0;width:100%;
    box-sizing: border-box;}
.title{font-size: .48rem;}
.leftA{position: absolute;left: .15rem;top: .3rem;}
.zhanwei{height:1.17rem;width:100%;position:relative;top:0;left:0;z-index:1;}
</style>
