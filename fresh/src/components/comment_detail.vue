<template>
  <div class="contain" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <div class="top">
        <h3>购物体验满意度</h3>
        <van-rate v-model="value" :disabled="true" disabled-color="#ffd21e"/>
        <p class="msg">我非常的乐意使用该产品我非常的乐意使用该产品我非常的乐意使用该产品我非常的乐</p>
      </div>
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
      text: "我的评价",
      value: 0
    };
  },
  components: {
    MainHeader
  },
  created() {
		this.id=this.$router.params.id
    this.man(this.id);
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
    man(id) {
      let defaultAddress = {
        cmd: "evaluteAverage",
        cid: id
      };
      Request.postRequest(defaultAddress)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.value=res.data.number
          } 
        })
        .catch(res => {});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.contain {
  width: 100%;
  display: flex;
  flex-direction: column;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 72px;

    .top {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-top: 1px solid #eee;
      padding: 0 0.4rem;
      box-sizing: border-box;

      h3 {
        width: 100%;
        padding: 0.5rem 0 0.3rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        color: #333;
      }

      p {
        width: 100%;
        padding: 0.3rem;
        box-sizing: border-box;
        background: #f5f5f5;
        border-radius: 8px;
        font-size: 14px;
        color: #999;
        line-height: 20px;
        margin-top: 0.3rem;
      }
    }
  }
}
</style>
