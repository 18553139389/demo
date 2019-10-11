<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="false" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content" v-if="type == 1">开卡成功</block>
				<block slot="content" v-if="type == 2">续费成功</block>
				<block slot="content" v-if="type == 3">升级成功</block>
			</cu-custom>
		</view>
		<view class="box">
			<view class="wrapper" v-if="type == 1 && cardType == 1">
				<img src="../../static/img/huiyuanchengong.png" alt="">
				<text>恭喜您开通黄金会员成功</text>
				<text style="color: #999;font-size: 12px;">开卡类型：小岗村驿站黄金会员</text>
				<text style="color: #999;font-size: 12px;">会员到期时间：{{time}}</text>
				<view class="btn" @tap="goVip">查看会员特权</view>
			</view>
			<view class="wrapper" v-if="type == 1 && cardType == 2">
				<img src="../../static/img/huiyuanchengong.png" alt="">
				<text>恭喜您开通钻石会员成功</text>
				<text style="color: #999;font-size: 12px;">开卡类型：小岗村驿站钻石会员</text>
				<text style="color: #999;font-size: 12px;">会员到期时间：{{time}}</text>
				<view class="btn" @tap="goVip">查看会员特权</view>
			</view>
			<view class="wrapper" v-if="type == 2 && cardType == 1">
				<img src="../../static/img/huiyuanchengong.png" alt="">
				<text>恭喜您续费黄金会员成功</text>
				<text style="color: #999;font-size: 12px;">开卡类型：小岗村驿站黄金会员</text>
				<text style="color: #999;font-size: 12px;">会员到期时间：{{time}}</text>
				<view class="btn" @tap="goVip">查看会员特权</view>
			</view>
			<view class="wrapper" v-if="type == 2 && cardType == 2">
				<img src="../../static/img/huiyuanchengong.png" alt="">
				<text>恭喜您续费钻石会员成功</text>
				<text style="color: #999;font-size: 12px;">开卡类型：小岗村驿站钻石会员</text>
				<text style="color: #999;font-size: 12px;">会员到期时间：{{time}}</text>
				<view class="btn" @tap="goVip">查看会员特权</view>
			</view>
			<view class="wrapper" v-if="type == 3 && cardType == 2">
				<img src="../../static/img/huiyuanchengong.png" alt="">
				<text>恭喜您升级会员成功</text>
				<text style="color: #999;font-size: 12px;">开卡类型：黄金会员升级为钻石会员</text>
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
				list: {},
				cardType: 0,
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
			this.list = JSON.parse(option.list)
			this.cardType = this.list.cardType
			this.type = this.list.type
			this.time = this.list.time
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
