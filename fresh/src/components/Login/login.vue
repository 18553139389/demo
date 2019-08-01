<template>
  <div class="list" v-cloak>
    <main-header @back="back"></main-header>
    <div class="formLogin">
      <div class="order">
        <img src="../../../static/img/yonghu.png" alt />
        <input type="number" placeholder="请输入账号" v-model="tel" />
      </div>
      <div class="order">
        <img src="../../../static/img/mima.png" alt />
        <input type="password" placeholder="请输入密码" v-model="pass" />
      </div>
      <div class="choice">
        <span @click="register">用户注册</span>
        <span @click="forget">忘记密码</span>
      </div>
      <div class="btn" @click="goFirst">登录</div>
    </div>
    <div class="other">
      <span>第三方登录</span>
      <div class="type">
        <div class="wx" id="wx">
          <img src="../../../static/img/weixin.png" alt />
          <span>微信</span>
        </div>
        <div class="wx" id="qq">
          <img style="width: 0.7rem;height: 0.8rem;" src="../../../static/img/QQ.png" alt />
          <span>QQ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Request from "@/common/js/request";

import { Toast, Checkbox, CheckboxGroup } from "vant";

export default {
  data() {
    return {
      tel: "",
      pass: "",
      opinID: ""
    };
  },
  components: {
    MainHeader
  },
  mounted() {
    let that = this;
    mui.plusReady(function() {
      var authBtns = ["weixin", "qq"]; //配置业务支持的第三方登录
      var auths = {};
      var btn = document.getElementById("wx");
      var btns = document.getElementById("qq");
      console.log(JSON.stringify(btn));
      console.log(JSON.stringify(btns));
      btn.authId = "weixin";
      btns.authId = "qq";
      plus.oauth.getServices(
        function(services) {
          for (let i = 0; i < services.length; i++) {
            auths[services[i].id] = services[i];
            if (services[i].id == "weixin") {
              var isInstalled = app.isInstalled(services[i].id);
              btn.setAttribute(
                "class",
                "oauth-btn wx" +
                  (!isInstalled && services[i].id === "weixin"
                    ? " disabled"
                    : "")
              );
              btns.setAttribute(
                "class",
                "oauth-btn wx" +
                  (!isInstalled && services[i].id === "qq" ? " disabled" : "")
              );
            }
          }
          mui(".type").on("tap", ".oauth-btn", function() {
            if (this.classList.contains("disabled")) {
              plus.nativeUI.toast("您尚未安装客户端");
              return;
            }
            var auth = auths[this.authId];
            var waiting = plus.nativeUI.showWaiting();
            auth.login(
              function() {
                waiting.close();
                auth.getUserInfo(
                  function() {
                    console.log(JSON.stringify(auth.authResult.openid));
                    console.log(JSON.stringify(auth.userInfo));
                    localStorage.setItem(
                      "OPENID",
                      JSON.stringify(auth.authResult.openid)
                    );
                    localStorage.setItem("diID", JSON.stringify(auth.userInfo));
                    if (auth.authResult.hasOwnProperty("msg") == false) {
                      let datas = {
                        cmd: "qwLogin",
                        loginType: "wx",
                        openId: auth.authResult.openid
                      };
                      console.log(JSON.stringify(datas));
                      Request.postRequest(datas)
                        .then(res => {
                          console.log(JSON.stringify(res.data));
                          if (res.data.result == 0) {
                            localStorage.setItem(
                              "user",
                              JSON.stringify(res.data)
                            );
                            if (res.data.binded == 0) {
                              that.$router.push({
                                name: "binded",
                                params: {
                                  ob: "wx"
                                }
                              });
                            } else {
                              that.$router.push("/first");
                            }
                          } else {
                            Toast(res.data.resultNote);
                          }
                        })
                        .catch(res => {});
                    } else {
                      let datas = {
                        cmd: "qwLogin",
                        loginType: "qq",
                        openId: auth.authResult.openid
                      };
                      console.log(JSON.stringify(datas));
                      Request.postRequest(datas)
                        .then(res => {
                          console.log(JSON.stringify(res.data));
                          if (res.data.result == 0) {
                            localStorage.setItem(
                              "user",
                              JSON.stringify(res.data)
                            );
                            if (res.data.binded == 0) {
                              that.$router.push({
                                name: "binded",
                                params: {
                                  ob: "qq"
                                }
                              });
                            } else {
                              that.$router.push("/first");
                            }
                          } else {
                            Toast(res.data.resultNote);
                          }
                        })
                        .catch(res => {});
                    }
                    authLogout(auth.authResult.openid);
                  },
                  function(e) {
                    plus.nativeUI.toast("获取用户信息失败：" + e.message);
                  }
                );
              },
              function(e) {
                waiting.close();
                plus.nativeUI.toast("登录认证失败：" + e.message);
              }
            );
          });
        },
        function(e) {
          plus.nativeUI.toast("获取登录认证失败：" + e.message);
        }
      );

      function authLogout(id) {
        console.log(id);
        for (var i in auths) {
          var s = auths[i];
          if (s.authResult) {
            s.logout(
              function(e) {
                console.log("注销登录认证成功！");
              },
              function(e) {
                console.log("注销登录认证失败！");
              }
            );
          }
        }
      }
    });
    var first = null;
    mui.back = function() {
      if (!first) {
        that.$router.push("/first");
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
    tiao() {
      this.$router.push("/binded");
    },
    forget() {
      this.$router.push("/forget");
    },
    register() {
      this.$router.push("/register");
    },
    back() {
      this.$router.push("/");
    },
    goFirst() {
      let datas = {
        cmd: "mobileLogin",
        mobile: this.tel,
        password: hex_md5(this.pass)
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(JSON.stringify(res.data));
          if (res.data.result == 0) {
            localStorage.setItem("user", JSON.stringify(res.data));
            let redirect = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            console.log(redirect);
            //当'redirect'等于'/'时，回退一步，反之，则跳转路由
            // if (redirect == "/") {
            //   this.$router.go(-1);
            // } else {
              this.$router.push({
                path: redirect
              });
            // }
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
@import '../../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.list {
  width: 100%;
  // height: 100%
  padding-top: $padding-top;
  padding-bottom: 28px;
  background: url('../../../static/img/bg.png') no-repeat;
  background-size: 100%;
  box-sizing: border-box;

  .formLogin {
    width: 90%;
    height: 100%;
    margin: 7rem auto 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .order {
      width: 100%;
      height: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #eee;
      margin-top: 0.3rem;

      img {
        width: 0.5rem;
        height: 0.6rem;
      }

      input {
        height: 1rem;
        line-height: 1rem;
        font-size: 15px;
        color: #333;
        margin-left: 0.5rem;
      }
    }

    .choice {
      width: 100%;
      height: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.3rem;
      font-size: 15px;
      color: #333;
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
      margin-top: 0.5rem;
    }
  }

  .other {
    width: 80%;
    margin: 1rem auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 15px;
      color: #333;
    }

    .type {
      width: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 0.6rem;

      .wx {
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
          width: 0.8rem;
          height: 0.7rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>
