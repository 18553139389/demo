<template>
  <div class="contain" v-cloak>
    <van-tabbar v-model="num" active-color="rgb(114,209,65)">
      <van-tabbar-item to="/first">
        <span>首页</span>
        <img slot="icon" slot-scope="props" src="../../static/img/shouye1.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/classify">
        <span>分类</span>
        <img slot="icon" slot-scope="props" src="../../static/img/fenlei.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/near_shop">
        <span>附近商家</span>
        <img slot="icon" slot-scope="props" src="../../static/img/fujinshangjia.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/cart" :info="this.gou" v-if="this.gou>0">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" src="../../static/img/gouwuche.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/cart" v-else>
        <span>购物车</span>
        <img slot="icon" slot-scope="props" src="../../static/img/gouwuche.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/person">
        <span>我的</span>
        <img slot="icon" slot-scope="props" src="../../static/img/wode2.png" />
      </van-tabbar-item>
    </van-tabbar>
    <div class="box">
      <div class="wrapper">
        <div class="xiaoxi">
          <img src="../../static/img/personmsg.png" alt @click="message" class="xiaoxi" />
          <b class="xiaob" v-if="xiaoshow==true"></b>
        </div>
        <div class="person" v-if="useryin==true" @click="goMsg">
          <div class="user">
            <span style="font-weight: 600;margin-bottom: 0.3rem;">{{this.username}}</span>
            <span>{{this.mobile|hideMiddle}}</span>
          </div>
          <div class="person_img">
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="../../static/img/jinru02.png"
              alt
            />
            <div class="imgs">
              <img :src="this.headImage" alt v-if="this.headImage!=''" />
              <img src="../../static/img/touxiang.png" alt v-else />
            </div>
          </div>
        </div>
        <div class="person" v-else @click="goMsg">
          <div class="user">
            <span>登录/注册</span>
          </div>
          <div class="person_img">
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="../../static/img/jinru02.png"
              alt
            />
            <div class="imgs">
              <img src="../../static/img/touxiang.png" alt />
            </div>
          </div>
        </div>
        <div class="top-nav">
          <div class="top-head">
            <span>我的订单</span>
            <div class="top-right">
              <span>
                <router-link :to="'/order_center/'+0">全部订单</router-link>
              </span>
              <img
                style="width:0.2rem;height:0.3rem;margin-left:0.3rem;"
                src="../../static/img/jinru02.png"
                alt
              />
            </div>
          </div>
          <div class="top-bar">
            <van-tabbar :fixed="false" active-color="#666">
              <van-tabbar-item to :info="this.pendPayNumber" v-if="this.pendPayNumber>0">
                <span>
                  <router-link :to="'/order_center/'+1">待付款</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daifukuan.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+1">待付款</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daifukuan.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.pendSendNumber" v-if="this.pendSendNumber>0">
                <span>
                  <router-link :to="'/order_center/'+2">待发货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daifahuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+2">待发货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daifahuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.pendReceiveNumber" v-if="this.pendReceiveNumber>0">
                <span>
                  <router-link :to="'/order_center/'+3">待收货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daishouhuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+3">待收货</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daishouhuo.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.pendEvaluateNumber" v-if="this.pendEvaluateNumber>0">
                <span>
                  <router-link :to="'/order_center/'+4">待评价</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daipingjia.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/order_center/'+4">待评价</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/daipingjia.png" />
              </van-tabbar-item>
              <van-tabbar-item to :info="this.afterSaleNumber" v-if="this.afterSaleNumber>0">
                <span>
                  <router-link :to="'/TuiShop/'+5">退款/售后</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/tuikuanshouhou.png" />
              </van-tabbar-item>
              <van-tabbar-item to v-else>
                <span>
                  <router-link :to="'/TuiShop/'+5">退款/售后</router-link>
                </span>
                <img slot="icon" slot-scope="props" src="../../static/img/tuikuanshouhou.png" />
              </van-tabbar-item>
            </van-tabbar>
          </div>
        </div>
        <div class="bottom-nav">
          <div class="bottom-head">
            <span>山城乡鲜服务</span>
          </div>
          <ul>
            <li>
              <router-link to="/store">
                <img src="../../static/img/my_shoucang.png" alt />
              </router-link>
              <span>我的收藏</span>
            </li>
            <li>
              <router-link to="/evaluation">
                <img src="../../static/img/my_pingjia.png" alt />
              </router-link>
              <span>我的评价</span>
            </li>
            <li>
              <router-link to="/address">
                <img src="../../static/img/my_dizhi.png" alt />
              </router-link>
              <span>地址管理</span>
            </li>
            <li>
              <router-link to="/tenants">
                <img src="../../static/img/my_ruzhu.png" alt />
              </router-link>
              <span>商家入驻</span>
            </li>
            <li>
              <router-link to="/service">
                <img src="../../static/img/my_kefu.png" alt />
              </router-link>
              <span>客服中心</span>
            </li>
            <li>
              <router-link to="/SetUp">
                <img src="../../static/img/my_shezhi.png" alt />
              </router-link>
              <span>设置</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      num: 4,
      active: 2,
      xiaoshow: false,
      username: "", //昵称
      mobile: "", //手机号
      headImage: "", //头像
      afterSaleNumber: "", //待退款
      pendEvaluateNumber: "", //待评价
      pendPayNumber: "", //待付款
      pendReceiveNumber: "", //待收货
      pendSendNumber: "", //待发货
      useryin: false,
      gou: 0
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("first"))) {
      localStorage.removeItem("first");
    }
    if (JSON.parse(localStorage.getItem("user"))) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
      this.gouserInfo();
      this.infoList();
    }
    if (JSON.parse(localStorage.getItem("gouNUm"))) {
      this.gou = JSON.parse(localStorage.getItem("gouNUm"));
    }
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        first = new Date().getTime();
        mui.toast("再按一次退出应用");
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
  components: {
    Tab,
    Tabs
  },
  methods: {
    infoList() {
      let datas = {
        cmd: "infoList",
        cid: this.cid,
        pageNow: 1
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.data.result == 0) {
            for (var i in res.data.dataList) {
              if (res.data.dataList[i].read == 0) {
                this.xiaoshow = true;
              } else {
                this.xiaoshow = false;
              }
            }
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    gouserInfo() {
      if (JSON.parse(localStorage.getItem("gouserInfo"))) {
        this.username = JSON.parse(localStorage.getItem("gouserInfo")).username;
        this.mobile = JSON.parse(localStorage.getItem("gouserInfo")).mobile;
        this.headImage = JSON.parse(
          localStorage.getItem("gouserInfo")
        ).headImage;
        this.afterSaleNumber = JSON.parse(
          localStorage.getItem("gouserInfo")
        ).afterSaleNumber;
        this.pendEvaluateNumber = JSON.parse(
          localStorage.getItem("gouserInfo")
        ).pendEvaluateNumber;
        this.pendPayNumber = JSON.parse(
          localStorage.getItem("gouserInfo")
        ).pendPayNumber;
        this.pendReceiveNumber = JSON.parse(
          localStorage.getItem("gouserInfo")
        ).pendReceiveNumber;
        this.pendSendNumber = JSON.parse(
          localStorage.getItem("gouserInfo")
        ).pendSendNumber;
      }
      this.useryin = true;
      let goCarlist = {
        cmd: "myInfo",
        cid: this.cid
      };
      Request.postRequest(goCarlist)
        .then(res => {
          if (res.data.result == 0) {
            this.username = res.data.nickName; //昵称
            this.mobile = res.data.mobile; //手机号
            this.headImage = res.data.headImage; //头像
            this.afterSaleNumber = res.data.afterSaleNumber; //待退款
            this.pendEvaluateNumber = res.data.pendEvaluateNumber; //待评价
            this.pendPayNumber = res.data.pendPayNumber; //待付款
            this.pendReceiveNumber = res.data.pendReceiveNumber; //待收货
            this.pendSendNumber = res.data.pendSendNumber; //待发货
            let gouserInfo = {};
            gouserInfo.username = this.username;
            gouserInfo.mobile = this.mobile;
            gouserInfo.headImage = this.headImage;
            gouserInfo.afterSaleNumber = this.afterSaleNumber;
            gouserInfo.pendEvaluateNumber = this.pendEvaluateNumber;
            gouserInfo.pendPayNumber = this.pendPayNumber;
            gouserInfo.pendReceiveNumber = this.pendReceiveNumber;
            gouserInfo.pendSendNumber = this.pendSendNumber;
            localStorage.setItem("gouserInfo", JSON.stringify(gouserInfo));
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    goMsg() {
      this.$router.push("/person_msg");
    },
    message() {
      this.$router.push("/message");
      localStorage.setItem("Messageurl", JSON.stringify("person"));
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.van-tabbar-item__icon img {
  width: 18px !important;
  height: 18px !important;
}

.van-hairline--top-bottom::after {
  border: none !important;
}

.top-bar {
  width: 100%;
  display: flex;
  padding: 0.3rem 0 0.2rem;
}

.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #60c42e;
    padding: 10px 0.4rem 0;
    box-sizing: border-box;

    .wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      .xiaoxi {
        position: relative;
        width: 1rem;
        height: 1rem;

        img {
          width: 1rem;
          height: 1rem;
        }

        .xiaob {
          position: absolute;
          right: 0;
          top: 5px;
          background: red;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }

      .person {
        width: 100%;
        padding-top: 0.6rem;
        padding-bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          color: #fff;
          padding-left: 0.1rem;
        }

        .person_img {
          flex: 1;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;

          .imgs {
            width: 1.6rem;
            height: 1.6rem;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .top-nav {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 4rem;
      left: 0;
      border-radius: 8px;
      padding: 0.2rem 0;
      box-sizing: border-box;

      .top-head {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
        padding: 0 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .top-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    .bottom-nav {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 7.2rem;
      left: 0;
      border-radius: 8px;
      padding: 0.2rem 0;
      box-sizing: border-box;

      .bottom-head {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
        padding: 0 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
      }

      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0.4rem 0;

        li {
          width: 30%;
          margin-right: 3%;
          margin-bottom: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #333;

          img {
            width: 1.2rem;
            height: 1.2rem;
            margin-bottom: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
