<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-item">
        <div class="titles">请选择三个科目创建科目组合</div>
        <ul class="classes">
          <li v-for="(v,k) of lis" :key="k" :class="v.state ? 'active' : ''" @click="changeItems(k,v.type)">{{v.type}}</li>
          <li style="color: #FFFFFF;background: rgb(255, 3, 80);" @click="check">创建并查询科目组合</li>
        </ul>
      </div>
      <div class="list-item">
        <div class="titles">我创建的科目组合</div>
        <ul class="classes" v-for="(v,k) in list" :key="k" v-if="show && list.length > 0">
          <li>{{v.subjects[0]}}</li>
          <li class="add">+</li>
          <li>{{v.subjects[1]}}</li>
          <li class="add">+</li>
          <li>{{v.subjects[2]}}</li>
          <li style="color: #FFFFFF;background: rgb(255, 3, 80);" @click="go(v.subjects[0],v.subjects[1],v.subjects[2])">查询</li>
          <li style="color: #FFFFFF;background: rgb(255, 3, 80);" @click="del(v.id,k)">删除</li>
        </ul>
        <div class="page" v-if="show && list.length > 0">
          <Page :total="totalPage" :page-size="10" @on-change="getList" />
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
        itemIndex: 4,
        items: 0,
        lis: [{
            state: false,
            type: '物理'
          },
          {
            state: false,
            type: '化学'
          },
          {
            state: false,
            type: '生物'
          },
          {
            state: false,
            type: '历史'
          },
          {
            state: false,
            type: '地理'
          },
          {
            state: false,
            type: '政治'
          }
        ],
        control: false,
        ulList: [{
            id: 0,
            subjects: '历史,地理,政治'
          },
          {
            id: 1,
            subjects: '物理,化学,历史'
          }
        ],
        list: [],
        subjects: [],
        show: false,
        totalPage: 0,
        ids: '',
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
      list() {
        this.$nextTick(() => {
          this.pos()
        })
      }
    },
    methods: {
      getList(page) {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid"),
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/combinationList', datas).then(res => {
          if (res.data.result == 0) {
            this.list = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.totalPage = res.data.totalPage * 10
              this.list = res.data.dataList
              this.list.forEach((item) => {
                item.subjects = item.subjects.split('+')
              })
              this.show = true
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
      changeItems(k, v) {
        let count = 0
        this.lis.forEach((item) => {
          if (item.state) {
            count++
          }
        })
        if (count == 3 && !this.lis[k]['state']) {
          return
        }
        this.lis[k]['state'] = !this.lis[k]['state']
      },
      del(id, k) {
        let datas = {
          uid: sessionStorage.getItem("uid"),
          combinationId: id
        }
        Request.postRequest('jinxiuqiancheng/api/delCombination', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.list.splice(k, 1)
            this.$Message.success('删除成功')
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      check() {
        let count = 0
        this.subjects = []
        this.lis.forEach((item) => {
          if (item.state) {
            count++
            this.subjects.push(item.type)
          }
        })
        if (count < 3) {
          this.$Message.error('请选择科目')
          return
        }

        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid"),
          subjects: this.subjects.join(',')
        }
        Request.postRequest('jinxiuqiancheng/api/addCombination', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.ids = res.data.combinationId
            sessionStorage.setItem("team", this.ids)
            setTimeout(() => {
              self.$router.push({
                name: 'subjectsClass'
              })
            }, 300)
          } else {
            this.$Message.warning(res.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      go(val1, val2, val3) {
        let self = this
        this.subjects.push(val1)
        this.subjects.push(val2)
        this.subjects.push(val3)
        let datas = {
          uid: sessionStorage.getItem("uid"),
          subjects: this.subjects.join(',')
        }
        Request.postRequest('jinxiuqiancheng/api/addCombination', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.ids = res.data.combinationId
            sessionStorage.setItem("team", this.ids)
            setTimeout(() => {
              self.$router.push({
                name: 'subjectsClass'
              })
            }, 300)
          } else {
            this.$Message.warning(res.resultNote)
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
      margin: 16px auto 40px;
      display: flex;
      flex-direction: column;
    }

    .classes>li {
      padding: 15px 30px;
      background: rgb(230, 230, 230);
      border-radius: 10px;
      margin-right: 24px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      margin: 16px 0 40px;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .classes>li {
      padding: 8px 12px;
      background: rgb(230, 230, 230);
      border-radius: 10px;
      margin-right: 24px;
      cursor: pointer;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-item {
    width: 100%;
    display: flex;
    flex-direction: column;
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

  .classes {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #333;
    padding: 16px 0;
  }

  .classes>li.add {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-size: 16px;
  }

  .active {
    color: #FFFFFF;
    background: rgb(255, 3, 80) !important;
  }

  .page {
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
