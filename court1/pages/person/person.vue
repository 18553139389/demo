<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="text-white">
				<block slot="content">个人中心</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="top">
				<view class="head">
					<img :src="head" alt="">
				</view>
			</view>
			<view class="name">{{user}}</view>
			<view class="wrapper">
				<view class="item" @tap="goSui">
					<view class="item-left">
						<img src="../../static/img/wodesuishoupai.png" alt="">
						<view>我的随手拍</view>
					</view>
					<view class="item-right">
						<view>{{list.complPhotographCount}}</view>
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
				<view class="item" @tap="goLv">
					<view class="item-left">
						<img src="../../static/img/falvfuwu.png" alt="">
						<view>法律服务</view>
					</view>
					<view class="item-right">
						<view>{{list.complLawCount}}</view>
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
				<view class="item" @tap="goMin">
					<view class="item-left">
						<img src="../../static/img/minshishensu.png" alt="">
						<view>民事申诉</view>
					</view>
					<view class="item-right">
						<view>{{list.appealPenalCount}}</view>
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
				<view class="item" @tap="goXing">
					<view class="item-left">
						<img src="../../static/img/xingshishensu.png" alt="">
						<view>刑事申诉</view>
					</view>
					<view class="item-right">
						<view>{{list.appealCivilCount}}</view>
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
				<view class="item" @tap="goXingZheng">
					<view class="item-left">
						<img src="../../static/img/xingzhengshensu.png" alt="">
						<view>行政申诉</view>
					</view>
					<view class="item-right">
						<view>{{list.appealGoverCount}}</view>
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
				<view class="item" @tap="goJu">
					<view class="item-left">
						<img src="../../static/img/wodejubao.png" alt="">
						<view>我的举报</view>
					</view>
					<view class="item-right">
						<view>{{list.appealReportCount}}</view>
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
				<view class="item" @tap="goAbout">
					<view class="item-left">
						<img src="../../static/img/guanyuwomen.png" alt="">
						<view>关于我们</view>
					</view>
					<view class="item-right">
						<img src="../../static/img/wode-jiantou.png" alt="">
					</view>
				</view>
			</view>
		</view>
		<TabBar :itemIndex="itemIndex" @changeItem="changeItem"></TabBar>
	</view>
</template>

<script>
	import TabBar from '../../components/tabbar/tabbar.vue'
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	export default {
		data() {
			return {
				itemIndex: 2,
				Color: '#fff',
				backColor: '#3175E4',
				user: '',
				head: '',
				list: {},
				about: ''
			}
		},
		components: {
			TabBar
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid')
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/user/center',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							self.list = res.data.body
							self.user = res.data.body.nickName
							self.head = res.data.body.avatarUrl
							self.about = res.data.body.aboutUsUrl
							self.$store.commit('changeHead', res.data.body.avatarUrl)
						}
					}
				}
				ajax(data)
			},
			changeItem(k) {
				if (k == 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (k == 2) {
					uni.switchTab({
						url: '/pages/person/person'
					})
				} else if (k == 3) {
					uni.navigateTo({
						url: '../law/law'
					})
				}
			},
			goSui() {
				uni.navigateTo({
					url: '../suishoupai/suishoupai'
				})
			},
			goLv() {
				uni.navigateTo({
					url: '../falvshensu/falvshensu'
				})
			},
			goXing() {
				uni.navigateTo({
					url: '../xingshishensu/xingshishensu'
				})
			},
			goMin() {
				uni.navigateTo({
					url: '../minshishensu/minshishensu'
				})
			},
			goXingZheng() {
				uni.navigateTo({
					url: '../xingzhengshensu/xingzhengshensu'
				})
			},
			goJu() {
				uni.navigateTo({
					url: '../jubaojilu/jubaojilu'
				})
			},
			goAbout() {
				uni.navigateTo({
					url: '../about/about?url='+this.about
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #f6f6f6;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.list {
		width: 100%;
		position: absolute;
		z-index: -1;
		display: flex;
		flex-direction: column;
		background: #fff;
	}
	
	.top {
		position: relative;
		width: 100%;
		height: 150upx;
		background: #3175E4;
	}
	
	.head {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		background: #fff;
		position: absolute;
		left: 50%;
		margin-left: -80upx;
		bottom: -80upx;
		padding: 10upx;
		box-sizing: border-box;
	}
	
	.head>img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.name {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 15px;
		color: #333;
		margin: 90upx 0 20upx;
	}
	
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-top: 4px solid #f6f6f6;
	}
	
	.item {
		width: 100%;
		height: 90upx;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}
	
	.item-left {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
	}
	
	.item-left>img {
		width: 36upx;
		height: 36upx;
		margin-right: 30upx;
	}
	
	.item-right {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #999;
	}
	
	.item-right>img {
		width: 18upx;
		height: 30upx;
		margin-left: 20upx;
	}
</style>
