<template>
  <div class="contain" v-cloak ref="list">
    <van-popup v-model="donghua">
      <div class="lunhui">
        <van-loading type="spinner" color="#808080" />
        <p style="color:#808080">数据加载中...</p>
      </div>
    </van-popup>
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
        <img slot="icon" slot-scope="props" src="../../static/img/fujinshangjia2.png" />
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
    <div class="head">附近商家</div>
    <div v-if="pointyin==true" class="shopkong" @click="init">请点我重新定位</div>
    <div class="shop" v-else>
      <shop :dataList="dataList" @goDetail="goDetailID" v-if="nearyin==false"></shop>
      <div v-else class="kong">附近暂无商店</div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Loading, Popup } from "vant";
import Shop from "@/components/component/shop";
import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      num: 2,
      active: 2,
      dataList: [],
      page: 1,
      gou: 0,
      nearyin: false,
      pointyin: false
    };
  },
  components: {
    Tab,
    Tabs,
    Shop
  },
  created() {
    if (JSON.parse(localStorage.getItem("first"))) {
      localStorage.removeItem("first");
    }
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
    }
    if (JSON.parse(localStorage.getItem("gouserInfo"))) {
      this.gou = JSON.parse(localStorage.getItem("gouNUm"));
    }
  },
  mounted() {
    this.nearbyShop();
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
  methods: {
    nearbyShop() {
      if (JSON.parse(localStorage.getItem("nearbyShop"))) {
        this.dataList = JSON.parse(localStorage.getItem("nearbyShop"));
      }
      if (JSON.parse(localStorage.getItem("point"))) {
        this.donghua = true;
        this.pointyin = false;
        let nearbyShop = {
          cmd: "nearbyShop",
          cid: this.cid,
          lon: JSON.parse(localStorage.getItem("point")).lng,
          lat: JSON.parse(localStorage.getItem("point")).lat,
          pageNow: this.page
        };
        Request.postRequest(nearbyShop)
          .then(res => {
            // console.log(res.data);
            if (res.data.result == 0) {
              for (let i in res.data.dataList) {
                res.data.dataList[i].star = Number(res.data.dataList[i].stars);
              }
              this.dataList = res.data.dataList;
              console.log(this.dataList);
              localStorage.setItem("nearbyShop", JSON.stringify(this.dataList));
              this.donghua = false;
              if (this.dataList.length > 0) {
                this.nearyin = false;
              } else {
                this.nearyin = true;
              }
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      } else {
        this.pointyin = true;
      }
    },
    init() {
      Toast("正在定位中，请稍等。。。");
      //我就是来定一下位
      let self = this;
      var map = new AMap.Map("container", {
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
        let result = {};
        result.city = data.addressComponent.city;
        result.lng = data.position.lng;
        result.lat = data.position.lat;
        localStorage.setItem("point", JSON.stringify(result));
        self.nearbyShop();
      }
      //解析定位错误信息
      function onError(data) {
        Toast("定位失败，请手动定位");
        console.log(data);
      }
    },
    goDetailID(ID) {
      this.$router.push({
        name: "shop_detail"
      });
      let IDs = {};
      IDs.id = ID;
      localStorage.setItem("dianID", JSON.stringify(IDs));
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.contain {
  width: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;

  .head {
    width: 100%;
    height: 60px;
    padding: 10px 0.4rem 0;
    box-sizing: border-box;
    font-size: 15px;
    color: #333;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    background: #fff;
    border-bottom: 1px solid #dedede;
  }

  .shop {
    width: 100%;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    padding-top: 60px;
  }

  .kong {
    text-align: center;
    font-size: 14px;
    margin-top: 40px;
  }

  .shopkong {
    text-align: center;
    font-size: 14px;
    margin: 150px auto;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #dedede;
    width: 40%;
    line-height: 50px;
  }
}
</style>
