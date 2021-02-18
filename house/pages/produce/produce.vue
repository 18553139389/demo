<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">
					<view style="color: #333;">抽奖详情</view>
				</block>
			</cu-custom>
		</view>
		<view class="banner">
			<image :src="obj.image"></image>
			<view class="product">
				<view>{{obj.name}}</view>
				<view style="margin-left: 60rpx;">等级：{{obj.grades}}</view>
			</view>
			<view class="price">价格：<text style="font-size: 28rpx;color: red;margin-left: 8rpx;">￥{{obj.price}}</text></view>
			<view class="time">活动截止时间：{{obj.endtime}}</view>
		</view>
		<view class="bottom" v-if="state == 0" @tap="goActive(obj.lid,obj.urls,obj.integrals)">
			<view>参与抽奖</view>
		</view>
		<view class="bottom" v-if="state == 1" style="background: #ccc;">
			<view>已参与抽奖</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Bg: '#ffffff',
				list: [],
				type: 1,
				ids: '',
				obj: {},
				style: {
					div: 'color:#666;font-size:26rpx;line-height:20px;text-align:justify;',
					p: 'color:#666;font-size:26rpx;line-height:20px;text-align:justify;'
				},
				state: 0
			}
		},
		onLoad(option) {
			// 获取商品详情
			this.state = option.state
			this.$store.commit('getState',option.state)
			this.ids = option.id
			this.$u.post('getluckdrawdetail', {
				lid: option.id
			}).then(res => {
				console.log(res)
				if (res.result == 0) {
					this.list = res.dataobject.images
					this.obj = res.dataobject
				}
			})
		},
		onShow() {
			this.state = this.$store.state.states
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goActive(id, url, point) {
				if (url) {
					uni.navigateTo({
						url: '/pages/prizeDetail/prizeDetail?id=' + id
					})
				} else {
					this.$u.post('addluckdrawrecord', {
						uid: uni.getStorageSync('uid'),
						lid: id
					}).then(res => {
						console.log(res)
						this.$refs.uToast.show({
							title: '恭喜您获得' + point + '积分',
							type: 'none'
						})
						this.state = 1
					})
				}
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

		.banner {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			image {
				width: 100%;
				height: 390rpx;
			}

			.product {
				width: 100%;
				padding: 28rpx 28rpx 0;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
			}
			
			.time {
				width: 100%;
				font-size: 28rpx;
				color: #999;
				padding: 0 28rpx;
				box-sizing: border-box;
			}
			
			.price {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: red;
				margin: 28rpx 0;
			}
		}

		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 90rpx;
			background: #fe5f23;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;
			z-index: 999;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
		}
	}
</style>
