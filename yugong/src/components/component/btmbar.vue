<template>
    <div class="bar">
        <!-- <van-tabbar v-model="currentIndex" @change="change" :fixed='fixed' active-color="#157FCA" :safe-area-inset-bottom='ipx'> -->
        <van-tabbar v-model="currentIndex" @change="change" :fixed='fixed' active-color="#157FCA" :safe-area-inset-bottom='ipx'>
            <van-tabbar-item>
                <span class="f1">首页</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item>
                <span class="f1">分值排行</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon1.active : icon1.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item>
                <span class="f1">我的</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon2.active : icon2.normal"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    data() {
        return {
            fixed:true,
            currentIndex:this.actived,

            icon: {
                normal: require('../../assets/images/home.jpg'),
                active: require('../../assets/images/active_home.jpg')
            },
            icon1: {
                normal: require('../../assets/images/rank.jpg'),
                active: require('../../assets/images/active_rank.jpg')
            },
            icon2: {
                normal: require('../../assets/images/me.jpg'),
                active: require('../../assets/images/active_me.jpg')
            },
            ipx:false
        }
    },
    props:['actived'],
    created(){
        this.ipx = this.getIsIphonex()
    },
    methods:{
        change(){
            this.$emit('goIndex',this.currentIndex)
        },
        getIsIphonex () {
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isIOS) {
                if (screen.height == 812 && screen.width == 375) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}
</script>
<style scoped>
.van-tabbar--safe-area-inset-bottom{box-sizing:content-box;padding-bottom: 20px;}
</style>
