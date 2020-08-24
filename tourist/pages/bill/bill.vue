<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">开具发票</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list-top">
				<view class="state">发票详情</view>
			</view>
			<view class="list">
				<view class="list-item">
					<view style="width: 27%;">抬头类型：</view>
					<van-radio-group v-model="radio" @change="choiceUser">
						<view class="choice">
							<view class="choice-item">
								<van-radio name="1" checked-color="#E02B11"></van-radio>
								<view style="margin-left: 20upx;color: #999;">企业单位</view>
							</view>
							<view class="choice-item">
								<van-radio name="2" checked-color="#E02B11"></van-radio>
								<view style="margin-left: 20upx;color: #999;">个人/非企业单位</view>
							</view>
						</view>
					</van-radio-group>
				</view>
				<view class="list-item" v-if="radio == 1">
					<view style="width: 27%;">企业税号：</view>
					<view class="forms">
						<input type="text" v-model="num" placeholder="请输入企业税号" placeholder-class="input-placeholder">
					</view>
				</view>
				<view class="list-item">
					<view style="width: 27%;">发票抬头：</view>
					<view class="forms">
						<input type="text" v-model="head" placeholder="请输入发票抬头" placeholder-class="input-placeholder">
					</view>
				</view>
				<view class="list-item">
					<view style="width: 27%;">更多内容：</view>
					<view class="forms">
						<input style="width: 80%;" type="text" v-model="more" placeholder="填写备注、地址等(非必填)" placeholder-class="input-placeholder" disabled @tap="goDetail">
						<img src="../../static/img/right.png" alt="">
					</view>
				</view>
			</view>
			<view class="list-item" style="height: 90upx;">
				<view style="width: 27%;">总金额：</view>
				<view class="forms" style="color: #DE2910;">￥{{price}}元</view>
			</view>
			<view class="list-top" style="margin: 20upx 0;">
				<view class="state">接收方式</view>
			</view>
			<view class="list-item">
				<view style="width: 27%;">邮寄地址：</view>
				<view class="forms">
					<input style="width: 80%;" type="text" v-model="address" placeholder="选择邮寄地址" placeholder-class="input-placeholder" disabled @tap="goAddress">
					<img src="../../static/img/right.png" alt="">
				</view>
			</view>
		</view>
		<view class="look" @tap="goCheck">提交</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				radio: '1',
				num: '',
				head: '',
				more: '',
				price: 0,
				address: '',
				orderId: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.price = option.amount
			this.orderId = option.orderId
		},
		onShow() {
			if (this.$store.state.saveAddress == null) {
				this.address = ''
			} else {
				this.address = this.$store.state.saveAddress.city + this.$store.state.saveAddress.address
			}
			
			this.init()
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			goAddress() {
				uni.navigateTo({
					url: '../shopAddress/shopAddress'
				})
			},
			goDetail() {
				uni.navigateTo({
					url: '../billDetail/billDetail'
				})
			},
			choiceUser(val) {
				console.log(val)
			},
			init() {
				let num = 0
				if(this.$store.state.billRemark){
					num++
				}
				
				if(this.$store.state.billLocation){
					num++
				}
				
				if(this.$store.state.billOrder){
					num++
				}
				
				if(num){
					this.more = '已选填' + num + '项'
				}else{
					this.more = ''
				}
			},
			goCheck() {
				if(this.radio == 1) {
					if(this.num == ''){
						Toast("企业税号不能为空")
						return
					}
				}
				
				if(this.head == ''){
					Toast("发票抬头不能为空")
					return
				}
				
				if(this.address == ''){
					Toast("邮寄地址不能为空")
					return
				}
				
				let da = {
					uid: this.$store.state.uid,
					orderId: this.orderId,
					receiverId: this.$store.state.saveAddress.id,
					type: this.radio,
					title: this.head,
					number: this.num,
					remarks: this.$store.state.billRemark,
					location: this.$store.state.billLocation,
					account: this.$store.state.billOrder
				}
				let data2 = {
					url: '/api/gzh/addFlightInvoice',
					data: da,
					success: function(res) {
						if (res.data.result == 0) {
							Toast("提交成功")
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 300)
						}else{
							Toast(res.data.resultNote)
						}
					}
				}
				ajax(data2)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.wrapper {
		width: 100%;
		border-top: 1px solid #eee;
		display: flex;
		flex-direction: column;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.list-top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0;
		box-sizing: border-box;
	}
	
	.state {
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
		font-size: 15px;
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px dashed #eee;
	}
	
	.list-item {
		width: 100%;
		display: flex;
		height: 70upx;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
	}
	
	.choice {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.choice-item {
		display: flex;
		align-items: center;
	}
	
	.van-radio-group {
		flex: 1;
	}
	
	.input-placeholder {
		font-size: 14px;
		color: #999;
	}
	
	.forms {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.forms>input {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
	}
	
	.forms>img {
		width: 28upx;
		height: 28upx;
		margin-top: 4upx;
	}
	
	.look {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #E73C1D;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
