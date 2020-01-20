<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
				<block slot='right'>
					<img class="choice" src="../../static/images/more.png" alt="">
				</block>
			</cu-custom>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import share from "../../common/share.js"
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				show: false,
				url: '',
				ids: '',
				title: '',
				obj: {}
			}
		},
		onLoad(option) {
			// 获取传递过来的链接
			this.message = uni.getStorageSync('message')
			this.ids = option.ids
			this.url = option.url
			this.obj = JSON.parse(option.list)
			if(option.type == 5) {
				this.title = '全景360°'
			} else {
				this.title = '微页'
			}
			// #ifdef APP-PLUS
			let wv = plus.webview.create("", "custom-webview", {
				plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: uni.getSystemInfoSync().statusBarHeight + 44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			})
			wv.loadURL(option.url)
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			setTimeout(function() {
				console.log(wv.getStyle())
			}, 1000)
			// #endif
		},
		methods: {
			goRight() {
				let self = this
				uni.showActionSheet({
					itemList: ['分享', '收藏', '反馈'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
						console.log(JSON.stringify(self.obj))
						if (res.tapIndex == 0) {
							self.shareInfo()
						} else if (res.tapIndex == 1) {
							self.goStore()
						} else if (res.tapIndex == 2) {
							self.goSuggest()
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			shareInfo() {
				this.show = false
				let shareInfo = {
					href: this.url,
					title: this.obj.name,
					desc: this.obj.textIntroduce,
					imgUrl: this.obj.coverImage
				}
				let shareList = [{
						icon: "/static/images/wx.png",
						text: "微信好友",
					},
					{
						icon: "/static/images/pyq.png",
						text: "朋友圈"
					},
					{
						icon: "/static/images/qq.png",
						text: "QQ",
					}
				]
				this.shareObj = share(shareInfo, shareList, function(index) {
					let shareObj = {
						href: shareInfo.href || "",
						title: shareInfo.title || "",
						summary: shareInfo.desc || "",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
						},
						fail: (err) => {
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSceneSession";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider = "weixin";
							shareObj.scene = "WXSenceTimeline";
							shareObj.type = 0;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider = "qq";
							shareObj.type = 1;
							shareObj.imageUrl = shareInfo.imgUrl || "";
							uni.share(shareObj);
							break;
					}
				})
				this.$nextTick(() => {
					this.shareObj.alphaBg.show()
					this.shareObj.shareMenu.show()
				})
			},
			goStore() {
				this.show = false
				Toast.showToast('收藏成功')
			},
			goSuggest() {
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/popup/popup?id=' + this.ids
				})
				// #endif
				// #ifndef APP-PLUS
				uni.showModal({
					title: '仅支持App端'
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.fixed {
			width: 100%;

			.choice {
				width: 50upx;
				height: 50upx;

			}
		}

		.share {
			position: absolute;
			top: calc(100upx + var(--status-bar-height));
			right: 0;
			display: flex;
			flex-direction: column;
			background: rgba(0, 0, 0, .5);
			color: #FFFFFF;
			font-size: 14px;
			padding: 10upx 0;

			view {
				height: 70upx;
				line-height: 70upx;
				padding: 0 50upx;
			}
		}

		.web {
			width: 100%;
			height: 500upx;
			position: absolute;
			top: 200upx;
			left: 0;
		}
	}
</style>
