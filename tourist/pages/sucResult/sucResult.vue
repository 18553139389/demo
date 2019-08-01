<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="false" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">开卡成功</block>
			</cu-custom>
		</view>
		<view class="box">
			<view class="wrapper">
				<img src="../../static/img/huiyuanchengong.png" alt="">
				<text>恭喜您开通会员成功</text>
				<text style="color: #999;font-size: 12px;">开卡类型：小岗村驿站{{type == 1 ? '金卡' : '钻卡'}}会员</text>
				<text style="color: #999;font-size: 12px;">会员到期时间：{{time}}</text>
				<view class="btn" @tap="goVip">查看会员特权</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import jweixin from '../../common/js/wx.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				type: 0,
				time: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.type = option.type
			this.time = option.time
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
			goVip() {
				let self = this
				uni.switchTab({
					url: '../vip/vip'
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

	.box {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* border-top: 2px solid #eee; */
		padding-top: 200upx;
		font-size: 14px;
		color: #333;
	}

	.wrapper>img {
		width: 280upx;
	}

	.wrapper>text {
		margin-top: 30upx;
		font-size: 16px;
		color: #DE2910;
	}

	.btn {
		width: 70%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 4px;
		background: #DE2910;
		margin: 0 auto;
		font-size: 14px;
		color: #fff;
		margin-top: 100upx;
	}
</style>
