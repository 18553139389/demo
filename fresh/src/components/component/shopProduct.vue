<template>
  <div class="cascad-menu" ref="cascadMenu" :class="AI==true?'cascad-menua':'cascad-menus'">
    <Scroll class="left-menu" :data="dataLists" ref="leftMenu">
      <div class="left-menu-container">
        <ul>
          <li
            class="left-item"
            ref="leftItem"
            @click="selectLeft(index, $event)"
            v-for="(menu, index) in dataLists"
            :class="{'current': actindex === index}"
            :key="index"
          >
            <p class="text">{{menu.categoryName}}</p>
          </li>
        </ul>
      </div>
    </Scroll>
    <Scroll
      class="right-menu"
      :data="dataLists"
      ref="rightMenu"
      @scroll="scrollHeight"
      :listenScroll="true"
      :probeType="3"
    >
      <div class="right-menu-container">
        <ul>
          <li class="right-item" ref="rightItem" v-for="(menu, i) in dataLists" :key="i">
            <div class="title">{{menu.categoryName}}</div>
            <ul>
              <li v-for="(item, j) in menu.productList" :key="j" @click="goGoods(item.id)">
                <div class="data-wrapper">
                  <img v-lazy="item.image" alt />
                  <div class="s_right">
                    <div class="s_top">
                      <span class="shop_name">{{item.name}}</span>
                      <span style="color:#999" class="shop_num">已售：{{item.soldNumber}}份</span>
                    </div>
                    <p>{{item.describe}}</p>
                    <div class="s_price">
                      <span>￥{{item.price}}</span>
                      <span
                        style="text-decoration: line-through;color: #999;margin-left: 0.2rem;"
                      >￥{{item.originalPrice}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from "vant";
import Scroll from "./scroll1";
export default {
  props: {
    dataLists: {
      type: Array,
      default: []
    },
    AI: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0,
      actindex: 0
    };
  },
  created() {
    this.$nextTick(() => {
      this._calculateHeight();
    });
  },
  components: {
    Scroll
  },
  methods: {
    goGoods(id) {
      this.$emit("goGoods", id);
    },
    selectLeft(index, event) {
      console.log(index);
      this.actindex = index;
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let el = rightItem[index];
      console.log(rightItem, el);
      this.$refs.rightMenu.scrollToElement(el, 300);
    },
    scrollHeight(pos) {
      // console.log(pos);
      this.scrollY = Math.abs(Math.round(pos.y));
      if (this.actindex !== this.rightTops.length - 2) {
        this.activIN(); //根据右边的滑动来判断左边的actindex
      }
    },
    activIN() {
      this.actindex = this.rightTops.findIndex((height, index) => {
        return (
          this.scrollY >= this.rightTops[index] &&
          this.scrollY < this.rightTops[index + 1]
        );
      });
    },
    _calculateHeight() {
      let lis = this.$refs.rightItem;
      // console.log(lis);
      let height = 0;
      this.rightTops.push(height);
      Array.prototype.slice.call(lis).forEach(li => {
        height += li.clientHeight;
        this.rightTops.push(height);
      });
      console.log(this.rightTops);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.cascad-menua {
  top: 255px;
}

.cascad-menus {
  top: 335px;
}

.cascad-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  position: absolute;
  bottom: 0;

  .left-menu {
    flex: 0 0 100px;
    width: 100px;
    background: #f5f5f5;
    z-index: 999;

    .left-item {
      height: 54px;
      width: 100%;
      text-align: center;

      &.current {
        background: #fff;
        border-left: 4px solid rgb(114, 209, 65);
      }

      .text {
        width: 100%;
        line-height: 54px;
      }
    }
  }

  .right-menu {
    width: 220px;

    .right-item {
      height: 100%;
      margin-left: -40px;

      .title {
        border-bottom: 1px solid #ccc;
        height: 30px;
        line-height: 35px;
        padding-left: 10px;
      }

      .data-wrapper {
        display: flex;
        align-items: center;
        padding: 0.3rem;
        border-bottom: 1px solid #eee;

        img {
          width: 2rem;
          height: 2rem;
        }

        .s_right {
          width: 160px;
          height: 1.8rem;
          padding-left: 0.2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .s_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #333;

            .shop_name {
              width: 50%;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 20px;
              line-height: 20px;
            }
          }

          p {
            width: 100%;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 12px;
            color: #999;
          }

          .s_price {
            width: 100%;
            display: flex;
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
