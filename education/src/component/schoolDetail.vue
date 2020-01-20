<template>
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
          <p>{{list.description}}</p>
        </div>
        <div class="list-title" style="border-bottom: 1px solid #eee;" v-if="list.specialty.length > 0 && list.specialty[0] != ''">
          <div class="types">
            <span v-for="(v,k) in list.specialty" :key="k">{{v}}</span>
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
            <div class="scores-item" style="border: none;">
              <span>录取批次</span>
              <span class="texts" style="color: #666;">{{v.batch}}</span>
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
                <span class="texts" style="color: #666;">{{v.claim}}</span>
              </div>
              <div class="scores-item" style="border: none;">
                <span>录取批次</span>
                <span style="color: #666;">{{v.batch}}</span>
              </div>
              <div class="scores-item" style="border: none;justify-content: center;">
                <img :src="v.store == 1 ? '../../static/images/dashujuchaxan_hongxin.png' : '../../static/images/heart.png'" alt="" @click="goStore(k,v.id)">
              </div>
            </div>
            <div v-if="!show2" style="padding-left: 20px;">没有符合条件的数据</div>
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
        types: 1,
        years: '2019',
        types1: 1,
        years1: '2019',
        control: true,
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
      this.type = this.$store.state.typeAll
      if (this.$route.params.list) {
        this.list = JSON.parse(this.$route.params.list)
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
        console.log(datas)
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
        console.log(datas)
        Request.postRequest('jinxiuqiancheng/api/specialtyLineList', datas).then(res => {
          if (res.data.result == 0) {
            this.classList = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.show2 = true
              this.classList = res.data.dataList
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
    margin-right: 24px;
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
