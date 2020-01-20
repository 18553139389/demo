<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">产品视频</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul v-if="show && imgList.length > 0">
				<li @tap="goVideo(v.id)" v-for="(v,k) in imgList" :key="k">
					<view class="plays">
						<image :src="v.snapshot"></image>
						<img class="btns" src="../../static/images/play.png" alt="">
					</view>
					<view class="video">
						<view class="video-title">{{v.name}}</view>
						<view class="video-head">
							<img style="width: 23upx;height: 28upx;" src="../../static/images/guanliyuan.png" alt="">
							<view>{{v.roleName}}</view>
						</view>
						<view class="video-head">
							<img style="width: 23upx;height: 23upx;" src="../../static/images/shangchuanshijian.png" alt="">
							<view>{{v.updateDate}} 上传</view>
						</view>
					</view>
				</li>
			</ul>
			<view class="noData" v-if="!show">
				<img src="http://www.mescroll.com/img/mescroll-empty.png" alt="">
				<view class="no">该产品还没有添加视频</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				ids: '',
				show: false,
				imgList: [],
				list: ''
			}
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.ids = option.id
			this.init(option.id)
			this.list = option.list
		},
		methods: {
			init(id) {
				let self = this
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id,
					infoType: 7
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/product/additional',
						data: data2,
						success: (res) => {
							Toast.hideLoading()
							if (res.data.success == true) {
								self.imgList = res.data.body.list
								self.show = true
							} else {
								self.show = false
							}
						}
					}
					ajax(data)
				})
			},
			goVideo(id) {
				let list = this.list
				uni.navigateTo({
				    url: `/pages/videoDetail/videoDetail?ids=${this.ids}&id=${id}&list=${list}`
				})
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
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			
			ul {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				li {
					width: 100%;
					display: flex;
					margin-bottom: 30upx;
					
					.plays {
						width: 37%;
						height: 180upx;
						position: relative;
						
						.btns {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							width: 60upx;
							height: 60upx;
							z-index: 99;
						}
					}
					
					image {
						width: 100%;
						height: 100%;
						border-radius: 4px;
						overflow: hidden;
					}
					
					.video {
						width: 63%;
						height: 180upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding-left: 34upx;
						box-sizing: border-box;
						
						.video-title {
							width: 100%;
							font-size: 15px;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						
						.video-head {
							display: flex;
							align-items: center;
							font-size: 12px;
							color: #999;
							
							img {
								margin-right: 20upx;
							}
						}
					}
				}
			}
			
			.noData {
				display: flex;
				flex-direction: column;
				align-items: center;
				
				img {
					width: 180upx;
					height: 180upx;
				}
				
				.no {
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					font-size: 14px;
					color: #333;
				}
			}
		}
	}
</style>
