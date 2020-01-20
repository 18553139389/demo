<template>
  <div class="bottom">
    <div class="bottom-list">
      <div class="left">
        <img class="logo" :src="list.Logo" alt="">
        <div class="logo-title">锦绣前程</div>
      </div>
      <ul class="middle">
        <li>
          <div class="bottom-title" @click="goZhi">智能填报</div>
          <div class="bottom-item" @click="goZhi">艺术类填报</div>
          <div class="bottom-item" @click="goZhi">体育类填报</div>
          <div class="bottom-item" @click="goZhi">普通类填报</div>
        </li>
        <li>
          <div class="bottom-title" @click="goBig">大数据查询</div>
          <div class="bottom-item" @click="goData1">普通类查询</div>
          <div class="bottom-item" @click="goData2">艺术类查询</div>
          <div class="bottom-item" @click="goData3">体育类查询</div>
        </li>
        <li>
          <div class="bottom-title" @click="goExpert">专家一对一</div>
          <div class="bottom-item" @click="goExpert">专家详情</div>
          <div class="bottom-item" @click="goSuc">成功案例</div>
        </li>
        <li>
          <div class="bottom-title" @click="goXuan">智能选科</div>
          <div class="bottom-item" @click="goXuan">智能选科</div>
        </li>
        <li>
          <div class="bottom-title" @click="goAbout">关于我们</div>
          <div class="bottom-item" @click="goAbout">产品介绍</div>
        </li>
      </ul>
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
    </div>
  </div>
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
      },
      goZhi() {
        this.$router.push({
          name: 'zhineng'
        })
      },
      goBig() {
        this.$router.push({
          name: 'bigData'
        })
      },
      goData1() {
        this.$router.push({
          name: 'commonSearch'
        })
      },
      goData2() {
        this.$router.push({
          name: 'commonArt'
        })
      },
      goData3() {
        this.$router.push({
          name: 'commonSports'
        })
      },
      goExpert() {
        this.$router.push({
          name: 'expert'
        })
      },
      goSuc() {
        this.$router.push({
          name: 'exampleSuc'
        })
      },
      goXuan() {
        this.$router.push({
          name: 'xuanke'
        })
      },
      goAbout() {
        this.$router.push({
          name: 'about'
        })
      }
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 768px) {
    .bottom {
      width: 100%;
      padding: 30px 0.5rem;
      background: rgb(250, 250, 250);
      box-sizing: border-box;
    }

    .bottom-list {
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
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

    .middle {
      flex: 0.8;
      display: flex;
      justify-content: space-between;
    }

    .middle>li {
      cursor: pointer;
    }

    .message {
      height: 60px;
      display: none;
    }

    .left,
    .right {
      display: flex;
      height: 60px;
    }
  }

  @media screen and (min-width: 769px) {
    .bottom {
      width: 100%;
      padding: 30px 0;
      background: rgb(250, 250, 250);
    }

    .bottom-list {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
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

    .middle {
      flex: 0.8;
      display: flex;
      justify-content: space-between;
    }

    .middle>li {
      cursor: pointer;
    }

    .message {
      height: 80px;
      display: flex;
      align-items: center;
    }

    .left,
    .right {
      display: flex;
      height: 80px;
    }
  }

  .logo-title {
    font-size: 15px;
    color: rgb(255, 3, 80);
    font-weight: 600;
    margin-left: 20px;
    font-family: NSimSun;
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

  .bottom-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding-left: 10px;
    margin-bottom: 20px;
  }

  .bottom-title::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 0;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .bottom-item {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    padding-left: 10px;
    box-sizing: border-box;
  }
</style>
