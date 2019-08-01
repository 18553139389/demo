<template>
  <div class="list">
    <ul class="list-box">
      <li v-for="(v,k) in recommend" :key="k" @click="goDetailx(v.gid)">
        <!-- <van-icon name="cross" class="xx" @click="goDetail(v.gid)"/> -->
        <img src="../../../static/img/cross.png" alt class="xx" @click="goDetail(v.gid)" />
        <img v-lazy="v.image" alt />
        <div class="list-text">{{v.name}}</div>
        <div class="list-price">
          <div class="list-left">
            <span
              style="color: red;font-size: 14px;"
              v-if="v.unitPrice!==undefined"
            >￥{{v.unitPrice}}</span>
            <span
              style="color: red;font-size: 14px;"
              v-if="v.unitPrice==undefined"
            >￥{{v.originalPrice}}</span>
          </div>
          <div class="list-right">
            <span style="color: #666;font-size: 14px;">已售：{{parseFloat(v.saleNumber)}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon, Toast } from "vant";

import Request from "@/common/js/request";
export default {
  props: {
    recommend: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    goDetail(id) {
      this.$emit("goDetail", id);
    },
    goDetailx(id) {
      this.$emit("goDetailx", id);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(250, 250, 250);
  height: 100%;

  h3 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #333;
  }

  .list-box {
    margin-top: 0.2rem;
    width: 100%;
    height: 90%;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 49%;
      height: 5rem;
      background: #fff;
      padding: 0.3rem;
      box-sizing: border-box;
      margin-bottom: 0.2rem;
      position: relative;

      .xx {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
      }

      img {
        width: 100%;
        height: 70%;
      }

      .list-text {
        width: 100%;
        font-size: 12px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 14px;
      }

      .list-price {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.4rem;
      }
    }
  }
}
</style>
