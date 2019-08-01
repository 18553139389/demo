<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">贵宾厅详情</block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in imgs" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="air">
			<view class="air-text">
				<view>{{listData.title}}</view>
				<text>营业时间：{{listData.openTime}}</text>
			</view>
			<img src="../../static/img/hujiaozhuli.png" @tap="goService" alt="">
		</view>
		<view class="location">
			<view class="title">位置说明</view>
			<view class="produce">{{listData.address}}</view>
		</view>
		<view class="service">
			<view class="title">服务内容</view>
			<!-- <view class="service_content">{{texts}}</view> -->
		</view>
		<view class="classify_list">
			<view class="list_type" v-for="(v,k) in serviceList" :key="k" @tap="goContent(v.name,v.content)">
				<image mode="scaleToFill" :src="v.icon"></image>
				<text>{{v.name}}</text>
			</view>
		</view>
		<view class="notice">
			<view class="title" style="margin-bottom: 20upx;">服务须知</view>
			<view class="mark">{{listData.introduction}}</view>
		</view>
		<!-- <view class="pay">
			<view class="money">实付款： <text>￥1978</text></view>
			<view class="payBtn">立即支付</view>
		</view> -->
		<view class="sort" @tap="goOrder">立即预约</view>
		<!-- <view class="pay" v-if="listData.isVip == 1">
			<view class="money">实付款： <text>￥1978</text></view>
			<view class="payBtn" @tap="paySuc">立即支付</view>
		</view> -->
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				imgs: [],
				listData: [],
				serviceList: [],
				assistantList: [],
				id: '',
				name: '',
				isVip: '',
				notice: '',
				price: '',
				texts: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.id = option.id
			this.init()
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
			init() {
				let self = this
				let datas = {
					vipHallId: this.id,
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/vipHallDetail',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.imgs = res.data.images
							self.listData = res.data
							self.listData.address = self.unescape(self.listData.address)
							console.log(self.listData.address)
							self.serviceList = res.data.serviceList
							if(res.data.serviceList.length > 0) {
								self.texts = res.data.serviceList[0].content
							}
							self.assistantList = res.data.assistantList
							self.name = res.data.title
							self.isVip = res.data.isVip
							self.notice = res.data.introduction
							self.price = res.data.price
							console.log(self.isVip)
							// self.$store.commit('changeRefund', res.data.refund)
						}
					}
				}
				ajax(data)
			},
			unescape: function(html) {
				return html
					.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
					.replace(/&lt;/g, "<")
					.replace(/&gt;/g, ">")
					.replace(/&quot;/g, "\"")
					.replace(/&ldquo;/g, "“")
					.replace(/&rdquo;/g, "”")
					.replace(/&#39;/g, "\'");
			},
			goOrder() {
				console.log(this.isVip)
				uni.navigateTo({
					url: '../vipAppointment/vipAppointment?name=' + encodeURIComponent(this.name) + '&id=' + this.id + '&isVip=' + this.isVip + '&notice=' + encodeURIComponent(this.notice) + '&price=' + this.price
				})
			},
			goService() {
				uni.navigateTo({
					url: '../assistant/assistant?list=' + JSON.stringify(this.assistantList)
				})
			},
			paySuc() {
				
			},
			goContent(name,con) {
				this.texts = con
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

	.msg {
		margin-right: 30upx;
		width: 40upx;
		height: 40upx;
	}

	.air {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.air-text {
		display: flex;
		flex-direction: column;
	}

	.air-text>view {
		font-size: 14px;
		color: #333;
	}

	.air-text>text {
		font-size: 12px;
		color: #333;
		margin-top: 10upx;
	}

	.location,
	.notice {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.title {
		width: 100%;
		padding-left: 20upx;
		box-sizing: border-box;
		border-left: 4px solid red;
		font-size: 14px;
		color: #333;
	}

	.produce {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #999;
	}

	.classify_list {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		flex-wrap: wrap;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		/* border-top: 1px solid #eee; */
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

	.service {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		/* border-bottom: 1px solid #eee; */
	}

	.service_title {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #333;
	}

	.service_content {
		width: 100%;
		font-size: 12px;
		color: #999;
		margin-top: 20upx;
		text-align: justify;
		padding-left: 30upx;
	}

	.notice {
		padding-top: 30upx;
		padding-bottom: 130upx;
	}

	.mark {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #999;
	}

	.sort {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #DE2910;
		color: #fff;
		font-size: 15px;
	}
	
	.pay {
		width: 100%;
		height: 100upx;
		padding-left: 30upx;
		border-top: 2px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.money {
		height: 100upx;
		line-height: 100upx;
	}
	
	.money>text {
		margin-left: 30upx;
		color: red;
	}
	
	.payBtn {
		height: 100upx;
		line-height: 100upx;
		font-size: 14px;
		color: #fff;
		padding: 0 40upx;
		background: #DE2910;
	}
</style>
