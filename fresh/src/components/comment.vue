<template>
  <div class="contain" v-cloak>
    <main-header :text="text" :datas="datas" @back="back" @set="set"></main-header>
    <div class="box">
      <div class="shop">
        <img :src="orders.simage" alt />
        <span>{{orders.sname}}</span>
      </div>
      <ul class="list">
        <li v-for="(x,l) in ordershop" :key="l">
          <div class="list_order">
            <img :src="x.image" alt />
            <div class="list_right">
              <span>{{x.name}}</span>
              <van-rate v-model="value" :size="16" />
            </div>
          </div>
          <div class="message">
            <textarea placeholder="请输入您对商品的评价信息~" @blur="txt"></textarea>
            <ul>
              <li>
                <van-uploader :after-read="onRead">
                  <img src="../../static/img/photo.png" alt />
                </van-uploader>
              </li>
              <li v-for="(v,k) in imgs" :key="k">
                <img :src="v" alt />
                <div class="del" @click.stop="del(k)">X</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Uploader, Rate } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "评价",
      datas: "提交",
      value: 0,
      contxt: "",
      imgs: [],
      IMG: [],
      orders: [], //订单详情全部
      ordershop: [], //商品数据
      imgID: ""
    };
  },
  components: {
    MainHeader,
    Toast
  },
  created() {
    console.log(this.$route.params.ids);
    this.orderDetail(this.$route.params.ids);
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        window.history.go(-1);
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
    },
    set() {
      let evaluate = [];
      for (let i in this.ordershop) {
        let evaluateI = {};
        evaluateI.itemId = this.ordershop[i].itemId;
        evaluateI.stars = this.value;
        evaluateI.content = this.contxt;
        evaluateI.upload = this.imgID;
        evaluate.push(evaluateI);
      }
      let evaluateOrder = {
        cmd: "evaluateOrder",
        orderId: this.$route.params.ids,
        cid: this.cid,
        evaluates: evaluate
      };
      console.log(evaluateOrder);
      Request.postRequest(evaluateOrder)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            Toast(res.data.resultNote);
            this.$router.push("/order_center/0");
          } else if (res.data.result == "2") {
            this.$router.push("/fenghao");
          } else {
            Toast(res.data.resultNote);
          }
        })
        .catch(res => {});
    },
    onRead(file) {
      if (this.imgs.length >= 3) {
        Toast("最多上传3张图片");
      } else {
        // this.imgs.push(file.content);
      }
      var formdata = new FormData();
      formdata.append("file", file.file);
      Request.postFile(formdata)
        .then(res => {
          // console.log(res.data)
          if (res.data.result == 0) {
            console.log(res.data.url);
            let objimg = "http://39.108.249.42" + res.data.url;
            let aaa = res.data.url;
            if (this.imgs.length < 3) {
              this.imgs.push(objimg);
              this.IMG.push(aaa);
            }
            this.imgID = this.IMG.join("|");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    txt(e) {
      this.contxt = e.target.value;
      console.log(this.contxt);
    },
    del(k) {
      this.imgs.splice(k, 1);
    },
    orderDetail(id) {
      let orderDetail = {
        cmd: "orderDetail",
        id: id
      };
      console.log(orderDetail);
      Request.postRequest(orderDetail)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.orders = res.data;
            this.ordershop = res.data.goods;
            // console.log(this.orders)
          }
        })
        .catch(res => {});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.contain {
  width: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 72px;

    .shop {
      width: 100%;
      height: 2.5rem;
      display: flex;
      align-items: center;
      padding: 0 0.4rem;
      box-sizing: border-box;
      font-size: 14px;
      color: #333;
      border-top: 1px solid #eee;
      border-bottom: 8px solid #f5f5f5;

      img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
      }

      span {
        margin-left: 0.3rem;
      }
    }

    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 0.4rem;
      box-sizing: border-box;
      font-size: 14px;
      color: #333;

      li {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.3rem 0;

        .list_order {
          width: 100%;
          display: flex;

          img {
            width: 1.8rem;
            height: 1.8rem;
          }

          .list_right {
            flex: 1;
            height: 2rem;
            padding: 0.2rem 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 0.3rem;
          }
        }

        .message {
          width: 100%;
          margin-top: 0.3rem;
          display: flex;
          flex-direction: column;
          background: #f5f5f5;
          padding: 0.3rem;
          box-sizing: border-box;

          textarea {
            width: 100%;
            height: 3.5rem;
            font-size: 14px;
            color: #333;
            border: none;
            resize: none;
            background: #f5f5f5;
          }

          ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            li {
              width: 22%;
              height: 1.9rem;
              position: relative;
              margin-right: 3%;
              margin-bottom: 3%;
              padding: 0;

              img {
                width: 100%;
                height: 100%;
              }

              .del {
                width: 14px;
                height: 14px;
                background: #333;
                border-radius: 50%;
                line-height: 14px;
                text-align: center;
                font-size: 10px;
                color: #fff;
                position: absolute;
                right: -7px;
                top: -7px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
