<template>
  <div class="list" v-cloak ref="list">
    <div class="search" ref="search">
      <img src="../../../static/img/fanhui.png" alt @click="back" />
      <div class="search_input">
        <van-search placeholder="请输入搜索关键词" v-model="value1" />
      </div>
      <span @click="goSearch">搜索</span>
    </div>
    <shop-header
      ref="shop"
      @goCoupon="goCoupon"
      :dataList="shopList"
      :store="store"
      @stores="stores"
    ></shop-header>
    <div class="line" ref="line"></div>
    <ul @click="shopper" class="fenlei">
      <li :class="laia==0?'add':''">商品</li>
      <li :class="laia==1?'add':''">评价</li>
      <li :class="laia==2?'add':''">商家</li>
    </ul>
    <div
      class="cascad-menu"
      ref="cascadMenu"
      v-if="laia==0"
      :class="ai==true?'cascad-menua':'cascad-menus'"
    >
      <Scroll class="left-menu" :data="list" ref="leftMenu">
        <div class="left-menu-container">
          <ul>
            <li
              class="left-item"
              ref="leftItem"
              @click="selectLeft(index, $event)"
              v-for="(menu, index) in list"
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
        :data="list"
        ref="rightMenu"
        @scroll="scrollHeight"
        :listenScroll="true"
        :probeType="3"
      >
        <div class="right-menu-container">
          <ul>
            <li class="right-item" ref="rightItem" v-for="(menu, i) in list" :key="i">
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
              <div style="height:20px"></div>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
    <div v-if="laia==1">
      <div class="rate" ref="rates">
        <div class="r_left">
          <span style="font-size: 40px">{{stars}}</span>
          <span>综合评分</span>
        </div>
        <div class="r_right">
          <span>商品评分：</span>
          <van-rate v-model="star" disabled disabled-color="rgb(255,210,30)" />
        </div>
      </div>
      <div ref="comment" class="comment">
        <scroller :on-infinite="infinite" ref="scroller" v-if="!noComments">
          <div class="c_dis">
            <div class="c_item" v-for="(v,k) in userComments" :key="k">
              <img :src="v.headImage" alt />
              <div class="item_right">
                <div class="right_top">
                  <div class="r_tit">
                    <span>{{v.nickName}}</span>
                    <span>{{v.createTime}}</span>
                  </div>
                  <div class="user_star">
                    <van-rate
                      v-model="v.star"
                      disabled
                      disabled-color="rgb(255,210,30)"
                      :size="14"
                    />
                    <span style="margin-left:0.2rem">{{v.stars}}.0</span>
                  </div>
                </div>
                <p>{{v.content}}</p>
                <div class="c_img" v-if="v.images.length > 0">
                  <img :src="imgs" v-for="imgs in v.images" alt :key="imgs" />
                </div>
              </div>
            </div>
          </div>
        </scroller>
        <div class="noComment" v-if="noComments">暂没有该商家的评论</div>
      </div>
    </div>
    <div class="s_shop" v-if="laia==2">
      <div class="shop_box" ref="shopping">
        <div class="self_box" ref="shopper">
          <div v-for="(v,k) in shops" :key="k">
            <div class="self_top">
              <h3 class="shop_zi">商家环境</h3>
              <div class="self_img">
                <img :src="img" v-for="(img,index) in v.imglist" alt :key="index" />
              </div>
              <p>{{v.introduction}}</p>
            </div>
            <ul>
              <li>
                <div class="self_name shop_zi">商家名称</div>
                <div class="self_content">{{v.name}}</div>
              </li>
              <li>
                <div class="self_name shop_zi">商家地址</div>
                <div class="self_content">{{v.address}}</div>
              </li>
              <li>
                <div class="self_name shop_zi">商家电话</div>
                <div class="self_content">{{v.mobile}}</div>
              </li>
            </ul>
            <div class="self_top" style="border-bottom:none">
              <h3 class="shop_zi">营业资质</h3>
              <div class="self_img">
                <img :src="img" v-for="(img,index) in v.businessLicence" alt :key="index" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from "@/components/component/shopHeader";
import ShopProduct from "@/components/component/shopProduct";
import { Toast } from "vant";
import Request from "@/common/js/request";
import BScroll from "better-scroll";
import Scroll from "@/components/component/scroll1";
export default {
  data() {
    return {
      ai: false,
      loading: false,
      more: false,
      finished: false,
      laia: 0,
      page: 1,
      totalPage: 5,
      star: 0,
      stars: 0,
      list: [],
      active: 0,
      value1: "",
      shopList: [],
      store: "1",
      dataLists: [],
      noComments: false,
      comments: [],
      userComments: [],
      shops: [],
      cPage: 1,
      cTotalPage: 3,
      cateId: "",
      user: "",
      shopID: "",
      id: "",
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0,
      actindex: 0
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
    }
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
    } else {
      this.id = JSON.parse(localStorage.getItem("fir-dianID")).id;
    }
  },
  mounted() {
    this.init();
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
  components: {
    ShopHeader,
    Scroll
  },
  methods: {
    goSearch() {
      if (this.value1 == "") {
        Toast("搜索内容不能为空");
        return;
      }
      this.$router.push("/search_product");
      let shopseach = {};
      shopseach.name = this.value1;
      shopseach.id = this.id;
      shopseach.url = "shop_detailfirst";
      localStorage.setItem("shopseach", JSON.stringify(shopseach));
    },
    init() {
      let self = this;
      let datas = {
        cmd: "enterShopInfo",
        sid: this.id,
        cid: this.cid
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data, "商家信息");
          if (res.data.result == 0) {
            this.shopID = res.data.id;
            res.data.star = Number(res.data.stars);
            self.shopList.push(res.data);
            if (res.data.coupon.id == undefined) {
              self.ai = true;
            } else {
              self.ai = false;
            }
            console.log(self.ai);
            self.user = res.data.name;
            if (res.data.collect) {
              self.store = "0";
            } else {
              self.store = "1";
            }
            self.onLoad();
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    stores() {
      if (this.cid == null) {
        this.$router.replace("/login");
      } else {
        if (this.store == "1") {
          this.store = "0";
        } else if (this.store == "0") {
          this.store = "1";
        }
        let datas = {
          cmd: "collectShop",
          sid: this.$route.params.id,
          cid: this.cid,
          type: this.store
        };
        Request.postRequest(datas)
          .then(res => {
            if (res.data.result == 0) {
              if (this.store == 0) {
                Toast("收藏成功");
              } else {
                Toast("取消收藏");
              }
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    goCoupon(id) {
      this.$router.push({
        name: "couponsx",
        params: {
          id: id,
          name: this.user,
          ids: this.$route.params.ids
        }
      });
    },
    goGoods(id) {
      console.log(id);
      this.$router.push({
        name: "Goodsfirshop",
        params: {
          id: id,
          name: this.user,
          ids: this.$route.params.ids,
          shopid: this.id
        }
      });
    },
    onLoad: function() {
      let datas = {
        cmd: "selectShopGoods",
        id: this.cateId,
        sid: this.shopID,
        pageNow: this.page
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data.dataList);
          if (res.data.result == 0) {
            this.list = res.data.dataList;
            console.log(this.list);
            this.actindex = 0;
            this.$nextTick(() => {
              this._calculateHeight();
            });
          }
        })
        .catch(res => {});
    },
    back() {
      this.$router.push("/first");
    },

    infinite() {
      let self = this;
      let datas = {
        cmd: "evaluateShopGoods",
        id: this.shopID,
        pageNow: this.cPage
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            self.star = Number(res.data.average);
            self.stars = res.data.average;
            if (res.data.dataList.length > 0) {
              self.noComments = false;
              if (self.cPage <= res.data.totalPage) {
                for (let i = 0; i < res.data.dataList.length; i++) {
                  for (let i in res.data.dataList) {
                    res.data.dataList[i].star = Number(
                      res.data.dataList[i].stars
                    );
                  }
                  self.userComments.push(res.data.dataList[i]);
                  console.log(self.userComments);
                }
                self.cPage++;
                self.$refs.scroller.finishInfinite(
                  self.cPage <= res.data.totalPage
                );
              } else {
                self.$refs.scroller.finishInfinite(true);
              }
            } else if (res.data.result == "2") {
              this.$router.push("/fenghao");
            } else {
              self.noComments = true;
            }
          }
        })
        .catch(res => {});
    },
    shopper(e) {
      console.log(e.target.innerHTML);
      let item = e.target.innerHTML;
      if (item == "商品") {
        this.laia = 0;
        this.onLoad();
      } else if (item == "评价") {
        this.laia = 1;
        this.infinite();
      } else if (item == "商家") {
        this.laia = 2;
        let self = this;
        self.shops = [];
        let datas = {
          cmd: "businessInfo",
          id: self.$route.params.id
        };
        Request.postRequest(datas)
          .then(res => {
            console.log(res.data);
            if (res.data.result == 0) {
              self.shops.push(res.data);
              for (var i in self.shops[0].images) {
                var arr = self.shops[0].images[i].split("|");
                let arrlist = {};
                arrlist = arr[0];
                console.log(arrlist);
                var imglist = [];
                imglist.push(arrlist);
                self.shops[0].imglist = imglist;
              }
              console.log(self.shops);
              setTimeout(() => {
                if (!self.shopping) {
                  self.shopping = new BScroll(self.$refs.shopping, {
                    startY: 0,
                    click: true,
                    scrollY: true,
                    scrollX: false,
                    eventPassthrough: "horizontal"
                  });
                }
              }, 30);
            }
          })
          .catch(res => {});
      }
    },
    changeShop(ind, id) {
      this.itemIndex = ind;
      this.cateId = id;
      this.clear();
      this.onLoad();
    },
    selectLeft(index, event) {
      this.actindex = index;
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let el = rightItem[index];
      this.$refs.rightMenu.scrollToElement(el, 300);
    },
    scrollHeight(pos) {
      // console.log(pos);
      this.scrollY = Math.abs(Math.round(pos.y));
      let len = this.rightTops.length;
      let ph = document.body.clientHeight;
      if (
        this.actindex !== len - 2 ||
        -pos.y < this.rightTops[len - 1] - ph + 335
      ) {
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
@import '../../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.loading {
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.noComment {
  width: 100%;
  height: 100%;
  position: absolute;
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

  .search {
    width: 100%;
    height: 80px;
    padding: 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    img {
      width: 0.3rem;
      height: 0.5rem;
    }

    .search_input {
      width: 80%;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  .line {
    width: 100%;
    height: 0.3rem;
    background: rgb(247, 247, 247);
  }

  .s_product {
    width: 100%;
    position: relative;

    .s_nav {
      width: 25%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      background: #f5f5f5;

      ul {
        width: 100%;

        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          color: #333;
        }
      }
    }

    .s_list {
      width: 75%;
      position: absolute;
      top: 0;
      left: 25%;
      bottom: 0;
      overflow: hidden;
    }
  }

  .fenlei {
    height: 30px;
    display: flex;
    line-height: 30px;
    justify-content: space-around;
    font-size: 18px;

    .add {
      border-bottom: 2px solid green;
      color: green;
    }
  }

  .rate {
    width: 100%;
    height: 90px;
    margin-top: 5px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .r_left {
      width: 30%;
      height: 70%;
      z-index: 99;
      padding: 0.4rem;
      padding-right: 0;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      color: #333;
      border-right: 2px solid #eee;
    }

    .r_right {
      width: 70%;
      height: 70%;
      padding: 0.4rem;
      padding-left: 0;
      background: #f5f5f5;
      z-index: 99;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #333;
    }
  }

  .comment {
    width: 100%;
    position: relative;
    min-height: 320px;

    .c_dis {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 0.4rem;
      box-sizing: border-box;

      .c_item {
        width: 100%;
        padding: 0.4rem 0;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;

        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }

        .item_right {
          width: 80%;
          padding-left: 0.3rem;
          display: flex;
          flex-direction: column;

          .right_top {
            width: 100%;
            height: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 14px;
            color: #333;

            .r_tit {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .user_star {
              width: 100%;
              display: flex;
              align-items: center;
            }
          }

          p {
            font-size: 12px;
            color: #333;
            padding-top: 0.6rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .c_img {
            width: 100%;
            margin-top: 0.3rem;
            display: flex;

            img {
              width: 1.5rem;
              height: 1.5rem;
              margin-right: 0.3rem;
            }
          }
        }
      }
    }
  }

  .s_shop {
    width: 100%;
    min-height: 500px;
    position: relative;

    .shop_box {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      overflow: hidden;

      .self_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        color: #333;

        .self_top {
          width: 100%;
          padding: 0.3rem 0.4rem;
          box-sizing: border-box;
          border-bottom: 12px solid #eee;

          h3 {
            width: 100%;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #333;
          }

          .self_img {
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            img {
              width: 2.4rem;
              height: 2.4rem;
              margin-right: 0.4rem;
              margin-top: 0.4rem;
            }
          }

          p {
            width: 100%;
            font-size: 12px;
            margin-top: 0.5rem;
            color: #333;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 20px;
          }
        }

        ul {
          width: 100%;
          display: flex;
          flex-direction: column;

          li {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #eee;
            padding: 0.3rem 0.4rem;
            box-sizing: border-box;

            .self_name {
              width: 40%;
            }

            .self_content {
              width: 60%;
              color: #999;
              text-align: right;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}

.shop_zi {
  font-weight: 700;
}

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
