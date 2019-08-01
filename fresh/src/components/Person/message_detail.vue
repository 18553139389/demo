<template>
  <div class="list" v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="message">
      <h3>{{msg.adtime}}</h3>
      <iframe :src="msg.url" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Dialog } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "",
      msg: []
    };
  },
  components: {
    MainHeader
  },
  mounted() {
    this.init();
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
    back() {
      this.$router.go(-1);
    },
    init() {
      let self = this;
      let id = this.$route.params.id;
      let page = this.$route.params.page;
      let cid = JSON.parse(localStorage.getItem("user"));
      console.log(this.$route.params);
      let datas = {
        cmd: "infoList",
        cid: cid.cid,
        pageNow: page - 1
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            for (let i = 0; i < res.data.dataList.length; i++) {
              if (id == res.data.dataList[i].id) {
                self.msg = res.data.dataList[i];
                self.text = res.data.dataList[i].title;
              }
            }
            console.log(self.msg);
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

  .message {
    width: 100%;
    padding-top: 72px;
    height: 100%;

    h3 {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }

    iframe {
      width: 100%;
      height: 80%;
    }
  }
}
</style>
