<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">提现</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="top">
				<view class="point">积分余额（元）</view>
				<view class="price">{{point}}</view>
			</view>
			<view class="message">
				<view>提现金额</view>
				<view class="count">1积分等于{{obj.bili}}元</view>
				<view class="enter">
					<view>￥</view>
					<input type="number" placeholder="0.00元" v-model="num">
				</view>
				<view class="btn" @tap="goMoney">提现至微信零钱</view>
			</view>
			<view class="warn">
				<view>1.{{obj.content}}</view>
				<view style="margin-top: 20rpx;">2.提现成功后去微信钱包查看</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Bg: '#ffffff',
				point: 0,
				num: '',
				obj: {}
			}
		},
		onLoad(option) {
			// 提现说明
			this.$u.post('getwithdrawalmess').then(res => {
				console.log(res)
				if (res.result == 0) {
					this.point = option.score * parseFloat(res.dataobject.bili)
					this.point = this.point.toFixed(2)
					this.obj = res.dataobject
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goMoney() {
				let score = parseInt(this.obj.menkan) * parseFloat(this.obj.bili)
				if (parseFloat(this.num) <= 0) {
					Toast.showToast('提现金额不能小于0')
					return
				}
				
				if (parseFloat(this.num) < score) {
					Toast.showToast('最低提现不能低于' + score + '元')
					return
				}
				
				if (parseFloat(this.num) > parseInt(this.point)) {
					Toast.showToast('提现金额不足')
					return
				}
				
				this.$u.post('addwithdrawal', {
					uid: uni.getStorageSync('uid'),
					integrals: (this.num / (parseFloat(this.obj.bili)))
				}).then(res => {
					console.log(res)
					if (res.result == 0) {
						Toast.showToast('提交成功，请耐心等待后台审核...')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						},2000)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.list {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.top {
				width: 100%;
				margin: 60rpx 0;

				.point {
					font-size: 28rpx;
					color: #666;
				}

				.price {
					font-size: 50rpx;
					font-weight: 600;
					color: #333;
					margin-top: 20rpx;
				}
			}

			.message {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				border-radius: 6px;
				background: #FFFFFF;
				box-shadow: 0 0 5px rgba(0, 0, 0, .2);
				font-size: 28rpx;
				color: #333;

				.count {
					font-size: 24rpx;
					color: #999;
					margin-top: 20rpx;
				}

				.enter {
					width: 100%;
					height: 90rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32rpx;
					color: 333;
					border-bottom: 1px solid #eee;
					margin: 30rpx 0;

					input {
						font-size: 28rpx;
						color: #333;
						text-align: right;
					}
				}

				.btn {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 30rpx;
					color: #FFFFFF;
					border-radius: 24px;
					background: #fe5f23;
					margin-top: 60rpx;
				}
			}

			.warn {
				width: 100%;
				font-size: 26rpx;
				color: #999;
				margin-top: 40rpx;
			}
		}
	}
</style>
