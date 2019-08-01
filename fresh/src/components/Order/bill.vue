<template>
  <div class="contain">
    <main-header :text="text" @back="back"></main-header>
    <div class="box">
      <h3>请选择发票类型</h3>
      <div class="choice_bill">
        <div class="c_bill">
          <div
            :class="{active: billIndex == v.id }"
            class="btn"
            v-for="(v,k) in bill"
            :key="k"
            @click="choice(v)"
          >{{v.type}}</div>
        </div>
        <p>电子发票与线下发票具有同等的法律效力，推荐使用电子发票</p>
      </div>
      <h3>发票详情</h3>
      <div class="list" v-if="show == 1">
        <div class="bill_head">
          <h4>发票类型</h4>
          <van-radio-group v-model="radio">
            <van-radio name="0" checked-color="#72D141">企业单位</van-radio>
            <van-radio name="1" checked-color="#72D141">个人/非企业单位</van-radio>
          </van-radio-group>
        </div>
        <ul v-if="radio == 0">
          <li>
            <h4>邮箱地址</h4>
            <input type="text" placeholder="请输入邮箱地址" v-model="email">
          </li>
          <li>
            <h4>公司名称</h4>
            <input type="text" placeholder="请输入公司名称" v-model="companyName">
          </li>
          <li>
            <h4>公司税号</h4>
            <input type="text" placeholder="请输入纳税人识别号" v-model="taxpayerNumber">
          </li>
        </ul>
        <ul v-if="radio == 1">
          <li>
            <h4>邮箱地址</h4>
            <input type="text" placeholder="请输入邮箱地址" v-model="email">
          </li>
          <li>
            <h4>个人姓名</h4>
            <input type="text" placeholder="请输入姓名" v-model="name">
          </li>
        </ul>
      </div>
      <div class="list" v-if="show == 2">
        <div class="bill_head">
          <h4>发票类型</h4>
          <van-radio-group v-model="radio">
            <van-radio name="0" checked-color="#72D141">企业单位</van-radio>
            <van-radio name="1" checked-color="#72D141">个人/非企业单位</van-radio>
          </van-radio-group>
        </div>
        <ul v-if="radio == 0">
          <li>
            <h4>公司名称</h4>
            <input type="text" placeholder="请输入公司名称" v-model="companyName">
          </li>
          <li>
            <h4>公司税号</h4>
            <input type="text" placeholder="请输入纳税人识别号" v-model="taxpayerNumber">
          </li>
        </ul>
        <ul v-if="radio == 1">
          <li>
            <h4>收件人姓名</h4>
            <input type="text" placeholder="请输入收件人姓名" v-model="consigneeName">
          </li>
          <li>
            <h4>收件人电话</h4>
            <input type="number" placeholder="请输入联系电话" v-model="consigneeMobile">
          </li>
          <li>
            <h4>收件人地址</h4>
            <input type="text" placeholder="请输入收件地址" v-model="consigneeAddr">
          </li>
        </ul>
      </div>
      <div class="btns" @click="submit">提交申请</div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import Request from "@/common/js/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      shopLists: [], //无用
      text: "申请发票",
      billIndex: 1,
      show: 1,
      radio: "0",
      email: "", //	邮箱
      companyName: "", //公司名称
      taxpayerNumber: "", //纳税人识别号
      name: "", //个人姓名
      consigneeName: "", //收件人姓名
      consigneeMobile: "", //	收件人电话
      consigneeAddr: "", //收件人地址
      bills: ["电子企业发票", "电子个人发票", "线下企业发票", "线下个人发票"],
      bill: [
        {
          id: 1,
          type: "电子发票"
        },
        {
          id: 2,
          type: "线下发票"
        }
      ],
      billinx: ""
    };
  },
  created() {
    this.cid = JSON.parse(localStorage.getItem("user")).cid;
  },
  components: {
    MainHeader
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
      // this.$router.push('/order');
      this.$router.go(-1)
    },
    choice(v) {
      this.billIndex = v.id;
      this.show = v.id;
      this.email = "";
      this.companyName = "";
      this.taxpayerNumber = "";
      this.name = "";
      this.consigneeName = "";
      this.consigneeMobile = "";
      this.consigneeAddr = "";
    },
    submit() {
      let defaultAddre = [];
      if (this.billIndex == 1) {
        if (this.radio == 0) {
          if (
            this.email != "" &&
            this.companyName != "" &&
            this.taxpayerNumber != ""
          ) {
            let defaultAddress = {
              cmd: "genInvoice",
              cid: this.cid,
              invoiceType: this.billIndex,
              riseType: this.radio,
              email: this.email,
              companyName: this.companyName,
              taxpayerNumber: this.taxpayerNumber
            };
            defaultAddre.push(defaultAddress);
          } else {
            Toast("内容不为空");
          }
        } else {
          if (this.email != "" && this.name != "") {
            let defaultAddress = {
              cmd: "genInvoice",
              cid: this.cid,
              invoiceType: this.billIndex,
              riseType: this.radio,
              email: this.email,
              name: this.name
            };
            defaultAddre.push(defaultAddress);
          } else {
            Toast("内容不为空");
          }
        }
      } else {
        if (this.radio == 0) {
          if (this.companyName != "" && this.taxpayerNumber != "") {
            let defaultAddress = {
              cmd: "genInvoice",
              cid: this.cid,
              invoiceType: this.billIndex,
              riseType: this.radio,
              companyName: this.companyName,
              taxpayerNumber: this.taxpayerNumber
            };
            defaultAddre.push(defaultAddress);
          } else {
            Toast("内容不为空");
          }
        } else {
          if (
            this.consigneeName != "" &&
            this.consigneeMobile != "" &&
            this.consigneeAddr != ""
          ) {
            let defaultAddress = {
              cmd: "genInvoice",
              cid: this.cid,
              invoiceType: this.billIndex,
              riseType: this.radio,
              consigneeName: this.consigneeName,
              consigneeMobile: this.consigneeMobile,
              consigneeAddr: this.consigneeAddr
            };
            defaultAddre.push(defaultAddress);
          } else {
            Toast("内容不为空");
          }
        }
      }
      Request.postRequest(defaultAddre[0])
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            Toast("发票生成成功");
            localStorage.setItem("Invoice", JSON.stringify(res.data.id)); //发票ID
            if (this.billIndex == 1 && this.radio == 0) {
              this.billinx = 0;
            } else if (this.billIndex == 1 && this.radio == 1) {
              this.billinx = 1;
            } else if (this.billIndex == 2 && this.radio == 0) {
              this.billinx = 2;
            } else {
              this.billinx = 3;
            }
            this.$router.go(-1)
            localStorage.setItem("bill", JSON.stringify(this.bills[this.billinx]));
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
.contain {
  width: 100%;
  height: 100%;
  background: #F5F5F5;
}

.active {
  background: rgb(114, 209, 65);
  color: #fff !important;
}

.van-radio-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
}

.box {
  width: 100%;
  padding: 72px 0 0;

  h3 {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 0.5rem;
    box-sizing: border-box;
    background: rgb(248, 248, 248);
    font-size: 14px;
    color: #333;
  }

  .choice_bill {
    width: 100%;
    padding: 0.3rem 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: #fff;

    .c_bill {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 0.3rem;
      box-sizing: border-box;

      .btn {
        width: 40%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border: 1px solid #eee;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
      }
    }

    p {
      font-size: 14px;
      color: #999;
      line-height: 20px;
    }
  }

  .list {
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: #fff;

    .bill_head {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #333;
      height: 40px;
      border-bottom: 1px solid #eee;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
        border-bottom: 1px solid #eee;
        padding: 0.3rem 0;

        input {
          border: none;
          margin-left: 0.7rem;
        }
      }
    }
  }

  .btns {
    width: 60%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    background: rgb(115, 210, 66);
    margin: 1.2rem auto 0;
    font-size: 14px;
    color: #fff;
  }
}
</style>
