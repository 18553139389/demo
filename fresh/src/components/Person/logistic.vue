<template>
  <div class="contain" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <div class="order">
        <img :src="img" alt />
        <div class="order_right">
          <div v-for="(item,index) in kuai" :key="index">
            <span v-if="item.bian==wuliu.ShipperCode">{{item.ming}}</span>
          </div>
          <span>物流单号：{{wuliu.LogisticCode}}</span>
        </div>
      </div>
      <ul v-if="this.wuliulist.length!==0">
        <li v-for="(i,v) in wuliulist" :key="v">
          <span style="color:#999;margin-bottom:0.2rem;">{{i.AcceptTime}}</span>
          <span>{{i.AcceptStation}}</span>
        </li>
      </ul>
      <ul v-else>
        <li class="wulist">{{wuliu.Reason}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast } from "vant";
let Base64 = require("js-base64").Base64;
import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "物流信息",
      wuliu: {},
      wuliulist: [],
      kuai: [
        {
          bian: "ZTO",
          ming: "中通快递"
        },
        {
          bian: "STO",
          ming: "申通快递"
        },
        {
          bian: "HHTT",
          ming: "天天快递"
        },
        {
          bian: "YZPY",
          ming: "邮政快递包裹"
        },
        {
          bian: "YD",
          ming: "韵达速递"
        },
        {
          bian: "YTO",
          ming: "圆通速递"
        },
        {
          bian: "EMS",
          ming: "EMS"
        },
        {
          bian: "UC",
          ming: "优速快递"
        },
        {
          bian: "ZJS",
          ming: "宅急送"
        },
        {
          bian: "BTWL",
          ming: "百世快运"
        }
      ],
      img: ""
    };
  },
  components: {
    MainHeader
  },
  created() {
    console.log(this.$route.query);
    this.img = this.$route.query.img;
    this.wlNo = this.$route.query.wlNo;
    this.wlCode = this.$route.query.wlCode;
    this.kdniao(this.wlCode, this.wlNo);
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
    kdniao(emsCode, emsNo) {
      let defaultAddress = {
        cmd: "kdniaoInfo",
        emsCode: emsCode,
        emsNo: emsNo
      };
      Request.postRequest(defaultAddress)
        .then(res => {
          // console.log(res.data);
          if (res.data.result == 0) {
            console.log(JSON.parse(res.data.info));
            this.wuliu = JSON.parse(res.data.info);
            this.wuliulist = this.wuliu.Traces;
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

.contain {
  width: 100%;
  display: flex;
  flex-direction: column;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 72px;

    .order {
      width: 100%;
      display: flex;
      align-items: center;
      border-top: 1px solid #eee;
      padding: 0.4rem;
      box-sizing: border-box;
      font-size: 14px;
      color: #333;

      img {
        width: 1.8rem;
        height: 1.8rem;
      }

      .order_right {
        flex: 1;
        height: 1.8rem;
        padding: 0.3rem 0 0.3rem 0.3rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;

      li {
        width: 100%;
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
        border-top: 10px solid #f5f5f5;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #333;
      }
    }
  }
}

.wulist {
  text-align: center;
}
</style>
