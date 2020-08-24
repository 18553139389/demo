<template>
  <keep-alive>
    <div class="wrapper">
      <headers></headers>
      <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
      <div class="list">
        <div class="list-search">
          <div class="list-title">
            <img :src="list.schoolLogo" alt="">
            <div class="list-school">
              <span style="font-size: 15px;">{{list.schoolName}}</span>
              <div>
                <span style="color: #666;">{{list.city}}</span>
                <span style="color: #666;">{{list.level}}</span>
              </div>
            </div>
          </div>
          <div class="list-title" style="border-bottom: 1px solid #eee;" v-if="list.description != ''">
            <!-- <p style="text-align: justify;line-height: 20px;">{{list.description}}</p> -->
            <p class="content" v-html="list.description" style="text-align: justify;line-height: 20px;"></p>
          </div>
          <div class="list-title" style="border-bottom: 1px solid #eee;" v-if="list.specialty.length > 0 && list.specialty[0] != ''">
            <div class="types">
              <span v-for="(v,k) in list.specialty" :key="k" style="text-align: justify;line-height: 18px;">{{v}}</span>
            </div>
          </div>
          <div class="list-title" style="border-bottom: none;">
            <div class="scores">
              <div class="scores-left" v-if="applyProv == 1">该校在山东的录取分</div>
              <div class="scores-left" v-if="applyProv == 0">该校在河南的录取分</div>
              <div class="scores-right">
                <Select v-model="types" style="width:160px;margin-right: 30px;" @on-change="changeTypes">
                  <Option v-for="item in typesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="years" style="width:160px;" @on-change="changeTypes">
                  <Option v-for="item in yearsList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
          </div>
          <div class="scores-list">
            <div class="scores-title" v-if="show1" v-for="(v,k) in typeList" :key="k">
              <div class="scores-item">
                <span>院校名称</span>
                <span class="texts" style="color: #666;">{{v.schoolName}}</span>
              </div>
              <div class="scores-item" v-if="type == 0">
                <span>最低分</span>
                <span class="texts" style="color: #666;">{{v.score}}</span>
              </div>
              <div class="scores-item" v-if="type == 1 || type == 2">
                <span>最低文化分</span>
                <span class="texts" style="color: #666;">{{v.whScore}}</span>
              </div>
              <div class="scores-item" v-if="type == 1 || type == 2">
                <span>最低专业分</span>
                <span class="texts" style="color: #666;">{{v.zyScore}}</span>
              </div>
              <div class="scores-item" v-if="type == 1 || type == 2">
                <span>最低综合分</span>
                <span class="texts" style="color: #666;">{{v.zhScore}}</span>
              </div>
              <div class="scores-item" v-if="type == 0">
                <span>最低位次</span>
                <span class="texts" style="color: #666;">{{v.precedence}}</span>
              </div>
              <div class="scores-item" v-if="type == 0">
                <span>省控线</span>
                <span class="texts" style="color: #666;">{{v.provLine}}</span>
              </div>
              <div class="scores-item">
                <span>录取批次</span>
                <span class="texts" style="color: #666;">{{v.batch}}</span>
              </div>
              <div class="scores-item" style="border: none;">
                <span>2020招生计划</span>
                <span style="color: royalblue;cursor: pointer;" @click="goSee">查看</span>
              </div>
            </div>
            <div v-if="!show1" style="padding-left: 20px;">没有符合条件的数据</div>
          </div>
          <div class="list-title" style="border-bottom: none;">
            <div class="scores">
              <div class="scores-left">专业分数线</div>
              <div class="scores-right">
                <Select v-model="types1" style="width:160px;margin-right: 30px;" @on-change="changeClasses">
                  <Option v-for="item in typesList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="years1" style="width:160px;" @on-change="changeClasses">
                  <Option v-for="item in yearsList1" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
          </div>
          <div class="store">
            <div class="scores-list">
              <div class="scores-title" v-if="show2" v-for="(v,k) in classList" :key="k">
                <div class="scores-item" style="width: 28%;">
                  <span>专业名称</span>
                  <span class="texts" style="color: #666;">{{v.specialtyName}}</span>
                </div>
                <div class="scores-item" v-if="type == 0">
                  <span>最低分</span>
                  <span class="texts" style="color: #666;">{{v.score}}</span>
                </div>
                <div class="scores-item" v-if="type == 1 || type == 2">
                  <span>最低文化分</span>
                  <span class="texts" style="color: #666;">{{v.whScore}}</span>
                </div>
                <div class="scores-item" v-if="type == 1 || type == 2">
                  <span>最低专业分</span>
                  <span class="texts" style="color: #666;">{{v.zyScore}}</span>
                </div>
                <div class="scores-item" v-if="type == 1 || type == 2">
                  <span>最低综合分</span>
                  <span class="texts" style="color: #666;">{{v.zhScore}}</span>
                </div>
                <div class="scores-item" v-if="type == 0">
                  <span>最低位次</span>
                  <span class="texts" style="color: #666;">{{v.precedence}}</span>
                </div>
                <div class="scores-item" v-if="applyProv == 1 && type == 0">
                  <span>选科要求</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 0">{{v.subjects}} 不限科目</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 1">{{v.subjects}} 一选一</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 2">{{v.subjects}} 二选一</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 3">{{v.subjects}} 二选二</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 4">{{v.subjects}} 三选一</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 5">{{v.subjects}} 三选二</span>
                  <span class="texts" style="color: #666;" v-if="v.claim == 6">{{v.subjects}} 三选三</span>
                </div>
                <div class="scores-item" style="border: none;">
                  <span>录取批次</span>
                  <span style="color: #666;">{{v.batch}}</span>
                </div>
                <div class="scores-item" style="border: none;">
                  <span>招生计划</span>
                  <span style="color: #666;">{{v.planNum}}</span>
                </div>
                <div class="scores-item" style="border: none;justify-content: center;">
                  <img :src="v.store == 1 ? '../../static/images/dashujuchaxan_hongxin.png' : '../../static/images/heart.png'"
                    alt="" @click="goStore(k,v.id)">
                </div>
              </div>
              <div v-if="!show2" style="padding-left: 20px;">没有符合条件的数据</div>
            </div>
          </div>
        </div>
      </div>
      <chat></chat>
      <div class="tool" v-if="see">
        <div class="tables">
          <div class="close" @click="goClose">X</div>
          <div class="tool-title">{{list.schoolName}}2020招生计划</div>
          <i-table :content="self" :data="tableData1" :columns="tableColumns1" stripe></i-table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="totalPage" :current="1" :page-size="5" @on-change="changePage"></Page>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="!control">
        <footers></footers>
      </div>
      <footers v-if="control"></footers>
    </div>
  </keep-alive>
</template>

<script>
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Chat from '../components/chat.vue'
  import Request from '../../utils/request.js'
  export default {
    beforeRouteLeave(to, from, next) {
      console.log(to)
      if (to.name === 'list' || to.name === 'minClasses') {
        to.meta.keepAlive = true
      }
      next()
    },
    data() {
      return {
        itemIndex: 2,
        types: 1,
        years: '2019',
        types1: 1,
        years1: '2019',
        control: true,
        totalPage: 0,
        typesList: [{
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
        typesList1: [{
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
        yearsList1: [{
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
        list: {},
        typeList: [],
        classList: [],
        show1: true,
        show2: true,
        applyProv: 0,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight,
        self: this,
        tableData1: [],
        tableColumns1: [{
            title: '专业名称',
            key: 'specialtyName'
          },
          {
            title: '批次',
            key: 'batch'
          },
          {
            title: '文理',
            key: 'wlType'
          },
          {
            title: '计划数',
            key: 'count'
          },
          {
            title: '科目要求',
            key: 'subjects'
          },
          {
            title: '门数要求',
            key: 'claim'
          }
        ],
        schoolId: '',
        see: false
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
      this.type = this.$store.state.typeAll
      if (this.$route.params.list) {
        this.list = JSON.parse(this.$route.params.list)
        console.log(this.list.description)
        this.schoolId = this.list.schoolId
        this.list.description = this.unescape(this.list.description)
        if (this.list.specialty.indexOf('，') > -1) {
          this.list.specialty = this.list.specialty.split('，')
        } else {
          let arr = []
          arr.push(this.list.specialty)
          this.list.specialty = arr
        }
        this.changeTypes()
        this.changeClasses()
      }
    },
    mounted() {
      this.pos()
    },
    watch: {
      typeList() {
        this.$nextTick(() => {
          this.pos()
        })
      },
      classList() {
        this.$nextTick(() => {
          this.pos()
        })
      }
    },
    methods: {
      changeNav(k) {
        this.itemIndex = k
      },
      unescape(html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /""/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'")
          .replace(/nbsp;/g, "&nbsp;")
          .replace(/&amp;/g, "")
          .replace(/amp;/g, "")
          .replace(/ldquo;/g, "\"")
          .replace(/rdquo;/g, "\"")
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
      changeTypes() {
        let datas = {
          uid: sessionStorage.getItem("uid"),
          schoolName: this.list.schoolName,
          wlType: this.types,
          year: this.years,
          schoolType: this.type
        }
        Request.postRequest('jinxiuqiancheng/api/schoolLineList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.typeList = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.show1 = true
              this.typeList = res.data.dataList
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
      changeClasses() {
        let datas = {
          uid: sessionStorage.getItem("uid"),
          schoolName: this.list.schoolName,
          wlType: this.types1,
          year: this.years1,
          schoolType: this.type
        }
        Request.postRequest('jinxiuqiancheng/api/specialtyLineList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.classList = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.show2 = true
              this.classList = res.data.dataList
              console.log(this.classList)
            } else {
              this.show2 = false
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goStore(k, id) {
        if (this.classList[k].store == 0) {
          this.classList[k].store = 1
        } else {
          this.classList[k].store = 0
        }
        let datas = {
          uid: sessionStorage.getItem("uid"),
          specialtyPrecedenceId: id
        }
        Request.postRequest('jinxiuqiancheng/api/collectionOrCancel', datas).then(res => {
          if (res.data.result == 0) {
            if (this.classList[k].store == 1) {
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
      },
      goSee() {
        this.see = true
        this.mockTableData1()
      },
      mockTableData1(page) {
        let datas = {
          uid: sessionStorage.getItem("uid"),
          schoolId: this.schoolId,
          nowPage: page,
          pageSize: 5
        }
        Request.postRequest('jinxiuqiancheng/api/enrollmentPlanList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.tableData1 = res.data.dataList
            this.tableData1.forEach((item, index) => {
              if (item.wlType == 0) {
                item.wlType = '文科'
              } else if (item.wlType == 1) {
                item.wlType = '理科'
              } else {
                item.wlType = '不限'
              }

              if (item.claim == 0) {
                item.claim = '不限科目'
              } else if (item.claim == 1) {
                item.claim = '1门科目考生必须选考方可报考'
              } else if (item.claim == 2) {
                item.claim = '2门科目考生选考其中一门即可报考'
              } else if (item.claim == 3) {
                item.claim = '2门科目考生均需选考方可报考'
              } else if (item.claim == 4) {
                item.claim = '3门科目考生选考其中一门即可报考'
              } else if (item.claim == 5) {
                item.claim = '3门科目考生选考其中二门即可报考'
              } else if (item.claim == 6) {
                item.claim = '3门科目考生均需选考方可报考'
              }
            })
            this.totalPage = res.data.totalPage * 5
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      changePage(page) {
        this.tableData1 = this.mockTableData1(page)
      },
      goClose() {
        this.see = false
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
      display: flex;
      flex-direction: column;
    }

    .scores-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #333;
      padding: 0 24px 20px 14px;
      box-sizing: border-box;
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
      display: flex;
      flex-direction: column;
    }

    .scores-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #333;
      padding: 0 24px 20px 14px;
      box-sizing: border-box;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  table tr th {
    border: none !important;
  }

  .tool {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tool-title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .close {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #E2E1E1;
    font-size: 16px;
    color: #333;
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }

  .tables {
    width: 70%;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 12px;
    background: #fff;
    position: relative;
  }

  .list-title {
    padding: 24px 24px 12px;
    box-sizing: border-box;
    border-bottom: 4px solid #eee;
    display: flex;
    align-items: center;
  }

  .list-title>img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }

  .list-school {
    height: 60px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 14px;
    color: #333;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .list-title>p {
    width: 100%;
    text-align: justify;
    font-size: 14px;
    color: #666;
    line-height: 18px;
  }

  .types {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 14px;
    color: #666;
  }

  .types>span {
    /* margin-right: 24px; */
  }

  .scores {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .scores-left {
    font-size: 14px;
    color: #333;
    position: relative;
    padding-left: 10px;
  }

  .scores-left:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 14px;
    background: rgb(255, 3, 80);
  }

  .scores-right {
    display: flex;
    align-items: center;
  }

  .store {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .scores-title {
    width: 100%;
    display: flex;
    margin-top: 30px;
  }

  .scores-item {
    width: 18%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #eee;
    padding: 0 20px;
  }

  .texts {
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
  }

  .scores-item>img {
    width: 24px;
    cursor: pointer;
  }

  .store>img {
    margin-right: 24px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
