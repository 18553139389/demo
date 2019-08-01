<template>
  <van-nav-bar :left-text="lefttxt" left-arrow @click-left="onClickRight"></van-nav-bar>
</template>

<script>
import { NavBar } from "vant";

export default {
  props: {
    lefttxt: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClickRight() {
      this.$emit("back");
    }
  }
};
</script>

<style scoped="scoped">
</style>
<style>
.van-nav-bar .van-icon {
  color: #000;
}
.van-nav-bar__text {
  color: #000;
}
</style>
