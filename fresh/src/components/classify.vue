<template>
  <div class="contain" v-cloak ref="list">
    <van-popup v-model="donghua" :close-on-click-overlay="false">
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
        <img slot="icon" slot-scope="props" src="../../static/img/fenlei2.png" />
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
    <div class="head">分类</div>
    <div class="cascad-menu" ref="cascadMenu">
      <Scroll class="left-menu" :data="dataList" ref="leftMenu">
        <div class="left-menu-container">
          <ul>
            <li
              class="left-item"
              ref="leftItem"
              @click="selectLeft(index, $event)"
              v-for="(menu, index) in dataList"
              :class="{'current': actindex === index}"
              :key="index"
            >{{menu.name}}</li>
          </ul>
        </div>
      </Scroll>
      <Scroll
        class="right-menu"
        :data="dataList"
        ref="rightMenu"
        @scroll="scrollHeight"
        :listenScroll="true"
        :probeType="3"
      >
        <div class="right-menu-container">
          <ul>
            <li class="right-item" ref="rightItem" v-for="(menu, i) in dataList" :key="i">
              <div class="title">{{menu.name}}</div>
              <ul>
                <li v-for="(item, j) in menu.child" :key="j" @click="goGoods(item.id)">
                  <img v-lazy="item.icon" alt />
                  <span>{{item.name}}</span>
                </li>
              </ul>
              <div style="height:20px"></div>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Loading, Popup } from "vant";
import Request from "@/common/js/request";
import BScroll from "better-scroll";
import Scroll from "@/components/component/scroll1";
export default {
  data() {
    return {
      donghua: false,
      num: 1,
      dataList: [],
      gou: 0,
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0,
      actindex: 0,
      rightHeight: 0,
      defaultImg: 'this.src="' + require("../../static/img/logo.png") + '"'
    };
  },
  components: {
    Tab,
    Tabs,
    Scroll
  },
  created() {
    this.classify();
    if (JSON.parse(localStorage.getItem("first"))) {
      localStorage.removeItem("first");
    }
    if (JSON.parse(localStorage.getItem("user"))) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
    }
    if (JSON.parse(localStorage.getItem("gouserInfo"))) {
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
  methods: {
    goGoods(id) {
      this.$router.push({
        name: "ClassifySearch",
        params: {
          id: id
        }
      });
    },
    classify() {
      this.donghua = true;
      if (JSON.parse(localStorage.getItem("classify"))) {
        this.dataList = JSON.parse(localStorage.getItem("classify"));
      }
      let classdata = {
        cmd: "goodsCategory"
      };
      Request.postRequest(classdata)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.dataList = res.data.dataList;
            localStorage.setItem("classify", JSON.stringify(this.dataList));
            this.actindex = 0;
            this.$nextTick(() => {
              this._calculateHeight();
            });
            this.donghua = false;
          }
        })
        .catch(res => {});
    },
    selectLeft(index, event) {
      this.actindex = index;
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let el = rightItem[index];
      this.$refs.rightMenu.scrollToElement(el, 300);
    },
    scrollHeight(pos) {
      // console.log(-pos.y);
      this.scrollY = Math.abs(Math.round(pos.y));
      let len = this.rightTops.length;
      let ph = document.body.clientHeight;
      if (
        this.actindex !== len - 2 ||
        -pos.y < this.rightTops[len - 1] - ph + 120
      ) {
        this.activIN(); //根据右边的滑动来判断左边的actindex
      }
    },
    activIN() {
      this.actindex = this.rightTops.findIndex((height, index) => {
        return (
          this.scrollY > this.rightTops[index] &&
          this.scrollY <= this.rightTops[index + 1]
        );
      });
    },
    _calculateHeight() {
      let lis = this.$refs.rightItem;
      let height = 0;
      this.rightTops.push(height);
      Array.prototype.slice.call(lis).forEach(li => {
        height += li.clientHeight;
        this.rightTops.push(height);
      });
      console.log(this.rightTops);
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
  height: 100%;
  padding: 60px 0 50px;
  box-sizing: border-box;

  .head {
    width: 100%;
    height: 60px;
    background: #72d141;
    line-height: 60px;
    padding: 10px 0.4rem 0;
    box-sizing: border-box;
    font-size: 15px;
    color: #333;
    font-weight: 700;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
  }

  .category {
    width: 100%;
    border-top: 1px solid #eee;
    box-sizing: border-box;

    .s_product {
      width: 100%;

      .s_nav {
        width: 25%;
        min-height: 800px;
        position: fixed;
        top: 60px;
        left: 0;
        bottom: 40px;
        overflow: hidden;

        ul {
          width: 100%;
          height: 100% !important;
          background: #f5f5f5;

          li {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            color: #333;
          }
        }
      }

      .s_list {
        width: 75%;
        min-height: 500px;
        position: fixed;
        top: 60px;
        left: 25%;
        bottom: 50px;
        overflow: hidden;

        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 0.4rem;
          box-sizing: border-box;

          li {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 2.5%;
            margin-bottom: 0.4rem;
            font-size: 14px;
            color: #333;

            img {
              width: 2rem;
              height: 2rem;
              margin-bottom: 0.3rem;
            }
          }
        }
      }
    }
  }
}

.cascad-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 70px;
  bottom: 50px;

  .left-menu {
    flex: 0 0 90px;
    width: 25%;
    background: #f5f5f5;
    z-index: 999;

    .left-item {
      height: 54px;
      width: 100%;
      text-align: center;
      line-height: 54px;
      color: #333;
      font-size: 14px;

      &.current {
        background: #fff;
        color: rgb(114, 209, 65);
        width: 86px;
        border-left: 4px solid rgb(114, 209, 65);
      }
    }
  }

  .right-menu {
    width: 220px;

    .right-item {
      height: 100%;
      margin-left: -50px;

      .title {
        border-left: 4px solid rgb(114, 209, 65);
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        padding-left: 10px;
        margin: 5px 0;
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 30%;
          display: flex;
          flex-direction: column;
          margin-left: 2.5%;
          align-items: center;
          margin-bottom: 0.4rem;
          font-size: 14px;
          color: #333;

          img {
            width: 2rem;
            height: 2rem;
            margin-bottom: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
