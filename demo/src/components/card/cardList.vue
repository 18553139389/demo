<template>
   <div class="cList">
      <div class="listItem">
        <van-checkbox v-model="checked" @click="change" checked-color="#07c160">
         <van-card
            num="2"
            tag="热销"
            price="10.00"
            desc="(约合￥100.00)"
            title="商品标题0022220hjnhbg22"
            :thumb="imageURL"
            currency='AUD$'
            >
            <div slot="footer">
               <van-button size="mini" @click="popud" :show="show">编辑</van-button>
            </div>
         </van-card>
         </van-checkbox>
      </div>   
   </div>
   
</template>
<script>
import mpCheckbox from 'mpvue-weui/src/checkbox';
export default {
   data() {
     return {
       checked: true,
        imageURL: '../../../static/img/banner.png'
        
         
     }
   },
   components:{
     
   },
   mounted() {
      this.$emit('popud')
   },
   methods: {
      change() {
         if(this.checked){
            this.checked = false
         } else {
            this.checked = true
         }
          
      },
      popud(){
         this.show = false
         console.log(111111)
      }
   },
}
</script>
<style lang="scss">
   .listItem{
      width: 100%;
      .van-checkbox{
         display: flex;
         justify-content: space-between;
         align-items: center;
         .van-checkbox__icon{
               margin-left: 5rpx;
            }
      }
     ._van-card{
         width: 80%;
         .van-card__thumb{
            left: 0;
         }
         .van-card__title{
            font-size: 28rpx;
            font-weight: 600;
         }
         .van-card__price{
            font-size: 32rpx;
            color: #FF4444;
         }
         .van-card__desc{
            font-size: 24rpx;
            color: #688569;
         }
         .van-card__num{
            margin-top: 30rpx;
         }
         .van-card__price{
            position: relative;
         }
         .van-card__desc{
            position: absolute;
            right: 24rpx;
            top: 46rpx;
         }
      }
     
   }
   
</style>