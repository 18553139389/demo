<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" :backColor="backColor">
				<block slot="backText"></block>
				<block slot="content">提现</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="bank">
				<view class="item">
					<view class="item-left">银行卡号</view>
					<input type="text" v-model="bank" placeholder="请输入银行卡号">
				</view>
				<view class="item">
					<view class="item-left">真实姓名</view>
					<input type="text" v-model="name" placeholder="请输入真实姓名">
				</view>
				<view class="item">
					<view class="item-left">发卡行</view>
					<input type="text" v-model="card" placeholder="请输入发卡行">
				</view>
			</view>
			<view class="bank">
				<view class="titles">银行卡号</view>
				<view class="price">
					<view>￥</view>
					<input type="number" v-model="price" placeholder="请输入提现金额">
				</view>
				<view class="use">
					<view>可提现金额：{{money}}</view>
					<view style="color: red;" @tap="goVal">全部提现</view>
				</view>
			</view>
			<view class="submit" @tap="goSubmit">提交申请</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#FBFBFB',
				bank: '',
				name: '',
				card: '',
				price: '',
				money: 0
			}
		},
		onLoad(option) {
			this.money = option.money
		},
		methods: {
			goSubmit() {
				let self = this
				let regExp = /^([1-9]{1})(\d{15}|\d{18})$/
				if (this.bank == '') {
					Toast.showToast('银行卡号不能为空')
					return
				} else if(!regExp.test(this.bank)) {
					Toast.showToast('请输入正确的银行卡号')
					return
				}
				if (this.name == '') {
					Toast.showToast('姓名不能为空')
					return
				}
				if (this.card == '') {
					Toast.showToast('发卡行不能为空')
					return
				}
				if (parseFloat(this.price) <= 0) {
					Toast.showToast('金额不能小于0')
					return
				}
				let data1 = {
					uid: uni.getStorageSync('uid'),
					money: this.price,
					bank: this.card,
					username: this.name,
					account: this.bank
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/cash',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								Toast.showToast('提交成功,请耐心等待')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
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
			},
			goVal() {
				if(parseFloat(this.money) <= 0) {
					Toast.showToast('您的提现金额不足')
					return
				}
				this.price = this.money
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
		background: #FBFBFB;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28upx;
			box-sizing: border-box;
			
			.bank {
				width: 100%;
				background: #FFFFFF;
				border-radius: 4px;
				padding: 0 24upx;
				box-sizing: border-box;
				font-size: 28upx;
				color: #666;
				display: flex;
				flex-direction: column;
				margin-bottom: 30upx;
				
				.item {
					width: 100%;
					height: 80upx;
					display: flex;
					align-items: center;
					
					.item-left {
						width: 25%;
						height: 80upx;
						line-height: 80upx;
					}
					
					input {
						height: 80upx;
						font-size: 28upx;
						color: #111111;
					}
				}
				
				.titles {
					width: 100%;
					height: 80upx;
					line-height: 80upx;
					font-size: 30upx;
					color: #111111;
				}
				
				.price {
					width: 100%;
					height: 80upx;
					display: flex;
					align-items: center;
					font-size: 28upx;
					color: #111111;
					border-bottom: 1px solid #eee;
					
					input {
						width: 60%;
						margin-left: 16upx;
					}
				}
				
				.use {
					width: 100%;
					height: 80upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;
					color: #111111;
				}
			}
			
			.submit {
				width: 80%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				margin: 40upx auto;
				background: #111111;
				border-radius: 4px;
				font-size: 30upx;
				color: #FFFFFF;
			}
		}
	}
</style>
