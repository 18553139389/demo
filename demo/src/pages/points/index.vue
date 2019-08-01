<template>
  <div id="points">
    <mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask="isShowMask"></mp-loading>
     <div class="allNum">
       <div class="number">{{ bonus }}</div>
       <div>总积分</div>
     </div>

     <div class="list">
        <div class="tips">
         <span>订单号:</span>
         <span>积分:</span>
         <span>订单生成时间:</span>
        </div>
        <scroll-view scroll-y>
          <div class="tipList">
            <ul>
              <li v-for="bonus in bonusData" :key="bonus">
                <span>{{bonus.order_no}}</span>
                <span class="oneNum" ref="num">{{bonus.total_point}}</span>
                <span>{{bonus.create_at}}</span>
              </li>
            </ul>
          </div>
        </scroll-view>
        
     </div>
  </div>
</template>

<script>
 import client from '@lib/Rest'
 import mpLoading from 'mpvue-weui/src/loading'
export default {
  components:{
    mpLoading,
  },
  data(){
    return{
      bonus: 0,
      bonusData: {},
      timer: null,
      isShowLoading:false,
    }
  },
  mounted() {
    let that = this
    let endpoint = this.$store.getters['server/getEndpoint']
    let token = this.$store.getters['account/getCustomerToken']
    let api = this.$store.getters['configs/getApiList'].customer_api_endpoint + '/user_point?limit=10000'
    let apiurl = endpoint + api
    that.isShowLoading = true
    wx.request({
			url: apiurl, 
			method: 'GET',
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
        console.log("请求成功了---",res)
			  if (res.data.code === 200) {
         that.bonus = res.data.totalPoint ? res.data.totalPoint : 0
         that.bonusData = res.data.data
         that.isShowLoading = false
        } else {
          that.$ons.notification.alert('请再试一次！')
        }
			},
			fail() {
				
			}
		});
    // client.get(apiurl, token, (s) => {
    //   console.log(s)
    //   if (s.code === 200) {
    //     this.showLoading = false
    //     this.bonus = s.totalPoint ? s.totalPoint : 0
    //     this.bonusData = s.data
    //     LoadingApi.destroy(this.timer)
    //   } else {
    //     this.$ons.notification.alert('请再试一次！')
    //   }
    // }, (e) => {
    //   this.showLoading = false
    // })
  },
}
</script>

<style lang='scss'>
  #points {
    height: 100vh;
    background: #FBF9FE;
    overflow: hidden;
    .allNum{
      width: 96%;
      margin: 5px auto;
      height: 110px;
      background: #F9D33D;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      div{
        font-size: 24px;
        padding: 10px 20px;
      }
      .number{
        border-bottom: 1px solid #ffffff;
      }
    }
    .list {
      width: 100%;
      .tips{
        width: 100%;
        height: 35px;
        font-size: 16px;
        background: #F7F7F7;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .tipList {
        width: 100%;
        height: 80vh;
        background: #ffffff;
        ul {
          width: 100%;
          height: auto;
          li {
            display: flex;
            height: 35px;
            font-size: 14px;
            align-items: center;
            justify-content: space-around
          }
        }
      }
    }
  }
</style>
