<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="content">专家信息</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list-left">
				<image :src="list.headImage"></image>
				<view class="message">
					<view class="m_title">{{list.nickName}}</view>
					<view class="m_method">研究方向：{{list.specialty}}</view>
					<view class="m_content">{{list.company + list.dept}}</view>
				</view>
			</view>
			<view class="list-msg">
				<!-- <view>{{list.content}}</view> -->
				<u-parse :content="list.content"></u-parse>
			</view>
			<view class="speak" @tap="goTalk">立即咨询</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from "../../components/feng-parse/parse.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				list: {},
				id: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.init(option.id,option.index)
		},
		components: {
			uParse
		},
		methods: {
			init(id,index) {
				let self = this
				//获取顶部导航列表
				let data1 = {
					uid: uni.getStorageSync('uid'),
					zId: id,
					type: index
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/vipInfo',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data.dataList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goTalk() {
				console.log(this.list.id)
				// wx.$app.updateMyProfile({ nick: uni.getStorageSync('nick'),avatar:uni.getStorageSync('icon')})
				this.empty(this.list.id)
			},
			empty(id) {
				// 发起会话
				this.$store.dispatch('checkoutConversation', `C2C${id}`)
				.then(() => {
					
				})
				.catch(() => {
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
			border-top: 10px solid #f6f6f6;
			
			.list-left {
				width: 100%;
				display: flex;
				background: #fff;
				padding: 40rpx 28rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 4px;
				}
				
				.message {
					width: 80%;
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 28rpx;
					color: #333;
					padding-left: 24rpx;
					
					.m_title {
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					
					.m_method {
						font-size: 26rpx;
						color: #0081FF;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					
					.m_content {
						font-size: 26rpx;
						color: #999;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
			
			.list-msg {
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 28rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: #333;
				background: #fff;
				
				image {
					width: 100%;
					margin: 28rpx 0;
				}
			}
			
			.speak {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				font-weight: 600;
				border-radius: 30px;
				background: #2862A1;
				margin: 40rpx auto;
			}
		}
	}
</style>
