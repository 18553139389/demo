<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBacks="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white" @Back="Back">
				<block slot="backText"></block>
				<block slot="content">我的订单</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="item" @tap="goAir">
				<view class="item-left">
					<img src="../../static/img/jipiaodingdan.png" alt="">
					<view style="margin-left: 20upx;">机票订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item">
				<view class="item-left">
					<img src="../../static/img/huochepiao.png" alt="">
					<view style="margin-left: 20upx;">火车票订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item">
				<view class="item-left">
					<img src="../../static/img/jiudiandingdan.png" alt="">
					<view style="margin-left: 20upx;">酒店订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item" @tap="goVip">
				<view class="item-left">
					<img src="../../static/img/xiuxidingdan.png" alt="">
					<view style="margin-left: 20upx;">贵宾厅订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item">
				<view class="item-left">
					<img src="../../static/img/kuaisutongdao.png" alt="">
					<view style="margin-left: 20upx;">快速安检通道订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item">
				<view class="item-left">
					<img src="../../static/img/yaokefuwu.png" alt="">
					<view style="margin-left: 20upx;">要客服务订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item" @tap="goShop">
				<view class="item-left">
					<img src="../../static/img/huiyuanshangchengdingdan.png" alt="">
					<view style="margin-left: 20upx;">会员商城订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item" @tap="goVipList">
				<view class="item-left">
					<img src="../../static/img/vipOrder.png" alt="">
					<view style="margin-left: 20upx;">会员卡订单</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
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
		onReady() {
	
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
			Back() {
				uni.switchTab({
					url: '../mine/mine'
				})
			},
			goAir() {
				uni.navigateTo({
					url: '../orderAir/orderAir'
				})
			},
			goVip() {
				uni.navigateTo({
					url: '../vipOrder/vipOrder'
				})
			},
			goVipList() {
				uni.navigateTo({
					url: '../vipOrderList/vipOrderList'
				})
			},
			goShop() {
				uni.navigateTo({
					url: '../shopList/shopList'
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
	}
	
	.item {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}
	
	.item-left {
		display: flex;
		align-items: center;
	}
	
	.item-left>img {
		width: 44upx;
	}
	
	.item>img {
		width: 30upx;
	}
</style>
