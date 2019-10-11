<template>
  <div class="contain">
    <div class="feixiang">
      <van-popup v-model="donghua" :close-on-click-overlay="false">
        <div class="lunhui">
          <van-loading type="spinner" color="#fff" />
          <p style="color:#fff">数据加载中...</p>
        </div>
      </van-popup>
    </div>
    <van-goods-action>
      <div class="woshi" @click="shopdian">
        <img src="../../../static/img/dianpu.png" alt />
        <span>店铺</span>
      </div>
      <div class="woshi" @click="kefu(sphone)">
        <img src="../../../static/img/kefu.png" alt />
        <span>客服</span>
      </div>
      <div class="woshi woshia" @click="collection(type)" v-if="type==false">
        <img src="../../../static/img/shoucang.png" alt />
        <span>收藏</span>
      </div>
      <div class="woshi woshia" @click="collection(type)" v-else>
        <img src="../../../static/img/shoucang2.png" alt />
        <span>取消收藏</span>
      </div>
      <van-goods-action-big-btn text="加入购物车" @click.stop="showSku" />
      <van-goods-action-big-btn
        text="立即下单"
        style="background: #73d242;border-color: #73d242;"
        @click.stop="showSkus"
      />
    </van-goods-action>
    <van-image-preview
      v-model="show"
      :images="images"
      :show-index="false"
      :start-position="0"
      @close="guan"
    ></van-image-preview>
    <div class="middle" v-for="(v,k) in detailList" :key="k">
      <div class="g_swipe">
        <van-swipe @change="onChange" :height="300" :autoplay="3000">
          <van-swipe-item v-for="(img,inx) in v.images" :key="inx">
            <img v-lazy="img" alt @click="clickImg($event)" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{v.images.length}}</div>
        </van-swipe>
        <div class="g_top">
          <img src="../../../static/img/xiangq_fanhui.png" alt @click="back" />
          <img src="../../../static/img/xiangq_gouwu.png" alt @click="order" />
        </div>
      </div>
      <div class="g_product">
        <div class="g_left">
          <div class="g_title">
            <h3>{{v.name}}</h3>
            <span>销量 {{parseFloat(v.soldNumber)}}</span>
          </div>
          <div class="g_money" v-if="v.freight!=='-1'&&v.freight!==undefined">满￥{{v.freight}}包邮</div>
          <div class="g_money">
            <span class="g_new">￥{{v.price}}</span>&nbsp;&nbsp;
            <span class="g_old" v-if="v.originalPrice!=undefined">￥{{v.originalPrice}}</span>
          </div>
        </div>
        <div class="g_right">
          <img src="../../../static/img/xiangq_fenxiang.png" alt @click="openShare" />
        </div>
      </div>
      <div class="copin">
        <div @click="tiaozhuan(detailList[0].sid,detailList[0].sname)" v-if="hasCouponyin==true">
          <img src="../../../static/img/hongbao.png" alt class="hongbao" />
          <span>领取优惠券</span>
          <img src="../../../static/img/jinru02.png" alt class="quyou" />
        </div>
      </div>
      <div class="goods_img">
        <h2>商品详情：</h2>
        <p>{{v.describe}}</p>
        <img :src="img" v-for="(img,inx) in v.describeImages" :key="inx" @click="clickImg($event)" />
      </div>
      <!-- 商品的规格选择开始 -->
      <van-sku
        stepper-title="数量"
        v-model="showBase"
        :sku="sku"
        :goods="goods"
        :goods-id="5"
        :sku-header-price="1"
        :quota="0"
        :hide-stock="false"
        :initial-sku="initialSku"
        :reset-stepper-on-hide="true"
        :reset-selected-sku-on-hide="true"
        :close-on-click-overlay="true"
        :disable-stepper-input="false"
        :show-soldout-sku="true"
        @sku-selected="selected"
        @buy-clicked="onAdd"
        @stepper-change="stepperchange"
        style="color:#333;z-index: 1000000"
      >
        <template slot="sku-actions" slot-scope="props">
          <div class="van-sku-actions">
            <van-button
              square
              size="large"
              type="warning"
              @click="props.skuEventBus.$emit('sku:buy')"
            >确定</van-button>
          </div>
        </template>
      </van-sku>
      <van-sku
        stepper-title="数量"
        v-model="showBases"
        :sku="sku"
        :goods="goods"
        :goods-id="5"
        :sku-header-price="1"
        :quota="0"
        :hide-stock="false"
        :initial-sku="initialSku"
        :reset-stepper-on-hide="true"
        :reset-selected-sku-on-hide="true"
        :close-on-click-overlay="true"
        :disable-stepper-input="false"
        :show-soldout-sku="true"
        @sku-selected="selected"
        @buy-clicked="onBuyClicked"
        @stepper-change="stepperchange"
        style="color:#333;z-index: 1000000"
      >
        <template slot="sku-actions" slot-scope="props">
          <div class="van-sku-actions">
            <van-button
              square
              size="large"
              type="primary"
              @click="props.skuEventBus.$emit('sku:buy')"
            >确定</van-button>
          </div>
        </template>
      </van-sku>
      <!-- 商品的规格选择结束 -->
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div ref="comment" class="comment">
          <div class="c_dis">
            <div class="c_item" v-for="(v,k) in list" :key="k">
              <img :src="v.icon" alt />
              <div class="item_right">
                <div class="right_top">
                  <div class="r_tit">
                    <span>{{v.title}}</span>
                    <span>{{v.time}}</span>
                  </div>
                  <div class="user_star">
                    <van-rate
                      v-model="v.star"
                      disabled
                      disabled-color="rgb(255,210,30)"
                      :size="14"
                    />
                    <span style="margin-left:0.2rem">{{v.star}}.0</span>
                  </div>
                </div>
                <p>{{v.content}}</p>
                <div class="c_img">
                  <!-- <template v-for="(i,index) in v.url" :key="index">
                    <img :src="i.imgs" alt>
                  </template>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </van-list>
  </div>
</template>

<script>
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Swipe,
  SwipeItem,
  Sku,
  Toast,
  ImagePreview,
  Loading,
  Popup
} from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      shares: {},
      type: false,
      current: 0,
      detailList: [],
      hasCouponyin: false,
      list: [],
      dataList: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      totalPage: 3,
      showBase: false,
      showBases: false,
      dian: "",
      sphone: "",
      sname: "",
      shopID: "",
      SKname: "",
      val: 1,
      initialSku: {
        s1: "",
        selectedNum: 1
      },
      sku: {
        tree: [
          {
            k: "商品规格",
            v: [],
            k_s: "s1"
          }
        ],
        list: [],
        price: "",
        stock_num: 0,
        collection_id: 2259,
        none_sku: false
      },
      goods: {
        title: "测试商品",
        picture: "../../../static/img/tilogo.png"
      },
      show: false,
      images: []
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
    } else {
      this.id = JSON.parse(localStorage.getItem("zhe-shop1ID")).id;
    }
    if (JSON.parse(localStorage.getItem("user"))) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
    }
  },
  mounted() {
    this.init();
    this.uinit();
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push({
          name: "shopdetailzhe",
          params: {
            id: self.$route.params.shopid,
            ids: self.$route.params.ids
          }
        });
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
  components: {
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Swipe,
    SwipeItem,
    Sku
  },
  methods: {
    guan() {
      this.images.pop();
    },
    clickImg(e) {
      this.show = true;
      if (this.images.length == 0) {
        this.images.push(e.currentTarget.src);
      }
    },

    onChange(index) {
      this.current = index;
    },
    openShare() {
      console.log("分享");
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        let that = this;
        mui.plusReady(function() {
          plus.share.getServices(
            function(s) {
              if (s && s.length > 0) {
                for (var i = 0; i < s.length; i++) {
                  var t = s[i];
                  that.shares[t.id] = t;
                }
              }
            },
            function() {
              console.log("获取分享服务列表失败");
            }
          );
        });
        this.sharelist();
      }
    },
    //分享链接点击事件
    sharelist() {
      let self = this;
      var ids = [
          {
            id: "weixin",
            ex: "WXSceneSession"
          },
          {
            id: "weixin",
            ex: "WXSceneTimeline"
          },
          {
            id: "qq"
          }
        ],
        bts = [
          {
            title: "发送给微信好友"
          },
          {
            title: "分享到微信朋友圈"
          },
          {
            title: "分享到QQ"
          }
        ];
      plus.nativeUI.actionSheet({ cancel: "取消", buttons: bts }, function(e) {
        var i = e.index;
        if (i > 0) {
          var s_id = ids[i - 1].id;
          console.log(self.shares);
          var share = self.shares[s_id];
          console.log(share);
          console.log(272);
          if (share) {
            console.log(share);
            console.log(275);
            if (share.authenticated) {
              self.shareMessage(share, ids[i - 1].ex);
            } else {
              share.authorize(
                function() {
                  self.shareMessage(share, ids[i - 1].ex);
                },
                function(e) {
                  console.log("认证授权失败：" + e.code + " - " + e.message);
                }
              );
            }
          } else {
            mui.toast(
              "无法获取分享服务，请检查manifest.json中分享插件参数配置，并重新打包"
            );
          }
        }
      });
    },
    shareMessage(share, ex) {
      var msg = {
        extra: {
          scene: ex
        }
      };
      msg.href = "https://a.app.qq.com/o/simple.jsp?pkgname=lixin.com.xiangxianperject";
      msg.title = "山城乡鲜";
      msg.content ="山城乡鲜是致力于打造绿色无污染农产品销售链的平台,让大家足不出户就可以吃遍中国原产地的特色美食。";
      if (~share.id.indexOf("weibo")) {
        msg.content += "；体验地址：https://a.app.qq.com/o/simple.jsp?pkgname=lixin.com.xiangxianperject";
      }
      msg.thumbs = ["_www/images/logo.png"];
      share.send(
        msg,
        function() {
          console.log('分享到"' + share.description + '"成功！ ');
        },
        function(e) {
          console.log(
            '分享到"' +
              share.description +
              '"失败: ' +
              e.code +
              " - " +
              e.message
          );
        }
      );
    },

    kefu(kefu) {
      mui.plusReady(function() {
        console.log(kefu);
        var btnArray = ["拨打", "取消"];
        var phone = kefu;
        mui.confirm("是否拨打" + phone + "?", "提示", btnArray, function(e) {
          if (e.index == 0) {
            plus.device.dial(phone, true);
          }
        });
      });
    },

    onRefresh: function() {
      var self = this;
      this.list = [];
      this.page = 1;
      this.totalPage = 3;
      this.onLoad();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    init() {
      let self = this;
      self.donghua = true;
      let datas = {
        cmd: "goodsDetail",
        id: self.id,
        cid: self.cid
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.data.result == 0) {
            console.log(res.data);
            self.sphone = res.data.sphone;
            self.sname = res.data.sname;
            self.dain = res.data.sid;
            self.shopID = res.data.id;
            if (res.data.isCollect == true) {
              self.type = true;
            } else {
              self.type = false;
            }
            if (res.data.hasCoupon == 1) {
              self.hasCouponyin = true;
            } else {
              self.hasCouponyin = false;
            }
            self.detailList.push(res.data);
            self.goods.title = res.data.name;
            self.goods.picture = res.data.images[0];
            for (var i in res.data.specifyValue) {
              let arr = {};
              let arrt = {};
              arr.name = res.data.specifyValue[i].val;
              arr.id = res.data.specifyValue[i].skuId;
              self.sku.tree[0].v.push(arr);
              arrt.id = res.data.specifyValue[i].skuId;
              self.initialSku.s1 = res.data.specifyValue[0].skuId;
              self.SKname = res.data.specifyValue[0].val;
              arrt.stock_num = Number(res.data.specifyValue[i].stock);
              arrt.s1 = res.data.specifyValue[i].skuId;
              arrt.price = Number(res.data.specifyValue[i].price) * 100;
              self.sku.list.push(arrt);
              self.sku.price = Number(res.data.specifyValue[i].price);
              self.sku.stock_num += Number(arrt.stock_num); //总量
            }
            console.log(self.sku);
            self.donghua = false;
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    stepperchange(e) {
      this.val = e;
    },
    shopdian() {
      console.log(this.dian);
      this.$router.push({
        name: "shopdetailzhe",
        params: {
          id: this.dain,
          ids: this.id
        }
      });
    },
    uinit() {
      let pin = {
        cmd: "goodsComment",
        id: this.id,
        pageNow: this.page
      };
      Request.postRequest(pin)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            console.log(res.data.dataList);
            for (var i in res.data.dataList) {
              self.dataList.push(res.data.dataList[i]);
              console.log(self.dataList);
            }
          }
        })
        .catch(res => {});
    },
    onLoad: function() {
      if (this.page <= this.totalPage) {
        for (var i = 0; i < this.dataList.length; i++) {
          console.log("id6+" + this.dataList[i].id);

          this.list.push(this.dataList[i]);
          console.log(this.list);
        }
        this.page++;
        // // 加载状态结束
        this.loading = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    collection(it) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        let types = 0;
        if (it == true) {
          types = 1;
        } else {
          types = 0;
        }
        console.log("收藏+" + it + ":" + types);
        let collection = {
          cmd: "collectGoods",
          id: this.id,
          cid: this.cid,
          type: types
        };
        Request.postRequest(collection)
          .then(res => {
            console.log(res);
            if (res.data.result == 0) {
              this.type = !this.type;
              if (this.type == true) {
                Toast("收藏成功");
              } else {
                Toast("已取消收藏");
              }
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    showSku() {
      this.showBase = true;
    },
    showSkus() {
      this.showBases = true;
    },
    selected(item) {
      console.log(item);
      this.initialSku.s1 = item.selectedSkuComb.s1;
      this.SKname = item.skuValue.name;
    },
    back() {
      this.$router.push({
        name: "shopdetailzhe",
        params: {
          id: this.$route.params.shopid,
          ids: this.$route.params.ids
        }
      });
    },
    order() {
      this.$router.push("/carts");
      localStorage.setItem("tocar", JSON.stringify("goods_detailzhe"));
    },
    onAdd(data) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        if (data.selectedSkuComb.stock_num <= 0) {
          Toast("该规格商品已售空");
        } else {
          let shoplist = {
            cmd: "addToCar",
            gid: this.id,
            cid: this.cid,
            specifications: data.selectedSkuComb.s1,
            number: this.val
          };
          console.log(shoplist);
          Request.postRequest(shoplist)
            .then(res => {
              console.log(res.data);
              if (res.data.result == 0) {
                Toast("已加入购物车");
                this.showBase = false;
                // for (let i in this.sku.list) {
                //   if (this.sku.list[i].s1 == data.selectedSkuComb.s1) {
                //     this.sku.list[i].stock_num =
                //       this.sku.list[i].stock_num - this.val;
                //     this.sku.stock_num += this.sku.list[i].stock_num;
                //   }
                // }
              } else if (res.data.result == "2") {
                this.$router.push("/fenghao");
              }
            })
            .catch(res => {});
        }
      }
    },
    onBuyClicked(data) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        if (data.selectedSkuComb.stock_num <= 0) {
          Toast("该规格商品已售空");
        } else {
          let car = [];
          let shop = {};
          let goodlist = {};
          shop.sid = this.dain;
          shop.sname = this.sname;
          goodlist.id = this.shopID;
          goodlist.name = this.goods.title;
          goodlist.images = this.goods.picture;
          goodlist.number = this.val;
          goodlist.price = data.selectedSkuComb.price / 100;
          goodlist.skuname = this.SKname;
          goodlist.skuID = data.selectedSkuComb.id;
          car[0] = shop;
          car[1] = goodlist;
          console.log(car);
          this.$router.push("/orders");
          localStorage.setItem("gocart", JSON.stringify(car));
          localStorage.setItem("Torders", JSON.stringify("goods_detailzhe"));
        }
      }
    },
    tiaozhuan(id, name) {
      console.log(id, name);
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        //优惠券我来了
        this.$router.push({
          name: "couponzhe",
          params: {
            id: id,
            name: name
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.feixiang .van-popup {
  background: none !important;
  overflow-y: unset !important;
}

.van-popup {
  background: #fff !important;
}

.contain {
  width: 100%;
  height: auto;
  margin-bottom: 60px;
}

.van-button--warning {
  border-color: #fb9c1c;
  background: #fb9c1c;
}

.van-swipe-item img {
  width: 100%;
  height: 100%;
}

.van-goods-action {
  z-index: 2000;
}

.van-popup {
  z-index: 100000;
}

.van-sku-row__title {
  display: none !important;
}

.middle {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.g_top {
  width: 100%;
  height: 72px;
  padding: 0 0.4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 0.95rem;
    height: 0.95rem;
  }
}

.g_swipe {
  width: 100%;
  height: 200px;
  color: #333;
  position: relative;

  .custom-indicator {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    padding: 0.1rem 0.4rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    font-size: 14px;
    color: #fff;
  }
}

.g_product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 3rem 0 0.4rem;
  box-sizing: border-box;

  .g_left {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.4rem;
    box-sizing: border-box;

    .g_title {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #333;

      h3 {
        width: 100%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 2;
      }

      span {
        color: #999;
        font-size: 12px;
        margin-top: 0.2rem;
      }
    }

    .g_money {
      font-size: 14px;
      padding-top: 0.4rem;

      .g_new {
        color: red;
      }

      .g_old {
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  .g_right {
    width: 1.6rem;
    display: flex;
    border-radius: 30px;
    margin-right: 5px;

    img {
      width: 100%;
      height: 0.7rem;
    }
  }
}

.woshi {
  width: 30px;
  height: 34px;
  background: #fff;
  border-right: 1px solid #dedede;
  color: #7d7e80;
  padding: 8px 10px;
  text-align: center;

  span {
    font-size: 12px;
  }

  img {
    width: 20px;
    height: 20px;
    display: block;
    margin-left: 5px;
    margin-bottom: 5px;
    opacity: 0.5;
  }
}

.woshia {
  width: 50px;
  border-right: none;

  img {
    margin-left: 15px;
  }
}

.goods_img {
  width: 100%;
  padding: 0.4rem 0;
  background: rgb(244, 244, 244);

  h2 {
    padding: 0 0.4rem;
  }

  p {
    width: 100%;
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
  }

  img {
    width: 100%;
    display: block;
  }
}

.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .c_dis {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;

    .c_item {
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;

      img {
        width: 1.2rem;
        height: 1.2rem;
      }

      .item_right {
        width: 80%;
        padding-left: 0.3rem;
        display: flex;
        flex-direction: column;

        .right_top {
          width: 100%;
          height: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 14px;
          color: #333;

          .r_tit {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .user_star {
            width: 100%;
            display: flex;
            align-items: center;
          }
        }

        p {
          font-size: 12px;
          color: #333;
          padding-top: 0.6rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .c_img {
          width: 100%;
          margin-top: 0.3rem;
          display: flex;

          img {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
}

.copin {
  background: #f4f4f4;
  padding-top: 5px;

  div {
    background: #fff;
    position: relative;
    height: 46px;

    img {
      height: 20px;
      width: 15px;
    }

    .hongbao {
      position: absolute;
      top: 12px;
      left: 20px;
    }

    span {
      position: absolute;
      top: 15px;
      left: 50px;
      font-size: 14px;
      color: #F7725C;
    }

    .quyou {
      position: absolute;
      top: 15px;
      right: 20px;
    }
  }
}
</style>
