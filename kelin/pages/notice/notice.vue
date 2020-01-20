<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">通知</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul v-if="show && list.length > 0">
				<li v-for="(v,k) in list" :key="k">
					<view>{{v.createDate}}</view>
					<view class="detail">
						<view class="detail-title">重要通知提醒</view>
						<view class="detail-news">{{v.title}}</view>
						<view class="look">
							<view class="look-btn" @tap="goLook(v.title, v.url)">查看详情</view>
							<img src="../../static/images/xiayiye2.png" alt="">
						</view>
					</view>
				</li>
			</ul>
			<view class="noData" v-if="!show">
				<img src="http://www.mescroll.com/img/mescroll-empty.png" alt="">
				<view class="no">还没有新的系统通知</view>
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
				backColor: '#F8F9FB',
				show: true,
				list: []
			}
		},
		onLoad() {
			this.message = uni.getStorageSync('message')
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					Token: this.message.Token
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/notice',
						data: data1,
						success: function(res) {
							console.log(res)
							Toast.hideLoading()
							if (res.data.success == true) {
								if (res.data.body.list != 'undefined' && res.data.body.list.length > 0) {
									self.show = true
									self.list = res.data.body.list
								}else{
									self.show = false
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goLook(title, url) {
				uni.navigateTo({
				    url: `/pages/imgText/imgText?title=${title}&url=https://sale.clingcenter.net/${url}`
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
		background: #F8F9FB;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			padding: 28upx;
			box-sizing: border-box;
			
			ul {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				li {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 14px;
					color: #333;
					margin-bottom: 30upx;
					
					.detail {
						width: 100%;
						padding: 28upx;
						box-sizing: border-box;
						background: #FFFFFF;
						border-radius: 4px;
						display: flex;
						flex-direction: column;
						margin-top: 30upx;
						
						.detail-title {
							width: 100%;
							height: 60upx;
							line-height: 60upx;
							font-size: 14px;
							color: #666;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						
						.detail-news {
							width: 100%;
							height: 80upx;
							line-height: 80upx;
							font-size: 15px;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						
						.look {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							
							.look-btn {
								color: #007AFF;
							}
							
							img {
								width: 14upx;
								height: 24upx;
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
