<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-item">
        <div class="list-title">
          <div class="list-left">我们有优秀的专家团队</div>
          <div class="list-right" @click="goSuccess">
            <span>成功案例</span>
            <img src="../../static/images/enter.png" alt="">
          </div>
        </div>
      </div>
      <div class="example">
        <div class="example-list">
          <div class="example-item">
            <div v-for="(v,k) in teamList" :key="k" class="notice-left" style="width: 23%;" @click="goExpert(v.id)">
              <div class="cards">{{v.name}}</div>
              <div class="example-text" v-html="v.description"></div>
            </div>
          </div>
        </div>
        <div class="page">
          <Page :total="totalPage" :class-name="pages" :page-size="4" @on-change="getList" />
        </div>
      </div>
      <div class="list-item">
        <div class="list-title">
          <div class="list-left">与专家联系请扫码</div>
        </div>
        <div class="example">
          <div class="example-list">
            <div class="example-item">
              <div class="notice-left" style="width: 31%;" v-for="(v,k) in codeList" :key="k">
                <div class="cards">专家微信二维码</div>
                <div class="example-img">
                  <img :src="v.qrCode" alt="">
                </div>
              </div>
            </div>
          </div>
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
        itemIndex: 4,
        pages: 'pages',
        control: true,
        totalPage: 0,
        teamList: [],
        codeList: [],
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    created() {
      this.getList(1)
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
        Request.postRequest('jinxiuqiancheng/api/expertList', datas).then(res => {
          if (res.data.result == 0) {
            this.teamList = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.totalPage = res.data.totalPage * 4
              this.teamList = res.data.dataList
              this.teamList.forEach((item) => {
                if (item.description.length > 50) {
                  item.description = item.description.substring(0, 50) + '...'
                }
              })
              if (this.codeList.length == 0) {
                this.codeList = res.data.qrCodeList
              }
            }
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
        if (bodyHeight - winHeight > 0) {
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
      goExpert(id) {
        this.$router.push({
          name: 'expertDetail',
          params: {
            id: id
          }
        })
      },
      goSuccess() {
        this.$router.push({
          name: 'exampleSuc'
        })
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .list {
      width: 1200px;
      display: flex;
      flex-direction: column;
      margin: 16px auto 40px;
    }

    .example-list {
      width: 1200px;
      margin: 0 auto;
    }

    .example-text {
      width: 100%;
      height: 120px;
      font-size: 14px;
      color: #666;
      padding: 16px 24px;
      box-sizing: border-box;
      line-height: 20px;
      text-align: justify;
    }

    .example-img>img {
      width: 14rem;
      height: 14rem;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 16px 0 40px;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .example-list {
      width: 100%;
    }

    .example-text {
      width: 100%;
      height: 200px;
      font-size: 14px;
      color: #666;
      padding: 16px 24px;
      box-sizing: border-box;
      line-height: 20px;
      text-align: justify;
    }

    .example-img>img {
      width: 8rem;
      height: 8rem;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-item {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .list-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-left {
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    color: #333;
    position: relative;
    padding-left: 12px;
  }

  .list-left:before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    width: 2px;
    height: 12px;
    background: #BE013B;
  }

  .list-right {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #BE013B;
    cursor: pointer;
  }

  .list-right>img {
    width: 18px;
    margin-left: 12px;
  }

  .example {
    width: 100%;
    padding: 20px 0;
    background: #FFFFFF;
  }

  .notice-left {
    width: 40%;
    border: 1px solid #eee;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    margin-right: 2%;
    margin-bottom: 2%;
  }

  .example-img {
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cards {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: #333;
    position: relative;
    padding-left: 36px;
    border-bottom: 3px solid #eee;
    font-weight: 600;
  }

  .cards::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .example-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0 16px;
    box-sizing: border-box;
  }

  .page {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
