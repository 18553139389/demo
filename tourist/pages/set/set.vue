<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">设置</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="item" @tap="goService">
				<view class="item-left">
					<view>服务说明</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item" @tap="goQuestion">
				<view class="item-left">
					<view>常见问题</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<!-- <view class="item" @tap="goModify">
				<view class="item-left">
					<view>交易密码设置</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="item" @tap="goForget">
				<view class="item-left">
					<view>交易密码修改</view>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view> -->
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
			goService() {
				uni.navigateTo({
					url: '../content/content?url=' + encodeURIComponent('https://m.xgcyz1978.com/display/agreement?id=2')
				})
			},
			goQuestion() {
				uni.navigateTo({
					url: '../content/content?url=' + encodeURIComponent('https://m.xgcyz1978.com/display/agreement?id=3')
				})
			},
			goModify() {
				uni.navigateTo({
					url: '../setPass/setPass'
				})
			},
			goForget() {
				uni.navigateTo({
					url: '../setForget/setForget'
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
