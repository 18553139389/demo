<template>
	<view class="contain">
		<view class="list">
			<web-view :webview-styles="webviewStyles" :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				url: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.url = decodeURIComponent(option.url)
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
		background: #FFFFFF;
		overflow: hidden;
	}
	
	.list {
		width: 94%;
		height: 100%;
		position: relative;
		margin: 0 auto;
	}
	
	web-view {
		width: 100%;
		padding: 30upx 0;
	}
</style>
