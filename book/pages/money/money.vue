<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor='backColor' :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">提现</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="msg">
				<view class="order">
					<view>支付宝账号：</view>
					<input type="text" v-model="order" placeholder="请输入支付宝账号">
				</view>
				<view class="order">
					<view>支付宝姓名：</view>
					<input type="text" v-model="user" placeholder="请输入支付宝真实姓名">
				</view>
				<view class="pay">提现金额</view>
				<view class="money">
					<view style="font-size: 26px;">￥</view>
					<input type="digit" v-model="money" placeholder="请输入提现金额" placeholder-class="place">
				</view>
				<view class="mark">
					<textarea v-model="mark" placeholder="添加备注(50字以内)"></textarea>
				</view>
				<view class="submit" @tap="goResult">提交申请</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#F8F9FB',
				order: '',
				user: '',
				money: '',
				mark: '',
				price: 0
			}
		},
		onLoad(option) {
			this.price = option.money
		},
		methods: {
			goResult() {
				let self = this
				if(this.order == '') {
					Toast.showToast('账号不能为空')
					return
				}
				if(this.user == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if(this.money == '') {
					Toast.showToast('提现金额不能为空')
					return
				} else if(this.money < 10) {
					Toast.showToast('提现金额不能小于10元')
					return
				} else if(parseFloat(this.money) > parseFloat(this.price)) {
					Toast.showToast('提现金额不能超过'+ this.price +'元')
					return
				}
				if(this.mark == '') {
					Toast.showToast('备注不能为空')
					return
				}
				let data1 = {
					cmd: 'applywithdrawal',
					uid: uni.getStorageSync('uid'),
					phone: this.order,
					name: this.user,
					money: this.money,
					remarks: this.mark
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.navigateTo({
									    url: '/pages/moneyResult/moneyResult'
									})
								},500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28upx;
			box-sizing: border-box;
			background: #F8F9FB;
			
			.msg {
				width: 100%;
				padding: 24upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 4px;
				margin-bottom: 30upx;
				display: flex;
				flex-direction: column;
				
				.order {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #333;
					margin-bottom: 30upx;
					
					input {
						flex: 1;
						height: 60upx;
						border-bottom: 1px solid #eee;
						font-size: 14px;
						color: #333;
						margin-left: 20upx;
					}
				}
				
				.pay {
					width: 100%;
					font-size: 14px;
					color: #333;
					margin-bottom: 30upx;
				}
				
				.money {
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #eee;
					
					input {
						flex: 1;
						font-size: 28px;
						color: #333;
						margin-left: 20upx;
					}
					
					.place {
						font-size: 14px;
						color: #999;
					}
				}
				
				.mark {
					width: 100%;
					height: 140upx;
					margin-top: 30upx;
					
					textarea {
						width: 100%;
						height: 100%;
						font-size: 14px;
						color: #333;
					}
				}
				
				.submit {
					width: 60%;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					font-size: 15px;
					color: #FFFFFF;
					background: #FF6600;
					border-radius: 40px;
					margin: 50upx auto;
				}
			}
		}
	}
</style>
