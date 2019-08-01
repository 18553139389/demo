<template>
  <div class="problem-box">
    <van-popup v-model="donghua" :close-on-click-overlay="false">
      <div class="lunhui">
        <van-loading type="spinner" color="#fff" />
        <p style="color:#fff">数据加载中...</p>
      </div>
    </van-popup>
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <ul>
          <li v-for="(v,k) in dataList" :key="k">
            <div class="wrapper">
              <img v-lazy="v.headImage" alt class="imgtop" />
              <div class="s_right">
                <p>
                  {{v.nickName}}
                  <span @click="del(v.id)">删除</span>
                </p>
                <div class="s_top">
                  <div class="ping">
                    <van-rate v-model="v.stars" :size="12" />
                    <span>{{v.stars}}.0</span>
                  </div>
                  <p>{{v.createTime}}</p>
                </div>
              </div>
            </div>
            <p class="s_content">{{v.content}}</p>
            <div v-if="v.images==[]"></div>
            <div v-else style="margin-bottom:10px">
              <img v-lazy="i" alt v-for="(i,s) in v.images" :key="s" />
            </div>
            <div class="to_shop" @click="shang(v.sid)">
              <router-link to>
                <img v-lazy="v.simg" alt />
                <div>{{v.sname}}</div>
                <img src="../../../static/img/right.png" alt class="shop_right" />
              </router-link>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Rate, Loading, Popup } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      donghua: false,
      text: "评价列表",
      loading: false,
      finished: false,
      totalPage: 2,
      page: 1,
      dataList: []
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    this.evaluteList();
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/person");
        localStorage.removeItem("shangID");
        localStorage.removeItem("shang-shopID");
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
    evaluteList() {
      this.donghua = true;
      let evaluteList = {
        cmd: "evaluteList",
        cid: this.cid,
        pageNow: this.page
      };
      console.log(evaluteList);
      Request.postRequest(evaluteList)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.totalPage = res.data.totalPage;
            this.dataList = res.data.dataList;
            this.donghua = false;
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    back() {
      this.$router.push("/person");
      localStorage.removeItem("shangID");
      localStorage.removeItem("shang-shopID");
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        if (this.page <= this.totalPage) {
          this.page++;
          this.evaluteList(this.active, this.page);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      }, 500);
    },
    del(id) {
      console.log("删除", id);
      let deleteEvalute = {
        cmd: "deleteEvalute",
        id: id
      };
      Request.postRequest(deleteEvalute)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.evaluteList();
          }
        })
        .catch(res => {});
    },
    shang(ID) {
      this.$router.push("/shop_detailshang");
      let IDs = {};
      IDs.id = ID;
      localStorage.setItem("shangID", JSON.stringify(IDs));
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.box {
  padding: 72px 10px 0;
}

.order_list {
  width: 100%;
  position: relative;

  .order_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

ul {
  width: 100%;
  display: flex;
  flex-direction: column;

  li {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;
    margin-bottom: 20px;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      width: 1rem;
      height: 1rem;
    }

    .wrapper {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .s_right {
      padding: 0 5px;
      width: 100%;

      p {
        display: flex;
        justify-content: space-between;
        font-size: 16px;

        span {
          color: green;
        }
      }

      .s_top {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;

        .ping {
          display: flex;

          span {
            padding-left: 5px;
          }
        }
      }
    }

    .s_content {
      line-height: 1rem;
      color: #818080;
    }

    .to_shop {
      padding: 10px 15px;
      position: relative;
      height: 1rem;

      a {
        display: flex;
        justify-content: flex-start;

        div {
          margin-left: 10px;
          line-height: 1rem;
          font-size: 18px;
        }
      }

      .shop_right {
        position: absolute;
        right: 15px;
        top: 20px;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
</style>