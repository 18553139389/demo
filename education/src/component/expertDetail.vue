<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="titles">{{list.name}}</div>
      <p class="content" v-html="list.content"></p>
      <div class="message">
        <img src="../../static/images/zhuanjiayiduiyi_maozi.png" alt="">
        <div class="message-right">
          <div>手机号：{{list.telephone}}</div>
          <img :src="list.qrCode" alt="">
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
        itemIndex: 3,
        control: true,
        list: {},
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
    mounted() {
      this.pos()
    },
    watch: {
      list() {
        this.$nextTick(() => {
          this.pos()
        })
      }
    },
    methods: {
      changeNav(k) {
        this.itemIndex = k
      },
      init() {
        let self = this
        let datas = {
          expertId: this.$route.params.id
        }
        Request.postRequest('jinxiuqiancheng/api/expertDetail', datas).then(res => {
          if (res.data.result == 0) {
            this.list = res.data
            this.list.content = this.unescape(this.list.content)
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
      unescape(html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
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
      flex-direction: column;
      border: 2px solid #eee;
      border-radius: 6px;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 95%;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      border: 2px solid #eee;
      border-radius: 6px;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .titles {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding-left: 36px;
  }

  .titles::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .content {
    font-size: 14px;
    color: #666;
    padding: 24px;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    line-height: 20px;
  }

  .message {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
  }

  .message-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 14px;
    color: #333;
  }

  .message-right>img {
    width: 60px;
    margin-top: 16px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
