<template>
  <div class="list" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="detail">
          <ul>
            <li v-for="(v,k) in list" :key="k">
              <img v-lazy="v.url" alt />
              <div class="list-content">
                <div class="list-top">
                  <div class="list-title">{{v.text}}</div>
                  <div class="list-produce">{{v.dis}}</div>
                </div>
                <div class="list-price">
                  <div class="list-left">
                    <span style="color: red;font-size: 16px;">{{v.newPrice}}</span>
                    <span class="no-price">{{v.oldPrice}}</span>
                  </div>
                  <img src="../../static/img/gouwuche2.png" alt />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </van-list>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast } from "vant";

export default {
  data() {
    return {
      text: "打折专区",
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 2,
      page: 1,
      list: [],
      dataList: []
    };
  },
  components: {
    MainHeader,
    Toast
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        window.history.go(-1);
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
    onLoad: function() {
      //注意在此处的滚动加载必须产生滚动条所以多加载几条数据
      if (this.page <= this.totalPage) {
        for (var i = 0; i < this.dataList.length; i++) {
          this.list.push(this.dataList[i]);
        }
        this.page++;
        // 加载状态结束
        this.loading = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    back() {
      this.$router.go(-1);
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

  .detail {
    width: 100%;

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #eee;
      margin-top: 72px;

      li {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        border-bottom: 1px solid #eee;

        img {
          width: 3rem;
          height: 3rem;
        }

        .list-content {
          width: 70%;
          height: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.4rem 0.3rem;
          box-sizing: border-box;
          font-size: 14px;
          color: #333;

          .list-top {
            width: 100%;

            .list-title {
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            .list-produce {
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin-top: 0.2rem;
            }
          }

          .list-price {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .list-left {
              .no-price {
                font-size: 12px;
                color: #999;
                text-decoration: line-through;
                margin-left: 0.2rem;
              }
            }

            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
