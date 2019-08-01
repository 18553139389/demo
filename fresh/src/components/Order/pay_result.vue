<template>
  <div class="contain">
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <div class="pay">
        <img src="../../../static/img/chenggong.png" alt />
        <span>支付成功</span>
        <div @click="cha">查看订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";

export default {
  data() {
    return {
      text: "支付结果"
    };
  },
  components: {
    MainHeader
  },
  created() {
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/order_center/0");
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
      this.$router.push("/order_center/0");
    },
    cha() {
      this.$router.push("/order_center/0");
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.contain {
  width: 100%;
  height: 100%;
}

.box {
  width: 100%;
  padding: 72px 0 0;

  .pay {
    width: 100%;
    padding: 2rem 0.4rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333;

    img {
      width: 1.7rem;
      height: 1.7rem;
    }

    span {
      margin: 0.7rem 0;
    }

    div {
      width: 6rem;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgb(115, 210, 66);
      border-radius: 6px;
      color: #fff;
    }
  }
}
</style>
