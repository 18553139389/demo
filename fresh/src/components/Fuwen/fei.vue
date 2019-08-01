<template>
  <div class="wrapper" v-cloak>
    <div class="list" v-if="FUWEN=='fei'">
      <main-header text="注册协议" @back="back"></main-header>
      <iframe src="http://39.108.249.42/display/agreement?id=1" height="100%" width="100%" frameborder="0"></iframe>
    </div>
    <div class="list" v-if="FUWEN=='guize'">
      <main-header text="运费协议" @back="back"></main-header>
      <iframe src="http://39.108.249.42/display/agreement?id=9" height="100%" width="100%" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";

import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {};
  },
  components: {
    MainHeader
  },
  created() {
    this.FUWEN = JSON.parse(localStorage.getItem("FUWEN"));
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        window.history.go(-1);
        localStorage.removeItem("FUWEN");
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
      localStorage.removeItem("FUWEN");
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
[v-cloak] {
  display: none !important;
}

.wrapper {
	width: 100%;
	height: 100%;
}

.list {
  width: 100%;
  height: 100%;
  padding: 50px 0.4rem 30px;
	box-sizing: border-box;
}

iframe {
  width: 100%;
}
</style>
