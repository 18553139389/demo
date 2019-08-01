<template>
  <div class="list" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="showMsg"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="msg-box">
          <ul class="msg">
            <li v-for="(v,k) in msg" :key="k" @click="goDetail(v,v.id)">
              <div class="xiaoxian">
                <img src="../../../static/img/xiaoxi01.png" alt />
                <b class="xiaob" v-if="v.read==0"></b>
              </div>
              <div class="msg-right">
                <div class="msg-top">
                  <h3>{{v.title}}</h3>
                  <span>{{v.adtime}}</span>
                </div>
                <div class="msg-bottom">
                  <p>{{v.content}}</p>
                  <img src="../../../static/img/delete.png" alt @click.stop="del(k,v.id)" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </van-list>
    <div class="systom" v-if="show">暂没有系统消息</div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Dialog } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "消息",
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 2,
      page: 1,
      list: [],
      msg: [],
      show: false
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.Message = JSON.parse(localStorage.getItem("Messageurl"));
  },
  computed: {
    showMsg() {
      return this.msg.length;
    }
  },
  mounted() {
    this.onLoad();
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        localStorage.removeItem("Messageurl");
        self.$router.push("/" + self.Message);
        // self.$router.push("/first");
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
      this.msg = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    onLoad: function() {
      var self = this;
      let cid = JSON.parse(localStorage.getItem("user"));
      let id = cid.cid;
      let datas = {
        cmd: "infoList",
        cid: id,
        pageNow: this.page
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.data.result == 0) {
            console.log(res.data.dataList);
            if (self.page <= res.data.totalPage) {
              if (res.data.dataList.length == 0) {
                self.show = true;
              } else {
                self.show = false;
                for (let i = 0; i < res.data.dataList.length; i++) {
                  self.msg.push(res.data.dataList[i]);
                }
                self.page++;
                // 加载状态结束
                self.loading = false;
              }
            } else {
              self.loading = false;
              self.finished = true;
            }
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    back() {
      // this.$router.push("/");
      localStorage.removeItem("Messageurl");
      this.$router.push("/" + this.Message);
    },
    del(index, id) {
      console.log(id);
      let self = this;
      Dialog.confirm({
        title: "删除",
        message: "确认删除此信息吗"
      })
        .then(() => {
          let datas = {
            cmd: "deleteInfo",
            id: id
          };
          Request.postRequest(datas)
            .then(res => {
              if (res.data.result == 0) {
                Toast("删除成功");
              }
            })
            .catch(res => {
              Toast("删除失败");
            });
          self.msg.splice(index, 1);
          if (self.msg.length == 0) {
            self.show = true;
          }
        })
        .catch(() => {});
    },
    goDetail(v, id) {
      if (v.type == 1) {
        this.$router.push({
          path: "/order_detail",
          query: {
            id: v.orderId
          }
        });
        let mess = {};
        mess.tit = "aaa";
        localStorage.setItem("mess", JSON.stringify(mess));
      } else {
        this.$router.push({
          name: "message_detail",
          params: {
            id: id,
            page: this.page
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
[v-cloak] {
  display: none !important;
}

.systom {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 25;
}

.list {
  width: 100%;
  height: 100%;

  .msg-box {
    width: 100%;

    .msg {
      width: 100%;
      padding: 0 0.4rem;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      margin-top: 72px;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .xiaoxian {
          position: relative;
          width: 15%;
          height: 15%;

          img {
            width: 100%;
            height: 100%;
          }

          .xiaob {
            position: absolute;
            right: 0;
            top: 5px;
            background: red;
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
        }

        .msg-right {
          width: 85%;
          height: 1.3rem;
          padding: 0 0 0 0.3rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .msg-top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;

            h3 {
              font-size: 15px;
            }
          }

          .msg-bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;

            p {
              width: 80%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
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
