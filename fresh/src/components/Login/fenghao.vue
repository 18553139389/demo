<template>
  <div class="problem-box">
    <Mainhui :lefttxt="lefttxt" @back="back"></Mainhui>
    <div class="fenghao">
      <img src="../../../static/img/fenghao.png" alt>
      <h2>你的账号已被冻结</h2>
      <span>请联系客服进行处理</span>
    </div>
    <div class="kefu">
      <p>
        客服电话：
        <span @click="kefu(ke)">{{ke}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Mainhui from "@/components/component/mainhui";
import { Toast } from "vant";

export default {
  data() {
    return {
      lefttxt: "返回",
      ke: "400-812-4014"
    };
  },
  components: {
    Mainhui
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
    back() {
      this.$router.go(-1);
    },
    kefu(e) {
      console.log(e);
      mui.plusReady(function() {
        console.log("一键拨号:" + e);
        var btnArray = ["拨打", "取消"];
        var phone = e;
        mui.confirm("是否拨打" + phone + "?", "提示", btnArray, function(e) {
          if (e.index == 0) {
            plus.device.dial(phone, true);
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.fenghao {
  width: 100%;
  padding: 2rem 0.4rem;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;

  img {
    width: 1.7rem;
    height: 1.7rem;
  }

  h2 {
    font-size: 20px;
    margin: 0.3rem 0;
  }

  span {
    font-size: 16px;
    color: #666;
  }
}

.kefu {
  text-align: center;
  color: #333;
}
</style>
