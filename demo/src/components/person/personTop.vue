
<template>
	  <div class="usrInfo">
      <div class="userImg">
        <img src="../../../static/images/user.png" alt="">
        <h3>{{custName}}</h3>
      </div>
      <div class="userName"> {{account.mobile}}</div>
    </div>
</template>

<script>
export default {
  data (){
    return{
      custName: '',
      username: '手机号10086'
    }
  },
  computed: {
     account () {
        let accountInfo = this.$store.getters['account/getAccountData']
        this.custName = (accountInfo.lastName ? accountInfo.lastName : '') + accountInfo.firstName
        return accountInfo
      },
  }
}
</script>

<style lang="scss">
  .usrInfo{
    width: 100%;
    height: 100%;
    background: #08080870;
    position: relative;
    color: #fff;
    .userImg{
      width: 100%;
      height: 120rpx;
      border-radius: 50%;
      img{
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        float: left;
      }
      h3{
        float: left;
        line-height: 120rpx;
        padding-left: 40rpx;
        font-weight: 500;
      }
    }
    .userName{
      position: absolute;
      bottom: 10rpx;
      font-size: 32rpx;
      text-indent: 10rpx;
    }
  }
</style>
