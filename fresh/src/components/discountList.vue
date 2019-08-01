<template>
  <div class="list">
    <van-popup v-model="donghua" :close-on-click-overlay="false">
      <div class="lunhui">
        <van-loading type="spinner" color="#fff" />
        <p style="color:#fff">数据加载中...</p>
      </div>
    </van-popup>
    <main-header :text="text" @back="back"></main-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="2"
      :immediate-check="false"
    >
      <ul class="list-box">
        <li v-for="(v,k) in recommendList" :key="k" @click="detail(v.id)">
          <img v-lazy="v.image" alt />
          <div class="list-content">
            <div class="list-top">
              <div class="list-title">{{v.name}}</div>
              <div class="list-produce">{{v.text}}</div>
            </div>
            <div class="list-price">
              <div class="list-left">
                <span
                  style="color: red;font-size: 16px;"
                  v-if="v.price!==undefined"
                >￥{{v.price}}{{v.unit}}</span>
                <span
                  style="color: red;font-size: 16px;"
                  v-if="v.price==undefined"
                >￥{{v.originalPrice}}{{v.unit}}</span>
              </div>
              <img src="../../static/img/gouwuche2.png" alt @click="shopcart(v)" />
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast , Loading, Popup} from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      text: "",
      recommendList: [],
      page: 1,
      loading: false,
      finished: false
    };
  },
  created() {
    console.log(this.$route.params);
    if (JSON.parse(localStorage.getItem("params")).v == "推荐") {
      this.text = "折扣专区";
      this.discountGoods(this.page);
    } else {
      this.text = "更多优质商品";
      this.recommend(this.page, JSON.parse(localStorage.getItem("params")).id);
    }

    if (JSON.parse(localStorage.getItem("user"))) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
    }
  },
  components: {
    MainHeader
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/first");
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
      this.$router.push("/first");
    },
    detail(id) {
      console.log(id);
      this.$router.push({
        name: "goods_detailzhe",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("zhe-shopID", JSON.stringify(ID));
    },
    shopcart(v) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
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
        Request.postRequest(datas)
          .then(res => {
            console.log(res.data);
            if (res.data.result == 0) {
              Toast("添加购物车成功");
              this.donghua = false;
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    discountGoods(page) {
      let discountGoods = {
        cmd: "discountGoods",
        pageNow: page
      };
      Request.postRequest(discountGoods)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.totalPage = res.data.totalPage;
            this.recommendList = res.data.discount;
          }
        })
        .catch(res => {});
    },
    recommend(page, id) {
      let discountGoods = {
        cmd: "getHotProductList",
        id: id,
        pageNow: page
      };
      Request.postRequest(discountGoods)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.totalPage = res.data.totalPage;
            this.recommendList = res.data.dataList;
          }
        })
        .catch(res => {});
    },
    onLoad() {
      if (this.page >= this.totalPage) {
        this.finished = true;
        this.loading = false;
      } else {
        this.page++;
        let discountGoods = {
          cmd: "discountGoods",
          pageNow: this.page
        };
        Request.postRequest(discountGoods)
          .then(res => {
            if (res.data.result == 0) {
              for (var i in res.data.discount) {
                this.recommendList.push(res.data.discount[i]);
              }
            }
            console.log(this.recommendList);
          })
          .catch(res => {});
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-top: 1.5rem;

  .list-box {
    width: 100%;

    li {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      border-bottom: 1px solid #eee;

      img {
        width: 2.5rem;
        height: 2.5rem;
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

          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
  }

  .list-more {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
