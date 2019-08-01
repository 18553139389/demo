<template>
  <div class="contain" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <ul>
        <li style="border-bottom: 10px solid #eee;">
          <span>修改头像</span>
          <div class="modify_right">
            <van-uploader :after-read="onRead">
              <img :src="this.headImage" alt style="border-radius: 50%;" v-if="this.headImage!=''" />
              <img src="../../../static/img/touxiang.png" alt v-else />
            </van-uploader>
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="../../../static/img/jinru02.png"
              alt
            />
          </div>
        </li>
        <li>
          <span>昵称</span>
          <div class="modify_right">
            <input type="text" placeholder="请输入昵称" v-model="username" @blur="bao" />
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="../../../static/img/jinru02.png"
              alt
            />
          </div>
        </li>
        <li @click="goModify">
          <span>绑定手机号</span>
          <div class="modify_right">
            <span>{{this.mobile|hideMiddle}}</span>
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="../../../static/img/jinru02.png"
              alt
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Request from "@/common/js/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      text: "个人信息",
      imgs: "",
      username: "", //昵称
      mobile: "", //手机号
      headImage: "", //头像
      url: ""
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    if (JSON.parse(localStorage.getItem("gouserInfo"))) {
      this.username = JSON.parse(localStorage.getItem("gouserInfo")).username; //昵称
      this.mobile = JSON.parse(localStorage.getItem("gouserInfo")).mobile; //手机号
      this.headImage = JSON.parse(localStorage.getItem("gouserInfo")).headImage; //头像
    } else {
      this.gouserInfo();
    }
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/person");
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
    back() {
      this.$router.push("/person");
    },
    onRead(file) {
      if (this.imgs.length >= 1) {
        Toast("最多上传1张图片");
      } else {
        this.headImage = file.content;
      }
      var formdata = new FormData();
      formdata.append("file", file.file);
      Request.postFile(formdata)
        .then(res => {
          // console.log(res.data)
          if (res.data.result == 0) {
            this.url = res.data.url;
            console.log(res.data.url);
            this.bao();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    goModify() {
      this.$router.push("/modify");
    },
    gouserInfo() {
      this.useryin = true;
      let goCarlist = {
        cmd: "myInfo",
        cid: this.cid
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res.data)
          if (res.data.result == 0) {
            this.username = res.data.nickName; //昵称
            this.mobile = res.data.mobile; //手机号
            this.headImage = res.data.headImage; //头像
            let gouserInfo = {};
            gouserInfo.username = this.username;
            gouserInfo.mobile = this.mobile;
            gouserInfo.headImage = this.headImage;
            gouserInfo.afterSaleNumber = res.data.afterSaleNumber;
            gouserInfo.pendEvaluateNumber = res.data.pendEvaluateNumber;
            gouserInfo.pendPayNumber = res.data.pendPayNumber;
            gouserInfo.pendReceiveNumber = res.data.pendReceiveNumber;
            gouserInfo.pendSendNumber = res.data.pendSendNumber;
            localStorage.setItem("gouserInfo", JSON.stringify(gouserInfo));
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    bao() {
      let goCarlist = {
        cmd: "updateMyInfo",
        cid: this.cid,
        headImage: this.url,
        nickName: this.username
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res.data)
          if (res.data.result == 0) {
            Toast(res.data.resultNote);
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {
          Toast("获取失败");
        });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 72px;

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #eee;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #333;
        padding: 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .modify_right {
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 1.8rem;
            height: 1.8rem;
          }

          input {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
