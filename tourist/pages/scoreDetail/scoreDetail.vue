<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">纪念币规则</block>
			</cu-custom>
		</view>
		<view class="title">机票预订成功通知</view>
		<view class="content">
			购买飞机票成功了购买飞机票成功了购买飞机票成功了购买飞机票成功了购买飞机票成功了购买飞机票成功了。
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
		background: #F8F8F8;
	}
	
	.title {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
		text-align: justify;
	}
	
	.content {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #999;
		text-align: justify;
	}
</style>
