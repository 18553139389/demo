<template>
  <div>
    <div class="s_head" v-for="(v,k) in dataList" :key="k">
      <div class="s_box">
        <img v-lazy="v.image" alt>
        <div class="s_right">
          <div class="s_top" @click="stores">
            <h3>{{v.name}}</h3>
            <div class="store" v-if="store == '1'">
              <span>收藏</span>
            </div>
            <div class="cancel" v-if="store == '0'">
              <span>已收藏</span>
            </div>
          </div>
          <div class="shop-star">
            <van-rate v-model="v.star" disabled disabled-color="rgb(255,164,20)" :size="18"/>
            <span>{{v.stars}}</span>
            <span style="margin-left: 0.3rem">月销{{v.monthlySale}}</span>
          </div>
          <div class="s_address">
            <img src="../../../static/img/dianpu-dingwei.png" alt>
            <p>{{v.address}}</p>
          </div>
        </div>
      </div>
      <div v-if="v.coupon.id!==undefined ">
        <div class="coupon" @click="goCoupon(v.id)">
          <div class="coupon_box">
            <div class="coupon-xobx">
              <div class="c_money">
                <span style="font-size: 30px;">{{v.coupon.amount}}</span>元
              </div>
              <div class="c_dis">
                <span style="margin-bottom: 0.2rem">单笔满{{parseFloat(v.coupon.miniPurchase)}}使用</span>
                <span style="font-size: 18px;">现金券</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";
import { Toast } from "vant";
export default {
  props: {
    dataList: {
      type: Array,
      default: []
    },
    store: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {};
  },
  methods: {
    stores() {
      this.$emit("stores");
    },
    goCoupon(id) {
      this.$emit("goCoupon", id);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.s_head {
  width: 100%;
  padding: 0.4rem;
  box-sizing: border-box;
  
  .s_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 2.4rem;
      height: 2.4rem;
    }

    .s_right {
      flex: 1;
      height: 2.6rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .s_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 0.1rem;

        h3 {
          font-size: 15px;
          color: #333;
          width: 75%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .store {
          width: 25%;
          height: 0.6rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: rgb(114, 209, 64);
          border-radius: 4px;

          span {
            font-size: 14px;
            color: #fff;
          }
        }

        .cancel {
          width: 25%;
          height: 0.6rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: #f5f5f5;
          border-radius: 4px;

          span {
            font-size: 14px;
            color: #333;
          }
        }
      }

      .shop-star {
        width: 100%;
        display: flex;
        alijn-items: center;
        color: #333;

        span {
          display: inline-block;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
        }
      }

      .s_address {
        width: 100%;
        display: flex;
        alijn-items: center;
        color: #333;
        margin-left: 0.1rem;

        img {
          width: 12px;
          height: 16px;
        }

        p {
          font-size: 12px;
          color: #999;
          line-height: 16px;
          margin-left: 0.2rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .coupon {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    color: #fff;

    .coupon_box {
      width: 80%;
      background: url('../../../static/img/lingjuan.png') no-repeat;
      background-size: 100% 100%;
      padding: 0.2rem;
      height: 1.2rem;
      position: relative;

      .coupon-xobx {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        width: 70%;

        .c_money {
          height: 1.5rem;
          width: 50%;
          line-height: 1.5rem;
          margin-left: 0.2rem;
          padding-left: 0.5rem;
        }

        .c_dis {
          height: 1.5rem;
          display: flex;
          width: 50%;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}
</style>
