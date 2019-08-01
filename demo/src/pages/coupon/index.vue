<template>
  <div id="coupon">
    <div class="title">可用优惠券(<span>{{couponLists.length}}</span>)</div>
    <div class="couponList">
      <ul>
        <li v-for="(item, index) in couponLists" :key="index">
          <div class="listLeft">
            <h2>{{item.name}}</h2>
						<p v-if="item.coupon_attributes.spend_amount == 0 && item.coupon_attributes.category_condition == ''">无门槛</p>
						<p v-if="item.coupon_attributes.spend_amount != 0">满{{item.coupon_attributes.spend_amount}}元可用</p>
            <p v-if="item.coupon_attributes.category_condition != ''">限定{{item.coupon_attributes.category_condition}}</p>
          </div>
          <div class="listRight">
          <h3>{{item.coupon_attributes.name}}</h3>
          <p>有效期：{{item.created}}-{{item.expired}}</p>
          </div>
        </li>
      </ul>
    </div>
    <mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask="isShowMask"></mp-loading>
  </div>
</template>

<script>
import Coupon from '@lib/module/coupon'
import mpLoading from 'mpvue-weui/src/loading'
export default {
  
		components:{
			mpLoading,
		
		},
  data () {
    return{
      coupons: [],
      disabledCoupons: [],
      timer: null,
      couponLists: [] , // 循环的列表
      isShowLoading:false
    }
  },
  mounted() {
    let self = this
    self.isShowLoading = true
    this.$store.dispatch('coupon/GET_DATA_FROM_CLOUD', {
      request: '?limit=1000&can_use=true',
      needConcat: false,
      cb: (response) => {
        if (response.data.code === 200) {
          this.couponLists = response.data.data
          self.isShowLoading = false
        }
        let couponList = Coupon.getCouponByCoupons(response.data.data)
        self.coupons = couponList.enable
        self.disabledCoupons = couponList.disable
      }
    })
  },
}
</script>

<style lang='scss'>
#coupon {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: #F8F8F8;
  .title {
    position: fixed;
    width: 100%;
    height: 44px;
    text-align: center;
    font-size: 16px;
    line-height: 44px;
    border-bottom: 2px solid #FF4444;
    margin-bottom: 20px;
    background: #FFFFFF;
    color: #FF4444;
  }
  .couponList {
    width: 100%;
    margin-top: 60px;
		padding-bottom: 30px;
    ul{
      li {
        width: 92%;
        margin: 0 auto;
        display: flex;
        box-shadow: 0 0 4px rgba(0,0,0,.1);
        margin-top: 20px;
        background: #FFFFFF;
        border-radius: 8px;
        .listLeft{
          width: 38%;
          padding: 15px 2% 15px 15px;
          float: left;
          h2{
            color: #FF4444;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 600;
          }
          p {
            padding-top: 4px;
            font-size: 12px;
            color: #7e7b7b;
            overflow:hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
          }
        }
        .listRight{
          width: 52%;
          padding: 15px 10px 15px 0;
          float: right;
          h3{
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
          }
          p {
            padding-top: 3px;
            font-size: 12px;
            color: #7e7b7b;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
          }
        }
      }
    }
  }
}
</style>
