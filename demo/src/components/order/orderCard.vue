<template>
  <div class="order-card">
    <van-panel title="订单号" status="订单状态:已发货" use-footer-slot>
      <van-card
        title="商品名称商品名称商品名称商品名称商品名称"
        num="1"
        currency="AUD$"
        price="100"
        thumb="./../../../static/images/user.png"
        tag="热销"
      >
        <div slot="desc" class="desc-class">
          <span class="currency-price">(约合￥1000.00)</span>
        </div>
      </van-card>
     
      <!-- <div v-if="order.orderNotes.custom" class="notes">
        <p>
          <span class="title">备注:</span>
          <span>000</span>
        </p>
      </div> -->
      <!-- <contactCard
        type="edit"
        name="order.consignees.name"
        tel="order.consignees.phone"
        address="order.consignees.address"
        name-text="收货人"
        tel-text="联系电话"
        address-text="地址"
        editable="false"
        contentType="'receive'"
      /> -->
      <!-- <contactCard
        v-if="order.sender_information || order.sender_phone"
        type="edit"
        :name="order.sender_information"
        :tel="order.sender_phone"
        :name-text="$t('发件人')"
        :tel-text="$t('联系电话')"
        :editable="false"
        :contentType="'send'"
      /> -->
      <div slot="footer">
        <div class="price-block text-right">
          <div class="freight">运费:
            <span class="price">AUD$3</span>
            <span class="currency-price">(约合￥30.00)</span>
          </div>
          <!-- <div class="discount" v-if="order.discountAmount > 0">优惠:
            <span class="price">{{order.discountAmount | showPrice}}</span>
            <span class="currency-price">{{order.discount|showCurrency}}</span>
          </div> -->
          <div>
            共{{1}}件商品, 合计:
            <span class="price">AUD$330</span>
            <span class="currency-price">(约合￥3000.00)</span>
          </div>
        </div>
        <div class="btn-bar text-right">
          <van-button
            size="small"
            @click="toPicture()"
          >打包照片</van-button>
          <van-button
            @click="checkTheLogistics()"
            size="small"
          >查看物流</van-button>
          <van-button
            size="small"
            @click="confirmAnOrder()"
          >确认收货</van-button>
          <!-- <van-button size="small" @click="inPayment(order)" v-if="order.orderStatus === 0">已支付</van-button>
          <van-button
            size="small"
            @click="initPayment(order)"
            v-if="order.orderStatus === 0"
            type="danger"
          >去支付</van-button> -->
        </div>
      </div>
    </van-panel>
 
    <van-panel title="订单号" status="待付款" use-footer-slot>
      <van-card
        title="商品名称商品名称商品名称商品名称商品名称"
        num="1"
        currency="AUD$"
        price="100"
        thumb="./../../../static/images/user.png"
        tag="热销"
      >
        <div slot="desc" class="desc-class">
          <span class="currency-price">(约合￥1000.00)</span>
        </div>
      </van-card>
      <div class="adress">
        <div class="shou">收</div>
        <div class="info">
          <div class="name">收货人:<span>谢思云</span></div>
          <div class="phone">电话:<span>10086</span></div>
          <div class="address">地址:<span>商都世贸大厦</span></div>
        </div>
      </div>
      <div slot="footer">
        <div class="price-block text-right">
          <div class="freight">运费:
            <span class="price">AUD$3</span>
            <span class="currency-price">(约合￥30.00)</span>
          </div>
          <div>
            共{{1}}件商品, 合计:
            <span class="price">AUD$330</span>
            <span class="currency-price">(约合￥3000.00)</span>
          </div>
        </div>
        <div class="btn-bar text-right">
          <!-- <van-button
            size="small"
            @click="toPicture(order)"
          >打包照片</van-button>
          <van-button
            @click="checkTheLogistics(order)"
            size="small"
          >查看物流</van-button>
          <van-button
            size="small"
            @click="confirmAnOrder(order)"
          >确认收货</van-button> -->
          <van-button size="small" @click="inPayment(order)" >已支付</van-button>
          <van-button
            size="small"
            @click="initPayment()"
            type="danger"
          >去支付</van-button>
        </div>
      </div>
    </van-panel>
    <!--弹窗-->
  
    <van-popup v-model="showPayment" position="bottom" close-on-click-overlay="false">
      <Payment />
    </van-popup> 
    <!--<toast v-model="showPositionValue" type="text" is-show-mask :text="$t('删除成功')">{{ $t('Basic Usage') }}</toast>-->
  </div>
</template>
<script>
import Payment from '@/components/order/orderPay.vue'
export default {
    data (){
      return{
        showPayment: false
      }
    },
    mounted(){
  
    },
    components:{
      Payment
    },
    methods: {
      initPayment () {
        this.showPayment=true
        console.log("点了去支付")
      },
      checkTheLogistics(){
				console.log('点了查看物流')
      }
    
    },
    
}
</script>

<style lang="scss">
.order-card{
  height: 90vh;
}
  .van-card__price {
    color: red;
    font-size: 16px;
    white-space: nowrap;
  }
  // 运费
  .freight{
    padding: 5px 0;
  }
  .price{
    color: red;
    white-space: nowrap;
  }
  .currency-price {
    color: #688569;
    font-size: 12px

  }
  .desc-class {
    color: #688569;
    font-size: 12px;
    .price{
      color: #688569;
    }
  }
  .price-block {
    text-align: right;
    font-size: 14px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
  }
  .btn-bar {
    text-align: right;
    .van-button--small {
      margin-right: 6px;
    }
  }
  .van-card__title {
   font-weight: 600;
   font-size: 14px;
  }
  .van-panel {
      width: 94vw;
      border-radius: 10px;
      margin: 20px auto;
      box-shadow: 0 2px 3px 4px #dedede;
      .van-panel__header {
        border-radius:10px 10px 0 0;
      }
    }
    .van-card {
      margin-top: 2px;
    }
    .van-panel__footer {
      padding-top: 20px;
    }
    
    // 收获信息
    .adress{
      padding: 15px 10px;
      height: 50px;
      border-bottom: 2px solid #dfe2e2e7;
      display: flex;
      align-items: center;
      .shou {
        padding: 2px 4px;
        font-size: 12px;
        color: #a5a4a4;
        border-radius: 50%;
        border: 1px solid #a5a4a4;
        margin-right: 10px;
      }
      .info{
        width: 80%;
        text-align: left;
        font-size: 14px;
        div {
          white-space: nowrap;
          line-height: 20px;
          span {
            margin-left: 5px;
          }
        }
      }
    }
</style>
