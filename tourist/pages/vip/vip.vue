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
		<view class="vip" v-if="type == 0">
			<swipers :imgList="imgs" @changeList="changeList">
				<block slot="content"></block>
			</swipers>
		</view>
		<view style="background-color: #F8F8F8;padding: 30upx 0;" v-if="type == 1 || type == 2">
			<view class="vips">
				<!-- <view class="cards">{{type == 1 ? '黄金会员' : '钻石会员'}}</view>
				<view class="author">会员权益</view>
				<view class="content">持卡人可无限次使用驿站会员</view> -->
				<img :src="imgs" alt="">
			</view>
		</view>
		<view class="bind_produce" v-if="type == 0">
			<view class="cardsList">
				<view class="cards">{{cardType == 1 ? '黄金会员' : '钻石会员'}}</view>
				<view style="font-size: 36upx;color: #DE2910;">￥{{price}}</view>
			</view>
			<view style="font-size: 12px;color: #999;margin: 20upx 0;">有效期1年</view>
			<p style="line-height: 18px;">{{description}}</p>
		</view>
		<view class="control" v-if="type == 1 || type == 2">
			<view class="cardsList">
				<view class="cards">{{type == 1 ? '黄金会员' : '钻石会员'}}</view>
				<view>到期时间： {{endDate}}</view>
			</view>
			<view class="vipNum">会员卡号：{{card}}</view>
			<view class="priceBtns">
				<view class="up" style="background: #FF8C2F;" v-if="type == 1" @tap="upVip">升级</view>
				<view class="up" v-if="type == 1" @tap="upMoney">续费</view>
				<view class="money" v-if="type == 2" @tap="goMoney">续费</view>
			</view>
		</view>
		<view class="vip_share">
			<view class="share_title">
				<view style="border-left: 4px solid #DE2910;padding-left: 20upx;">驿站会员尊享权益</view>
				<img src="../../static/img/vip.png" alt="">
			</view>
		</view>
		<view class="classify_list">
			<view class="list_type" @tap="goDetail(v.title,v.content)" v-for="(v,k) in dataList" :key="k">
				<image mode="scaleToFill" :src="v.icon"></image>
				<text>{{v.title}}</text>
			</view>
		</view>
		<view class="bind_produces" v-if="type == 1 || type == 2">
			<view>会员权益</view>
			<p v-if="type == 1">{{description1}}</p>
			<p v-if="type == 2">{{description2}}</p>
		</view>
		<view class="btn" v-if="type == 1 || type == 2">
			<view class="card_btns" @tap="opens">申请补卡</view>
		</view>
		<view class="bind_card" v-if="type == 0 && price != 0">
			<view class="card_btn" @tap="bindCard">绑定会员卡</view>
		</view>
		<view class="bind_cards" v-if="type == 0 && price != 0">
			<view class="card_btn" @tap="open" style="background: #DE2910;margin-bottom: 30upx;">立即加入</view>
		</view>
	</view>
</template>

<script>
	import swipers from '../../components/swiper/swiper.vue'
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#FFFFFF',
				imgs: [],
				dataList: [],
				type: null,
				cardType: 1,
				card: '',
				endDate: '',
				price: 0,
				price1: 0,
				price2: 0,
				description: '',
				description1: '',
				description2: ''
			}
		},
		components: {
			swipers
		},
		onLoad() {
			// 刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/index',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.$store.commit('changeVip', res.data.vipType)
							self.$store.commit('changeCustomer', res.data.customer)
						}
					}
				}
				ajax(data)
			}
		},
		onShow() {
			let self = this
			setTimeout(function(){
				self.initType()
			},300)
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
			initType() {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/index',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							self.$store.commit('changeVip', res.data.vipType)
							self.type = res.data.vipType
							self.init()
						}
					}
				}
				ajax(data)
			},
			init() {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/vipCard',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							console.log(res.data.dataList)
							if (self.type == 0) {
								self.imgs = res.data.dataList
								self.dataList = res.data.dataList[0].equityList
								for (let i = 0; i < res.data.dataList.length; i++) {
									if (res.data.dataList[i].cardType == 1) {
										self.price = res.data.dataList[i].price
										self.description = res.data.dataList[i].description
									}
								}
							} else {
								self.card = res.data.cardNo
								self.endDate = res.data.endDate
								for (let i = 0; i < res.data.dataList.length; i++) {
									if (self.type == res.data.dataList[i].cardType) {
										self.imgs = res.data.dataList[i].image
										self.dataList = res.data.dataList[i].equityList
									}
									if (res.data.dataList[i].cardType == 1) {
										self.price1 = res.data.dataList[i].price
										self.description1 = res.data.dataList[i].description
									}
									if (res.data.dataList[i].cardType == 2) {
										self.price2 = res.data.dataList[i].price
										self.description2 = res.data.dataList[i].description
									}
								}
							}
						}
					}
				}
				ajax(data)
			},
			open() {
				uni.navigateTo({
					url: '../apply/apply?type=' + this.type + '&price=' + this.price + '&cardType=' + this.cardType
				})
			},
			upVip() {
				uni.navigateTo({
					url: '../apply/apply?type=2&price=' + this.price2 + '&cardType=2'
				})
			},
			upMoney() {
				uni.navigateTo({
					url: '../apply/apply?type=1&price=' + this.price1 + '&cardType=1'
				})
			},
			goMoney() {
				uni.navigateTo({
					url: '../apply/apply?type=1&price=' + this.price2 + '&cardType=2'
				})
			},
			bindCard() {
				uni.navigateTo({
					url: '../bind/bind'
				})
			},
			goDetail(title,content) {
				uni.navigateTo({
					url: '../vipDetail/vipDetail?content=' + content + '&title=' + title
				});
			},
			changeList(k) {
				this.dataList = []
				this.dataList = this.imgs[k].equityList
				this.price = this.imgs[k].price
				this.description = this.imgs[k].description
				this.cardType = this.imgs[k].cardType
			},
			opens() {
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
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.vip {
		width: 100%;
	}

	.vips {
		width: 90%;
		height: 300upx;
		margin: 0 auto;
		position: relative;
	}

	.vips>img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.control {
		position: relative;
		width: 100%;
		height: 300upx;
		padding: 80upx 30upx;
		box-sizing: border-box;
		background: url(../../static/img/cardbg.png) no-repeat;
		background-size: 100% 100%;
		margin-top: -90upx;
		font-size: 12px;
		color: #999;
		z-index: 10;
	}

	.vipNum {
		margin: 20upx 0;
		color: #DE2910;
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

	.money {
		width: 70%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		border-radius: 4px;
		margin: 0 auto;
	}

	.bind_produces>view {
		width: 100%;
		height: 50upx;
		font-size: 14px;
		color: #999;
		text-align: left;
	}

	.bind_produces>p {
		width: 100%;
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.bind_produces {
		width: 100%;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		background: #fff;
	}

	.cardsList {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cards {
		font-size: 16px;
		color: #333;
		/* padding-top: 60upx; */
		/* margin-left: 60upx; */
		z-index: 4;
		position: relative;
	}

	.author {
		font-size: 12px;
		color: #fff;
		margin-top: 40upx;
		margin-left: 60upx;
		z-index: 4;
		position: relative;
	}

	.content {
		font-size: 12px;
		color: #fff;
		margin-top: 10upx;
		margin-left: 60upx;
		z-index: 4;
		position: relative;
	}

	.msg {
		margin-right: 30upx;
		width: 38upx;
		height: 38upx;
		z-index: 4;
		position: relative;
	}

	.bind_card {
		width: 90%;
		margin: 30upx auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FF8C2F;
		border-radius: 4px;
		color: #fff;
		font-size: 15px;
	}
	
	.bind_cards {
		width: 90%;
		margin: 30upx auto 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		color: #fff;
		font-size: 15px;
	}

	.bind_produce>p {
		width: 100%;
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.card_btn {
		width: 100%;
		border-radius: 4px;
		border: 1px solid #eee;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}

	.bind_produce {
		width: 100%;
		padding: 0 30upx 30upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
		border-bottom: 8px solid #F8F8F8;
		box-sizing: border-box;
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

	.btn {
		width: 100%;
		background: #FFFFFF;
		padding-bottom: 140upx;
		margin-top: 30upx;
	}

	.card_btns {
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
