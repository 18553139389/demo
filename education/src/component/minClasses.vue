<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-search">
        <div class="list-item">
          <!-- <div class="item">
            <div class="user-msg">专业名称：</div>
            <input type="text" v-model="zhuanye" placeholder="请输入专业名称">
          </div> -->
          <span class="user-msg" style="width: 12.5%;font-size: 14px;">填写专业：</span>
          <Input placeholder="例: 英语 , 计算机 , 医学" v-model="zhuanye" class="choices" style="width: 50%;" />
          <!-- <Select v-model="choice" multiple :max-tag-count="1" class="choices" style="width: 41%;">
            <Option v-for="item in classList" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select> -->
        </div>
        <div class="list-item">
          <div class="item">
            <span class="user-msg">文理科：</span>
            <Select v-model="scores" class="choices">
              <Option v-for="(item,index) in scoresList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="item" v-if="applyProv == 1">
            <span class="user-msg">查询批次：</span>
            <Select v-model="classes" class="choices">
              <Option v-for="(item,index) in classesList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="item" v-if="applyProv == 0">
            <span class="user-msg">查询批次：</span>
            <Select v-model="classes" class="choices">
              <Option v-for="(item,index) in classesList1" :value="item.value" :key="index">{{ item.label }}</Option>
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
          <div class="item">
            <div class="user-msg">考生位次：</div>
            <input type="text" class="choices" v-model="names" placeholder="请输入位次" style="width: 160px;">
            <div class="btns-item" @click="goLook" style="margin-left: 28px;">查询位次</div>
          </div>
        </div>
        <div class="btnSub">
          <div class="btns-item" @click="goSchool">搜索</div>
        </div>
      </div>
      <div class="list-search" v-if="show1 && list.length > 0">
        <div class="schools-title" style="margin-bottom: 16px;">
          <span>大学名称</span>
          <span>大学层次</span>
          <span>专业名称</span>
          <span>最低分</span>
          <span>最低位次</span>
          <span>录取批次</span>
          <span>所在省份</span>
          <span v-if="applyProv == 1">选科要求</span>
          <span>收藏</span>
        </div>
        <div class="schools" v-for="(v,k) in list" :key="k">
          <!-- <img :src="v.schoolLogo" alt=""> -->
          <div class="schools-list">
            <div class="schools-title" style="margin-top: 10px;">
              <span class="school-name" @click="goUniversity(v.schoolName)">{{v.schoolName}}</span>
              <span>{{v.level}}</span>
              <span>{{v.specialtyName}}</span>
              <span>{{v.score}}</span>
              <span>{{v.precedence}}</span>
              <span>{{v.batch}}</span>
              <span>{{v.province}}</span>
              <span v-if="applyProv == 1">{{v.claim}}</span>
              <span>
                <img class="store" :src="v.store == 1 ? '../../static/images/dashujuchaxan_hongxin.png' : '../../static/images/heart.png'" alt="" @click.stop="goStore(k,v.id)">
              </span>
            </div>
          </div>
        </div>
        <div class="pages">
          <Page :total="totalPage" :page-size="10" @on-change="getList" />
        </div>
      </div>
      <div class="list-search" style="font-size: 14px;text-align: center;" v-if="!show1">没有搜索到符合条件的大学 !</div>
    </div>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <chat></chat>
    <footers v-if="control"></footers>
    <div class="mark" v-if="show">
      <div class="modals">
        <div class="modals-title">查询</div>
        <img @click="close" src="../../static/images/close.png" alt="">
        <div class="forms">
          <div class="form-item">
            <div>成绩：</div>
            <input type="text" placeholder="请输入成绩" v-model="score">
            <div style="margin-left: 12px;cursor: pointer;" @click="goSearch">查询</div>
          </div>
          <div class="form-item">
            <div>位次：</div>
            <input type="text" placeholder="位次" v-model="rank">
          </div>
        </div>
      </div>
    </div>
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
        show: false,
        itemIndex: 2,
        classes: 0,
        scores: 1,
        score: '',
        rank: '',
        years: '2019',
        names: '',
        zhuanye: '',
        control: true,
        totalPage: 0,
        show1: true,
        list: [],
        classesList: [{
            value: 0,
            label: '提前批'
          },
          {
            value: 1,
            label: '本科'
          },
          {
            value: 2,
            label: '专科'
          },
          {
            value: 3,
            label: '不限批次'
          }
        ],
        classesList1: [{
            value: 0,
            label: '提前批'
          },
          {
            value: 1,
            label: '本科一批'
          },
          {
            value: 2,
            label: '本科二批'
          },
          {
            value: 3,
            label: '专科'
          },
          {
            value: 4,
            label: '不限批次'
          }
        ],
        scoresList: [{
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
        applyProv: 0,
        choice: [],
        classList: [],
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
      if(this.applyProv == 0) {
        this.classes = 1
      } else {
        this.classes = 1
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.pos()
      })
    },
    watch: {
      // zhuanye(newVal, oldVal) {
      //   let self = this
      //   if(newVal.indexOf('，') > -1) {
      //     newVal = newVal.split('，').join(',')
      //   }
      //   let datas = {
      //     specialtyName: newVal
      //   }
      //   Request.postRequest('jinxiuqiancheng/api/searchSpecialtyList', datas).then(res => {
      //     if (res.data.result == 0) {
      //       if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
      //         self.classList = res.data.dataList
      //       }
      //     } else {
      //       self.classList = []
      //       this.$Message.warning(res.data.resultNote)
      //     }
      //   }).catch(res => {
      //     console.log(res)
      //   })
      // },
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
        if (this.score == '') {
          this.$Message.warning('成绩不能为空')
          return
        }

        let datas = {
          uid: sessionStorage.getItem("uid"),
          wlType: this.scores,
          score: this.score
        }

        Request.postRequest('jinxiuqiancheng/api/findRanking', datas).then(res => {
          if (res.data.result == 0) {
            if (!res.data.ranking) {
              this.show = false
              this.score = ''
              this.$Message.warning('没有查询到该名次')
            } else {
              this.rank = res.data.ranking
              this.names = res.data.ranking
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goSchool() {
        if (this.names == '') {
          this.$Message.warning('位次不能为空')
          return
        }

        //获取分页数据
        this.getList(1)
      },
      getList(page) {
        if(this.zhuanye.indexOf('，') > -1) {
          this.zhuanye = this.zhuanye.split('，').join(',')
        }
        let datas = {
          uid: sessionStorage.getItem("uid"),
          wlType: this.scores,
          specialtyName: this.zhuanye,
          pcType: this.classes,
          year: this.years,
          precedence: this.names,
          nowPage: page
        }

        Request.postRequest('jinxiuqiancheng/api/specialtyPrecedenceList', datas).then(res => {
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
      goUniversity(val) {
        console.log(val)
        let datas = {
          schoolName: val
        }
        Request.postRequest('jinxiuqiancheng/api/schoolDetail', datas).then(res => {
          console.log(res)
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
      },
      goStore(k, id) {
        if (this.list[k].store == 0) {
          this.list[k].store = 1
        } else {
          this.list[k].store = 0
        }
        let datas = {
          uid: sessionStorage.getItem("uid"),
          specialtyPrecedenceId: id
        }
        Request.postRequest('jinxiuqiancheng/api/collectionOrCancel', datas).then(res => {
          if (res.data.result == 0) {
            if (this.list[k].store == 1) {
              this.$Message.success('收藏成功')
            } else {
              this.$Message.warning('取消收藏')
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
    align-items: center;
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
    padding: 6px 8px;
    font-size: 14px;
    color: #FFFFFF;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .btns-item:hover {
    cursor: pointer;
  }

  .schools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .schools>img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }

  .schools-list {
    flex: 1;
    /* padding-left: 24px; */
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

  .school-name:hover {
    color: #FF0350;
    cursor: pointer;
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

  .store {
    width: 24px;
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
