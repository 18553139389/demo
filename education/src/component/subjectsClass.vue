<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-search">
        <div class="list-item">
          <div class="item">
            <div class="user-msg">按院校选择：</div>
            <input class="choices" type="text" v-model="schools" placeholder="请输入院校名称">
          </div>
          <div class="item">
            <div class="user-msg">按专业选择：</div>
            <input class="choices" type="text" v-model="names" placeholder="请输入专业名称">
          </div>
        </div>
        <div class="list-item">
          <div class="item">
            <span class="user-msg">按省份选择：</span>
            <Select v-model="address" class="choices">
              <Option v-for="(item,index) in addressList" :value="item.name" :key="index">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="item">
            <div class="btnSuc">
              <div class="btns-item" @click="goSearch">搜索</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-search" v-if="show && list.length > 0">
        <div class="schools-title" style="margin-bottom: 16px;">
          <span>大学名称</span>
          <span>大学层次</span>
          <span>所在省份</span>
          <span>专业名称</span>
          <span>录取批次</span>
          <span>学科</span>
          <span>门数要求</span>
        </div>
        <div class="schools" v-for="(v,k) in list" :key="k" @click="goUniversity(v.schoolName)">
          <!-- <img src="../../static/images/list.jpg" alt=""> -->
          <div class="schools-list">
            <div class="schools-title">
              <span>{{v.schoolName}}</span>
              <span>{{v.level}}</span>
              <span>{{v.province}}</span>
              <span>{{v.specialtyName}}</span>
              <span style="color: #666;">{{v.batch}}</span>
              <span>{{v.subjects}}</span>
              <span>{{v.claim}}</span>
            </div>
          </div>
        </div>
        <div class="pages">
          <Page :total="totalPage" :page-size="10" @on-change="getList" />
        </div>
      </div>
      <div class="list-search" style="font-size: 14px;text-align: center;" v-if="!show">没有搜索到符合条件的大学 !</div>
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
        show: true,
        itemIndex: 4,
        schools: '',
        names: '',
        address: '',
        addressList: Province,
        control: true,
        list: [],
        totalPage: 0,
        applyProv: 0,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    created() {
      this.applyProv = sessionStorage.getItem("applyProv")
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
    components: {
      Headers,
      Navs,
      Footers,
      Chat
    },
    methods: {
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
      goSearch() {
        let self = this
        // if(this.schools == ''){
        //   this.$Message.warning('院校名称不能为空')
        //   return
        // }

        // if(this.names == ''){
        //   this.$Message.warning('专业名称不能为空')
        //   return
        // }

        // if(this.address == ''){
        //   this.$Message.warning('请选择省份')
        //   return
        // }
        this.getList(1)
      },
      getList(page) {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid"),
          combinationId: sessionStorage.getItem("team"),
          schoolName: this.schools,
          specialtyName: this.names,
          province: this.address,
          nowPage: page
        }

        Request.postRequest('jinxiuqiancheng/api/selectionSearchList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.list = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.show = true
              this.totalPage = res.data.totalPage * 10
              this.list = res.data.dataList
            } else {
              this.show = false
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goDetail() {
        this.$router.push({
          name: 'schoolDetail'
        })
      },
      goUniversity(val) {
        let datas = {
          schoolName: val
        }
        Request.postRequest('jinxiuqiancheng/api/schoolDetail', datas).then(res => {
          if (res.data.result == 0) {
            let list = res.data
            this.$store.commit('getType',0)
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

    .user-msg {
      display: inline-block;
      width: 25%;
    }

    .btns-item {
      padding: 10px 20px;
      font-size: 14px;
      color: #FFFFFF;
      background: rgb(255, 3, 80);
      border-radius: 4px;
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

    .user-msg {
      display: inline-block;
      width: 45%;
    }

    .btns-item {
      padding: 10px 20px;
      font-size: 14px;
      color: #FFFFFF;
      background: rgb(255, 3, 80);
      border-radius: 4px;
      margin-left: 24px;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
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

  .btnSuc {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .btns-item:hover {
    cursor: pointer;
  }

  .schools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    cursor: pointer;
  }

  .schools>img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }

  .schools-list {
    flex: 1;
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
    width: 300px;
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
  }

  .form-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  .form-item input {
    width: 65%;
    border: none;
    outline: none;
    border-radius: 20px;
    background: rgb(250, 250, 250);
    padding: 4px 10px;
    box-sizing: border-box;
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
