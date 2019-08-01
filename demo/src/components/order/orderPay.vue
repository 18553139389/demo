<template>
  <!-- <div id="payment">
    
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="eWAY" clickable @click="radio = '1'">
          <van-radio name="1" checked-color="#07c160" />
        </van-cell>
        <van-cell title="微信支付" clickable @click="radio = '2'">
          <van-radio name="2" checked-color="#07c160" />
        </van-cell>
        <van-cell title="支付宝支付" clickable @click="radio = '3'">
          <van-radio name="3" checked-color="#07c160"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="pay-btn">
      <van-button size="large" type="primary" @click="goPay" >立即付款</van-button>
    </div>
  </div> -->
  <div id="payment">
    <div class="top">
      <van-icon class="iconTop" @click="closePayment" name="close"/>
       <h2>确认付款</h2>
    </div>
    <div class="total-block">
        <span class="price">{{order.total}}</span>
        <span class="currency-price">{{order.currency_total}}</span>
    </div>
    <van-radio-group v-model="defaultMethod">
      <van-cell-group v-for="(item, index) in payMethods" :key="index">
        <van-cell :key="index" :title="item.text" clickable @click="pickMethod(item)">
          <van-radio :name="item.id"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="pay-btn">
      <van-button size="large" type="primary" @click="goPay" >立即付款</van-button>
    </div>
  	<!-- 取消支付 -->
		<mp-modal ref="mpModal" title="取消支付" content="确认取消支付？" showCancel="true" @confirm="confirm" @cancel="cancel">
		</mp-modal>
  </div>
</template>
<script>
  // import client from '@lib/Rest'
  // import _ from 'underscore'
  // import utli from '@lib/Utli'
  // import vantPayment from '@lib/library/vant/payment'
  // import payment from '@lib/library/payment'
  import mpModal from 'mpvue-weui/src/modal';
export default {
  data() {
    return {
      list: ["eWAY", "微信支付", "支付宝支付"],
      radio: '1'
    };
  },
  components: {
    mpModal
  },
  mounted() {
    this.$store.dispatch('payment/GET_DATA_FROM_CLOUD')
    console.log('支付的订单order:', this.order)
  },
  computed: {
    payMethods () {
      let all = this.$store.getters['payment/getAll']
      if (all.length > 0) {
        LoadingApi.destroy(this.timer)
      }
      if (!!this.$store.getters['payment/getDefaultMethod'] && this.defaultMethod === '') {
        this.method = this.$store.getters['payment/getDefaultMethod']
        this.defaultMethod = this.$store.getters['payment/getDefaultMethod'].id
        this.disabledPay = false
      }
      return _.map(all, item => {
        return vantPayment.covert(item)
      })
    },
    applyMethod () {
      console.log('method: ', this.method, this.defaultMethod)
      return this.method || this.defaultMethod
    }
  },
  methods:{
    onChange(event) {
      this.setData({
        result: event.detail
      });
    },
    toggle(event) {
      const { name } = event.currentTarget.dataset;
      checkbox.toggle();
    },
    closePayment () {
      this.$refs.mpModal.show();
      console.log("点击了取消")
      
      Dialog.confirm({
        title: '确认取消支付？'
      }).then(() => {
        self.$emit('cancelPay')
        self.$router.replace({
          path: '/order/history?hide-tab-bar'
        })
      }).catch(() => {
        // on cancel
      })
    },
    confirm() { // 在这进行取消操作
      this.$emit('cancelPay')
      this.$router.replace({
        path: '/order/history?hide-tab-bar'
      })
    },
  }
};
</script>
<style lang="scss">
.top{
  position: relative;
  .iconTop{
    position: absolute;
    right: 15rpx;
    top: 5rpx;
 }
}
 
</style>
