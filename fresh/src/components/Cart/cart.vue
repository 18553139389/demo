<template>
  <div class="contain" v-cloak ref="list">
    <van-tabbar v-model="num" active-color="rgb(114,209,65)">
      <van-tabbar-item to="/first">
        <span>首页</span>
        <img slot="icon" slot-scope="props" src="../../../static/img/shouye1.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/classify">
        <span>分类</span>
        <img slot="icon" slot-scope="props" src="../../../static/img/fenlei.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/near_shop">
        <span>附近商家</span>
        <img slot="icon" slot-scope="props" src="../../../static/img/fujinshangjia.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/cart" :info="this.gou" v-if="this.gou>0">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" src="../../../static/img/gouwuche2.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/cart" v-else>
        <span>购物车</span>
        <img slot="icon" slot-scope="props" src="../../../static/img/gouwuche2.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/person">
        <span>我的</span>
        <img slot="icon" slot-scope="props" src="../../../static/img/wode.png" />
      </van-tabbar-item>
    </van-tabbar>
    <div class="head">
      <span>购物车</span>
      <span @click="goEditor(shan)" v-if="yin==true">{{bianji}}</span>
    </div>
    <div class="lists" v-if="wei==false">
      <div class="uls" v-if="NOcart==false">
        <div v-for="(v,k) in dataList" :key="k">
          <div class="shop_all">
            <van-checkbox
              v-model="v.check"
              checked-color="#07c160"
              @click.prevent="goOrder(k)"
            >{{v.title}}</van-checkbox>
          </div>
          <ul>
            <li v-for="(ite,ind) in v.items" :key="ind" @click="gitto(ite.gid)">
              <van-checkbox
                v-model="ite.check"
                checked-color="#07c160"
                @click.prevent="goShop($event)"
              ></van-checkbox>
              <div class="order">
                <img v-lazy="ite.url" alt />
                <div class="order_detail">
                  <h2>{{ite.name}}</h2>
                  <span style="color: #999">{{ite.kg}}</span>
                  <span style="color: red;font-size: 16px;font-weight: 600;">￥{{ite.new}}</span>
                </div>
                <span class="fix fixnum" v-if="shan==false">x {{ite.number}}</span>
                <van-stepper
                  class="fix"
                  v-model="ite.number"
                  async-change
                  @plus="plus(ite)"
                  @minus="minus(ite)"
                  @blur="blur(ite)"
                  v-else
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="kongbai">
        <router-link to="/first">
          <span>去首页逛逛</span>
        </router-link>
      </div>
    </div>
    <div v-else class="kong">
      <router-link to="/login">
        <span>去登录</span>
      </router-link>
    </div>
    <div class="finish" v-if="yin==true">
      <div>
        <van-checkbox v-model="checked" checked-color="#07c160" @click.prevent="allOrder">全选</van-checkbox>
      </div>
      <div class="total" v-if="shan==false">
        合计：
        <span style="color: red;font-weight: 600;">￥{{total}}</span>
      </div>
      <div class="count" @click="goCenter" v-if="shan==false">结算</div>
      <div class="count counts" @click="del" v-else>删除</div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      num: 3,
      active: 2,
      checked: false,
      dataList: [],
      gou: 0,
      NOcart: false,
      yin: false,
      wei: false,
      shan: false,
      bianji: "编辑"
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("first"))) {
      localStorage.removeItem("first");
    }
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      this.cid = JSON.parse(localStorage.getItem("user")).cid;
      this.gocarlist(this.cid);
      this.gounum();
    } else {
      this.wei = true;
    }
  },
  components: {
    Tab,
    Tabs
  },
  computed: {
    total() {
      let count = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        for (let j = 0; j < this.dataList[i].items.length; j++) {
          if (this.dataList[i].items[j].check) {
            count +=
              Number(this.dataList[i].items[j].new) *
              Number(this.dataList[i].items[j].number);
          }
          count = Math.floor(count * 100) / 100;
        }
      }
      return count;
    }
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        first = new Date().getTime();
        mui.toast("再按一次退出应用");
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
    gitto(id) {
      this.$router.push({
        name: "goods_details",
        params: {
          id: id
        }
      });
      let ID = {};
      ID.id = id;
      localStorage.setItem("cart-shopID", JSON.stringify(ID));
    },
    gocarlist(id) {
      if (JSON.parse(localStorage.getItem("gocarlist"))) {
        this.dataList = JSON.parse(localStorage.getItem("gocarlist"));
        if (this.dataList.length > 0) {
          this.NOcart = false;
          this.yin = true;
        } else {
          this.NOcart = true;
          this.yin = false;
        }
      }
      let golist = {
        cmd: "carList",
        cid: id
      };
      console.log(golist);
      Request.postRequest(golist)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.dataList = [];
            for (let i in res.data.dataList) {
              let carlist = {};
              carlist.check = false;
              carlist.title = res.data.dataList[i].sname;
              carlist.id = res.data.dataList[i].sid;
              carlist.items = [];
              for (let j in res.data.dataList[i].cars) {
                let carlistzi = {};
                carlistzi.name = res.data.dataList[i].cars[j].name;
                carlistzi.new = res.data.dataList[i].cars[j].price;
                carlistzi.old = res.data.dataList[i].cars[j].originalPrice;
                carlistzi.skuid = res.data.dataList[i].cars[j].specifications;
                carlistzi.kg = res.data.dataList[i].cars[j].specificationsVal;
                carlistzi.url = res.data.dataList[i].cars[j].image;
                carlistzi.id = res.data.dataList[i].cars[j].id;
                carlistzi.gid = res.data.dataList[i].cars[j].gid;
                carlistzi.number = res.data.dataList[i].cars[j].number;
                carlistzi.check = false;
                carlist.items.push(carlistzi);
              }
              this.dataList.push(carlist);
            }
            if (this.dataList.length > 0) {
              this.NOcart = false;
              this.yin = true;
            } else {
              this.NOcart = true;
              this.yin = false;
            }
            console.log(this.dataList);
            localStorage.setItem("gocarlist", JSON.stringify(this.dataList));
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    gounum() {
      if (JSON.parse(localStorage.getItem("gouserInfo"))) {
        this.gou = JSON.parse(localStorage.getItem("gouNUm"));
      }
      let datas = {
        cmd: "cartCount",
        cid: this.cid
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.gou = res.data.totalCount;
            localStorage.setItem("gouNUm", JSON.stringify(this.gou));
          }
        })
        .catch(res => {});
    },
    allOrder() {
      for (let i = 0; i < this.dataList.length; i++) {
        this.dataList[i].check = this.checked;
        for (let j = 0; j < this.dataList[i].items.length; j++) {
          this.dataList[i].items[j].check = this.checked;
        }
      }
    },
    goOrder(k) {
      if (this.dataList[k].check) {
        //判断下面各个店面产品的选择
        for (let j = 0; j < this.dataList[k].items.length; j++) {
          this.dataList[k].items[j].check = true;
        }
        //判断总选择结算复选框
        var state = true;
        for (let i = 0; i < this.dataList.length; i++) {
          if (!this.dataList[i].check) {
            state = false;
          }
        }
        if (state) {
          this.checked = true;
        }
      } else {
        for (let j = 0; j < this.dataList[k].items.length; j++) {
          this.dataList[k].items[j].check = false;
        }
        //判断总选择结算复选框
        this.checked = false;
      }
    },
    goShop(e) {
      e.stopPropagation();
      for (let i = 0; i < this.dataList.length; i++) {
        var num = 0;
        for (let j = 0; j < this.dataList[i].items.length; j++) {
          if (this.dataList[i].items[j].check) {
            num = num + 1;
          } else {
            num = num - 1;
          }
        }
        if (num == this.dataList[i].items.length) {
          this.dataList[i].check = true;
          var state = true;
          for (let i = 0; i < this.dataList.length; i++) {
            if (!this.dataList[i].check) {
              state = false;
            }
          }
          if (state) {
            this.checked = true;
          }
        } else if (num >= -parseInt(this.dataList[i].items.length)) {
          this.dataList[i].check = false;
          this.checked = false;
        }
      }
    },
    goEditor(i) {
      if (i == false) {
        this.bianji = "完成";
        this.shan = true;
      } else {
        this.bianji = "编辑";
        this.shan = false;
      }
    },
    goCenter() {
      for (let i in this.dataList) {
        for (let j in this.dataList[i].items) {
          if (this.dataList[i].items[j].check != true) {
            // Toast('请选择商品')
          } else {
            console.log(this.dataList);
            this.$router.push({
              name: "order",
              params: {
                car: this.dataList
              }
            });
          }
        }
      }
    },
    //这下面的是购物车编辑模块
    plus(i) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      this.updateCar(i);
    },
    minus(i) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      this.updateCar(i);
    },
    blur(i) {
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
      this.updateCar(i);
    },
    updateCar(val) {
      console.log(val);
      let updateCar = {
        cmd: "updateCar",
        cars: val.id + "-" + val.number
      };
      Request.postRequest(updateCar)
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {});
    },
    del() {
      for (let i = 0; i < this.dataList.length; i++) {
        let delcar = this.dataList[i].items.filter(function(item) {
          return item.check;
        });
        if (delcar.length != 0) {
          for (let j in delcar) {
            this.delete(delcar[j]);
          }
        }
      }
    },
    delete(car) {
      console.log(car.id);
      let detele = {
        cmd: "carDelete",
        ids: car.id,
        cid: this.cid
      };
      Request.postRequest(detele)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            localStorage.removeItem("gocarlist");
            this.gocarlist(this.cid);
            this.gounum();
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
@import '../../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.contain {
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;

  .head {
    width: 100%;
    height: 60px;
    padding: 10px 0.4rem 0;
    box-sizing: border-box;
    font-size: 15px;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    background: #fff;
    border-bottom: 1px solid #eee;
  }

  .kong {
    height: 300px;
    width: 100%;
    background: url('../../../static/img/bg.png') no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    position: relative;

    a {
      display: block;
      position: absolute;
      top: 300px;
      left: 130px;
      width: 100px;
      font-size: 20px;
      color: #fff;
      background: green;
      border-radius: 5px;
      padding: 5px 10px;
      text-align: center;
    }
  }

  .lists {
    width: 100%;
    padding-top: 72px;
    display: flex;
    height: 100%;
    flex-direction: column;

    .kongbai {
      height: 100%;
      width: 100%;
      background: url('../../../static/img/bg.png') no-repeat;
      background-size: 100%;
      box-sizing: border-box;

      a {
        display: block;
        margin: 270px auto;
        width: 100px;
        font-size: 20px;
        color: #fff;
        background: green;
        border-radius: 5px;
        padding: 5px 10px;
        text-align: center;
      }
    }

    .uls {
      width: 100%;
      display: flex;
      flex-direction: column;

      .shop_all {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #333;
      }

      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.4rem;
        box-sizing: border-box;
        color: #333;
        border-bottom: 10px solid #f5f5f5;

        li {
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          overflow: hidden;

          .order {
            width: 90%;
            display: flex;
            align-items: center;
            margin-left: 0.4rem;
            box-sizing: border-box;
            position: relative;

            .fix {
              position: absolute;
              bottom: 0;
              right: 0;
            }

            .fixnum {
              font-size: 14px;
              color: #333;
              bottom: 10px;
              box-sizing: border-box;
            }

            img {
              width: 2.2rem;
              height: 2.2rem;
            }

            .order_detail {
              width: 70%;
              height: 2.2rem;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              font-size: 14px;
              color: #333;
              padding-left: 0.2rem;
              box-sizing: border-box;

              h2 {
                width: 50%;
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

  .finish {
    position: fixed;
    left: 0;
    bottom: 50px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 0.4rem;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    background: #fff;
    z-index: 10;

    .total {
      margin-left: 0.8rem;
    }

    .count {
      width: 35%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: rgb(114, 209, 65);
      color: #fff;
    }

    .counts {
      background: rgb(253, 86, 44);
    }
  }
}

.van-stepper {
  width: 35%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
