<template>
  <div class="problem-box">
    <main-header :text="text" @back="back"></main-header>
    <ul class="problem-zi">
      <li>
        <input v-model="password1" type="password" placeholder="请输入当前登录密码" />
      </li>
      <li>
        <input v-model="password2" type="password" placeholder="设置新的登录密码" />
      </li>
      <li>
        <input v-model="password3" type="password" placeholder="在输入一次登录密码" />
      </li>
    </ul>
    <button @click="updateLogin" class="btn">提交</button>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "重置登录密码",
      password1: "",
      password2: "",
      password3: ""
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
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
    updateLogin() {
      if (this.password2 == this.password3) {
        let updateLogin = {
          cmd: "updateLoginPassword",
          cid: this.cid,
          oldPassword: hex_md5(this.password1),
          newPassword: hex_md5(this.password2)
        };
        console.log(updateLogin);
        Request.postRequest(updateLogin)
          .then(res => {
            console.log(res.data);
            if (res.data.result == 0) {
              Toast(res.data.resultNote);
              this.$router.go(-1);
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            } else {
              Toast(res.data.resultNote);
              this.password1 = "";
              this.password2 = "";
              this.password3 = "";
            }
          })
          .catch(res => {});
      } else {
        Toast("密码不一致");
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.problem-zi {
  padding: 72px 10px 0;

  li {
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 10%;

    input {
      width: 100%;
      height: 80%;
      text-indent: 10px;
      border: 1px solid #dedede;
      border-radius: 10px;
    }
  }
}

.btn {
  border: none;
  background: green;
  width: 70%;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  color: #fff;
  margin: 100px 15%;
}
</style>
