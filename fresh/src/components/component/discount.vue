<template>
  <div class="list">
    <h3 v-if="title">{{title}}</h3>
    <ul class="list-box" v-if="title!=='折扣专区'">
      <li v-for="(v,k) in recommendList" :key="k" @click="detail(v.id)" v-if="k<6">
        <img v-lazy="v.image" alt />
        <div class="list-content">
          <div class="list-top">
            <div class="list-title">{{v.name}}</div>
            <div class="list-produce">{{v.text}}</div>
          </div>
          <div class="list-price">
            <div class="list-left">
              <span style="color: red;font-size: 16px;" v-if="v.price!==undefined">￥{{v.price}}</span>
              <s style="color: #dedede;font-size: 14px;">￥{{v.originalPrice}}</s>
            </div>
            <img src="../../../static/img/gouwuche2.png" alt @click="shopcart(v)" />
          </div>
        </div>
      </li>
    </ul>
    <ul class="list-box" v-else>
      <li v-for="(v,k) in recommendList" :key="k" @click="detail(v.id)" v-if="k<3">
        <img v-lazy="v.image" alt />
        <div class="list-content">
          <div class="list-top">
            <div class="list-title">{{v.name}}</div>
            <div class="list-produce">{{v.text}}</div>
          </div>
          <div class="list-price">
            <div class="list-left">
              <span style="color: red;font-size: 16px;" v-if="v.price!==undefined">￥{{v.price}}</span>
              <s style="color: #dedede;font-size: 14px;">￥{{v.originalPrice}}</s>
            </div>
            <img src="../../../static/img/gouwuche2.png" alt @click="shopcart(v)" />
          </div>
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
    title: {
      type: String,
      default: ""
    },
    recommendList: {
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
    detail(id) {
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
  background: #fff;
  margin-top: 0.5rem;

  h3 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #333;
    background: rgb(250, 250, 250);
  }

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
