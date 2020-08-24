<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-box">
        <ul class="list-item">
          <li class="item" v-for="(v,k) in questions" :key="k" :class="questionIndex == k ? 'active' : ''" @click="changeArr(k)">{{v}}</li>
        </ul>
        <ul class="list-detail" v-if="questionIndex == 0">
          <li class="detail" v-for="(v,k) in list" :key="k" @click="goDetail(v.id,v.title,k)">
            <div class="icon"></div>
            <div class="titles">{{v.title}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="5" @on-change="getList" />
          </li>
        </ul>
        <ul class="list-detail" v-if="questionIndex == 1">
          <li class="detail" v-for="(v,k) in list" :key="k" @click="goDetail(v.id,v.title)">
            <div class="icon"></div>
            <div class="titles">{{v.title}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="5" @on-change="getList" />
          </li>
        </ul>
        <ul class="list-detail" v-if="questionIndex == 2">
          <li class="detail" v-for="(v,k) in list" :key="k" @click="goDetail(v.id,v.title)">
            <div class="icon"></div>
            <div class="titles">{{v.title}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="5" @on-change="getList" />
          </li>
        </ul>
        <ul class="list-detail" v-if="questionIndex == 3">
          <li class="detail" v-for="(v,k) in list" :key="k" @click="goDetail(v.id,v.title)">
            <div class="icon"></div>
            <div class="titles">{{v.title}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="5" @on-change="getList" />
          </li>
        </ul>
        <ul class="list-detail" v-if="questionIndex == 4">
          <li class="detail" v-for="(v,k) in list" :key="k" @click="goDetail1(v.id)">
            <div class="icon"></div>
            <div class="titles">{{v.name}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="8" @on-change="getListSuc" />
          </li>
        </ul>
        <ul class="list-detail" v-if="questionIndex == 5">
          <li class="detail" v-for="(v,k) in list" :key="k" @click="goDetail2(v.id)">
            <div class="icon"></div>
            <div class="titles">{{v.name}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="8" @on-change="getListExpert" />
          </li>
        </ul>
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
        itemIndex: 7,
        questionIndex: 0,
        questions: ['常见问题', '操作教程', '公告通知', '热点资讯', '成功案例', '专家团队'],
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
      if (this.$route.params.tab == 0) {
        this.questionIndex = 2
        this.init(2, 1)
      } else if (this.$route.params.tab == 1) {
        this.questionIndex = 3
        this.init(3, 1)
      } else if (this.$route.params.tab == 2) {
        this.questionIndex = 4
        this.getSuc(1)
      } else if (this.$route.params.tab == 3) {
        this.questionIndex = 5
        this.getListExpert(1)
      } else {
        this.init(0, 1)
      }
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
      init(k, page) {
        let self = this
        let datas = {
          type: k,
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/questionList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            self.totalPage = res.data.totalPage * 5
            self.list = res.data.dataList
            self.$nextTick(() => {
              self.initBottom()
            })
          } else {
            this.$Message.warning(res.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      getSuc(page) {
        let self = this
        let datas = {
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/successCaseList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.list = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.totalPage = res.data.totalPage * 8
              this.list = res.data.dataList
              self.$nextTick(() => {
                self.initBottom()
              })
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      getList(page) {
        this.init(this.questionIndex, page)
      },
      getListSuc(page) {
        this.getSuc(page)
      },
      getListExpert(page) {
        let self = this
        let datas = {
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/expertList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.teamList = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.totalPage = res.data.totalPage * 8
              this.list = res.data.dataList
              self.$nextTick(() => {
                self.initBottom()
              })
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      initBottom() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if(this.control) {
          bodyHeight = bodyHeight -208
        }
        console.log(bodyHeight)
        console.log(winHeight)
        if (bodyHeight + 208 - winHeight > 0) {
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
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight + 166 - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      changeArr(k) {
        if (this.questionIndex == k) {
          return
        }
        this.questionIndex = k
        if(k != 4 && k!= 5) {
          this.init(k, 1)
        } else if(k == 4) {
          this.getSuc(1)
        } else {
          this.getListExpert(1)
        }
      },
      goDetail(id, title) {
        this.$router.push({
          name: 'questionDetail',
          params: {
            id: id,
            name: title,
            type: this.questionIndex
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
      goDetail2(id) {
        this.$router.push({
          name: 'expertDetail',
          params: {
            id: id
          }
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
      align-items: center;
      margin: 40px auto 24px;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 40px 0 24px;
    }

    .titles {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .list-detail {
      width: 70%;
      display: flex;
      flex-direction: column;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-box {
    width: 90%;
    display: flex;
    justify-content: space-between;
  }

  .list-item {
    display: flex;
    flex-direction: column;
  }

  .item,
  .detail {
    height: 50px;
    padding: 16px 50px;
    background: rgb(230, 230, 230);
    border-radius: 6px;
    font-size: 15px;
    color: #666;
    font-weight: 600;
    margin-bottom: 14px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .active {
    background: rgb(255, 3, 80);
    color: #FFFFFF;
  }

  .list-detail {
    flex: 0.9;
    display: flex;
    flex-direction: column;
  }

  .detail {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #666;
    font-weight: 600;
  }

  .icon {
    width: 18px;
    height: 18px;
    background: rgb(181, 181, 181);
    border-radius: 50%;
    margin-right: 20px;
  }

  .pages {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }


  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
