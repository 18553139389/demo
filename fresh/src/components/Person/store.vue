<template>
  <div class="list" v-cloak>
    <van-popup v-model="donghua" :close-on-click-overlay="false">
      <div class="lunhui">
        <van-loading type="spinner" color="#fff" />
        <p style="color:#fff">数据加载中...</p>
      </div>
    </van-popup>
    <main-header :text="text" @back="back"></main-header>
    <div class="store">
      <van-tabs
        v-model="active"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        @click="sort"
        @change="sort"
        :swipeable="true"
        :sticky="true"
        :offset-top="42"
      >
        <van-tab title="商品收藏">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="show"
            :immediate-check="false"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommends
                :recommend="recommends"
                @goDetail="goDetail"
                @goDetailx="goDetailx"
                v-if="recommends.length>0"
              ></recommends>
              <div v-else class="kong">暂无收藏</div>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="店铺收藏">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="show"
            :immediate-check="false"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <shops
                @goShop="goShop"
                @goShopx="goShopx"
                :dataList="dataList"
                v-if="dataList.length>0"
              ></shops>
              <div v-else class="kong">暂无收藏</div>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Recommends from "@/components/component/recommends";
import Shops from "@/components/component/shops";
import { Toast, Dialog, Loading, Popup } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      donghua: false,
      text: "我的收藏",
      active: 0,
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      sorts: 0,
      page: 1,
      show: false,
      recommends: [],
      dataList: []
    };
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    if (JSON.parse(localStorage.getItem("storeNUM"))) {
      this.active = JSON.parse(localStorage.getItem("storeNUM"));
      if (this.active == 0) {
        this.onLoad();
      } else {
        this.onLoads();
      }
    } else {
      this.onLoad();
    }
  },
  computed: {
    showList() {
      return this.list;
    }
  },
  components: {
    MainHeader,
    Recommends,
    Shops
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/person");
        localStorage.removeItem("storeNUM");
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
      this.$router.push("/person");
      localStorage.removeItem("storeNUM");
    },
    sort(k) {
      this.sorts = k;
      this.clear();
      if (k == 0) {
        this.onLoad();
      } else {
        this.onLoads();
      }
    },
    clear() {
      this.page = 1;
      this.finished = false;
    },
    goDetailx(id) {
      this.$router.push({
        name: "goods_detailshou",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("storeNUM", JSON.stringify("0"));
      localStorage.setItem("shou-shopID", JSON.stringify(ID));
    },
    goShopx(id) {
      this.$router.push({
        name: "shopdetailshou",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("storeNUM", JSON.stringify("1"));
      localStorage.setItem("shuos-dianID", JSON.stringify(ID));
    },
    goDetail(id) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      let datas = {
        cmd: "collectGoods",
        cid: this.cid,
        id: id,
        type: 1
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            Toast("取消收藏商品成功");
            this.onLoad();
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    goShop(id) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      let datas = {
        cmd: "collectShop",
        cid: this.cid,
        sid: id,
        type: 1
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            Toast("取消收藏商店成功");
            this.onLoads();
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    onRefresh: function() {
      var self = this;
      this.page = 1;
      this.finished = true;
      this.onLoad();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    onLoad: function() {
      if (JSON.parse(localStorage.getItem("storegood"))) {
        this.recommends = JSON.parse(localStorage.getItem("storegood"));
      }
      this.donghua = true;
      let datas = {
        cmd: "goodsCollection",
        cid: this.cid,
        pageNow: this.page
      };
      Request.postRequest(datas)
        .then(res => {
          // console.log(res.data.dataList);
          if (res.data.result == 0) {
            this.recommends = res.data.dataList;
            console.log(this.recommends);
            localStorage.setItem("storegood", JSON.stringify(this.recommends));
            this.show = true;
            this.donghua = false;
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    onLoads: function() {
      if (JSON.parse(localStorage.getItem("storeshop"))) {
        this.dataList = JSON.parse(localStorage.getItem("storeshop"));
      }
      this.donghua = true;
      let datas = {
        cmd: "shopCollection",
        cid: this.cid,
        pageNow: this.page
      };
      Request.postRequest(datas)
        .then(res => {
          // console.log(res.data.dataList);
          if (res.data.result == 0) {
            for (let s in res.data.dataList) {
              res.data.dataList[s].star = Number(res.data.dataList[s].stars);
            }
            this.dataList = res.data.dataList;
            console.log(this.dataList);
            localStorage.setItem("storeshop", JSON.stringify(this.dataList));
            this.show = true;
            this.donghua = false;
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
[v-cloak] {
  display: none !important;
}

.list {
  width: 100%;
  height: 100%;

  .store {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    padding-top: 42px;
  }

  .van-tab__pane {
    height: 12rem;
  }

  .van-tabs {
    height: 100%;

    .van-tabs__content {
      height: 80%;

      .van-list {
        height: 100%;

        .van-pull-refresh {
          height: 100%;
        }
      }
    }
  }
}

.kong {
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-top: 70px;
}
</style>
