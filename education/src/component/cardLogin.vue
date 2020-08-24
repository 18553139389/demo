<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="login">
      <div class="login-list">
        <div class="pass">用户登录</div>
        <ul class="msg">
          <li>
            <img src="../../static/images/denglu_zhanghao.png" alt="">
            <input type="text" placeholder="请输入教育卡号" v-model="call">
          </li>
          <li class="get-code">
            <div class="code-left">
              <img src="../../static/images/denglu_mima.png" alt="">
              <input type="password" placeholder="请输入密码" v-model="code">
            </div>
            <img src="../../static/images/denglu_jianpan.png" alt="">
          </li>
          <li class="get-code" style="border-bottom: none;">
            <div class="font" @click="goForget">忘记密码</div>
            <div class="font" @click="goRegister">注册会员卡</div>
          </li>
        </ul>
        <div class="btns" @click="goFirst">登录</div>
      </div>
    </div>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <footers v-if="control"></footers>
  </div>
</template>

<script>
  import Global from '../api/global.js'
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import md5 from 'js-md5'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        call: '',
        code: '',
        password: '',
        repeat: '',
        control: true,
        itemIndex: 0,
        time: null,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers
    },
    mounted() {
      this.pos()
    },
    created() {
      clearInterval(Global.time)
    },
    watch: {
      bodyHeight() {
        this.pos()
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
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      goRegister() {
        this.$router.push({
          name: 'buy'
        })
      },
      goForget() {
        this.$router.push({
          name: 'login'
        })
      },
      changeNav(k) {
        this.itemIndex = k
      },
      goFirst() {
        if (this.call == '') {
          this.$Message.warning('教育卡号不能为空')
          return
        }

        if (this.code == '') {
          this.$Message.warning('密码不能为空')
          return
        }

        let datas = {
          cardNum: this.call,
          password: md5(this.code)
        }

        let self = this
        Request.postRequest('jinxiuqiancheng/api/userLogin', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            sessionStorage.setItem("uid", res.data.uid)
            Global.token = res.data.token
            sessionStorage.setItem("isBind", res.data.isBind)
            sessionStorage.setItem("isSupreme", res.data.isSupreme)
            sessionStorage.setItem("isReport", res.data.isReport)
            sessionStorage.setItem("applyProv", res.data.applyProv)
            sessionStorage.setItem("testNum", res.data.testNum)
            sessionStorage.setItem("isTest", res.data.isTest)
            sessionStorage.setItem("dlCount", res.data.dlCount)
            if (res.data.isBind == 0) {
              self.$router.push('/call')
            } else {
              this.$Message.warning('登录成功')
              setTimeout(() => {
                Global.time = setInterval(() => {
                  self.isLogin()
                }, 2000)
                if (self.$route.query.redirect) { //如果存在参数
                  let redirect = self.$route.query.redirect
                  let params = self.$route.query.params
                  self.$router.push({
                    name: redirect,
                    params
                  }); //则跳转至进入登录页前的路由
                } else {
                  self.$router.push('/index') //否则跳转至首页
                }
              }, 500)
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      isLogin() {
        console.log('111')
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest1('jinxiuqiancheng/api/checkLogin', datas).then(res => {
          if (res.data.result == 0) {
            if (Global.token != res.data.token) {
              this.$Message.warning('该账号已再别处登陆')
              setTimeout(() => {
                sessionStorage.clear()
                self.$router.push({
                  name: 'cardLogin'
                })
              }, 500)
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

<style>
  @media screen and (max-width: 1024px) {
    .wrapper {
      width: 100%;
      height: 100%;
    }

    .login {
      width: 100%;
      overflow: hidden;
      margin: 40px auto;
    }
  }

  @media screen and (min-width: 1024px) {
    .wrapper {
      width: 100%;
      height: 100%;
    }

    .login {
      width: 1200px;
      overflow: hidden;
      margin: 40px auto;
    }
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
    margin-bottom: 60px;
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
    border-bottom: 1px dashed rgb(255, 3, 80);
  }

  .msg>li.get-code {
    justify-content: space-between;
  }

  .code-left {
    display: flex;
    align-items: center;
  }

  .achieve {
    padding: 6px 10px;
    border-radius: 24px;
    background: rgb(255, 3, 80);
    font-size: 12px;
    color: #FFFFFF;
    border: none;
    outline: none !important;
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
    margin-top: 20px;
    cursor: pointer;
  }

  .font {
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
