<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="login">
      <div class="login-list">
        <div class="pass">修改密码</div>
        <ul class="msg">
          <li>
            <img src="../../static/images/denglu_zhanghao.png" alt="">
            <input type="text" placeholder="请输入手机号" v-model="call">
          </li>
          <li class="get-code">
            <div class="code-left">
              <img src="../../static/images/denglu_yanzhengma.png" alt="">
              <input type="text" placeholder="请输入验证码" v-model="code">
            </div>
            <button type="button" :disabled="btnState" class="achieve" @click="getCode">{{rTime}}<span v-if="btnState">s</span></button>
          </li>
          <li>
            <img src="../../static/images/denglu_mima.png" alt="">
            <input type="password" placeholder="请输入密码" v-model="password">
          </li>
          <li>
            <img src="../../static/images/denglu_mima.png" alt="">
            <input type="password" placeholder="请再次输入密码" v-model="repeat">
          </li>
        </ul>
        <div class="btns" @click="logins">确定</div>
      </div>
    </div>
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
  import Request from '../../utils/request.js'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        call: '',
        code: '',
        password: '',
        repeat: '',
        rTime: '获取验证码',
        btnState: false,
        control: true,
        itemIndex: 0,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      getCode() {
        if (this.call == '') {
          this.$Message.warning('手机号不能为空')
          return
        } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
          this.$Message.warning('手机号格式不正确')
          return
        }

        let self = this
        this.rTime = 60
        let rTime = this.rTime
        this.btnState = true
        let interval = setInterval(() => {
          if (--self.rTime <= 0) {
            self.rTime = '获取验证码'
            clearInterval(interval)
            self.btnState = false
          }
        }, 1000)

        let datas = {
          telephone: this.call
        }
        Request.postRequest('jinxiuqiancheng/api/sendSms', datas).then(res => {
          if (res.result == 0) {
            this.$Message.warning('获取成功')
          } else {
            this.$Message.warning(res.resultNote)
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
      changeNav(k) {
        this.itemIndex = k
      },
      logins() {
        let self = this
        if (this.call == '') {
          this.$Message.warning('手机号不能为空')
          return
        } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))) {
          this.$Message.warning('手机号格式不正确')
          return
        }

        if (this.code == '') {
          this.$Message.warning('验证码不能为空')
          return
        }

        if (this.password == '') {
          this.$Message.warning('密码不能为空')
          return
        }

        if (this.repeat == '') {
          this.$Message.warning('确认密码不能为空')
          return
        }

        let datas = {
          phoneNum: this.call,
          code: this.code,
          password: md5(this.password),
          qrPassword: md5(this.repeat)
        }

        Request.postRequest('jinxiuqiancheng/api/findUserPassword', datas).then(res => {
          if (res.data.result == 0) {
            this.$Message.warning('修改成功')
            setTimeout(() => {
              self.$router.push({
                name: 'cardLogin'
              })
            }, 500)
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

<style>
  @media screen and (max-width: 768px) {
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

  @media screen and (min-width: 769px) {
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

  .msg>li input {
    border: none;
    font-size: 14px;
    color: #333;
    margin-left: 20px;
  }

  .msg>li>input:focus {
    border: none;
    outline: none;
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

  .footer {
    width: 100%;
    position: fixed;
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
</style>
