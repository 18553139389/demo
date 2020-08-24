<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="notice">
      <div class="notice-left">
        <div class="cards">高考志愿填报功能</div>
        <div class="imgs">
          <img :src="list.cardLogo" alt="">
        </div>
      </div>
      <div class="notice-right">
        <div class="public">请选择考生报考所在的省份</div>
        <ul class="province">
          <li v-for="(v,k) in provinceList" :key="k" :class="provinceIndex == k ? 'actives' : ''" @click="changeIndex(k,v.id)">{{v.name}}</li>
        </ul>
        <div class="public" style="margin-top: 12px;">请填写用户名和手机号</div>
        <ul class="msg">
          <li>
            <div class="user">
              <img src="../../static/images/gouka_xingming.png" alt="">
              <input type="text" v-model="user" placeholder="请输入购卡人姓名">
            </div>
          </li>
          <li>
            <div class="user">
              <img src="../../static/images/gouka_dianhua.png" alt="">
              <input type="text" v-model="tel" placeholder="请输入购卡人手机号">
            </div>
            <img src="../../static/images/pingxingzhiyuan_xingxing.png" alt="">
          </li>
        </ul>
        <div class="price">价格：<span>￥{{list.cardPrice}}</span></div>
        <div class="date">价有效时间：有效时间{{list.endTime}}</div>
        <div class="buy" @click="buy">立即购买</div>
      </div>
    </div>
    <chat></chat>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <footers v-if="control"></footers>
    <div class="pay" v-if="payBtn">
      <div class="payWrapper">
        <div class="payTitle">
          <span>支付方式</span>
          <img src="../../static/images/close.png" alt="" @click="close">
        </div>
        <div class="payType">
          <div class="payCommon" @click="goPay(0)" v-if="show1">
            <img src="../../static/images/weixin.png" alt="">
            <div class="payFont">
              <span style="color: #00c800;">微信</span>
              <span style="font-size: 10px;margin-top: 4px; color: #00c800;">WeChat</span>
            </div>
          </div>
          <div id="qrcode"></div>
          <div class="payCommon" @click="goPay(1)">
            <img src="../../static/images/zifufsangshi_zhifubao.png" alt="">
            <div class="payFont">
              <span style="color: #4796fd;">支付宝</span>
              <span style="font-size: 10px;margin-top: 4px;color: #4796fd;">Paytreasure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Chat from '../components/chat.vue'
  import Request from '../../utils/request.js'
  import QRCode from "qrcodejs2"
  export default {
    data() {
      return {
        itemIndex: 0,
        provinceIndex: 0,
        control: true,
        provinceList: [{
            id: 0,
            name: '河南'
          },
          {
            id: 1,
            name: '山东'
          }
        ],
        user: '',
        tel: '',
        ids: 0,
        payBtn: false,
        show1: true,
        list: {},
        timer: '',
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat,
      QRCode
    },
    watch: {
      list() {
        this.pos()
      },
      bodyHeight() {
        this.pos()
      }
    },
    created() {
      this.init()
    },
    methods: {
      change(k) {
        if (k == 0) {
          this.$router.push({
            name: 'index'
          })
        } else if (k == 1) {
          this.$router.push({
            name: 'zhineng'
          })
        } else if (k == 2) {
          this.$router.push({
            name: 'bigData'
          })
        } else if (k == 3) {
          this.$router.push({
            name: 'expert'
          })
        } else if (k == 4) {
          this.$router.push({
            name: 'xuanke'
          })
        } else if (k == 5) {
          this.$router.push({
            name: 'about'
          })
        } else if (k == 6) {
          this.$router.push({
            name: 'question'
          })
        }
      },
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      init() {
        Request.postRequest('jinxiuqiancheng/api/buyCardInfo').then(res => {
          console.log(res)
          if (res.data.result == 0) {
            let list = {}
            list.cardLogo = res.data.cardLogo
            list.cardDesc = res.data.cardDesc
            list.cardPrice = res.data.cardPrice
            list.endTime = res.data.endTime
            this.list = list
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      changeIndex(k, id) {
        this.provinceIndex = k
        this.ids = id
      },
      buy() {
        let self = this
        if (this.tel == '') {
          this.$Message.warning('手机号不能为空')
          return
        } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
          this.$Message.warning('手机号格式不正确')
          return
        }

        this.payBtn = true
      },
      goPay(type) {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid"),
          prov: this.ids,
          name: this.user,
          telephone: this.tel,
          payMethod: type
        }
        Request.postRequest('jinxiuqiancheng/api/buyCard', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            if (type == 1) {
              document.querySelector('body').innerHTML = res.data.body
              const div = document.createElement('div')
              div.innerHTML = res.data.body
              document.body.appendChild(div)
              document.forms[0].submit()
            } else {
              this.show1 = false
              let qrcode = new QRCode('qrcode', {
                width: 80,
                height: 80, // 高度
                text: res.data.body, // 二维码内容
              })
              self.timer = setInterval(function() {
                self.getSuc(res.data.orderId)
              }, 2000)
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      getSuc(order) {
        let self = this
        let datas = {
          orderId: order
        }
        Request.postRequest('jinxiuqiancheng/api/findOrderStatus', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            if(res.data.payStatus == 1) {
              this.$Message.success('支付成功')
              clearInterval(this.timer)
              setTimeout(() => {
                self.$router.replace({
                  name: 'cardLogin'
                })
              }, 1000)
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      close() {
        this.payBtn = false
        this.show1 = true
      },
      changeNav(k) {
        this.itemIndex = k
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (max-width: 1024px) {
    .wrapper {
      width: 100%;
      height: 100%;
    }

    .notice {
      width: 100%;
      margin: 0 auto;
      padding: 50px 20px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }

    .notice-right {
      display: flex;
      flex-direction: column;
      padding-left: 5%;
      box-sizing: border-box;
    }
  }

  @media screen and (min-width: 1024px) {
    .wrapper {
      width: 100%;
      height: 100%;
    }

    .notice {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      display: flex;
      justify-content: space-between;
    }

    .notice-right {
      width: 60%;
      display: flex;
      flex-direction: column;
      padding-left: 5%;
      box-sizing: border-box;
    }
  }

  .notice-left {
    width: 40%;
    border: 1px solid #eee;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
  }

  .cards {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: #333;
    position: relative;
    padding-left: 36px;
    border-bottom: 3px solid #eee;
    font-weight: 600;
  }

  .cards::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .imgs {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
  }

  .imgs>img {
    width: 100%;
    border-radius: 4px;
  }

  .buy {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    background: rgb(255, 3, 80);
  }

  .public {
    width: 100%;
    height: 32px;
    font-size: 15px;
    color: #333;
    position: relative;
    padding-left: 12px;
    box-sizing: border-box;
    font-weight: 600;
  }

  .public::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .province {
    display: flex;
    align-items: center;
  }

  .province>li {
    padding: 12px 32px;
    border: 2px solid #eee;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    margin: 12px 20px 12px 0;
    box-sizing: border-box;
    cursor: pointer;
  }

  .actives {
    background: rgb(255, 3, 80);
    color: #FFFFFF !important;
    border: none !important;
  }

  .msg {
    width: 60%;
    display: flex;
    flex-direction: column;
  }

  .msg>li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 14px 0;
  }

  .user {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .user input {
    border: none;
    font-size: 14px;
    color: #333;
    margin-left: 20px;
  }

  .user input:focus {
    border: none;
    outline: none;
  }

  .price {
    font-size: 14px;
    color: #333;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-top: 24px;
  }

  .price>span {
    color: rgb(255, 3, 80);
  }

  .date {
    font-size: 12px;
    color: #999;
    margin-top: 12px;
  }

  .buy {
    width: 50%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: rgb(255, 3, 80);
    border-radius: 6px;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 24px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .pay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    background: rgba(0, 0, 0, .3);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .payWrapper {
    width: 18%;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border-radius: 6px;
    overflow: hidden;
  }

  .payTitle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #333;
    background: #e7e7e7;
    position: relative;
  }

  .payTitle>img {
    position: absolute;
    width: 14px;
    height: 14px;
    top: 13px;
    right: 10px;
  }

  .payType {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30px 0;
  }

  .payCommon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .payFont {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 14px;
    font-size: 14px;
  }
</style>
