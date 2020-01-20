<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="titles">体育类数据查询</div>
      <div class="list-item">
        <div class="notice-left" @click="goCommon">
          <div class="cards">体育类招生院校查询</div>
          <div class="imgs">
            <img :src="tyzsIcon" alt="">
          </div>
        </div>
        <div class="notice-left" @click="goArt">
          <div class="cards">体育类院校排名</div>
          <div class="imgs">
            <img :src="tyyxIcon" alt="">
          </div>
        </div>
        <div class="notice-left" @click="goSchool">
          <div class="cards">按院校名称查询</div>
          <div class="imgs">
            <img :src="tymcIcon" alt="">
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
        itemIndex: 2,
        control: true,
        tyzsIcon: '',
        tyyxIcon: '',
        tymcIcon: '',
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
      this.$store.commit('getType', 2)
      this.init()
    },
    mounted() {
      this.pos()
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
      init() {
        Request.postRequest('jinxiuqiancheng/api/getIcon').then(res => {
          if (res.data.result == 0) {
            this.tyzsIcon = res.data.tyzsIcon
            this.tyyxIcon = res.data.tyyxIcon
            this.tymcIcon = res.data.tymcIcon
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
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
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight + 166 - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      goCommon() {
        this.$router.push({
          name: 'minScores',
          params: {
            type: 1
          }
        })
      },
      goArt() {
        this.$router.push({
          name: 'newSchool',
          params: {
            code: 2
          }
        })
      },
      goSchool() {
        this.$router.push({
          name: 'schoolSearch'
        })
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 768px) {
    .list {
      width: 1200px;
      margin: 16px auto 40px;
      display: flex;
      flex-direction: column;
    }

    .notice-left {
      width: 25%;
      border: 1px solid #eee;
      border-radius: 6px;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    }
  }

  @media screen and (max-width: 769px) {
    .list {
      width: 100%;
      margin: 16px 0 40px;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .notice-left {
      width: 30%;
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

  .list-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

  .imgs {
    width: 100%;
    height: 200px;
    padding: 24px;
    box-sizing: border-box;
  }

  .imgs>img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
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

  .mark {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  .modals {
    width: 15%;
    border-radius: 6px;
    background: #FFFFFF;
    overflow: hidden;
    position: relative;
  }

  .modals-title {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #333;
    background: rgb(250, 250, 250);
  }

  .modals>img {
    width: 10px;
    position: absolute;
    top: 11px;
    right: 12px;
  }

  .forms {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .warn {
    width: 100%;
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-top: 20px;
    line-height: 18px;
    font-family: '楷体';
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
