<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="notice-left" @click="goCombine">
        <div class="cards">
          <div>智能选科</div>
          <img src="../../static/images/zhuanjiayiduiyi_maozi.png" alt="">
        </div>
        <div class="imgs">
          <img :src="list" alt="">
        </div>
      </div>
    </div>
    <chat></chat>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <footers v-if="control"></footers>
  </div>
</template>

<script>
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Chat from '../components/chat.vue'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        itemIndex: 5,
        control: true,
        list: '',
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat
    },
    created() {
      this.init()
    },
    watch: {
      bodyHeight() {
        this.pos()
      },
      list() {
        this.pos()
      }
    },
    methods: {
      changeNav(k) {
        this.itemIndex = k
      },
      init() {
        let self = this
        Request.postRequest('jinxiuqiancheng/api/getIcon').then(res => {
          if (res.data.result == 0) {
            this.list = res.data.znxkIcon
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight + 166 - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      change(k) {
        if (k == 0) {
          this.$router.push({
            name: 'index'
          })
        } else if (k == 1) {
          this.$router.push({
            name: 'zhineng'
          })
        } else if (k == 2) {
          this.$router.push({
            name: 'bigData'
          })
        } else if (k == 3) {
          this.$router.push({
            name: 'expert'
          })
        } else if (k == 4) {
          this.$router.push({
            name: 'xuanke'
          })
        } else if (k == 5) {
          this.$router.push({
            name: 'about'
          })
        } else if (k == 6) {
          this.$router.push({
            name: 'question'
          })
        }
      },
      goCombine() {
        this.$router.push({
          name: 'subjects'
        })
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .list {
      width: 1200px;
      margin: 40px auto;
      display: flex;
      justify-content: center;
    }

    .notice-left {
      width: 40%;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      margin: 40px 0;
      display: flex;
      justify-content: center;
    }

    .notice-left {
      width: 60%;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .cards {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 15px;
    color: #333;
    position: relative;
    padding: 20px 10px 20px 36px;
    border-bottom: 3px solid #eee;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cards>img {
    height: 60px;
  }

  .cards::before {
    content: '';
    position: absolute;
    top: 34px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .imgs {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
  }

  .imgs>img {
    width: 100%;
    border-radius: 4px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
