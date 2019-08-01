<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange" interval="6000" previous-margin="50rpx" next-margin="50rpx" circular autoplay="autoplay">
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem" @tap.stop="goImg(item.type,item.content)">
						<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item.image" lazy-load mode="scaleToFill"></image>
						<view class="top" v-if="show">
							<!-- <slot name="content">
								<view class="card">{{item.cardType == 1 ? '黄金会员' : '钻石会员'}}</view>
								<view class="date">有效期1年</view>
								<view class="price">￥{{item.price}}</view>
							</slot> -->
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default: []
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: true
			},
		},
		data(){
			return {
				currentIndex: 0
			}
		},
		methods: {
			handleChange(e) {
				// console.log(e)
				this.currentIndex = e.detail.current
				this.changeList()
			},
			goImg(type,content) {
				this.$emit('goImg',type,content)
			},
			changeList() {
				this.$emit('changeList',this.currentIndex)
			}
		}
	}	
</script>
<style lang="scss">
	.card {
		font-size: 16px;
		color: #fff;
		margin-top: 60upx;
		margin-left: 60upx;
	}
	
	.date {
		font-size: 12px;
		color: #fff;
		margin-top: 20upx;
		margin-left: 60upx;
	}
	
	.price {
		font-size: 18px;
		color: #fff;
		margin-top: 50upx;
		margin-left: 60upx;
		font-weight: 600;
	}
	// 3D轮播样式
	.imageContainer {
		width: 100%;
		/* height: 500rpx; */
		/* background: #000; */
		height: 325upx;
		background-color: #fff;
	}
	
	.top {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 999;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height: 255upx;
		padding: 0upx 20upx;
		box-sizing: border-box;
		position: relative;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56upx;
			left: 51upx;
			z-index: 998;
			width:162upx;
			height:163upx;
			background:rgba(255,255,255,1);
			border-radius:8upx;
			padding:10upx;
			.name {
				font-size:26upx;
				font-weight:500;
				color:rgba(253,57,91,1);
				line-height:37upx;
				margin-bottom: 10upx;
			}
			.zq,.cz {
				font-size:20upx;
				color:rgba(253,57,91,1);
				line-height:35upx;
			}
			.addNl {
				width:120upx;
				height:26upx;
				background:rgba(253,57,91,1);
				border-radius:13upx;
				font-size:20upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 26upx;
				margin-top: 10upx;
			}
			
		}
	}
	
	.itemImg {
		position: absolute;
		width: 95%;
		/* height: 380rpx; */
		height: 255upx;
		border-radius: 15rpx;
		z-index: 5;
		opacity: 0.7;
		top: 5%;
		box-shadow:0px 4upx 15upx 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		width: 95%;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx; */
		height: 287upx;
		top: 0%;
		transition: all .2s ease-in 0s;
	}
	
	.zhankai{
		text-align: center;
		.iconfont{
			margin-left: 10upx;
		}
	}
</style>