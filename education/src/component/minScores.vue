<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-search">
        <div class="list-item">
          <div class="item">
            <span class="user-msg">文理科：</span>
            <Select v-model="classes" class="choices">
              <Option v-for="(item,index) in classesList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="item">
            <span class="user-msg">省份：</span>
            <Select v-model="types" class="choices">
              <Option v-for="(item,index) in typesList" :value="item.name" :key="index">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="list-item">
          <div class="item">
            <span class="user-msg">查询年份：</span>
            <Select v-model="years" class="choices">
              <Option v-for="(item,index) in yearsList" :value="item.label" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="btnSub">
          <div class="btns-item" style="margin-left: 30px;" @click="goSearch">搜索</div>
        </div>
      </div>
      <div class="list-search" v-if="show1 && list.length > 0">
        <div class="schools-title" style="margin-bottom: 16px;padding-left: 94px;">
          <span>大学名称</span>
          <span>类型</span>
          <span>文化分</span>
          <span>专业分</span>
          <span>综合分</span>
          <span>录取批次</span>
        </div>
        <div class="schools" v-for="(v,k) in list" :key="k">
          <img :src="v.schoolLogo" alt="">
          <div class="schools-list">
            <div class="schools-title">
              <span class="school-name" @click="goUniversity(v.schoolName)">{{v.schoolName}}</span>
              <span>{{v.type}}</span>
              <span>{{v.whScore}}</span>
              <span>{{v.zyScore}}</span>
              <span>{{v.zhScore}}</span>
              <span>{{v.batch}}</span>
            </div>
          </div>
        </div>
        <div class="pages">
          <Page :total="totalPage" :page-size="10" @on-change="getList" />
        </div>
      </div>
      <div class="list-search" style="font-size: 14px;text-align: center;" v-if="!show1">没有搜索到符合条件的大学 !</div>
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
  import Province from '../common/city.js'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        show: false,
        itemIndex: 2,
        classes: 0,
        types: '',
        years: '2019',
        names: '',
        control: true,
        show1: true,
        list: [],
        totalPage: 0,
        applyProv: 1,
        classesList: [{
            value: 0,
            label: '文科'
          },
          {
            value: 1,
            label: '理科'
          },
          {
            value: 2,
            label: '不限'
          }
        ],
        typesList: Province,
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
    created() {
      this.applyProv = sessionStorage.getItem("applyProv")
      if(this.$route.params.type == 0) {
        this.classes = 0
      } else {
        this.classes = 1
      }
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
      changeNav(k) {
        this.itemIndex = k
      },
      goUniversity(val) {
        let datas = {
          schoolName: val
        }
        Request.postRequest('jinxiuqiancheng/api/schoolDetail', datas).then(res => {
          if (res.data.result == 0) {
            let list = res.data
            this.$router.push({
              name: 'schoolDetail',
              params: {
                list: JSON.stringify(list)
              }
            })
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
      goDetail() {
        this.$router.push({
          name: 'schoolDetail'
        })
      },
      goLook() {
        this.show = true
      },
      close() {
        this.show = false
      },
      goSearch() {
        this.getList(1)
      },
      getList(page) {
        let datas = {
          uid: sessionStorage.getItem("uid"),
          type: this.$route.params.type,
          wlType: this.classes,
          provinces: this.types,
          year: this.years,
          nowPage: page
        }

        Request.postRequest('jinxiuqiancheng/api/recruitList', datas).then(res => {
          console.log(res)
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
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 768px) {
    .list {
      width: 1200px;
      display: flex;
      flex-direction: column;
      margin: 40px auto;
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

    .choices {
      width: 260px;
    }
  }

  @media screen and (max-width: 769px) {
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 40px 0;
    }

    .list-search {
      width: 90%;
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

    .choices {
      width: 160px;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .user-msg {
    display: inline-block;
    width: 25%;
  }

  .list-item {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
  }

  .item {
    width: 50%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
  }

  .item input {
    border: none;
    font-size: 14px;
    color: #333;
  }

  .item input:focus {
    border: none;
    outline: none;
  }

  .btnSub {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btns-item {
    padding: 10px 24px;
    font-size: 14px;
    color: #FFFFFF;
    background: rgb(190, 1, 59);
    border-radius: 4px;
  }

  .btns-item:hover {
    cursor: pointer;
  }

  .schools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .schools>img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }

  .schools-list {
    flex: 1;
    height: 60px;
    padding-left: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }

  .schools-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
  }

  .schools-title span {
    flex: 1;
    text-align: center;
  }

  .school-name:hover {
    color: #FF0350;
    cursor: pointer;
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
