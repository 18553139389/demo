<template>
  <header class="top">
    <div class="left">
      <img class="logo" :src="list.Logo" alt="">
      <div class="logo-title">锦绣前程</div>
      <div class="text">{{list.slogan}}</div>
    </div>
    <div class="right">
      <div class="message">
        <img src="../../static/images/shouye_dianhua.png" alt="">
        <div class="num">
          <span>热线电话（{{list.time}}）</span>
          <span style="color: rgb(255,3,80);font-size: 14px;">{{list.telephone}}</span>
        </div>
      </div>
      <img class="code" :src="list.qrCode" alt="">
    </div>
  </header>
</template>

<script>
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        list: {}
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        if (!sessionStorage.getItem("message")) {
          Request.postRequest('jinxiuqiancheng/api/commonParamInfo').then(res => {
            console.log(res)
            if (res.data.result == 0) {
              let list = {}
              list.kefuQQ = res.data.kefuQQ
              list.kefuWx = res.data.kefuWx
              list.kefuTele = res.data.kefuTele
              list.slogan = res.data.slogan
              list.time = res.data.time
              list.telephone = res.data.telephone
              list.qrCode = res.data.qrCode
              list.Logo = res.data.Logo
              this.list = list
              sessionStorage.setItem("message", JSON.stringify(list))
            } else {
              this.$Message.warning(res.resultNote)
            }
          }).catch(res => {
            console.log(res)
          })
        } else {
          this.list = JSON.parse(sessionStorage.getItem("message"))
        }
      }
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 768px) {
    .top {
      width: 100%;
      padding: 20px 0.5rem;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }

    .code {
      width: 60px;
      height: 60px;
    }
  }

  @media screen and (min-width: 769px) {
    .top {
      width: 1200px;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
    }

    .logo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }

    .code {
      width: 80px;
      height: 80px;
    }
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .logo-title {
    font-size: 15px;
    color: rgb(255, 3, 80);
    font-weight: 600;
    margin-left: 20px;
    font-family: NSimSun;
  }

  .text {
    font-size: 14px;
    color: #333;
    margin-left: 20px;
    display: flex;
    align-items: flex-end;
  }

  .message {
    display: flex;
    align-items: center;
  }

  .message>img {
    height: 30px;
  }

  .num {
    height: 34px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 16px 0 10px;
  }

  .num>span {
    font-size: 12px;
    color: #333;
  }
</style>
