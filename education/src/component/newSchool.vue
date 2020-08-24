<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-search">
        <div class="list-item">
          <div class="item">
            <span class="user-msg">所在省份：</span>
            <Select v-model="address" class="choices">
              <Option v-for="(item,index) in addressList" :value="item.name" :key="index">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="item">
            <span class="user-msg">类型：</span>
            <Select v-model="types" class="choices">
              <Option v-for="(item,index) in typesList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="look" @click="goLook">查询</div>
        </div>
        <ul class="hot" v-if="show1 && list.length > 0">
          <li class="hot-list">
            <div>院校名称</div>
            <div>所在城市</div>
            <div>类型</div>
            <div>排名</div>
          </li>
          <li class="hot-list" style="font-weight: 500;" v-for="(v,k) in list" :key="k">
            <div @click="goUniversity(v.schoolName)" class="names">{{v.schoolName}}</div>
            <div>{{v.province}}</div>
            <div v-if="v.type === ''">全部</div>
            <div v-if="v.type === '0'">理工类</div>
            <div v-if="v.type === '1'">综合类</div>
            <div v-if="v.type === '2'">语言类</div>
            <div v-if="v.type === '3'">医药类</div>
            <div v-if="v.type === '4'">财经类</div>
            <div v-if="v.type === '5'">艺术类</div>
            <div v-if="v.type === '6'">师范类</div>
            <div v-if="v.type === '7'">农林类</div>
            <div v-if="v.type === '8'">政法类</div>
            <div v-if="v.type === '9'">体育类</div>
            <div v-if="v.type === '10'">民族类</div>
            <div v-if="v.type === '11'">军事类</div>
            <div>{{10 * pages + (k + 1)}}</div>
          </li>
        </ul>
        <div class="pages" v-if="show1 && list.length > 0">
          <Page :total="totalPage" :page-size="10" :current="currents" @on-change="getList" />
        </div>
        <div v-if="!show1" style="font-size: 14px;">没有符合条件的数据 !</div>
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
  import Province from '../common/city.js'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        itemIndex: 2,
        address: '全国',
        types: -1,
        addressList: Province,
        control: true,
        list: [],
        show1: true,
        totalPage: 0,
        typesList: [],
        pages: 0,
        currents: 1,
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
      if (this.$route.params.code) {
        this.$store.commit('getCode', this.$route.params.code)
      }
      let code = this.$route.params.code
      if (code == 0) {
        this.typesList = [{
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '理工类'
        }, {
          value: 1,
          label: '综合类'
        }, {
          value: 2,
          label: '语言类'
        }, {
          value: 3,
          label: '医药类'
        }, {
          value: 4,
          label: '财经类'
        }, {
          value: 6,
          label: '师范类'
        }, {
          value: 7,
          label: '农林类'
        }, {
          value: 8,
          label: '政法类'
        }, {
          value: 10,
          label: '民族类'
        }, {
          value: 11,
          label: '军事类'
        }]
      } else if (code == 1) {
        this.types = 5
        this.typesList = [{
          value: 5,
          label: '艺术类'
        }]
      } else if (code == 2) {
        this.types = 9
        this.typesList = [{
          value: 9,
          label: '体育类'
        }]
      }
      this.getList(1)
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
        this.getList(1)
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
      getList(page) {
        this.currents = page
        this.pages = page - 1
        let types = this.types
        let address = this.address
        if (this.types == -1) {
          types = ''
        }
        if (this.address == '全国') {
          address = ''
        }
        let datas = {
          province: address,
          type: types,
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/schoolRanking', datas).then(res => {
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
            this.$Message.warning(res.resultNote)
          }
        }).catch(res => {
          console.log(res)
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

    .list-item {
      width: 100%;
      display: flex;
      margin-bottom: 30px;
    }

    .choices {
      width: 260px;
    }

    .item {
      width: 40%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
      margin-right: 30px;
    }

    .look {
      padding: 8px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #FFFFFF;
      margin-left: 30px;
      background: rgb(190, 1, 59);
      border-radius: 6px;
      cursor: pointer;
    }

    .user-msg {
      display: inline-block;
      width: 25%;
    }
  }

  @media screen and (max-width: 1024px) {
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

    .list-item {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }

    .choices {
      width: 160px;
    }

    .item {
      width: 40%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
      margin-right: 30px;
    }

    .look {
      padding: 4px 8px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #FFFFFF;
      background: rgb(190, 1, 59);
      border-radius: 6px;
      cursor: pointer;
    }

    .user-msg {
      display: inline-block;
      width: 35%;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
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
    width: 25%;
    text-align: center;
  }

  .names:hover {
    color: #FF0350;
    cursor: pointer;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .pages {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
</style>
