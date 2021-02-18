<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" bgColor="#333" :Bg="Bg" @goBack="goBack">
				<block slot="content">
					<view style="color: #333;">商品详情</view>
				</block>
			</cu-custom>
		</view>
		<view class="banner">
			<u-swiper :list="list" border-radius="0" height="680"></u-swiper>
			<view class="product">
				<view class="title">{{obj.name}}</view>
				<view class="price">
					<!-- <view style="color: #666;">{{obj.descs}}</view> -->
					<view>{{obj.integrals}}积分</view>
				</view>
				<!-- <view class="content">{{obj.descs}}</view> -->
				<view class="content">
					<u-parse :content="obj.descs"></u-parse>
				</view>
			</view>
			<view class="produce" v-if="obj.type == 1">
				<view class="column">
					<view class="nav">
						<view v-for="(v,k) in nav" :key="k" @tap="changeIndex(k)" :class="navIndex == k ? 'nav-item active' : 'nav-item'">{{v}}</view>
					</view>
					<view class="text" v-if="navIndex == 0">
						<!-- <u-parse :html="obj.content1" :tag-style="style"></u-parse> -->
						<u-parse :content="obj.content1"></u-parse>
						<image :src="v" v-for="(v,k) in obj.images1" :key="k" mode="widthFix"></image>
					</view>
					<view class="text" v-if="navIndex == 1">
						<!-- <u-parse :html="obj.content2" :tag-style="style"></u-parse> -->
						<u-parse :content="obj.content2"></u-parse>
						<image :src="v" v-for="(v,k) in obj.images2" :key="k" mode="widthFix"></image>
					</view>
					<view class="text" v-if="navIndex == 2">
						<u-parse :content="obj.content3"></u-parse>
						<!-- <u-parse :html="obj.content3" :tag-style="style"></u-parse> -->
						<image :src="v" v-for="(v,k) in obj.images3" :key="k" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="price">{{obj.integrals}}积分</view>
			<view class="buy" @tap="goBuy">兑换</view>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				Bg: '#ffffff',
				list: [],
				nav: ['产品特色', '理赔流程', '常见问题'],
				navIndex: 0,
				type: 1,
				ids: '',
				obj: {},
				style: {
					div: 'color:#666;font-size:26rpx;line-height:20px;text-align:justify;',
					p: 'color:#666;font-size:26rpx;line-height:20px;text-align:justify;'
				}
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			// 获取商品详情
			this.type = option.type
			this.ids = option.id
			this.$u.post('getproductdetail', {
				pcid: option.id
			}).then(res => {
				console.log(res)
				if (res.result == 0) {
					this.list = res.dataobject.images
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
			goBuy() {
				uni.navigateTo({
					url: '/pages/message/message?type=' + this.obj.type + '&id=' + this.ids
				})
			},
			changeIndex(k) {
				this.navIndex = k
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../components/u-parse/u-parse.css");
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

			.product {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;

				.title {
					width: 100%;
					font-size: 30rpx;
					font-weight: 600;
					color: #333;
					margin: 30rpx 0;
				}

				.price {
					width: 100%;
					font-size: 30rpx;
					font-weight: 600;
					color: #fe5f23;
					margin-bottom: 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.content {
					width: 100%;
					font-size: 26rpx;
					color: #999;
					line-height: 20px;
					margin-bottom: 30rpx;
					text-align: justify;
				}
			}

			.produce {
				width: 100%;
				padding: 28rpx;
				box-sizing: border-box;
				margin-bottom: 120rpx;

				.column {
					width: 100%;
					border-radius: 6px;
					box-shadow: 0 0 5px rgba(0, 0, 0, .2);
					background: #FFFFFF;

					.nav {
						width: 100%;
						height: 80rpx;
						display: flex;
						justify-content: space-between;

						.nav-item {
							height: 80rpx;
							line-height: 80rpx;
							font-size: 28rpx;
							color: #333;
							padding: 0 28rpx;

							&.active {
								color: #fe5f23;
								border-bottom: 2px solid #fe5f23;
							}
						}
					}

					.text {
						width: 100%;
						padding: 28rpx;
						font-size: 28rpx;
						color: #666;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;

						image {
							width: 100%;
							margin-top: 30rpx;
						}
					}
				}
			}
		}

		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 90rpx;
			background: #FFFFFF;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;
			z-index: 999;

			.price {
				font-size: 30rpx;
				font-weight: 600;
				color: #fe5f23;
			}

			.buy {
				width: 160rpx;
				height: 70rpx;
				line-height: 70rpx;
				background: #fe5f23;
				border-radius: 4px;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
