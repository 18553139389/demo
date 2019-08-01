
<template>
    <div>
        <van-cell-group class="user-group">
        <van-cell icon="records" title="全部订单" url="/pages/order/main" is-link />
        <van-cell icon="exchange" title="我的积分" url="/pages/points/main" is-link />
        <van-cell icon="gold-coin" title="优惠券" url="/pages/coupon/main" is-link />
        <van-cell icon="contact" title="我的信息" url="/pages/accountInfo/main" is-link />
        <van-cell icon="location" title="收货人信息" url="/pages/consignees/main" is-link />
        <van-cell icon="chat" title="版本号" :value="version"/>
        <van-cell icon="arrow-left" title="退出" @click="logout" />
        </van-cell-group>
        <div class="van-bottom"></div>
    </div>
</template>

<script>
import Toast from '@/../static/vant/toast/toast'
export default {
    data () {
        return {
            version: 1.12
        }
    }
  
}
</script>

<style lang="scss">

</style>
