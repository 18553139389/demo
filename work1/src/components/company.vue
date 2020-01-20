<template>
  <div v-cloak>
    <main-header :text="text" @back="back"></main-header>
    <div class="wrapper">
      <div class="list">
        <img src="../../static/img/img1.jpg" alt="">
        <div class="list-item">
          <div>企业编号：</div>
          <input type="text" v-model="nums" placeholder="请输入企业编号">
        </div>
        <div class="list-item">
          <div>车牌号码：</div>
          <input type="text" v-model="card" placeholder="请输入车牌号码">
        </div>
        <div class="sure" @click="goSure">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/component/mainHeader'
  import Request from '@util/request'
  import {Popup,Picker,Toast} from 'vant'
  export default {
    data() {
      return {
        text: '企业申请',
        nums: '',
        card: '',
        list: {}
      }
    },
    components: {
    	MainHeader
    },
    methods: {
      back() {
      	this.$router.push('/type')
      },
      goSure() {
        if(this.nums == ''){
          Toast('企业编号不能为空')
          return
        }

        if(this.card == ''){
          Toast('车牌号码不能为空')
          return
        }

        let self = this
        let datas = {
          platesNumber: this.card,
          companyNumber: this.nums
        }
        Request.postRequest('/api/licence/tPermit/getCompanyPermitInfo', datas).then(res => {
          if (res.data.success == true) {
            self.list = res.data.body.permits
            self.list = JSON.stringify(self.list)
            this.$router.push({
            	name: 'companyDetail',
            	params: {
            		list: self.list,
                nums: self.nums,
                card: self.card
            	}
            })
          }else{
            Toast('企业或者车牌号不存在')
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .wrapper {
    width: 100%;
    height: 100vh;
    font-size: 15px;
    color: #333;
    padding-top: 72px;
    box-sizing: border-box;
  }

  .list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #eee;
    padding: 0 0.4rem;
    box-sizing: border-box;
  }

  .list>img {
    width: 120px;
    margin: 15% 0;
  }

  .list-item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .list-item>input {
    margin-left: 14px;
  }

  .sure {
    width: 60%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    background: #18ACF6;
    border-radius: 24px;
    margin-top: 60px;
  }
</style>
