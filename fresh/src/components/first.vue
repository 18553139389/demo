<template>
  <div class="contain" v-cloak>
    <van-popup v-model="donghua" :close-on-click-overlay="false">
      <div class="lunhui">
        <van-loading type="spinner" color="#808080" />
        <p style="color:#808080">数据加载中...</p>
      </div>
    </van-popup>
    <div class="head">
      <div class="city" @click="inits">
        <img src="../../static/img/shouye-dingwei.png" alt />
        <span>{{city}}</span>
      </div>
      <div class="search">
        <img src="../../static/img/shouye-sousuo.png" alt />
        <input type="text" placeholder="输入店铺或商品名称" @focus="goSearch" />
      </div>
      <img src="../../static/img/shouye-xiaoxi.png" @click="goMessage" alt />
      <div class="dian" v-if="xiaoxi==true"></div>
    </div>
    <div ref="all" class="wrapper">
      <van-tabs :active="active" color="rgb(114,209,65)" title-active-color="rgb(114,209,65)" sticky :offset-top="60"
        swipeable animated :duration="0.5" @change="changeIng">
        <van-tab :title="v.name" v-for="(v,k) in cate1" :key="k">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="10">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <div class="swipe">
                <swipe :images="images"></swipe>
              </div>
              <div class="navs">
                <navs :datas="datas"></navs>
              </div>
              <div class="slide-box" v-if="cate1[active].name=='推荐' && list.length > 0">
                <discount :recommendList="list" :title="title" @shopcart="shopcart"></discount>
                <p class="zhe_p" @click="chakan(cate1[active].name)">查看更多》</p>
              </div>
              <div class="slide-box" v-if="cate1[active].name!=='推荐' && dataList.length > 0">
                <discount :recommendList="dataList" :title="title1" @shopcart="shopcart"></discount>
                <p class="zhe_p" @click="chakan(cate1[active].name)">查看更多》</p>
              </div>
              <recommendx :recommend="recommendList" :tits="tits" @shopcart="shopcart"></recommendx>
              <div class="loading" v-if="!more">
                <van-loading type="spinner" size="20px" />
                <span style="margin-left: 0.3rem;">加载中...</span>
              </div>
              <div class="loading" v-if="more">
                <span>没有更多了</span>
              </div>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <van-tabbar v-model="num" active-color="rgb(114,209,65)">
      <van-tabbar-item to @click="firstTO">
        <span>首页</span>
        <img slot="icon" slot-scope="props" src="../../static/img/shouye2.png" />
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
        <img slot="icon" slot-scope="props" src="../../static/img/wode.png" />
      </van-tabbar-item>
    </van-tabbar>
    <div id="container" style="width: 0;"></div>
  </div>
</template>

<script>
  import Swipe from "@/components/component/swipe";
  import Navs from "@/components/component/navs";
  import Discount from "@/components/component/discount";
  import Recommendx from "@/components/component/recommendx";
  import {
    Tab,
    Tabs,
    Toast,
    PullRefresh,
    Loading,
    Popup
  } from "vant";
  import getCurrentCityName from "@/common/js/location";
  import Request from "@/common/js/request";
  import BScroll from "better-scroll";

  export default {
    data() {
      return {
        donghua: false,
        active: 0,
        num: 0,
        title: "折扣专区",
        title1: "优质商品推荐",
        tits: "销量推荐",
        isLoading: false,
        city: "",
        images: [],
        datas: [],
        cate1: [],
        dataList: [],
        page: 1,
        totalPage: 1,
        loading: false,
        recommendList: [],
        list: [],
        id: "",
        more: false,
        xiaoxi: false,
        gou: 0,
        finished: false
      };
    },
    created() {
      if (JSON.parse(localStorage.getItem("user"))) {
        this.cid = JSON.parse(localStorage.getItem("user")).cid;
        this.infoList(this.cid);
      }
      this.diao();
    },
    components: {
      Tab,
      Tabs,
      Swipe,
      Navs,
      Discount,
      Recommendx
    },
    mounted() {
      if (JSON.parse(localStorage.getItem("point") !== null)) {
        this.city = JSON.parse(localStorage.getItem("point")).city;
      } else {
        this.init();
      }
      this.gounum();
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
            let obj = {};
            obj.num = 0;
            obj.id = "";
            localStorage.setItem("first", JSON.stringify(obj));
            // sessionStorage.clear();
            plus.runtime.quit();
          }
        }
      };
    },
    methods: {
      firstTO() {
        this.id = "";
        this.active = 0;
        this.initLoad(this.id);
      },
      gounum() {
        if (JSON.parse(localStorage.getItem("gouserInfo"))) {
          this.gou = JSON.parse(localStorage.getItem("gouNUm"));
        }
        let datas = {
          cmd: "cartCount",
          cid: this.cid
        };
        Request.postRequest(datas).then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.gou = res.data.totalCount;
            localStorage.setItem("gouNUm", JSON.stringify(this.gou));
          }
        }).catch(res => {});
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.addRecommend();
          Toast("刷新完成");
          this.refreshLoad(this.id);
        }, 500);
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          if (this.page < this.totalPage) {
            this.page++;
            this.addRecommend();
            this.loading = false;
          } else {
            this.loading = false;
          }
        }, 2000);
      },
      diao() {
        let self = this;
        self.donghua = true;
        //调用一级分类导航
        if (JSON.parse(sessionStorage.getItem("cateTAB"))) {
          self.cate1 = JSON.parse(sessionStorage.getItem("cateTAB"));
          self.active = 0
          self.id = self.cate1[0].id
          self.initLoad(self.id);
        } else {
          let datas = {
            cmd: "goodsCategoryInit",
            uid: self.cid
          };
          Request.postRequest(datas).then(res => {
            if (res.data.result == 0) {
              self.cate1 = [{
                id: "",
                name: "推荐"
              }];
              for (let i = 0; i < res.data.dataList.length; i++) {
                self.cate1.push(res.data.dataList[i]);
              }
              sessionStorage.setItem("cateTAB", JSON.stringify(self.cate1));
              self.initLoad(self.id)
            }
          }).catch(res => {});
        }
      },
      inits() {
        Toast("正在定位中，请稍等。。。");
        this.init();
      },
      init() {
        console.log("定位");
        //我就是来定一下位
        let self = this;
        var map = new AMap.Map("#container", {
          resizeEnable: true
        });
        AMap.plugin("AMap.Geolocation", function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 5000, //超过10秒后停止定位，默认：5s
            buttonPosition: "RB", //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition(function(status, result) {
            if (status == "complete") {
              onComplete(result);
            } else {
              onError(result);
            }
          });
        });
        //解析定位结果
        function onComplete(data) {
          console.log(data);
          Toast("定位成功");
          self.city = data.addressComponent.city;
          console.log(self.city);
          let result = {};
          result.city = self.city;
          result.lng = data.position.lng;
          result.lat = data.position.lat;
          localStorage.setItem("point", JSON.stringify(result));
        }
        //解析定位错误信息
        function onError(data) {
          Toast("定位失败，请手动定位");
          console.log(data);
        }
      },
      refreshLoad(id) {
        //处理初始化页面数据缓存开始
        let self = this
        let datas = {
          cmd: "recommendGoods",
          id: id,
          pageNow: this.page
        }
        let cateTAB = JSON.parse(sessionStorage.getItem("cateTAB"))
        for (let i = 0; i < cateTAB.length; i++) {
          if (id == cateTAB[i].id) {
            if (cateTAB[i].list) {
              Request.postRequest(datas).then(res => {
                if (res.data.result == 0) {
                  self.datas = res.data.child
                  self.images = res.data.rotationChart
                  self.totalPage = res.data.totalPage
                  self.dataList = res.data.discount
                  self.recommendList = res.data.order
                  cateTAB[i].list.child = res.data.child
                  cateTAB[i].list.rotationChart = res.data.rotationChart
                  cateTAB[i].list.totalPage = res.data.totalPage
                  cateTAB[i].list.discount = res.data.discount
                  cateTAB[i].list.order = res.data.order
                  sessionStorage.setItem("cateTAB", JSON.stringify(cateTAB))
                  self.loading = false
                  self.more = true
                }
              }).catch(res => {})
            }
          }
        }
        //处理初始化页面数据缓存结束
      },
      initLoad(id) {
        //处理初始化页面数据缓存开始
        let self = this;
        let datas = {
          cmd: "recommendGoods",
          id: id,
          pageNow: this.page
        };
        let cateTAB = JSON.parse(sessionStorage.getItem("cateTAB"))
        for (let i = 0; i < cateTAB.length; i++) {
          if (id == cateTAB[i].id) {
            if (cateTAB[i].list) {
              self.datas = cateTAB[i].list.child
              self.images = cateTAB[i].list.rotationChart
              self.totalPage = cateTAB[i].list.totalPage
              self.recommendList = cateTAB[i].list.order
              self.dataList = cateTAB[i].list.discount
              self.donghua = false
            } else {
              cateTAB[i].list = {}
              Request.postRequest(datas).then(res => {
                console.log(res)
                if (res.data.result == 0) {
                  self.datas = res.data.child
                  self.images = res.data.rotationChart
                  self.totalPage = res.data.totalPage
                  self.dataList = res.data.discount
                  self.recommendList = res.data.order
                  cateTAB[i].list.child = res.data.child
                  cateTAB[i].list.rotationChart = res.data.rotationChart
                  cateTAB[i].list.totalPage = res.data.totalPage
                  cateTAB[i].list.discount = res.data.discount
                  cateTAB[i].list.order = res.data.order
                  sessionStorage.setItem("cateTAB", JSON.stringify(cateTAB))
                  self.donghua = false
                }
              }).catch(res => {})
            }
          }
        }
        //处理初始化页面数据缓存结束

        //打折商品调用
        let discount = {
          cmd: "discountGoods",
          pageNow: 1
        };
        Request.postRequest(discount).then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            self.list = res.data.discount;
            localStorage.setItem("discount", JSON.stringify(self.list));
            this.loading = false;
            this.more = true;
          }
        }).catch(res => {})
      },
      addRecommend() {
        let self = this;
        if (self.id == undefined) {
          self.id = "";
        }
        let datas = {
          cmd: "recommendGoods",
          id: self.id,
          pageNow: self.page
        };
        Request.postRequest(datas).then(res => {
          if (res.data.result == 0) {
            if (self.page <= res.data.totalPage) {
              self.loading = true;
              for (let i = 0; i < res.data.order.length; i++) {
                self.recommendList.push(res.data.order[i]);
              }
              self.page++;
              // 加载状态结束
              self.loading = false;
            } else {
              self.loading = false;
              self.more = true;
            }
          }
        }).catch(res => {});
      },
      clear() {
        this.page = 1;
        this.loading = false;
        this.more = false;
        this.list = [];
        this.datas = [];
        this.images = [];
        this.dataList = [];
        this.recommendList = [];
      },
      changeTab(k) {
        this.clear();
        this.id = this.cate1[k].id;
        this.initLoad(this.id);
        this.active = k;
        let obj = {};
        obj.num = this.active;
        obj.id = this.id;
        localStorage.setItem("first", JSON.stringify(obj));
      },
      changeIng(k) {
        this.clear();
        this.id = this.cate1[k].id;
        this.initLoad(this.id);
        this.active = k;
        let obj = {};
        obj.num = this.active;
        obj.id = this.id;
        localStorage.setItem("first", JSON.stringify(obj));
      },
      goSearch() {
        this.$router.push("/search");
      },
      goMessage() {
        this.$router.push("/message");
        localStorage.setItem("Messageurl", JSON.stringify("first"));
      },
      infoList(id) {
        let datas = {
          cmd: "infoList",
          cid: id,
          pageNow: 1
        };
        Request.postRequest(datas).then(res => {
          if (res.data.result == 0) {
            console.log(res.data.dataList);
            for (var i in res.data.dataList) {
              if (res.data.dataList[i].read == 0) {
                this.xiaoxi = true;
              } else {
                this.xiaoxi = false;
              }
            }
          }
        }).catch(res => {});
      },
      chakan(v) {
        console.log(v);
        this.$router.push({
          name: "discountList"
        });
        let params = {};
        params.v = v;
        params.id = this.id;
        localStorage.setItem("params", JSON.stringify(params));
      },
      //购物车图标
      shopcart(v) {
        if (this.cid == null) {
          this.$router.replace("/login");
        } else {
          this.donghua = true;
          let datas = {
            cmd: "addToCar",
            gid: v.id,
            cid: this.cid,
            specifications: v.skuId,
            number: 1
          };
          Request.postRequest(datas).then(res => {
            console.log(res.data);
            if (res.data.result == 0) {
              Toast("添加购物车成功");
              this.gounum();
              this.donghua = false;
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            }
          }).catch(res => {});
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/variable';

  [v-cloak] {
    display: none !important;
  }

  input::-webkit-input-placeholder {
    color: #fff;
  }

  input:-moz-placeholder {
    color: #fff;
  }

  input::-moz-placeholder {
    color: #fff;
  }

  input::-ms-input-placeholder {
    color: #fff;
  }

  .zhe_p {
    width: 100%;
    line-height: 1rem;
    text-align: center;
  }

  .loading {
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
  }

  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0.4rem 0.1rem;
    box-sizing: border-box;
    background: rgb(114, 209, 65);
    z-index: 9999;

    .dian {
      position: fixed;
      top: 24px;
      right: 17px;
      border-radius: 50%;
      height: 10px;
      width: 10px;
      background: red;
    }

    .city {
      width: auto;
      height: 50px;
      display: flex;
      align-items: center;

      img {
        width: 0.4rem;
        height: 0.5rem;
      }

      span {
        font-size: 14px;
        color: #fff;
        margin-left: 0.3rem;
      }
    }

    .search {
      width: 65%;
      height: 36px;
      border-radius: 50px;
      background: rgb(169, 228, 138);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 0.5rem;
        height: 0.5rem;
      }

      input {
        width: 60%;
        font-size: 14px;
        color: #fff;
        background: none;
        border: none;
        margin-left: 0.3rem;
      }
    }

    img {
      width: 0.4rem;
      height: 0.5rem;
    }
  }

  .contain {
    width: 100%;
    height: 100%;
    padding-top: 60px;
  }

  .wrapper {
    width: 100%;
    height: auto;

    .swipe {
      width: 100%;
      height: 180px;
    }

    .navs {
      width: 100%;
      display: flex;
    }

    .slide-box {
      width: 100%;
      background: rgb(250, 250, 250);

      h3 {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #333;
      }

      .slide-list {
        width: 100%;
        display: flex;
        min-height: 5.5rem;
      }
    }
  }
</style>
