<template>
	<view class="contain">
		<!-- <view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view> -->
		<view class="banner">
			<swiper class="swiper" :autoplay="autoplay" :interval="interval" circular="true" @change="change">
				<swiper-item v-for="(v,k) in banner" :key="k">
					<img style="width: 100%;height: 100%;" :src="v" alt="" @tap.stop="goPreview(k)">
				</swiper-item>
			</swiper>
			<view class="back" @tap="goBack">
				<img src="../../static/images/back1.png" alt="">
			</view>
			<view class="mark">{{swiperIndex}} / {{total}}</view>
		</view>
		<view class="wrapper">
			<u-parse :content="content" />
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				autoplay: true,
				interval: 5000,
				total: 0,
				swiperIndex: 1,
				Color: '#333',
				title: '',
				content: '',
				banner: [],
				loading: false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.title = decodeURIComponent(option.title)
			this.content = decodeURIComponent(option.content)
			this.banner = JSON.parse(option.banner)
			this.total = this.banner.length
			console.log(this.banner)
		},
		methods: {
			change(e) {
				this.swiperIndex = e.detail.current + 1
			},
			goBack() {
				uni.navigateBack({
				    delta: 1
				})
			},
			goPreview(k) {
				uni.previewImage({
					current: k,
					urls: this.banner
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
		
		.banner {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
		
			.swiper {
				width: 100%;
				height: 800upx;
			}
			
			.back {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0,0,0,.4);
				border-radius: 50%;
				font-size: 18px;
				color: #FFFFFF;
				position: absolute;
				left: 28upx;
				top: 28upx;
				
				img {
					width: 30upx;
					height: 30upx;
				}
			}
			
			.mark {
				padding: 10upx 30upx;
				background: rgba(0,0,0,.4);
				border-radius: 40px;
				font-size: 15px;
				color: #FFFFFF;
				position: absolute;
				right: 40upx;
				bottom: 40upx;
			}
		}

		.wrapper {
			position: absolute;
			left: 0;
			top: 830upx;
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28upx;
			box-sizing: border-box;

			.content {
				width: 100%;
				font-size: 14px;
				color: #333;
			}
		}
	}
</style>
