<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-item">
        <div class="titles">网站介绍</div>
        <div class="imgs">
          <img :src="produceList.image" alt="">
        </div>
        <p class="content" v-html="produceList.content"></p>
      </div>
      <div class="list-item">
        <div class="titles">网站优势</div>
        <div class="imgs">
          <img :src="greatestList.image" alt="">
        </div>
        <p class="content" v-html="greatestList.content"></p>
      </div>
      <div class="list-item">
        <div class="titles">公司使命</div>
        <div class="imgs">
          <img :src="companyList.image" alt="">
        </div>
        <p class="content" v-html="companyList.content"></p>
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
        itemIndex: 6,
        control: true,
        produceList: {},
        greatestList: {},
        companyList: {},
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
      }
    },
    methods: {
      init() {
        let self = this
        Request.postRequest('jinxiuqiancheng/api/aboutusList').then(res => {
          if (res.data.result == 0) {
            let list = res.data.dataList
            list.forEach((item) => {
              if (item.type == 0) {
                self.produceList = item
                self.produceList.content = self.unescape(self.produceList.content)
              } else if (item.type == 1) {
                self.greatestList = item
                self.greatestList.content = self.unescape(self.greatestList.content)
              } else if (item.type == 2) {
                self.companyList = item
                self.companyList.content = self.unescape(self.companyList.content)
              }
            })
          } else {
            this.$Message.warning(res.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      unescape(html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
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
      changeNav(k) {
        this.itemIndex = k
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .list {
      width: 1200px;
      margin: 40px auto 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      margin: 40px 0 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-item {
    width: 90%;
    display: flex;
    flex-direction: column;
    border: 2px solid #eee;
    border-radius: 6px;
    margin-bottom: 24px;
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
    box-sizing: border-box;
    line-height: 20px;
    text-indent: 24px;
    text-align: justify;
  }

  .imgs {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .imgs>img {
    width: 100%;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
