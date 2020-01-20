<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="example">
        <div class="example-list">
          <div class="common">成功案例</div>
          <div class="example-item">
            <div class="notice-left" style="width: 23%;" v-for="(v,k) in list" :key="k" @click="goDetail(v.id)">
              <div class="cards">{{v.name}}</div>
              <div class="example-text" v-html="v.description"></div>
            </div>
          </div>
          <div class="pages">
            <Page :total="totalPage" :page-size="8" @on-change="getList" />
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
        itemIndex: 3,
        control: true,
        totalPage: 0,
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
      },
      list() {
        this.pos()
      }
    },
    methods: {
      getList(page) {
        let self = this
        let datas = {
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/successCaseList', datas).then(res => {
          if (res.data.result == 0) {
            this.list = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.totalPage = res.data.totalPage * 8
              this.list = res.data.dataList
              this.list.forEach((item) => {
                if(item.description.length > 50) {
                  item.description = item.description.substring(0,50) + '...'
                }
              })
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
      goDetail(id) {
        this.$router.push({
          name: 'exampleDetail',
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
    .list {
      width: 1200px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
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

    .example-list {
      width: 1200px;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 769px) {
    .list {
      width: 100%;
      margin: 40px 0;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
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

    .example-list {
      width: 100%;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .example {
    width: 100%;
    padding: 20px 0;
    background: #FFFFFF;
  }

  .common {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding-left: 36px;
  }

  .common::before {
    content: '';
    position: absolute;
    top: 19px;
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
    padding: 16px 0 16px 24px;
    box-sizing: border-box;
  }

  .notice-left {
    width: 23%;
    margin-right: 2%;
    margin-bottom: 2%;
    border: 1px solid #eee;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    margin-right: 2%;
    margin-bottom: 2% ;
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
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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

  .pages {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-right: 2%;
    box-sizing: border-box;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
