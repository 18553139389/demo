<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <keep-alive>
      <div class="login">
        <div class="login-list">
          <div class="pass">填写个人信息</div>
          <ul class="msg">
            <li>
              <div class="list-left">
                <img src="../../static/images/denglu_zhanghao.png" alt="">
                <span class="user-msg">姓名：</span>
                <input type="text" placeholder="请输入姓名" v-model="user">
              </div>
              <img src="../../static/images/pingxingzhiyuan_xingxing.png" alt="">
            </li>
            <li>
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_xingbie.png" alt="">
                <span class="user-msg">性别：</span>
                <Select v-model="sex" style="width:260px;margin-left: 20px;">
                  <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <img src="../../static/images/pingxingzhiyuan_xingxing.png" alt="">
            </li>
            <li v-show="address == 0">
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_xueke.png" alt="">
                <span class="user-msg">文理：</span>
                <Select v-model="classify" style="width:260px;margin-left: 20px;">
                  <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <img src="../../static/images/pingxingzhiyuan_xingxing.png" alt="">
            </li>
            <li>
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_xuexiao.png" alt="">
                <span class="user-msg">学校：</span>
                <input type="text" placeholder="请输入学校名称" v-model="school">
              </div>
            </li>
            <li>
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_banji.png" alt="">
                <span class="user-msg">班级：</span>
                <input type="text" placeholder="请输入您的班级" v-model="banji">
              </div>
            </li>
            <li>
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_zhonghefu.png" alt="">
                <span class="user-msg">成绩：</span>
                <input type="text" placeholder="请输入您的成绩" v-model="chengji">
              </div>
              <img src="../../static/images/pingxingzhiyuan_xingxing.png" alt="">
            </li>
            <li>
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_weici.png" alt="">
                <span class="user-msg">位次：</span>
                <input type="text" placeholder="请输入您的位次" v-model="weici">
              </div>
              <div class="list-left">
                <div class="look" @click="goLook">查询位次</div>
                <img src="../../static/images/pingxingzhiyuan_xingxing.png" alt="">
              </div>
            </li>
            <li>
              <div class="list-left">
                <img src="../../static/images/zhinengxianbao_zhonghefu.png" alt="">
                <span class="user-msg">加分：</span>
                <input type="text" placeholder="请输入您的加分" v-model="jiafen">
              </div>
            </li>
          </ul>
          <div class="btns" @click="goHobby">提交</div>
        </div>
      </div>
    </keep-alive>
    <chat></chat>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
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
  import Province from '../common/city.js'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        user: '',
        sex: 0,
        classify: 2,
        address: null,
        school: '',
        banji: '',
        chengji: '',
        weici: '',
        jiafen: '',
        show: false,
        control: true,
        itemIndex: 1,
        sexList: [{
            value: 0,
            label: '男'
          },
          {
            value: 1,
            label: '女'
          }
        ],
        classList: [{
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
        province: [{
            value: 1,
            label: '山东'
          },
          {
            value: 2,
            label: '河南'
          }
        ],
        score: '',
        rank: '',
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
      this.address = sessionStorage.getItem("applyProv")
      if (!this.$route.params.type) {
        this.user = this.$store.state.personList.name
        this.sex = this.$store.state.personList.sex
        this.classify = this.$store.state.personList.wlType
        this.school = this.$store.state.personList.school
        this.banji = this.$store.state.personList.banji
        this.chengji = this.$store.state.personList.score
        this.weici = this.$store.state.personList.ranking
        this.jiafen = this.$store.state.personList.addScore
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
      goLook() {
        this.show = true
      },
      close() {
        this.show = false
      },
      goHobby() {
        let self = this
        if (this.user == '') {
          this.$Message.warning('姓名不能为空')
          return
        }

        if (this.address == 2 && this.classify == 2) {
          this.$Message.warning('请选择文理科')
          return
        }

        if (this.chengji == '') {
          this.$Message.warning('成绩不能为空')
          return
        }

        if (this.weici == '') {
          this.$Message.warning('位次不能为空')
          return
        }

        let datas = {
          uid: sessionStorage.getItem("uid"),
          name: this.user,
          sex: this.sex,
          wlType: this.classify,
          school: this.school,
          banji: this.banji,
          score: this.chengji,
          ranking: this.weici,
          addScore: this.jiafen
        }

        this.$store.commit('getPersonList', datas)
        self.$router.push({
          name: 'hobby'
        })
      },
      goSearch() {
        if (this.score == '') {
          this.$Message.warning('成绩不能为空')
          return
        }
        
        let datas = {}
        
        if(sessionStorage.getItem('applyProv') == 1) {
          datas = {
            uid: sessionStorage.getItem("uid"),
            score: this.score
          }
        } else {
          datas = {
            uid: sessionStorage.getItem("uid"),
            wlType: this.classify,
            score: this.score
          }
        }

        Request.postRequest('jinxiuqiancheng/api/findRanking', datas).then(res => {
          if (res.data.result == 0) {
            if (res.data.ranking == '') {
              this.$Message.warning('没有查询到该位次')
              return
            } else {
              this.rank = res.data.ranking
              this.weici = res.data.ranking
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
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 768px) {
    .login {
      width: 1200px;
      overflow: hidden;
      margin: 40px auto;
    }

    .modals {
      width: 20%;
      border-radius: 6px;
      background: #FFFFFF;
      overflow: hidden;
      position: relative;
    }
  }

  @media screen and (max-width: 769px) {
    .login {
      width: 100%;
      overflow: hidden;
      margin: 40px 0;
    }

    .modals {
      width: 45%;
      border-radius: 6px;
      background: #FFFFFF;
      overflow: hidden;
      position: relative;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .login-list {
    width: 90%;
    padding: 60px 15%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
    border: 1px solid #eee;
  }

  .pass {
    width: 100%;
    font-size: 15px;
    color: rgb(255, 3, 80);
    margin-bottom: 30px;
  }

  .user-msg {
    font-size: 14px;
    color: #333;
    margin-left: 18px;
  }

  .msg {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .msg>li {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed rgb(255, 3, 80);
  }

  .list-left {
    display: flex;
    align-items: center;
  }

  .msg>li input {
    border: none;
    font-size: 14px;
    color: #333;
    margin-left: 20px;
  }

  .msg>li input:focus {
    border: none;
    outline: none;
  }

  .footer {
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .btns {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 24px;
    background: rgb(255, 3, 80);
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 40px;
    cursor: pointer;
  }

  .look {
    padding: 4px 8px;
    background: rgb(255, 3, 80);
    font-size: 12px;
    color: #FFFFFF;
    border-radius: 20px;
    margin-right: 20px;
    cursor: pointer;
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

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
