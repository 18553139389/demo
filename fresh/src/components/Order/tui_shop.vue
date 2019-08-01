<template>
  <div class="tenants-box">
    <van-popup v-model="donghua">
      <div class="lunhui">
        <van-loading type="spinner" color="#fff" />
        <p style="color:#fff">数据加载中...</p>
      </div>
    </van-popup>
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <ul>
          <li v-for="(v,k) in list" :key="k" @click="order(v)">
            <router-link to>
              <h3>
                <span>订单编号：{{v.id}}</span>
                <span style="color: red;" v-if="v.status == 0">待付款</span>
                <span v-if="v.status == 1">待处理</span>
                <span v-if="v.status == 2">待发货</span>
                <span v-if="v.status == 3">待收货</span>
                <span v-if="v.status == 4">待评价</span>
                <span v-if="v.status == 5">已评价</span>
                <span v-if="v.status == 6">已取消</span>
                <span v-if="v.status == 7">待退款</span>
                <span v-if="v.status == 8">已退款</span>
                <span v-if="v.status == 9">拒绝退款</span>
              </h3>
              <!--0待付款 1待处理 2待发货 3待收货 4待评价 5已评价 6已取消 7待退款 8已退款 9拒绝退款-->
              <div class="wrapper">
                <img v-lazy="v.simage" alt />
                <div class="s_right">
                  <div class="s_top">
                    <span>{{v.sname}}</span>
                  </div>
                  <p>{{v.createTime}}</p>
                  <div class="s_price">
                    <span style="color:#999;">共计{{v.number}}件商品</span>
                    <span>￥{{v.finalPay}}元</span>
                  </div>
                </div>
              </div>
              <div class="pay" v-if="v.status == 0">
                <span>24小时后自动取消订单</span>
                <div>待支付</div>
              </div>
              <div class="pay" v-if="v.status == 3">
                <span>15天后自动确认收货</span>
                <div style="padding: 0 0.2rem;">确认收货</div>
              </div>
              <div class="comment" v-if="v.status == 4">
                <div style="padding: 0 0.2rem;">评价</div>
              </div>
            </router-link>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Loading, Popup } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      donghua: false,
      text: "退款/售后",
      active: "",
      loading: false,
      finished: false,
      list: [],
      page: 1,
      totalPage: 2
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    if (this.$route.params.id) {
      this.active = this.$route.params.id;
      localStorage.setItem("OrderNUM", JSON.stringify(this.$route.params.id));
    } else {
      this.active = JSON.parse(localStorage.getItem("OrderNUM"));
    }
    this.myOrder(this.active, this.page);
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
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   if (this.page <= this.totalPage) {
      //     this.page++;
      //     this.myOrder(this.active, this.page);
      //     this.loading = false;
      //   } else {
      //     this.loading = false;
      //   }
      // }, 500);
    },
    back() {
      this.$router.push("/person");
    },
    myOrder(status, page) {
      this.donghua = true;
      let myOrder = {
        cmd: "myOrder",
        cid: this.cid,
        pageNow: page,
        status: status
      };
      Request.postRequest(myOrder)
        .then(res => {
          // console.log(res.data)
          if (res.data.result == 0) {
            console.log(res.data.dataList);
            this.list = res.data.dataList;
            this.totalPage = res.data.totalPage;
            this.finished = true;
            this.donghua = false;
            if (page < this.totalPage) {
              page++;
              this.myOrders(status, page);
              this.loading = false;
            } else {
              this.loading = false;
            }
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {
          Toast("获取失败");
        });
    },
    myOrders(status, page) {
      let myOrder = {
        cmd: "myOrder",
        cid: this.cid,
        pageNow: page,
        status: status
      };
      console.log(myOrder);
      Request.postRequest(myOrder)
        .then(res => {
          // console.log(res.data);
          if (res.data.result == 0) {
            for (var i in res.data.dataList) {
              this.list.push(res.data.dataList[i]);
            }
            console.log(this.list);
            this.totalPage = res.data.totalPage;
            this.finished = true;
            if (page < this.totalPage) {
              page++;
              this.myOrders(this.active, page);
              this.loading = false;
            } else {
              this.loading = false;
            }
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    //详情
    order(v) {
      this.$router.push({
        path: "/order_detail",
        query: {
          id: v.id,
          num: 5
        }
      });
      let mess = {};
      mess.tit = "ccc";
      localStorage.setItem("mess", JSON.stringify(mess));
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.tenants-box {
  padding: 0 10px 0;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 60px;

    .order_list {
      width: 100%;
      position: relative;

      .order_wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        h3 {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          padding: 0 0.4rem;
          box-sizing: border-box;
          font-size: 14px;
          color: #333;
        }
      }
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;

      li {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.4rem;
        box-sizing: border-box;
        margin-bottom: 10px;

        a {
          display: block;
          width: 100%;
          height: 100%;
        }

        h3 {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #333;
        }

        .wrapper {
          width: 100%;
          display: flex;
          align-items: center;

          img {
            width: 2.2rem;
            height: 2.2rem;
          }

          .s_right {
            flex: 1;
            height: 1.8rem;
            padding-left: 0.2rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .s_top {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              color: #333;
            }

            p {
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 12px;
              color: #999;
            }

            .s_price {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 12px;
              color: #333;
            }
          }
        }

        .pay {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #333;

          div {
            width: 1.5rem;
            height: 0.6rem;
            line-height: 0.6rem;
            border-radius: 6px;
            background: #73d242;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        }

        .comment {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #333;

          div {
            width: 1.5rem;
            height: 0.6rem;
            line-height: 0.6rem;
            border-radius: 6px;
            background: #73d242;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
