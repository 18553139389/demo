<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <Carousel v-model="value1" :autoplay-speed="5000" :radius-dot="true" autoplay loop>
      <CarouselItem v-for="(v,k) in bannerList" :key="k">
        <div class="demo-carousel">
          <img :src="v.image" @click="goUrl(v.type)" alt="">
        </div>
      </CarouselItem>
    </Carousel>
    <div class="notice">
      <div class="notice-left" style="margin: 0;">
        <div class="cards">购卡</div>
        <div class="imgs">
          <img :src="cardLogo" alt="">
        </div>
        <div class="buy" v-if="isSupreme == 1 || isSupreme == 0">会员有效期: {{endTime}}</div>
        <div class="buy" v-else @click="buy">购买锦绣前程卡</div>
      </div>
      <div class="notice-right">
        <div class="public">公告通知</div>
        <ul class="notice-list">
          <li v-for="(v,k) in gonggaoList" :key="k" @click="goDetail(v.id,v.title)">
            <div class="notice-text">{{v.title}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="example">
      <div class="example-list">
        <div class="common">成功案例</div>
        <div class="example-item">
          <div class="notice-left" style="width: 22%;" v-for="(v,k) in successCaseList" :key="k" @click="goDetail1(v.id)">
            <div class="notice-cards">{{v.name}}</div>
            <div class="example-text" v-html="v.description"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="example" style="background: #FFFFFF;">
      <div class="example-list">
        <div class="common">专家团队</div>
        <div class="example-item">
          <div class="notice-left" style="width: 22%;" v-for="(m,n) in expertList" :key="n" @click="goExpert(m.id)">
            <div class="notice-cards">{{m.name}}</div>
            <div class="example-text" v-html="m.description"></div>
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
        value1: 0,
        itemIndex: 0,
        isSupreme: 0,
        control: true,
        cardLogo: '',
        endTime: '',
        bannerList: [],
        gonggaoList: [],
        successCaseList: [],
        expertList: [],
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
      this.isSupreme = sessionStorage.getItem("isSupreme")
      this.init()
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      init() {
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/indexInfo', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.cardLogo = res.data.cardLogo
            this.endTime = res.data.endTime
            this.bannerList = res.data.bannerList
            this.gonggaoList = res.data.gonggaoList
            if (res.data.successCaseList.length > 8) {
              for (let i = 0; i < 8; i++) {
                this.successCaseList.push(res.data.successCaseList[i])
              }
            } else {
              this.successCaseList = res.data.successCaseList
            }
            this.successCaseList.forEach((item) => {
              if (item.description.length > 60) {
                item.description = item.description.substring(0, 60) + '...'
              }
            })
            if (res.data.expertList.length > 8) {
              for (let i = 0; i < 8; i++) {
                this.expertList.push(res.data.expertList[i])
              }
            } else {
              this.expertList = res.data.expertList
            }
            this.expertList.forEach((item) => {
              if (item.description.length > 60) {
                item.description = item.description.substring(0, 60) + '...'
              }
            })
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goUrl(type) {
        if (type == 0) {
          this.$router.push({
            name: 'expert'
          })
        } else if (type == 1) {
          this.$router.push({
            name: 'exampleSuc'
          })
        } else if (type == 2) {
          this.$router.push({
            name: 'zhineng'
          })
        } else if (type == 3) {
          this.$router.push({
            name: 'bigData'
          })
        } else if (type == 4) {
          this.$router.push({
            name: 'xuanke'
          })
        } else if (type == 5) {
          this.$router.push({
            name: 'question'
          })
        } else if (type == 6) {
          this.$router.push({
            name: 'about'
          })
        }
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
      buy() {
        this.$router.push({
          name: 'buy'
        })
      },
      goDetail(id, title) {
        this.$router.push({
          name: 'questionDetail',
          params: {
            id: id,
            name: title,
            type: 2
          }
        })
      },
      goDetail1(id) {
        this.$router.push({
          name: 'exampleDetail',
          params: {
            id: id
          }
        })
      },
      goExpert(id) {
        this.$router.push({
          name: 'expertDetail',
          params: {
            id: id
          }
        })
      },
      changeNav(k) {
        this.itemIndex = k
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 768px) {
    .notice {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      display: flex;
      justify-content: space-between;
    }

    .notice-right {
      width: 60%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
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
  }

  @media screen and (max-width: 769px) {
    .notice {
      width: 100%;
      padding: 50px 20px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }

    .notice-right {
      width: 60%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }

    .example-list {
      width: 100%;
    }

    .example-text {
      width: 100%;
      height: 210px;
      font-size: 14px;
      color: #666;
      padding: 16px 24px;
      box-sizing: border-box;
      line-height: 20px;
      text-align: justify;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .demo-carousel {
    width: 100%;
    height: 100%;
  }

  .demo-carousel>img {
    width: 100%;
    height: 100%;
  }

  .ivu-carousel-arrow {
    display: none !important;
  }

  .ivu-carousel-dots li button {
    background: rgb(255, 3, 80) !important;
  }

  .notice-left {
    width: 35%;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    margin: 1% 2% 1% 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .cards {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #FFFFFF;
    position: relative;
    padding-left: 36px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #FF0350;
  }

  .cards::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: #FFFFFF;
    border-radius: 4px;
  }

  .notice-cards {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    position: relative;
    padding-left: 36px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #FAFAFA;
  }

  .notice-cards::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: #333;
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

  .buy {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    background: #FF0350;
    cursor: pointer;
  }

  .public {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 15px;
    color: #FFFFFF;
    position: relative;
    padding-left: 24px;
    box-sizing: border-box;
    font-weight: 600;
    background: #FF0350;
  }

  .public::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 12px;
    width: 2px;
    height: 12px;
    background: #ffffff;
    border-radius: 4px;
  }

  .notice-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 12px;
    box-sizing: border-box;
  }

  .notice-list>li {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notice-text {
    width: 75%;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .notice-text:hover {
    color: rgb(255, 3, 80);
  }

  .notice-date {
    font-size: 14px;
    color: #999;
  }

  .example {
    width: 100%;
    padding: 20px 0;
    background: rgb(250, 250, 250);
  }

  .common {
    width: 20%;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    color: #FFFFFF;
    font-weight: 600;
    position: relative;
    padding-left: 36px;
    background: #FF0350;
    border-radius: 4px;
  }

  .common::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: #ffffff;
    border-radius: 4px;
  }

  .example-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 16px 0 16px 24px;
    box-sizing: border-box;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
