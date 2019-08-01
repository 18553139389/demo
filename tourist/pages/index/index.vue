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
			<view class="list_type" @tap="goNo('快速安全通道')">
				<image mode="scaleToFill" :src="icons[1]"></image>
				<text>快速安全通道</text>
			</view>
			<view class="list_type" @tap="goNo('要客服务')">
				<image mode="scaleToFill" :src="icons[2]"></image>
				<text>要客服务</text>
			</view>
			<view class="list_type" @tap="goNo('驿站名片')">
				<image mode="scaleToFill" :src="icons[3]"></image>
				<text>驿站名片</text>
			</view>
			<view class="list_type" @tap="goNo('酒店')">
				<image mode="scaleToFill" :src="icons[4]"></image>
				<text>酒店</text>
			</view>
			<view class="list_type" @tap="goNo('火车票')">
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
			<view class="score_list" @tap="goNo('积分商城')">
				<image mode="scaleToFill" src="../../static/img/jifenshangchengtu.png"></image>
			</view>
			<view class="score_list" @tap="goScore">
				<image mode="scaleToFill" src="../../static/img/yaohaoyou.png"></image>
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
			content="成为会员才能查看航班动态" 
			>
			</model>
		</view>
	</view>
</template>

<script>
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
				icons: []
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
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/index',
					data: datas,
					success: function(res){
						console.log(res)
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
							self.$store.commit('changeVip', res.data.vipType)
							self.$store.commit('changeCustomer', res.data.customer)
						}
					}
				}
				ajax(data)
			},
			goRoom() {
				uni.navigateTo({
					url: '../vipRoom/vipRoom'
				})
			},
			goAir() {
				uni.navigateTo({
					url: '../airTicket/airTicket'
				})
			},
			goFlight() {
				if(this.$store.state.vipType == 0){
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
					url: '../noOpen/noOpen?title=' + tit
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
		/* padding: 30upx 30upx 0; */
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
		border-radius: 50%;
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
