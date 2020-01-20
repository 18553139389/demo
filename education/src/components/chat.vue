<template>
  <div class="chat">
    <div class="icons-list">
      <div class="icons-item" style="margin-top: 10px;" v-show="qq">{{list.kefuQQ}}</div>
      <div class="icons-item" style="margin-top: 50px;" v-show="wx">{{list.kefuWx}}</div>
      <div class="icons-item" style="margin-top: 90px;" v-show="dh">{{list.kefuTele}}</div>
    </div>
    <ul class="icons" @mouseleave="hide">
      <li @mouseenter.stop="QQshow">
        <img src="../../static/images/QQ.png" alt="">
      </li>
      <li @mouseenter.stop="WXshow">
        <img src="../../static/images/weixin.png" alt="">
      </li>
      <li @mouseenter.stop="DHshow">
        <img src="../../static/images/dianhua.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        qq: false,
        wx: false,
        dh: false,
        list: {}
      }
    },
    created() {
      this.init()
    },
    methods: {
      QQshow() {
        this.qq = true
        this.wx = false
        this.dh = false
      },
      WXshow() {
        this.wx = true
        this.qq = false
        this.dh = false
      },
      DHshow() {
        this.dh = true
        this.qq = false
        this.wx = false
      },
      hide() {
        this.dh = false
        this.qq = false
        this.wx = false
      },
      init() {
        Request.postRequest('jinxiuqiancheng/api/commonParamInfo').then(res => {
          console.log(res)
          if (res.data.result == 0) {
            let list = {}
            list.kefuQQ = res.data.kefuQQ
            list.kefuWx = res.data.kefuWx
            list.kefuTele = res.data.kefuTele
            this.list = list
          } else {
            this.$Message.warning(res.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .chat {
    display: flex;
    position: fixed;
    top: 50%;
    right: 5%;
    height: 150px;
  }

  .icons {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 6px;
    box-shadow: 1px 1px 5px rgba(0,0,0,.3);
    background: #FFFFFF;
  }

  .icons>li {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px dashed #eee;
  }

  .icons>li>img {
    width: 24px;
  }

  .icons-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .icons-item {
    height: 42px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 6px;
    box-shadow: 1px 1px 5px rgba(0,0,0,.3);
    padding: 0 12px;
    margin-right: 12px;
  }
</style>
