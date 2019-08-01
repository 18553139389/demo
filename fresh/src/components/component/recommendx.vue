<template>
  <div class="list">
    <h3 v-if="tits">{{tits}}</h3>
    <ul class="list-box">
      <li v-for="(v,k) in recommend" :key="k" @click="goDetail(v.id)">
        <div class="divimg">
          <img v-lazy="v.image" alt />
        </div>
        <div class="list-text">{{v.name}}</div>
        <div class="list-price">
          <div class="list-left">
            <span style="color: red;font-size: 14px;" v-if="v.price!==undefined">￥{{v.price}}</span>
            <span style="color: red;font-size: 14px;" v-if="v.price==undefined">￥{{v.originalPrice}}</span>
          </div>
          <img src="../../../static/img/gouwuche2.png" alt @click="shopcart(v)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Request from "@/common/js/request";
import { Toast } from "vant";
export default {
  props: {
    tits: {
      type: String,
      default: ""
    },
    recommend: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
    }
  },
  methods: {
    goDetail(id) {
      console.log(id);
      this.$router.push({
        name: "goods_detailsx",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("first-shopID", JSON.stringify(ID));
    },
    shopcart(v) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      this.$emit("shopcart", v);
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

  h3 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #333;
  }

  .list-box {
    margin-top: 0.2rem;
    width: 100%;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      align-items: center;
      width: 49%;
      background: #fff;
      padding: 0.3rem;
      box-sizing: border-box;
      margin-bottom: 0.2rem;

      .divimg {
        width: 100%;
        height: 144px;
        overflow: hidden;
        text-align: center;

        img {
          width: 100%;
        }
      }

      .list-text {
        width: 100%;
        font-size: 12px;
        color: #333;
        margin: 0.2rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
      }

      .list-price {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }
}
</style>
