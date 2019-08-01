<template>
  <div>
    <main-header text="取消订单" @back="back" v-if="num==1"></main-header>
    <main-header text="申请退款" @back="back" v-else></main-header>
    <div class="box" v-if="num==1">
      <div class="title">选择取消订单原因，帮助我们改进</div>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="(it,is) in cancleList"
            :key="is"
            :title="it.title"
            clickable
            @click="cant(it.title,it.sort)"
          >
            <van-radio :name="it.sort" @click="cant(it.title,it.sort)" checked-color="#6ACD37" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="btn" @click.stop="cancel">确定</div>
    </div>
    <div v-else class="box box1">
      <div class="title">退款原因：</div>
      <van-cell-group>
        <van-field v-model="message" type="textarea" placeholder="请输入退款原因：" rows="4" />
      </van-cell-group>
      <div class="btn1" @click="btn">提交</div>
    </div>
    <dialogs1 :showDialog1="showDialog1" :data1="data1" @cancels="cancels"></dialogs1>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Dialogs1 from "@/components/component/dialogs1";
import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      radio: "1",
      num: "",
      showDialog1: false,
      data1: "订单已取消",
      cancleList: [],
      candata: "",
      message: ""
    };
  },
  components: {
    MainHeader,
    Dialogs1
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
    console.log(this.$router.history.current.params.id);
    this.num = this.$router.history.current.params.num;
    this.id = this.$router.history.current.params.id;
    if (this.num == 1) {
      this.cancle();
    }
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
    cant(tit, index) {
      // console.log(tit, index);
      this.candata = tit;
      this.radio = index;
    },
    cancel() {
      let cancle = {
        cmd: "cancelOrder",
        id: this.id,
        reason: this.candata
      };
      console.log(this.candata);
      Request.postRequest(cancle)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.showDialog1 = true;
          }
        })
        .catch(res => {});
    },
    cancels() {
      this.showDialog1 = false;
      this.$router.push({
        path: "/order_detail",
        query: {
          num: this.$router.history.current.params.act,
          id: this.id
        }
      });
    },
    cancle() {
      let cancle = {
        cmd: "quitReasons"
      };
      Request.postRequest(cancle)
        .then(res => {
          // console.log(res.data)
          if (res.data.result == 0) {
            console.log(res.data.dataList);
            this.cancleList = res.data.dataList;
          }
        })
        .catch(res => {});
    },
    btn() {
      let applyRefund = {
        cmd: "applyRefund",
        id: this.id,
        reason: this.message
      };
      console.log(applyRefund);
      Request.postRequest(applyRefund)
        .then(res => {
          console.log(res.data);
          Toast(res.data.resultNote);
          if (res.data.result == 0) {
            this.$router.push({
              path: "/order_detail",
              query: {
                num: this.$router.history.current.params.act,
                id: this.id
              }
            });
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

.box {
  width: 100%;
  padding-top: 72px;
}

.box1 {
  background-color: #FAFAFA;
  height: 12rem;
  position: relative;
}

.title {
  height: 1rem;
  line-height: 1rem;
  color: #9B9B9B;
  background-color: #FAFAFA;
  font-size: 14px;
  padding: 0 15px;
  box-sizing: border-box;
}

.btn {
  width: 90%;
  height: 1.2rem;
  margin: 0 auto;
  line-height: 1.2rem;
  border-radius: 6px;
  background: rgb(114, 209, 65);
  font-size: 15px;
  color: #fff;
  text-align: center;
  margin-top: 0.5rem;
}

.btn1 {
  width: 90%;
  height: 1.2rem;
  margin: 0 auto;
  line-height: 1.2rem;
  border-radius: 6px;
  background: rgb(114, 209, 65);
  font-size: 15px;
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0.5rem;
}
</style>
