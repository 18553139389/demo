<template>
  <div class="list" v-cloak>
    <main-header @back="back"></main-header>
    <iframe :src="'http://39.108.249.42'+url"></iframe>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";

import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      url: ""
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.url = this.$route.params.id;
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
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
[v-cloak] {
  display: none !important;
}

.active {
  background: #72D141;
  color: #fff !important;
  border: none !important;
}

.list {
  width: 100%;
  height: 100%;
  padding-top: 50px;
}
</style>
