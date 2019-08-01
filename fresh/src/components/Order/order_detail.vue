<template>
  <div class="contain" v-cloak>
    <main-header :text="text" :datas="datas" @back="back" @set="set"></main-header>
    <div class="box">
      <h3 v-if="state == 0">
        <router-link
          :to="{path:'/pay',query:{id:this.$route.query.id,prc:Number(orders.finalPay)}}"
          style="color:green;"
        >去支付 ></router-link>
      </h3>
      <!--//订单状态 0待付款 1待处理 2待发货 3待收货 4待评价 5已评价 6已取消 7待退款 8已退款 9拒绝退款-->
      <div class="wait" v-if="state == 1">准备出仓</div>
      <div class="wait" v-if="state == 2">商家已接单，待发货</div>
      <div class="cancel" v-if="state == 3">
        <span style="font-size:14px;margin-bottom:0.4rem;">商品正在路上，请耐心等待</span>
        <div
          class="look"
          style="font-size:14px;color:#fff;"
          @click="goLogistic(orders.goods)"
          v-if="orders.deliveryType==2||orders.wlNo!==''"
        >查看物流</div>
        <div
          class="look"
          style="font-size:14px;color:#fff;"
          @click="call(orders.recevingCall)"
          v-else-if="orders.deliveryType==1"
        >联系收派员</div>
      </div>
      <div class="cancel" v-if="state == 4">
        <span style="font-size:14px;margin-bottom:0.4rem;">订单已完成</span>
        <div class="look" style="font-size:14px;" @click="pjlun(orders)">
          <router-link to style="color:#fff;">去评价</router-link>
        </div>
      </div>
      <div class="cancel" v-if="state == 5">
        <span style="font-size:14px;margin-bottom:0.4rem;">订单已完成, 感谢您的使用</span>
        <div class="look" style="font-size:14px;color:#fff;" @click="checkComment">查看评价</div>
      </div>
      <div class="cancel" v-if="state == 6">
        <span style="font-size:14px;margin-bottom:0.4rem;">订单已取消</span>
        <span style="font-size:14px;color:#999;">取消原因：{{orders.reason}}</span>
      </div>
      <div class="cancel" v-if="state == 7">
        <span style="font-size:14px;margin-bottom:0.4rem;">等待商家同意退单申请</span>
        <span style="font-size:14px;color:#999;">退款原因：{{orders.reason}}</span>
      </div>
      <div class="cancel" v-if="state == 8">
        <span style="font-size:14px;margin-bottom:0.4rem;">已退款</span>
        <span style="font-size:14px;color:#999;">退款原因：{{orders.reason}}</span>
      </div>
    </div>
    <div class="go_shop">
      <h3>{{orders.sname}}</h3>
      <ul>
        <li v-for="(v,k) in ordershop" :key="k" @click="tiaoimg(v.id)">
          <img v-lazy="v.image" alt />
          <div class="lis_right">
            <div class="lis_detail">
              <span>{{v.name}}</span>
              <span>X {{v.number}}</span>
              <span>￥{{v.price}}</span>
            </div>
            <div class="lis_key">规格：{{v.specifications}}</div>
          </div>
        </li>

        <li style="margin-top: 0.5rem">
          <span>配送费:</span>
          <span>￥{{orders.distributionFee}}</span>
        </li>
      </ul>
    </div>
    <div class="msg">
      <div class="user_coupon" v-if="orders.discountFee!=='0.00'">
        <span>优惠券</span>
        <div class="c_coupon">
          <span>-￥{{orders.discountFee}}</span>
        </div>
      </div>
      <div class="user_coupon">
        <span>订单总计</span>
        <div class="c_coupon">
          <span style="color:red;">￥{{orders.finalPay}}</span>
        </div>
      </div>
      <a class="link" @click="tel(orders.smobile)">
        <img src="../../../static/img/tel.png" alt />
        <span>联系商家</span>
      </a>
    </div>
    <div class="orders">
      <div class="user_coupon">
        <span>订单信息</span>
      </div>
      <div class="user_coupon">
        <span>订单号</span>
        <div class="c_coupon">
          <span>{{orders.id}}</span>
        </div>
      </div>
      <div class="user_msg">
        <span>收货地址</span>
        <div class="address">
          <p>{{orders.province}}{{orders.city}}{{orders.town}}{{orders.address}}</p>
          <div>
            <span>{{orders.username}}</span>
            <span>{{orders.phone}}</span>
          </div>
        </div>
      </div>
      <div class="user_coupon">
        <span>支付方式</span>
        <div class="c_coupon">
          <span v-if="orders.payMethod==1">支付宝支付</span>
          <span v-if="orders.payMethod==2">微信支付</span>
        </div>
      </div>
      <div class="beizhu_msg">
        <span>备注信息：</span>
        <p>{{orders.remark}}</p>
      </div>
      <div class="user_coupon">
        <span>创建时间</span>
        <div class="c_coupon">
          <span>{{orders.createTime}}</span>
        </div>
      </div>
      <div class="user_coupon" v-if="state == 6">
        <span>取消时间</span>
        <div class="c_coupon">
          <span>{{orders.cancelTime}}</span>
        </div>
      </div>
      <div
        class="user_coupon"
        v-if="state == 1||state == 2||state == 3 || state == 4 || state == 5 ||  state == 7 || state == 8 || state == 9"
      >
        <span>付款时间</span>
        <div class="c_coupon">
          <span>{{orders.payTime}}</span>
        </div>
      </div>
      <div
        class="user_coupon"
        v-if="state == 2||state == 3 || state == 4 || state == 5 ||  state == 7 || state == 8 || state == 9"
      >
        <span>商家接单时间</span>
        <div class="c_coupon">
          <span>{{orders.receiveTime}}</span>
        </div>
      </div>
      <div
        class="user_coupon"
        v-if="state == 3 || state == 4 || state == 5 ||  state == 7 || state == 8 || state == 9"
      >
        <span>发货时间</span>
        <div class="c_coupon">
          <span>{{orders.sendTime}}</span>
        </div>
      </div>
      <div
        class="user_coupon"
        v-if="state == 4 || state == 5 ||  state == 7 || state == 8 || state == 9"
      >
        <span>确认收货时间</span>
        <div class="c_coupon">
          <span>{{orders.confirmGetTime}}</span>
        </div>
      </div>
      <div class="user_coupon" v-if=" state == 5 ||  state == 7 || state == 8 || state == 9">
        <span>评价时间</span>
        <div class="c_coupon">
          <span>{{orders.evaluateTime}}</span>
        </div>
      </div>
      <div class="user_coupon" v-if="  state == 7 || state == 8 || state == 9">
        <span>申请售后时间</span>
        <div class="c_coupon">
          <span>{{orders.applyRefundTime}}</span>
        </div>
      </div>
      <div class="user_coupon" style="border-bottom: none;" v-if=" state == 8 || state == 9">
        <span>商家处理时间</span>
        <div class="c_coupon">
          <span>2018-04-25 18:25:45</span>
        </div>
      </div>
    </div>
    <div class="no_more">没有更多了</div>
    <div class="sure" v-if="state == 3" @click="shou">确认收货</div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Dialog } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "订单详情",
      datas: "",
      state: "", //订单状态
      orders: [], //订单详情全部
      ordershop: [] //商品数据
    };
  },
  created() {
    console.log(this.$route.query);
    this.orderDetail(this.$route.query.id);
    this.mess = JSON.parse(localStorage.getItem("mess")).tit;
    console.log(this.mess);
  },
  components: {
    MainHeader
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        if (self.mess == "aaa") {
          self.$router.push("/message");
        } else if (self.mess == "bbb") {
          self.$router.push("/order_center/" + self.$route.query.num);
        } else if (self.mess == "ccc") {
          self.$router.push("/TuiShop/" + self.$route.query.num);
        }
        localStorage.removeItem("mess");
        localStorage.removeItem("xiang-shop1ID");
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
      if (this.mess == "aaa") {
        this.$router.push("/message");
      } else if (this.mess == "bbb") {
        this.$router.push("/order_center/" + this.$route.query.num);
      } else if (this.mess == "ccc") {
        this.$router.push("/TuiShop/" + this.$route.query.num);
      }
      localStorage.removeItem("mess");
      localStorage.removeItem("xiang-shop1ID");
    },
    tiaoimg(id) {
      this.$router.push({
        name: "goodsxiang",
        params: {
          id: id,
          ding: this.$route.query.id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("xiang-shop1ID", JSON.stringify(ID));
    },
    set() {
      if (this.datas == "取消订单") {
        this.$router.push({
          name: "cancel",
          params: {
            num: 1,
            act: this.$route.query.num,
            id: this.$route.query.id
          }
        });
      } else if (this.datas == "删除订单") {
        console.log("删除订单");
        let deleteOrder = {
          cmd: "deleteOrder",
          id: this.$route.query.id
        };
        console.log(deleteOrder);
        Request.postRequest(deleteOrder)
          .then(res => {
            console.log(res.data);
            if (res.data.result == 0) {
              Toast(res.data.resultNote);
              this.$router.push("/order_center/" + this.$route.query.num);
            }
          })
          .catch(res => {});
      } else if (this.datas == "取消申请") {
        console.log("取消申请");
        let deleteOrder = {
          cmd: "cancelApplyRefund",
          id: this.$route.query.id
        };
        console.log(deleteOrder);
        Request.postRequest(deleteOrder)
          .then(res => {
            console.log(res.data);
            if (res.data.result == 0) {
              Toast(res.data.resultNote);
              this.$router.push("/order_center/" + this.$route.query.num);
            }
          })
          .catch(res => {});
      } else {
        this.$router.push({
          name: "cancel",
          params: {
            num: 2,
            act: this.$route.query.num,
            id: this.$route.query.id
          }
        });
      }
    },
    checkComment() {
      this.$router.push({
        name: "CommentDetail",
        params: {
          id: this.$route.query.id
        }
      });
    },
    goLogistic(i) {
      this.$router.push({
        path: "/logistic",
        query: {
          wlNo: this.orders.wlNo,
          img: i[0].image,
          wlCode: this.orders.wlCode
        }
      });
    },
    call(tel) {
      console.log("收派员电话" + tel);
      mui.plusReady(function() {
        console.log("收派员电话" + tel);
        var btnArray = ["拨打", "取消"];
        var phone = tel;
        mui.confirm("是否拨打" + phone + "?", "提示", btnArray, function(e) {
          if (e.index == 0) {
            plus.device.dial(phone, true);
          }
        });
      });
    },
    tel(tel) {
      console.log("商家电话" + tel);
      mui.plusReady(function() {
        console.log("商家电话" + tel);
        var btnArray = ["拨打", "取消"];
        var phone = tel;
        mui.confirm("是否拨打" + phone + "?", "提示", btnArray, function(e) {
          if (e.index == 0) {
            plus.device.dial(phone, true);
          }
        });
      });
    },
    pjlun(aa) {
      this.$router.push({
        name: "comment",
        params: {
          ids: aa.id
        }
      });
    },
    orderDetail(id) {
      let orderDetail = {
        cmd: "orderDetail",
        id: id
      };
      Request.postRequest(orderDetail)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.state = res.data.status;
            this.orders = res.data;
            this.ordershop = res.data.goods;
            if (this.state == 0) {
              this.datas = "取消订单";
            } else if (this.state == 6) {
              this.datas = "删除订单";
            } else if (
              this.state == 1 ||
              this.state == 2 ||
              this.state == 3 ||
              this.state == 4
            ) {
              this.datas = "申请退款";
            } else if (this.state == 6 || this.state == 8 || this.state == 9) {
              this.datas = "";
            } else if (this.state == 7) {
              this.datas = "取消申请";
            }
          }
        })
        .catch(res => {});
    },
    shou() {
      Dialog.confirm({
        title: "确认收货",
        message: "是否确认收货？"
      })
        .then(() => {
          let orderDetail = {
            cmd: "confirmReceive",
            id: this.$route.query.id
          };
          Request.postRequest(orderDetail)
            .then(res => {
              console.log(res.data);
              if (res.data.result == 0) {
                this.$router.push("/order_center/" + this.$route.query.num);
              }
            })
            .catch(res => {});
        })
        .catch(() => {});
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

    h3 {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: rgb(114, 209, 65);
      border-top: 1px solid #eee;
    }

    .cancel {
      width: 100%;
      height: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #333;
      border-top: 1px solid #eee;

      .look {
        padding: 0.15rem 0.5rem;
        background: rgb(114, 209, 65);
        border-radius: 6px;
      }
    }

    .wait {
      width: 100%;
      height: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #333;
      border-top: 1px solid #eee;
    }
  }

  .go_shop {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;
    border-top: 10px solid #f5f5f5;
    border-bottom: 10px solid #f5f5f5;

    h3 {
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #eee;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-bottom: 0.4rem;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.3rem;
        font-size: 14px;
        color: #333;

        img {
          width: 2rem;
          height: 2rem;
        }

        .lis_right {
          flex: 1;
          height: 2rem;
          padding-left: 0.4rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          .lis_detail {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .lis_key {
            width: 100%;
            height: 1rem;
            display: flex;
            align-items: center;
            color: #999;
          }
        }
      }
    }
  }

  .msg {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;
    border-bottom: 10px solid #f5f5f5;

    .user_coupon {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1ox solid #eee;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3rem;
      padding-top: 0.5rem;

      &:nth-last-child {
        border-bottom: none;
      }

      .c_coupon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;

        img {
          width: 0.3rem;
          height: 0.4rem;
          margin-left: 0.4rem;
        }
      }
    }

    .link {
      width: 100%;
      height: 1rem;
      background: rgb(114, 209, 65);
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.4rem 0;

      img {
        width: 0.6rem;
        height: 0.6rem;
      }

      span {
        font-size: 14px;
        color: #fff;
        margin-left: 0.2rem;
      }
    }
  }

  .orders {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;

    .user_coupon {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1ox solid #eee;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3rem;
      padding-top: 0.5rem;

      .c_coupon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
      }
    }

    .user_msg {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1ox solid #eee;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3rem;
      padding-top: 0.5rem;

      .address {
        width: 60%;
        display: flex;
        flex-direction: column;
        color: #999;

        p {
          margin-bottom: 0.3rem;
          line-height: 18px;
        }
      }
    }

    .beizhu_msg {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-bottom: 1ox solid #eee;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3rem;
      padding-top: 0.5rem;

      p {
        margin-top: 0.3rem;
        line-height: 18px;
        font-size: 14px;
        color: #999;
      }
    }
  }

  .no_more {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background: #eee;
    font-size: 12px;
    color: #666;
  }

  .sure {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background: rgb(114, 209, 65);
    font-size: 14px;
    color: #fff;
  }
}
</style>
