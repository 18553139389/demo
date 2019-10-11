<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">下单成功</block>
			</cu-custom>
		</view>
		<view class="list">
			<img class="recommend_img" src="../../static/img/shopSuc.png" alt="">
			<view class="suc">下单成功！</view>
			<view class="look" @tap="look">查看订单详情</view>
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
		onLoad(option) {
			this.type = option.type
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
			Back() {
				uni.navigateBack({
					delta: 1
				})
			},
			look() {
				uni.navigateTo({
					url: '../hotelOrder/hotelOrder'
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
		background: #F9F9F9;
		position: relative;
	}

	.list {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: sapce-around;
	}

	.list>img {
		width: 260upx;
		margin-top: 200upx;
	}

	.suc {
		font-size: 20px;
		color: #DE2910;
		margin-top: 100upx;
	}

	.look {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		background: #DE2910;
		border-radius: 4px;
		text-align: center;
		font-size: 16px;
		color: #fff;
		margin-top: 100upx;
	}
</style>
