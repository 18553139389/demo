<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="titles">热门专业</div>
      <ul class="hots">
        <li v-for="(v,k) in list" :key="k">
          <div class="hots-title">{{v.specialtyName}}</div>
          <p class="hots-content" v-html="v.description"></p>
        </li>
      </ul>
      <div class="pages">
        <Page :total="totalPage" :page-size="10" @on-change="getList" />
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
        itemIndex: 2,
        control: true,
        totalPage: 1,
        list: [],
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
      this.getList(1)
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      changeNav(k) {
        this.itemIndex = k
      },
      getList(page) {
        let self = this
        let datas = {
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/popularSpecialtyList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            self.list = []
            self.list = res.data.dataList
            self.list.forEach((item) => {
              item.description = this.unescape(item.description)
            })
          } else {
            this.$Message.warning(res.data.resultNote)
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
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .list {
      width: 1200px;
      margin: 16px auto 40px;
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      margin: 16px 0 40px;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .hots {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .hots>li {
    width: 48%;
    margin-bottom: 30px;
  }

  .hots-title {
    max-width: 100%;
    padding: 10px 20px;
    background: #FF0350;
    border-radius: 4px;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* margin-left: 5%; */
  }

  .hots-content {
    width: 100%;
    margin-top: 24px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 20px 12px;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    line-height: 18px;
    text-align: justify;
  }

  .titles {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding-left: 12px;
  }

  .titles::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 0;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .pages {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
