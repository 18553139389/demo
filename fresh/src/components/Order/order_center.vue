<template>
  <div class="contain" v-cloak>
    <van-popup v-model="donghua" :close-on-click-overlay="false">
      <div class="lunhui">
        <van-loading type="spinner" color="#fff" />
        <p style="color:#fff">数据加载中...</p>
      </div>
    </van-popup>
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <van-tabs
        v-model="active"
        @click="shopper"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        :swipeable="true"
        :sticky="true"
        :offset-top="44"
      >
        <van-tab title="全部订单">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab :title="'待付款('+this.pendPayNumber+')'" v-if="this.pendPayNumber>0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="待付款" v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab :title="'待发货('+this.pendSendNumber+')'" v-if="this.pendSendNumber>0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="待发货" v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab :title="'待收货('+this.pendReceiveNumber+')'" v-if="this.pendReceiveNumber>0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="待收货" v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab :title="'待评价('+this.pendEvaluateNumber+')'" v-if="this.pendEvaluateNumber>0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="待评价" v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul>
                <li v-for="(v,k) in list" :key="k" @click="order(v)">
                  <h3>
                    <span>订单编号：{{v.id}}</span>
                    <span style="color: red;" v-if="v.status == 0">待付款</span>
                    <span v-if="v.status == 1">准备出仓</span>
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
                    <div @click="zhi(v)">去支付</div>
                  </div>
                  <div class="pay" v-if="v.status == 3">
                    <span>15天后自动确认收货</span>
                    <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
                  </div>
                  <div class="comment" v-if="v.status == 4">
                    <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Dialog, PullRefresh, Loading, Popup } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      text: "订单中心",
      active: "",
      loading: false,
      finished: false,
      page: 1,
      totalPage: 2,
      list: [],
      pendEvaluateNumber: "", //待评价
      pendPayNumber: "", //待付款
      pendReceiveNumber: "", //待收货
      pendSendNumber: "", //待发货
      isLoading: false
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    this.gouserInfo();
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
    gouserInfo() {
      this.useryin = true;
      let goCarlist = {
        cmd: "myInfo",
        cid: this.cid
      };
      Request.postRequest(goCarlist)
        .then(res => {
          // console.log(res.data);
          if (res.data.result == 0) {
            this.pendEvaluateNumber = res.data.pendEvaluateNumber; //待评价
            this.pendPayNumber = res.data.pendPayNumber; //待付款
            this.pendReceiveNumber = res.data.pendReceiveNumber; //待收货
            this.pendSendNumber = res.data.pendSendNumber; //待发货
          }
        })
        .catch(res => {});
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.myOrder(this.active, 1);
        this.gouserInfo();
        this.isLoading = false;
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   if (this.page < this.totalPage) {
      //     this.page++;
      //     this.myOrders(this.active, this.page);
      //     this.loading = false;
      //   } else {
      //     this.loading = false;
      //   }
      // }, 5000);
    },
    back() {
      this.$router.push("/person");
    },
    myOrder(status, page) {
      this.donghua = true;
      if (status == 0 && JSON.parse(localStorage.getItem("allOrder"))) {
        this.list = JSON.parse(localStorage.getItem("rotationChart"));
      } else if (
        status == 1 &&
        JSON.parse(localStorage.getItem("paymentOrder"))
      ) {
        this.list = JSON.parse(localStorage.getItem("rotationChart"));
      } else if (
        status == 2 &&
        JSON.parse(localStorage.getItem("deliveryOrder"))
      ) {
        this.list = JSON.parse(localStorage.getItem("rotationChart"));
      } else if (status == 3 && JSON.parse(localStorage.getItem("takeOrder"))) {
        this.list = JSON.parse(localStorage.getItem("rotationChart"));
      } else if (
        status == 4 &&
        JSON.parse(localStorage.getItem("evaluationOrder"))
      ) {
        this.list = JSON.parse(localStorage.getItem("rotationChart"));
      }
      let myOrder = {
        cmd: "myOrder",
        cid: this.cid,
        pageNow: page,
        status: status
      };
      console.log(myOrder);
      Request.postRequest(myOrder)
        .then(res => {
          console.log(res.data);
          this.list = [];
          if (res.data.result == 0) {
            this.list = res.data.dataList;
            this.totalPage = res.data.totalPage;
            this.finished = true;
            if (status == 0) {
              localStorage.setItem("allOrder", JSON.stringify(this.list));
            } else if (status == 1) {
              localStorage.setItem("paymentOrder", JSON.stringify(this.list));
            } else if (status == 2) {
              localStorage.setItem("deliveryOrder", JSON.stringify(this.list));
            } else if (status == 3) {
              localStorage.setItem("takeOrder", JSON.stringify(this.list));
            } else if (status == 4) {
              localStorage.setItem(
                "evaluationOrder",
                JSON.stringify(this.list)
              );
            }
            this.gouserInfo();
            if (page < this.totalPage) {
              page++;
              this.myOrders(this.active, page);
              this.loading = false;
            } else {
              this.loading = false;
            }
            this.donghua = false;
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
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
            if (status == 0) {
              localStorage.setItem("allOrder", JSON.stringify(this.list));
            } else if (status == 1) {
              localStorage.setItem("paymentOrder", JSON.stringify(this.list));
            } else if (status == 2) {
              localStorage.setItem("deliveryOrder", JSON.stringify(this.list));
            } else if (status == 3) {
              localStorage.setItem("takeOrder", JSON.stringify(this.list));
            } else if (status == 4) {
              localStorage.setItem(
                "evaluationOrder",
                JSON.stringify(this.list)
              );
            }
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
    shopper(item) {
      this.active = item;
      this.page = 1;
      this.list = [];
      this.finished = false;
      localStorage.setItem("OrderNUM", JSON.stringify(this.active));
      this.myOrder(this.active, this.page);
    },
    //详情
    order(v) {
      this.$router.push({
        path: "/order_detail",
        query: {
          id: v.id,
          num: this.active
        }
      });
      let mess = {};
      mess.tit = "bbb";
      localStorage.setItem("mess", JSON.stringify(mess));
    },
    //收货
    queshou(v) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      Dialog.confirm({
        title: "确认收货",
        message: "是否确认收货？"
      })
        .then(() => {
          let orderDetail = {
            cmd: "confirmReceive",
            id: v.id
          };
          Request.postRequest(orderDetail)
            .then(res => {
              console.log(res.data);
              if (res.data.result == 0) {
                this.myOrder(this.active, this.page);
                this.gouserInfo();
              }
            })
            .catch(res => {});
        })
        .catch(() => {});
    },
    //评价
    ping(v) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      this.$router.push({
        name: "comment",
        params: {
          ids: v.id
        }
      });
    },
    //支付
    zhi(v) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      this.$router.push({
        path: "/pay",
        query: {
          id: v.id,
          prc: Number(v.finalPay)
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
[v-cloak] {
  display: none !important;
}

.contain {
  width: 100%;
  height: 100%;
}

.van-tab__pane {
  min-height: 667px;
}

.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 44px;

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
      border-bottom: 10px solid #eee;

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
        border-bottom: 1px solid #eee;
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
          width: 1.7rem;
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
</style>
