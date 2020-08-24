<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-search">
        <div class="list-item">
          <div class="item">
            <div class="user-msg">学科名称：</div>
            <input type="text" class="choices" v-model="names" placeholder="请输入专业名称">
          </div>
          <div class="item">
            <span class="user-msg">年份：</span>
            <Select v-model="years" class="choices">
              <Option v-for="(item,index) in yearsList" :value="item.label" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="look" @click="goLook">综合查询</div>
        </div>
        <ul class="hot" v-if="show1 && list.length > 0">
          <li class="hot-list">
            <div>学科名称</div>
            <div>院校名称</div>
            <div>级别</div>
          </li>
          <li class="hot-list" style="font-weight: 500;" v-for="(v,k) in list" :key="k">
            <div>{{v.specialtyName}}</div>
            <div>{{v.schoolName}}</div>
            <div>{{v.level}}</div>
          </li>
          <li class="pages">
            <Page :total="totalPage" :page-size="10" :current="pages" @on-change="getList" />
          </li>
        </ul>
      </div>
      <div class="list-search" style="font-size: 14px;text-align: center;" v-if="!show1">没有搜索到符合条件的专业排名 !</div>
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
        show1: true,
        itemIndex: 2,
        scores: 1,
        years: '2019',
        names: '',
        control: true,
        totalPage: 1,
        list: [],
        pages: 1,
        yearsList: [{
            value: 1,
            label: '2017'
          },
          {
            value: 2,
            label: '2018'
          },
          {
            value: 3,
            label: '2019'
          }
        ],
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat
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
      goLook() {
        if (this.names == '') {
          this.$Message.warning('学科名称不能为空')
          return
        }
        this.getList(1)
      },
      getList(page) {
        this.pages = page
        let datas = {
          specialtyName: this.names,
          year: this.years,
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/specialtyRanking', datas).then(res => {
          if (res.data.result == 0) {
            this.list = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.show1 = true
              this.totalPage = res.data.totalPage * 10
              this.list = res.data.dataList
            } else {
              this.show1 = false
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
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
      display: flex;
      flex-direction: column;
      margin: 40px auto;
    }

    .choices {
      width: 260px;
    }

    .item {
      width: 35%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
    }

    .user-msg {
      display: inline-block;
      width: 25%;
    }

    .look {
      padding: 8px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #FFFFFF;
      margin-left: 80px;
      background: rgb(190, 1, 59);
      border-radius: 6px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 40px 0;
    }

    .choices {
      width: 160px;
    }

    .item {
      width: 45%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
    }

    .user-msg {
      display: inline-block;
      width: 40%;
    }

    .look {
      padding: 8px 4px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #FFFFFF;
      background: rgb(190, 1, 59);
      border-radius: 6px;
      cursor: pointer;
      margin-top: 20px;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-search {
    width: 80%;
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 6px;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, .3);
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }

  .list-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .item input {
    border: none;
    font-size: 14px;
    color: #333;
    margin-left: 12px;
  }

  .item input:focus {
    border: none;
    outline: none;
  }

  .hot {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .hot-list {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .hot-list>div {
    width: 33%;
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
