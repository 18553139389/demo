<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">驿站会员</block>
			</cu-custom>
		</view>
		<view class="vip">
			<view class="card">
				<view class="card_name">
					<span>驿站金卡</span>
					<span>6222 0817 731</span>
				</view>
				<view class="card_name">
					<span class="price">到期时间：2020年5月20日</span>
				</view>
			</view>
		</view>
		<view class="reason">
			<view class="reason_content">
				<textarea placeholder="请输入退卡原因"></textarea>
			</view>
		</view>
		<view class="tip">退卡申请将提交后台管理员审核，具体审核结果已微信通知为准</view>
		<view class="card_btn">提交退卡申请</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Color: '#333333',
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
			open() {
				uni.navigateTo({
					url: '../opened/opened'
				});
			},
			bindCard() {
				uni.navigateTo({
					url: '../bind/bind'
				});
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.vip {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background: #eee;
	}
	
	.card {
		width: 100%;
		height: 260upx;
		border-radius: 6px;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.card_name {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
	}
	
	.reason {
		width: 100%;
		height: 260upx;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.reason>p {
		width: 100%;
		margin-top: 30upx;
	}
	
	.reason_content {
		width: 100%;
		height: 100%;
		border: 1px solid #eee;
		border-radius: 4px;
	}
	
	.reason_content>textarea {
		width: 100%;
		height: 100%;
		border: none;
		size: none;
		padding: 16upx 30upx;
		box-sizing: border-box;
		font-size: 14px;
		color: #333;
	}
	
	.tip {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		font-size: 12px;
	}
	
	.card_btn {
		width: 90%;
		border-radius: 4px;
		border: 1px solid #eee;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin: 160upx auto 0;
	}
</style>
