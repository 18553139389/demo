<template>
  <div class="list" v-cloak>
    <keep-alive>
      <div class="search">
        <img src="../../static/img/fanhui.png" alt @click="back" />
        <div class="search_input">
          <van-search placeholder="请输入搜索关键词" v-model="value1" />
        </div>
        <span @click.prevent="goSearch">搜索</span>
      </div>
    </keep-alive>
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
              <shopshou @goDetail="goDetail" :dataList="showList"></shopshou>
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
              <shopshou @goDetail="goDetail" :dataList="showList"></shopshou>
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
              <shop @goDetail="goDetail" :dataList="showList"></shop>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="no" v-if="show">暂没有搜索的商家</div>
  </div>
</template>

<script>
import Shopshou from "@/components/component/shopshou";
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
      page: 1,
      totalPage: 3,
      sorts: 0,
      show: false,
      dataList: []
    };
  },
  computed: {
    showList() {
      return this.list;
    }
  },
  components: {
    Shopshou
  },
  created() {
    if (JSON.parse(localStorage.getItem("shopssearch")) !== null) {
      this.value1 = JSON.parse(localStorage.getItem("shopssearch")).name;
      this.onLoad();
    }
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        localStorage.removeItem("shopssearch");
        self.$router.push("/search");
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
    back() {
      localStorage.removeItem("shopssearch");
      this.$router.push("/search");
    },
    goDetail(id) {
      this.$router.push({
        name: "shopdetails",
        params: {
          name: this.value1,
          id: id
        }
      });
      let IDs = {};
      IDs.id = id;
      localStorage.setItem("s-dianID", JSON.stringify(IDs));
    },
    clear() {
      this.list = [];
      this.page = 1;
      this.finished = false;
    },
    onRefresh: function() {
      var self = this;
      this.list = [];
      this.page = 1;
      this.totalPage = 3;
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
        cmd: "selectShopByName",
        name: this.value1,
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
                for (let s in res.data.dataList) {
                  res.data.dataList[s].star = Number(
                    res.data.dataList[s].stars
                  );
                }
                for (var i = 0; i < res.data.dataList.length; i++) {
                  self.list.push(res.data.dataList[i]);
                }
                self.page++;
                // 加载状态结束
                self.loading = false;
                console.log(self.list);
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
