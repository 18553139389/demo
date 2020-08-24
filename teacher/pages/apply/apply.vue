<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">申请提现</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<view class="name">提现金额</view>
				<input type="digit" v-model="val" placeholder="请输入提现金额">
			</view>
			<view class="money">可提现金额：{{balance}}</view>
			<view class="path">
				<view>提现路径</view>
				<view style="color: #006EE3;">微信零钱</view>
			</view>
			<view class="entry" @tap="goApply">确定</view>
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
				val: 0,
				balance: 0
			}
		},
		onLoad(option) {
			this.balance = option.balance
		},
		methods: {
			goApply() {
				let self = this
				if(parseFloat(this.val) == 0) {
					Toast.showToast('提现金额不能为0元')
					return
				}
				let data1 = {
					mid: uni.getStorageSync('uid'),
					money: this.val
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'app/service/maintainer/withdraw',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.success == true) {
								Toast.hideLoading()
								uni.showModal({
								    title: '提示',
								    content: '您的提现申请已提交，我们将在1个工作日内审核您的申请，请留意通知',
									showCancel: false,
									confirmColor: '#006EE3',
								    success: function (res) {
								        if (res.confirm) {
								            uni.navigateBack({
								                delta: 1
								            })
								        } 
								    }
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
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
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 40upx;
			
			.item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.name {
					width: 20%;
					font-size: 28upx;
					color: #333;
				}
				
				input {
					width: 76%;
					height: 70upx;
					border: 1px solid #eee;
					padding: 0 20upx;
					box-sizing: border-box;
					font-size: 28upx;
					color: #333;
				}
			}
			
			.money {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: right;
				font-size: 28upx;
				color: #999;
			}
			
			.path {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28upx;
				color: #333;
			}
			
			.entry {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				background: #006EE3;
				border-radius: 30px;
				font-size: 30upx;
				color: #FFFFFF;
				margin: 60upx auto 0;
			}
		}
	}
</style>
