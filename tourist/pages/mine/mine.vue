<template>
	<view class="contain">
		<view class="top">
			<img :src="head" alt="">
			<img class="set" @tap="set" src="../../static/img/shezhi.png" alt="">
		</view>
		<view class="name">{{name}}</view>
		<view class="msg">
			<view>{{tel}}</view>
			<view class="editor" @tap="editor">编辑资料</view>
		</view>
		<view class="tabs">
			<view class="tab" @tap="goScore">
				<img src="../../static/img/jifen.png" alt="">
				<view>我的纪念币</view>
			</view>
			<view class="tab" @tap="goOrder">
				<img src="../../static/img/dingdan.png" alt="">
				<view>我的订单</view>
			</view>
			<view class="tab" @tap="goFriends">
				<img src="../../static/img/yaoqinghaoyou.png" alt="">
				<view>邀请好友</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item" @tap="goTogether">
				<view class="list-left">
					<img src="../../static/img/shangwuhezuo.png" alt="">
					<view>商务合作</view>
				</view>
				<img style="height: 30upx;" src="../../static/img/right.png" alt="">
			</view>
			<view class="list-item" @tap="goSuggest">
				<view class="list-left">
					<img src="../../static/img/fankui.png" alt="">
					<view>意见反馈</view>
				</view>
				<img style="height: 30upx;" src="../../static/img/right.png" alt="">
			</view>
			<view class="list-item" @tap="goUs">
				<view class="list-left">
					<img src="../../static/img/guanyuwomen.png" alt="">
					<view>关于我们</view>
				</view>
				<img style="height: 30upx;" src="../../static/img/right.png" alt="">
			</view>
		</view>
		<view class="call" style="font-size:15px;" @tap="goCall">客服电话:{{call}}</view>
		<view class="call" style="font-size:15px;margin-top: 0;" @tap="goCall">投诉电话:{{call}}</view>
	</view>
</template>

<script>
	import { ajax } from '../../common/js/util.js'
	export default {
		data() {
			return {
				name: '',
				head: '',
				tel: '',
				call: '',
				scores: 0
			}
		},
		onLoad() {
			this.call = this.$store.state.customer
		},
		onReady() {
		
		},
		onShow() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
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
					url: '/api/gzh/userInfo',
					data: datas,
					success: function(res){
						if(res.data.result == 0) {
							self.head = res.data.icon
							self.name = res.data.username
							self.tel = res.data.phone
							self.scores = res.data.point
						}
					}
				}
				ajax(data)
			},
			goScore() {
				uni.navigateTo({
					url: '../score/score?scores=' + this.scores
				})
			},
			goOrder() {
				uni.navigateTo({
					url: '../order/order'
				})
			},
			editor() {
				uni.navigateTo({
					url: '../editor/editor'
				})
			},
			choose() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.url = tempFilePaths[0]
						console.log(tempFilePaths[0])
						// uni.uploadFile({
						// 	url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						// 	filePath: tempFilePaths[0],
						// 	name: 'file',
						// 	formData: {
						// 		'user': 'test'
						// 	},
						// 	success: (uploadFileRes) => {
						// 		console.log(uploadFileRes.data);
						// 	}
						// });
					}
				});
			},
			goFriends() {
				uni.navigateTo({
					url: '../friends/friends'
				})
			},
			set() {
				uni.navigateTo({
					url: '../set/set'
				})
			},
			goUs() {
				uni.navigateTo({
					url: '../content/content?url=' + encodeURIComponent('http://m.xgcyz1978.com/display/agreement?id=1')
				})
			},
			goNo(tit) {
				uni.navigateTo({
					url: '../noOpen/noOpen?title=' + tit
				})
			},
			goCall() {
				let self = this
				uni.makePhoneCall({
					phoneNumber: self.call
				})
			},
			goSuggest() {
				uni.navigateTo({
					url: '../suggest/suggest'
				})
			},
			goTogether() {
				uni.navigateTo({
					url: '../together/together'
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
	
	.top {
		width: 100%;
		height: 300upx;
		background: url(../../static/img/beij.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		position: relative;
	}
	
	.top>img {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}
	
	.top .set {
		position: absolute;
		top: 50upx;
		right: 30upx;
		width: 46upx;
		height: 46upx;
	}
	
	
	.name {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 16px;
		color: #333;
	}
	
	.msg {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #333;
	}
	
	.editor {
		font-size: 12px;
		color: #fff;
		padding: 4upx 30upx;
		background: #DE2910;
		border-radius: 30px;
		margin-left: 30upx;
	}
	
	.tabs {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 14px;
		color: #333;
		margin-top: 30upx;
		border-top: 1px solid #F8F8F8;
		border-bottom: 4px solid #F8F8F8;
		padding: 30upx 0;
	}
	
	.tab {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.tab>view {
		margin-top: 12upx;
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	
	.list-item {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}
	
	.list-left {
		display: flex;
		align-items: center;
	}
	
	.list-left>img {
		width: 44upx;
	}
	
	.list-left>view {
		margin-left: 20upx;
	}
	
	.call {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		margin-top: 60upx;
	}
</style>
