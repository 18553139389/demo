<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="false" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white">
				<!-- <block slot="backText"></block> -->
				<block slot="content">支付</block>
			</cu-custom>
		</view>
		<view class="list">
			<img src="../../static/img/feijizhifu.png" alt="">
			<view class="pay">支付成功！</view>
			<view class="look" @tap="goOrder">查看订单详情</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF'
			}
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
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
			goOrder() {
				uni.navigateTo({
					url: '../orderAir/orderAir'
				})
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
	
	.list {
		width: 100%;
		border-top: 8px solid #F8F8F8;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #F8F8F8;
	}
	
	.list>img {
		width: 260upx;
		height: 260upx;
		margin: 80upx 0;
	}
	
	.pay {
		width: 100%;
		font-size: 36upx;
		color: #DE2910;
		text-align: center;
		font-weight: 500;
	}
	
	.look {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		margin: 60upx auto;
		font-size: 15px;
		color: #fff;
		text-align: center;
		border-radius: 4px;
		background: #DE2910;
	}
	
</style>
