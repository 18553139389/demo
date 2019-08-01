<template>
  <div class="list" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="shop">
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
              <recommendfen :recommend="showList" @goDetail="goDetail"></recommendfen>
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
              <recommendfen :recommend="showList"></recommendfen>
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
              <recommendfen :recommend="showList"></recommendfen>
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
              <recommendfen :recommend="showList"></recommendfen>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="no" v-if="show">暂没有搜索的商品</div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Recommendfen from "@/components/component/recommendfen";
import { Toast } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "分类名称",
      active: 0,
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      sorts: 0,
      page: 1,
      show: false,
      recommend: [],
      id: this.$route.params.id,
      ink: ""
    };
  },
  components: {
    Recommendfen,
    MainHeader
  },
  created() {
    console.log(this.$route.params);
  },
  mounted() {
    this.onLoad();
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/");
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
    goDetail(id) {
      this.$router.push({
        name: "goods_detailsx",
        params: {
          id: id,
          ink:this.$route.params.ink
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("first-shopID", JSON.stringify(ID));
    },
    back() {
      this.$router.push('/');
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
      let Category = {
        cmd: "selectGoodsByCategory",
        orderType: this.sorts,
        id: this.id,
        pageNow: this.page
      };
      Request.postRequest(Category)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.text = res.data.categoryName;
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
        .catch(res => {
          Toast("获取失败");
        });
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

  .shop {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
  }
}
</style>
