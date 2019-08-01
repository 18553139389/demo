<template>
  <div class="list" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="formList">
      <div class="formData">
        <div class="tel">
          <input v-model="tel" type="number" placeholder="请输入手机号">
        </div>
        <div class="tel">
          <input style="width: 50%;" type="text" placeholder="请填写验证码" v-model="code">
          <button type="button" :disabled="btnState" @click="getValidate">
            {{rTime}}
            <span v-if="btnState">s</span>
          </button>
        </div>
        <div class="tel">
          <input v-model="password" type="password" placeholder="请输入登录密码">
        </div>
        <div class="btn" @click="forget">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "找回密码",
      tel: "",
      code: "",
      password: "",
      btnState: false,
      rTime: "获取验证码"
    };
  },
  components: {
    MainHeader
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        window.history.go(-1);
        first = new Date().getTime();
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
    };
  },
  methods: {
    getValidate() {
      if (this.tel == "") {
        Toast("手机号不能为空");
        return;
      } else if (
        !/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(
          this.tel
        )
      ) {
        Toast("手机号格式不正确");
        return;
      }

      let self = this;
      this.rTime = 60;
      let rTime = this.rTime;
      this.btnState = true;
      let interval = setInterval(() => {
        if (--self.rTime <= 0) {
          self.rTime = "获取验证码";
          clearInterval(interval);
          self.btnState = false;
        }
      }, 1000);
      let sendMe = {
        cmd: "sendMessage",
        mobile: this.tel
      };
      console.log(sendMe);
      Request.postCommon(sendMe)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
          }
        })
        .catch(res => {});
    },
    forget() {
      let forget = {
        cmd: "forgetPassword",
        mobile: this.tel,
        identifyCode: this.code,
        password: hex_md5(this.password)
      };
      console.log(forget);
      Request.postRequest(forget)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            Toast(res.data.resultNote);
            this.$router.push("/login");
          }
        })
        .catch(res => {});
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
[v-cloak] {
  display: none !important;
}

.list {
  width: 100%;
  height: 100%;

  .formList {
    width: 100%;
    padding-top: 72px;

    .formData {
      width: 100%;
      border-top: 1px solid #eee;
      padding: 0 1.05rem;
      box-sizing: border-box;

      .tel {
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #eee;
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        input {
          width: 70%;
          height: 1rem;
          line-height: 1rem;
          font-size: 15px;
          color: #333;
        }

        button {
          display: inline-block;
          width: 35%;
          height: 0.6rem;
          margin-left: 5%;
          font-size: 15px;
          color: rgb(114, 209, 65);
          background: none;
          border: none;
          text-align: right;
          border-left: 2px solid rgb(114, 209, 65);
        }
      }

      .btn {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        border-radius: 6px;
        background: rgb(114, 209, 65);
        font-size: 15px;
        color: #fff;
        text-align: center;
        margin-top: 1rem;
      }
    }
  }
}
</style>
