<template>
  <div class="contain">
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <div class="pay">
        <div class="money">
          <div class="price">
            ￥
            <span id="jine">{{this.prc}}</span>
          </div>
          <span style="color:#999">需支付</span>
        </div>
      </div>
      <div class="choice">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="支付宝支付" clickable @click="radio = '1'">
              <template slot="icon">
                <img src="../../../static/img/bao.png" alt style="width:1.7rem;height:1rem;" />
              </template>
              <van-radio checked-color="#72D141" name="1" />
            </van-cell>
            <van-cell title="微信支付" clickable @click="radio = '2'">
              <template slot="icon">
                <img
                  src="../../../static/img/weixin.png"
                  alt
                  style="width:1rem;height:0.8rem;margin:0 0.3rem 0 0.4rem"
                />
              </template>
              <van-radio checked-color="#72D141" name="2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="submit">
          <div class="btns" @click="submit">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" charset="utf-8">
mui.init();
</script>
<script>
import MainHeader from "@/components/component/mainHeader";

import { Toast } from "vant";
export default {
  data() {
    return {
      text: "选择支付方式",
      radio: "1",
      prc: "",
      id: ""
    };
  },
  components: {
    MainHeader
  },
  created() {
    if (this.$route.query.id == undefined) {
      this.id = this.$route.query.ID;
    } else {
      this.id = this.$route.query.id;
    }
    this.prc = this.$route.query.prc;
    console.log(typeof parseInt(this.prc * 100));
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        if (self.$route.query.ID != undefined) {
          self.$router.push("/cart");
        } else {
          self.$router.go(-1);
        }
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
      Toast("取消支付");
      if (this.$route.query.ID != undefined) {
        this.$router.push("/cart");
      } else {
        this.$router.go(-1);
      }
    },
    submit() {
      // WX_APP 微信  ALI_APP 支付宝
      if (this.radio == 1) {
        this.beecloudPay("ALI_APP");
      } else {
        this.beecloudPay("WX_APP");
      }
    },
    beecloudPay(bcChannel) {
      let NUM = "";
      for (var i = 0; i < 4; i++) {
        var val = Math.floor(Math.random() * 10);
        NUM += val;
      }
      console.log(this.id + NUM);
      var payData = {
        app_id: "f01cfa41-cdde-426b-beca-9f6e5e43c056",
        channel: bcChannel,
        title: "订单商品",
        total_fee: parseInt(this.prc * 100),
        bill_no: this.id + NUM,
        optional: {},
        bill_timeout: 360
      };
      let that = this;
      beecloud.payReq(
        payData,
        function(result) {
          // Toast(JSON.stringify(result));
          Toast("支付成功");
          that.$router.push("/pay_result");
        },
        function(e) {
          // Toast(JSON.stringify(e));
          Toast("放弃支付");
        }
      );
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.contain {
  width: 100%;
  height: 100%;
}

.van-hairline--top-bottom::after {
  border: none !important;
}

.van-cell::after {
  border-bottom: none !important;
}

.van-cell__title {
  display: flex;
  align-items: center;
}

.van-cell__value {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.box {
  width: 100%;
  padding: 72px 0 0;

  .pay {
    width: 100%;
    padding: 0 0.4rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;

    .money {
      width: 100%;
      padding: 1.2rem 0;
      display: flex;
      flex-direction: column;
      flex-direction: center;
      align-items: center;
      font-size: 14px;
      color: #333;

      .price {
        margin-bottom: 0.5rem;

        span {
          font-size: 30px;
        }
      }
    }
  }

  .choice {
    width: 100%;
    padding: 0 0.4rem;
    box-sizing: border-box;

    .submit {
      width: 100%;
      padding: 10px 15px 10px 30px;
      box-sizing: border-box;

      .btns {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 8px;
        background: rgb(115, 210, 66);
        margin: 1.2rem auto 0;
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
