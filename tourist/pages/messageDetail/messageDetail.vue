<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">消息详情</block>
			</cu-custom>
		</view>
		<view class="title">{{title}}</view>
		<view class="content">{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#FFFFFF',
				title: '',
				content: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			
			this.title = option.title
			this.content = option.content
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
