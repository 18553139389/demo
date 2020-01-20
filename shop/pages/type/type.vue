<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">分类名称</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="lists">
				<view class="item">
					<img src="../../static/images/1.jpg" alt="">
					<view class="product">
						<view class="product-title">最新润肤化妆品精品系列</view>
						<view class="product-msg">
							<view class="product-price">
								<view style="color: red;margin-right: 60upx;">￥198</view>
								<view style="color: #999;">已收98</view>
							</view>
							<view class="btns">我有货</view>
						</view>
					</view>
				</view>
				<view class="item">
					<img src="../../static/images/1.jpg" alt="">
					<view class="product">
						<view class="product-title">最新润肤化妆品精品系列</view>
						<view class="product-msg">
							<view class="product-price">
								<view style="color: red;margin-right: 60upx;">￥198</view>
								<view style="color: #999;">已收98</view>
							</view>
							<view class="btns">我有货</view>
						</view>
					</view>
				</view>
				<view class="item">
					<img src="../../static/images/1.jpg" alt="">
					<view class="product">
						<view class="product-title">最新润肤化妆品精品系列</view>
						<view class="product-msg">
							<view class="product-price">
								<view style="color: red;margin-right: 60upx;">￥198</view>
								<view style="color: #999;">已收98</view>
							</view>
							<view class="btns">我有货</view>
						</view>
					</view>
				</view>
				<view class="item">
					<img src="../../static/images/1.jpg" alt="">
					<view class="product">
						<view class="product-title">最新润肤化妆品精品系列</view>
						<view class="product-msg">
							<view class="product-price">
								<view style="color: red;margin-right: 60upx;">￥198</view>
								<view style="color: #999;">已收98</view>
							</view>
							<view class="btns">我有货</view>
						</view>
					</view>
				</view>
				<view class="item">
					<img src="../../static/images/1.jpg" alt="">
					<view class="product">
						<view class="product-title">最新润肤化妆品精品系列</view>
						<view class="product-msg">
							<view class="product-price">
								<view style="color: red;margin-right: 60upx;">￥198</view>
								<view style="color: #999;">已收98</view>
							</view>
							<view class="btns">我有货</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333'
			}
		},
		onLoad() {

		},
		methods: {

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
			
			.lists {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-bottom: 40upx;
			
				.item {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-top: 60upx;
			
					img {
						width: 230upx;
						height: 230upx;
						border-radius: 4px;
					}
			
					.product {
						width: 65%;
						height: 230upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding-left: 18upx;
						box-sizing: border-box;
						font-size: 30upx;
						color: #111111;
			
						.product-title {
							overflow: hidden;
							display: -webkit-box; 
							text-overflow: ellipsis; 
							-webkit-line-clamp: 2; 
							-webkit-box-orient: vertical; 
							white-space: normal;
						}
			
						.product-msg {
							width: 100%;
							display: flex;
							flex-direction: column;
			
							.product-price {
								font-size: 24upx;
								display: flex;
								align-items: center;
							}
			
							.btns {
								width: 75%;
								height: 70upx;
								line-height: 70upx;
								text-align: center;
								font-size: 30upx;
								color: #FFFFFF;
								background: #111111;
								border-radius: 30px;
								margin-top: 16upx;
							}
						}
					}
				}
				
				.item:first-child {
					margin-top: 0;
				}
			}
		}
	}
</style>
