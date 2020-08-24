<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">
					<img style="height: 60upx;" src="../../static/img/logo.png" alt="">
				</block>
				<block slot="right">
					<img class="msg" src="../../static/img/msg.png" @tap="goMsg" alt="">
				</block>
			</cu-custom>
		</view>
		<view style="background-color: #F8F8F8;padding: 30upx 0;">
			<view class="vip">
				<view class="cards">至尊金卡</view>
				<view class="author">会员权益</view>
				<view class="content">持卡人可无限次使用驿站会员</view>
			</view>
		</view>
		<view class="control">
			<view class="vipNum">会员卡号：1234567890</view>
			<view>到期时间： 2019-08-30</view>
			<view class="priceBtns">
				<view class="up" style="background: #FF8C2F;">升级</view>
				<view class="up">续费</view>
			</view>
		</view>
		<view class="vip_share">
			<view class="share_title">
				<view style="border-left: 4px solid #DE2910;padding-left: 20upx;">驿站会员尊享权益</view>
				<img src="../../static/img/vip.png" alt="">
			</view>
		</view>
		<view class="classify_list">
			<view class="list_type" @tap="goDetail">
				<image mode="scaleToFill" src="../../static/img/jichang.png"></image>
				<text>机场贵宾厅</text>
			</view>
			<view class="list_type">
				<image mode="scaleToFill" src="../../static/img/gaotieguibin.png"></image>
				<text>高铁贵宾厅</text>
			</view>
			<view class="list_type">
				<image src="../../static/img/chengjipai.png" style="width: 70upx;"></image>
				<text>代换乘机牌</text>
			</view>
			<view class="list_type">
				<image mode="scaleToFill" src="../../static/img/yanwubaozhang.png"></image>
				<text>航班延误保障</text>
			</view>
			<view class="list_type">
				<image mode="scaleToFill" src="../../static/img/baozhang.png"></image>
				<text>交通意外保障</text>
			</view>
			<view class="list_type">
				<image src="../../static/img/dikou.png" style="width: 70upx;"></image>
				<text>PLUS出行抵扣</text>
			</view>
		</view>
		<view class="bind_produce">
			<view>会员权益</view>
			<p>金卡会员，持卡人本人可无限次使用驿站会员，赠送12次高铁贵宾厅休息+12次机场贵宾厅休息，有效期一年，开通最高可省2019元</p>
		</view>
		<view class="btn">
			<view class="card_btn" @tap="open">申请补卡</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#FFFFFF',
				imgs: ['../../static/img/img1.jpeg', '../../static/img/img2.jpeg'],
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
			open() {
				uni.navigateTo({
					url: '../replaceCard/replaceCard'
				})
			},
			bindCard() {
				uni.navigateTo({
					url: '../bind/bind'
				})
			},
			goRight() {
				uni.navigateTo({
					url: '../replaceCard/replaceCard'
				})
			},
			goMsg() {
				uni.navigateTo({
					url: '../message/message'
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
	
	.msg {
		margin-right: 30upx;
		width: 38upx;
		height: 38upx;
	}

	.vip {
		width: 90%;
		height: 300upx;
		background: url(../../static/img/jinka.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
	}
	
	.bind_produce>view {
		width: 100%;
		height: 50upx;
		font-size: 14px;
		color: #999;
		text-align: left;
	}
	
	.bind_produce>p {
		width: 100%;
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.bind_produce {
		width: 100%;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		background: #fff;
	}

	.vip_share {
		width: 100%;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
	
	.share_title {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 15px;
		color: #333;
	}
	
	.share_title>img {
		height: 44upx;
		margin-left: 20upx;
	}
	
	.share_title>text {
		margin-left: 30upx;
	}

	.classify_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 14px;
		color: #333;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
	}

	.list_type {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
	}

	.list_type text {
		font-size: 12px;
		color: #333;
	}

	.list_type>image {
		width: 66upx;
		height: 66upx;
		margin-bottom: 12upx;
		border-radius: 50%;
	}
	
	.cards {
		font-size: 16px;
		color: #fff;
		padding-top: 60upx;
		margin-left: 60upx;
	}
	
	.author {
		font-size: 12px;
		color: #fff;
		margin-top: 40upx;
		margin-left: 60upx;
	}
	
	.content {
		font-size: 12px;
		color: #fff;
		margin-top: 10upx;
		margin-left: 60upx;
	}
	
	.control {
		width: 100%;
		height: 300upx;
		padding: 80upx 30upx;
		box-sizing: border-box;
		background: url(../../static/img/cardbg.png) no-repeat;
		background-size: 100% 100%;
		margin-top: -90upx;
		font-size: 12px;
		color: #999;
	}
	
	.vipNum {
		margin-bottom: 20upx;
	}
	
	.priceBtns {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30upx;
	}
	
	.up {
		padding: 16upx 80upx;
		border-radius: 4px;
		background: #DE2910;
		font-size: 14px;
		color: #fff;
	}
	
	.btn {
		width: 100%;
		background: #FFFFFF;
		padding-bottom: 140upx;
	}
	
	.card_btn {
		width: 90%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		border-radius: 4px;
		margin: 0 auto;
	}
</style>
