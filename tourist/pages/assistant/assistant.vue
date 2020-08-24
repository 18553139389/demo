<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">呼叫助理</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="item-list" v-for="(v,k) in list" :key="k">
				<view class="user">
					<text>{{v.username}}</text>
					<text>{{v.phone}}</text>
				</view>
				<view class="service">
					<text>服务时间：{{v.serviceTime}}</text>
				</view>
				<view class="service">
					<view class="content">{{v.content}}</view>
					<view class="call" @tap="call(v.phone)">快速呼叫</view>
				</view>
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
				backColor: '#FFFFFF',
				list: []
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.list = JSON.parse(option.list)
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
			call(phone) {
				console.log(phone)
				uni.makePhoneCall({
					phoneNumber: phone
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
		background: #F8F8F8;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30upx;
		box-sizing: border-box;
	}

	.item-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 4px;
		padding: 20upx;
		box-sizing: border-box;
		margin-bottom: 30upx;
	}

	.user {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		margin-bottom: 30upx;
	}

	.service {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		color: #333;
	}

	.content {
		width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.call {
		width: 160upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		border-radius: 4px;
		background: #DE2910;
		font-size: 14px;
		color: #fff;
	}
</style>
