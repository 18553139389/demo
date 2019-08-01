<template>
  <div class="list" v-cloak>
    <div class="search">
      <img src="../../static/img/fanhui.png" alt @click="back" />
      <div class="search_input">
        <van-search placeholder="请输入搜索关键词" v-model="value1" />
      </div>
      <span @click.prevent="goSearch">搜索</span>
    </div>
    <div class="shop">
      <van-tabs
        v-model="active"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        @click="sort"
        @change="sort"
        :swipeable="true"
        :sticky="true"
        :offset-top="80"
      >
        <van-tab title="综合排序">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommend :recommend="showList" @goDetail="goDetail"></recommend>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="好评优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommend :recommend="showList" @goDetail="goDetail"></recommend>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="价格优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommend :recommend="showList" @goDetail="goDetail"></recommend>
            </van-pull-refresh>
          </van-list>
        </van-tab>
        <van-tab title="销量优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="!show"
          >
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <recommend :recommend="showList" @goDetail="goDetail"></recommend>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="no" v-if="show">暂没有搜索的商品</div>
  </div>
</template>

<script>
import Recommend from "@/components/component/recommend";
import { Toast } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      active: 0,
      value1: "",
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      sorts: 0,
      page: 1,
      show: false,
      recommend: []
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("shopseach")) !== null) {
      this.value1 = JSON.parse(localStorage.getItem("shopseach")).name;
      this.id = JSON.parse(localStorage.getItem("shopseach")).id;
      this.url = JSON.parse(localStorage.getItem("shopseach")).url;
      this.onLoad();
    }
  },
  components: {
    Recommend
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        localStorage.removeItem("shopseach");
        if (self.url == "shop_detail") {
          self.$router.push("/shop_detail");
        } else if (self.url == "shop_detailcart") {
          self.$router.push("/shop_detailcart");
        } else if (self.url == "shop_detailfen") {
          self.$router.push("/shop_detailfen");
        } else if (self.url == "shop_detailfirst") {
          self.$router.push("/shop_detailfirst");
        } else if (self.url == "shop_details") {
          self.$router.push("/shop_details");
        } else if (self.url == "shop_detailshou") {
          self.$router.push("/shop_detailshou");
        } else if (self.url == "shop_detailshuo") {
          self.$router.push("/shop_detailshuo");
        } else if (self.url == "shop_detailsx") {
          self.$router.push("/shop_detailsx");
        } else if (self.url == "shop_detailzhe") {
          self.$router.push("/shop_detailzhe");
        } else {
          self.$router.push("/search");
        }
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
  computed: {
    showList() {
      return this.list;
    }
  },
  methods: {
    goSearch() {
      if (this.value1 == "") {
        Toast("搜索内容不能为空");
        return;
      }
      let list = {
        val: this.value1
      };
      let searchArr = JSON.parse(localStorage.getItem("search")) || [];
      searchArr.unshift(list);
      localStorage.setItem("search", JSON.stringify(searchArr));
      this.clear();
      this.onLoad();
    },
    goDetail(id) {
      this.$router.push({
        name: "goods_detail",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("fen-shop1ID", JSON.stringify(ID));
    },
    back() {
      localStorage.removeItem("shopseach");
      if (this.url == "shop_detail") {
        this.$router.push("/shop_detail");
      } else if (this.url == "shop_detailcart") {
        this.$router.push("/shop_detailcart");
      } else if (this.url == "shop_detailfen") {
        this.$router.push("/shop_detailfen");
      } else if (this.url == "shop_detailfirst") {
        this.$router.push("/shop_detailfirst");
      } else if (this.url == "shop_details") {
        this.$router.push("/shop_details");
      } else if (this.url == "shop_detailshou") {
        this.$router.push("/shop_detailshou");
      } else if (this.url == "shop_detailshuo") {
        this.$router.push("/shop_detailshuo");
      } else if (this.url == "shop_detailsx") {
        this.$router.push("/shop_detailsx");
      } else if (this.url == "shop_detailzhe") {
        this.$router.push("/shop_detailzhe");
      } else {
        this.$router.push("/search");
      }
    },
    onRefresh: function() {
      var self = this;
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    onLoad: function() {
      let self = this;
      let datas = {
        cmd: "selectGoodsByName",
        name: this.value1,
        sid: this.id,
        pageNow: this.page,
        orderType: this.sorts
      };
      console.log(datas, "999");
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data, "999");
          if (res.data.result == 0) {
            if (res.data.dataList.length > 0) {
              self.show = false;
              if (self.page <= res.data.totalPage) {
                for (var i = 0; i < res.data.dataList.length; i++) {
                  self.list.push(res.data.dataList[i]);
                }
                self.page++;
                // 加载状态结束
                self.loading = false;
              } else {
                self.loading = false;
                self.finished = true;
              }
            } else if (
              res.data.dataList !== undefined ||
              res.data.dataList.length == 0
            ) {
              self.show = true;
            }
          } else if (res.data.result == 1) {
            self.show = true;
          }
        })
        .catch(res => {});
    },
    sort(k) {
      let self = this;
      this.sorts = k;
      this.clear();
      this.onLoad();
    },
    clear() {
      this.list = [];
      this.page = 1;
      this.finished = false;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable';

[v-cloak] {
  display: none !important;
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
  top: 124px;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.van-tabs__wrap {
  position: fixed !important;
}

.list {
  width: 100%;

  .search {
    width: 100%;
    height: 80px;
    padding: $padding-top 0.4rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 300;

    img {
      width: 0.3rem;
      height: 0.5rem;
    }

    .search_input {
      width: 80%;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  .shop {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
  }
}
</style>
