<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品视频</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="video">
				<video :src="imgList.content" objectFit="cover"></video>
			</view>
			<view class="title">{{imgList.name}}</view>
			<view class="content">
				<view class="left">
					<view class="icon" style="margin-right: 30upx;">
						<img style="width: 23upx;height: 28upx;" src="../../static/images/guanliyuan.png" alt="">
						<view>{{imgList.roleName}}</view>
					</view>
					<view class="icon">
						<img style="width: 28upx;height: 28upx;" src="../../static/images/shangchuanshijian.png" alt="">
						<view>{{imgList.updateDate}} 上传</view>
					</view>
				</view>
				<view class="right" @tap="shareInfo">
					<img src="../../static/images/huace_fenxiang.png" alt="">
					<span>分享</span>
				</view>
			</view>
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
				imgList: {},
				obj: {}
			}
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.init(option.ids,option.id)
			this.obj = JSON.parse(option.list)
		},
		methods: {
			init(ids,id) {
				let self = this
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id: ids,
					infoType: 7
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								res.data.body.list.forEach((item) => {
									if(item.id == id) {
										self.imgList = item
									}
								})
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			shareInfo() {
				let shareInfo = {
					href: this.imgList.content,
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28upx;
			background: #F8F9FB;
			
			.video {
				width: 100%;
				height: 400upx;
				display: flex;
				flex-direction: column;
				border-radius: 4px;
				overflow: hidden;
				
				video {
					width: 100%;
					height: 100%;
				}
			}
			
			.title {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				font-size: 14px;
				color: #333;
			}
			
			.content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.left {
					display: flex;
					align-items: center;
					
					.icon {
						display: flex;
						align-items: center;
						font-size: 12px;
						color: #999;
						
						img {
							margin-right: 20upx;
						}
					}
				}
				
				.right {
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #333;
					
					img {
						width: 40upx;
						height: 40upx;
						margin-right: 20upx;
					}
				}
			}
		}
	}
</style>
