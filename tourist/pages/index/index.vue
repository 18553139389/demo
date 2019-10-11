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
		<swipers :imgList="bannerList" @goImg="goImg(arguments)" :show="false"></swipers>
		<view class="classify_list">
			<view class="list_type" @tap="goRoom">
				<image mode="scaleToFill" :src="icons[0]"></image>
				<text>贵宾厅</text>
			</view>
			<view class="list_type" @tap="goSafe('快速安检通道')">
				<image mode="scaleToFill" :src="icons[1]"></image>
				<text>快速安检通道</text>
			</view>
			<view class="list_type" @tap="goVery">
				<image mode="scaleToFill" :src="icons[2]"></image>
				<text>要客服务</text>
			</view>
			<view class="list_type" @tap="goCard">
				<image mode="scaleToFill" :src="icons[3]"></image>
				<text>驿站名片</text>
			</view>
			<view class="list_type" @tap="goHotel">
				<image mode="scaleToFill" :src="icons[4]"></image>
				<text>酒店</text>
			</view>
			<view class="list_type" @tap="goTrain">
				<image mode="scaleToFill" :src="icons[5]"></image>
				<text>火车票</text>
			</view>
			<view class="list_type" @tap="goAir">
				<image mode="scaleToFill" :src="icons[6]"></image>
				<text>机票</text>
			</view>
			<view class="list_type" @tap="goFlight">
				<image mode="scaleToFill" :src="icons[7]"></image>
				<text>航班动态</text>
			</view>
		</view>
		<view class="score">
			<view class="score_list" @tap="goShop">
				<image mode="scaleToFill" :src="images[0]"></image>
			</view>
			<view class="score_list" @tap="goScore">
				<image mode="scaleToFill" :src="images[1]"></image>
			</view>
		</view>
		<view class="hot">
			<view class="hot_title">
				<view class="hot_left">
					<view class="activity">热门活动</view>
					<img src="../../static/img/logo.png" alt="">
				</view>
				<view class="more" @tap="goHot">
					<span>更多</span>
					<img src="../../static/img/more.png" alt="">
				</view>
			</view>
			<view class="hot_wrapper">
				<view class="hot_list" v-for="(v,k) in activityList" :key="k" @tap="goDetail(v.activityUrl)">
					<view class="hot_img">
						<img :src="v.activityImage" alt="">
					</view>
				</view>
			</view>
			<model 
			:show="show" 
			:confirmText="confirmText"
			@confirm="confirm"
			@cancel="cancel"
			:content="content" 
			>
			</model>
		</view>
	</view>
</template>

<script>
	import jweixin from '../../common/js/wexin.js'
	import model from '../../components/model/model.vue'
	import swipers from '../../components/swiper/swiper.vue'
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#333333',
				value: '',
				backColor: '#FFFFFF',
				show: false,
				confirmText: '去开通',
				activityList: [],
				bannerList: [],
				icons: [],
				content: '',
				images: []
			}
		},
		components: {
			model,
			swipers
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			//初始化执行
			this.init()
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
				let url = window.location.href.split('#')[0]
				url = encodeURIComponent(url)
				let datas = {
					url: url
				}
				let data1 = {
					url: '/api/gzh/auth',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							jweixin.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: res.data.appId, // 必填，公众号的唯一标识
								timestamp: res.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: res.data.noncestr, // 必填，生成签名的随机串
								signature: res.data.signature, // 必填，签名，见附录1
								jsApiList: ['checkJsApi', 'getLocation']
							});
							jweixin.error(function(res) {
								//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
								console.log("错误说明" + res.errMsg)
							});
							jweixin.ready(function() {
								jweixin.getLocation({
									type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
									success: function(res) {
										var latitude = parseFloat(res.latitude); // 纬度，浮点数，范围为90 ~ -90
										var longitude = parseFloat(res.longitude); // 经度，浮点数，范围为180 ~ -180。
										var gc = new BMap.Geocoder();
										var pointAdd = new BMap.Point(longitude, latitude);
										gc.getLocation(pointAdd, function(rs){
										    // 百度地图解析城市名
											let city = rs.addressComponents.city
											if(city.indexOf('市') != -1){
												city = city.substring(0,city.indexOf('市'))
											}
											self.$store.commit('changeCurrentLat', latitude)
											self.$store.commit('changeCurrentLon', longitude)
											self.$store.commit('changeCurrentCity', city)
										})
									}
								})
							})
						}
					}
				}
				ajax(data1)
				
				let da = {
					uid: this.$store.state.uid
				}
				let data2 = {
					url: '/api/gzh/index',
					data: da,
					success: function(res){
						if(res.data.result == 0){
							if(res.data.activityList.length <= 3){
								self.activityList = res.data.activityList
							}else{
								for(let i=0;i<3;i++){
									self.activityList.push(res.data.activityList[i])
								}
							}
							self.bannerList = res.data.bannerList
							self.icons = res.data.icons
							self.images = res.data.images
							self.$store.commit('changeVip', res.data.vipType)
							self.$store.commit('changeCustomer', res.data.customer)
						}
					}
				}
				ajax(data2)
			},
			goRoom() {
				uni.navigateTo({
					url: '../vipRoom/vipRoom'
				})
			},
			goTrain() {
				uni.navigateTo({
					url: '../train/train'
				})
			},
			goAir() {
				uni.navigateTo({
					url: '../airTicket/airTicket'
				})
			},
			goFlight() {
				if(this.$store.state.vipType == 0){
					this.content = '成为会员才能查看航班动态'
					this.show = true
					return
				}
				uni.navigateTo({
					url: '../flightTab/flightTab'
				})
			},
			cancel() {
				this.show = false
			},
			confirm() {
				this.show = false
				uni.switchTab({
					url: '/pages/vip/vip'
				})
			},
			goMsg() {
				uni.navigateTo({
					url: '../message/message'
				})
			},
			goDetail(path) {
				uni.navigateTo({
					url: '../content/content?url=' + encodeURIComponent(path)
				})
			},
			goImg(argument) {
				if(argument[0] == 3) {
					uni.navigateTo({
						url: '../content/content?url=' + encodeURIComponent(argument[1])
					})
				}
			},
			goScore() {
				uni.navigateTo({
					url: '../friends/friends'
				})
			},
			goHot() {
				uni.navigateTo({
					url: '../hotDetail/hotDetail'
				})
			},
			goNo(tit) {
				uni.navigateTo({
					url: '../no/no?title=' + tit
				})
			},
			goSafe(tit) {
				uni.navigateTo({
					url: '../stage/stage?title=' + tit
				})
			},
			goVery() {
				uni.navigateTo({
					url: '../very/very'
				})
			},
			goCard() {
				if(this.$store.state.vipType == 0){
					this.content = '成为会员才能查看驿站名片'
					this.show = true
					return
				}
				uni.navigateTo({
					url: '../businessCard/businessCard'
				})
			},
			goHotel() {
				uni.navigateTo({
					url: '../hotel/hotel'
				})
			},
			goShop() {
				uni.switchTab({
					url: '../shop/shop'
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
	
	.msg {
		margin-right: 30upx;
		width: 38upx;
		height: 38upx;
	}
	
	.classify_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
		border-bottom: 12px solid #eee;
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
	}
	
	.score {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	
	.score_list {
		width: 48%;
		height: 180upx;
	}
	
	.score_list>image {
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
	
	.hot {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.hot_title {
		width: 100%;
		height: 80upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #333;
	}
	
	.hot_left {
		display: flex;
		align-items: center;
	}
	
	.hot_left>img {
		height: 30upx;
		margin-left: 20upx;
	}
	
	.activity {
		border-left: 2px solid #DE2910;
		padding-left: 20upx;
		font-size: 14px;
		color: #DE2910;
	}
	
	.more {
		display: flex;
		height: 80upx;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #DE2910;
	}
	
	.more>img {
		width: 14upx;
		height: 24upx;
		margin-left: 12upx;
	}
	
	.hot_wrapper {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.hot_list {
		width: 100%;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 30upx;
	}
	
	.hot_img {
		width: 100%;
		/* height: 260upx; */
	}
	
	.hot_img>img {
		width: 100%;
		height: 100%;
	}
	
	.hot_tit {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		font-size: 12px;
		color: #333;
		background: #eee;
	}
</style>
