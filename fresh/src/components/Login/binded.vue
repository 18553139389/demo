<template>
  <div class="list" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="formList">
      <div class="formData">
        <div class="tel">
          <input v-model="tel" type="number" placeholder="请输入手机号" />
        </div>
        <div class="tel">
          <input style="width: 50%;" type="text" placeholder="请填写验证码" v-model="code" />
          <button type="button" :disabled="btnState" @click="getValidate">
            {{rTime}}
            <span v-if="btnState">s</span>
          </button>
        </div>
        <div class="tel">
          <input v-model="password" type="password" placeholder="请设置密码" />
        </div>
        <div class="tel">
          <input v-model="repeatPass" type="password" placeholder="请再次输入密码" />
        </div>
        <div class="tel zhu" style="border: none;">
          <van-checkbox v-model="checked" checked-color="rgb(114,209,65)"></van-checkbox>
          <span class="text">我已阅读并同意</span>
          <span class="text" style="color: rgb(114,209,65);" @click="xie">《用户注册协议》</span>
        </div>
        <div class="btn" @click="submit">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Checkbox, CheckboxGroup } from "vant";

import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "绑定手机号",
      tel: "",
      code: "",
      password: "",
      repeatPass: "",
      btnState: false,
      checked: false,
      rTime: "获取验证码",
      ob: ""
    };
  },

  components: {
    MainHeader
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user"));
    this.OpenID = JSON.parse(localStorage.getItem("OPENID"));
    this.userlist = JSON.parse(localStorage.getItem("diID"));
    this.ob = this.$route.params.ob;
    console.log(JSON.stringify(this.OpenID), "0");
    console.log(JSON.stringify(this.userlist), "1");
    this.userzhu = JSON.parse(localStorage.getItem("userzhu"));
    if (this.userzhu) {
      this.tel = this.userzhu.phone;
      this.password = this.userzhu.password;
      this.repeatPass = this.userzhu.repeatPass;
      this.code = this.userzhu.code;
    }
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/login");
        localStorage.removeItem("userzhu");
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
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
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
            Toast(res.data.resultNote);
          }
        })
        .catch(res => {});
    },
    back() {
      this.$router.push("/login");
      localStorage.removeItem("userzhu");
    },
    xie() {
      this.$router.push("/provisions");
      let userzhu = {
      	phone: this.tel,
      	password: this.password,
      	repeatPass: this.repeatPass,
      	code: this.code
      };
      localStorage.setItem("userzhu", JSON.stringify(userzhu));
    },
    submit() {
      if (this.tel == "") {
        Toast("手机号不能为空");
        return;
      } else if (
        !/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(
          this.tel
        )
      ) {
        Toast("手机号格式不正确,请更改手机号");
        return;
      }

      if (this.code == "") {
        Toast("验证码不能为空");
      }

      if (this.password.length < 5) {
        Toast("密码长度不能少于6位");
        return;
      }

      if (this.password != this.repeatPass) {
        Toast("两次密码输入不一致");
        return;
      }

      if (!this.checked) {
        Toast("请勾选协议");
        return;
      }
      let datas = {
        cmd: "bindMobile",
        mobile: this.tel,
        identifyCode: this.code,
        openId: this.OpenID,
        loginType: this.ob,
        headImage: this.userlist.headimgurl,
        nickName: this.userlist.nickname,
        password: hex_md5(this.password)
      };
      console.log(JSON.stringify(datas));
      Request.postRequest(datas)
        .then(res => {
          console.log(JSON.stringify(res.data));
          if (res.data.result == 0) {
            this.$router.push("/login");
            localStorage.removeItem("userzhu");
          } else {
            Toast(res.data.resultNote);
          }
        })
        .catch(res => {});
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

      .zhu {
        display: flex;
        justify-content: flex-start;
      }
    }
  }
}
</style>
