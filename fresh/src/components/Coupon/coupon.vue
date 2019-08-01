<template>
  <div class="contain">
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <ul>
        <li v-for="(v,k) in coupons" :key="k">
          <div class="c_price">
            ￥
            <span style="font-size:30px">{{v.amount}}</span>
          </div>
          <div class="c_produce">
            <h3>满{{parseFloat(v.miniPurchase)}}元可用</h3>
            <div class="c_time">
              <span>有效期至{{v.closingDate.substring(0,10)}}</span>
              <span
                style="color: #72d140"
                @click="getCoupon(v.state,v.id)"
                v-if="v.state==0"
              >点击领券</span>
              <span  @click="getCoupon(v.state,v.id)" v-else>已领取</span>
            </div>
            <p>仅限{{user}}使用</p>
          </div>
        </li>
      </ul>
      <div class="no" v-if="noCoupons">暂没有优惠券可以领取</div>
    </div>
    <dialogs :data1="data1" :data2="data2" :showDialog="showDialog" @hide="hide"></dialogs>
    <dialogs :data1="datas1" :data2="data2" :data3="data3" :showDialog="showDialogs" @hide="hides"></dialogs>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Dialogs from "@/components/component/dialogs";
import Request from "@/common/js/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      text: "领取优惠券",
      data1: "领取成功",
      datas1: "领取失败",
      data2: "知道了",
      data3: "您已领取过优惠券，不要太贪心哦!",
      showDialog: false,
      showDialogs: false,
      coupons: [],
      page: 1,
      noCoupons: false
    };
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    this.user = this.$route.params.name;
    console.log(this.$route.params);
    this.infinite();
  },
  components: {
    MainHeader,
    Dialogs
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
    getCoupon(state, id) {
      let self = this;
      if (state == 0) {
        let datas = {
          cmd: "receiveCoupon",
          id: id,
          cid: this.cid
        };
        Request.postRequest(datas)
          .then(res => {
            if (res.data.result == 0) {
              console.log(res.data);
              this.showDialog = true;
              this.infinite();
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      } else if (state == 1) {
        this.showDialogs = true;
      }
    },
    hide() {
      this.showDialog = false;
    },
    hides() {
      this.showDialogs = false;
    },
    refresh() {
      var self = this;
      this.coupons = [];
      this.page = 1;
      setTimeout(function() {
        self.$refs.scroller.finishPullToRefresh();
      }, 2000);
    },
    infinite() {
      let self = this;
      let datas = {
        cmd: "couponList",
        id: this.$route.params.id,
        cid: this.cid
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            if (res.data.dataList.length > 0) {
              self.noCoupons = false;
              self.coupons = res.data.dataList;
            } else {
              self.noCoupons = true;
            }
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.contain {
  width: 100%;
  height: 100%;
}

.no {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 25;
}

.box {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f5f5f5;
  padding: 60px 0.4rem 0.4rem;
  box-sizing: border-box;
  position: relative;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      height: 3rem;
      background: url('../../../static/img/youhuijuan.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 0.3rem;
      box-sizing: border-box;
      margin-top: 0.3rem;

      .c_price {
        width: 30%;
        height: 85%;
        text-align: center;
        font-size: 18px;
        padding-top: 15%;
        display: table-cell;
        color: red;
        border-right: 1px dashed #eee;
      }

      .c_produce {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.2rem 0.1rem;
        box-sizing: border-box;

        h3 {
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 16px;
          color: #333;
        }

        .c_time {
          width: 100%;
          height: 0.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            font-size: 12px;
            color: #999;
          }

          span:first-child {
            margin-right: 5px;
          }
        }
      }

      p {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 14px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
