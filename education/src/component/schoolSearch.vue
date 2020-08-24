<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="bg" @click="hide">
      <div class="search">
        <div class="school">
          <div>学校名称：</div>
          <div class="box">
            <input type="text" v-model="names" placeholder="请输入学校名称" @input="goSearch">
            <img src="../../static/images/search.png" alt="" @click.stop="goSchool">
            <div class="result" v-if="searchList.length > 0 && show">
              <ul>
                <li v-for="(v,k) in searchList" :key="k" @click="choiceSchool(v.schoolName)">{{v.schoolName}}</li>
              </ul>
            </div>
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
        names: '',
        control: true,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight,
        searchList: [],
        show: false
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat
    },
    created() {
      console.log(this.$store.state.typeAll)
    },
    mounted() {
      this.pos()
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
        let datas = {
          schoolName: this.names
        }
        Request.postRequest('jinxiuqiancheng/api/searchSchoolList', datas).then(res => {
          if (res.data.result == 0) {
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.searchList = res.data.dataList
              this.show = true
            } else {
              this.show = false
            }
          }
        }).catch(res => {
          console.log(res)
        })
      },
      choiceSchool(val) {
        this.names = val
        this.show = false
      },
      hide() {
        this.show = false
      },
      goSchool() {
        if (this.names == '') {
          this.$Message.warning('学校名称不能为空')
          return
        }

        let datas = {
          schoolName: this.names
        }

        Request.postRequest('jinxiuqiancheng/api/schoolDetail', datas).then(res => {
          console.log(res)
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
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .search {
      width: 40%;
      height: 200px;
      border-radius: 6px;
      background: rgba(255, 255, 255, .8);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (max-width: 1024px) {
    .search {
      width: 65%;
      height: 200px;
      border-radius: 6px;
      background: rgba(255, 255, 255, .8);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .bg {
    width: 100%;
    height: 500px;
    background: url(../../static/images/2.jpg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
  }

  .school {
    font-size: 14px;
    color: rgb(192, 1, 60);
    display: flex;
    align-items: center;
  }

  .box {
    width: 260px;
    padding: 4px 12px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
    border-radius: 24px;
    margin-left: 10px;
    position: relative;
  }

  .result {
    width: 120%;
    height: 260px;
    position: absolute;
    top: 36px;
    left: 0;
    background: #FFFFFF;
    font-size: 14px;
    color: #666;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
    overflow: hidden;
  }

  .result>ul {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 8px 0;
  }

  .result li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    padding: 0 12px;
  }

  .result li:hover {
    background: #FF0350;
    color: #FFFFFF;
  }

  .box>input {
    border: none;
    outline: none;
  }

  .box>img {
    width: 24px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
