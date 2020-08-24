<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="titles">
        <div class="names">{{list.name}}</div>
        <div class="publics">
          <span style="margin-right: 24px;">发布时间：{{list.adtime}}</span>
          <span>阅读数量：{{list.readNum}}</span>
        </div>
      </div>
      <p class="content" v-html="list.content"></p>
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
      init() {
        let self = this
        let datas = {
          caseId: this.$route.params.id
        }
        Request.postRequest('jinxiuqiancheng/api/caseDetail', datas).then(res => {
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
      changeNav(k) {
        this.itemIndex = k
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

    .names {
      width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    padding: 0 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
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

  .publics {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
