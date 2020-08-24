<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">消息详情</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="item">
				<!-- <view class="circle"></view> -->
				<view class="message">
					<view class="warn-title">{{list.title}}</view>
					<view class="time">{{list.createDate}}</view>
					<u-parse :content="html" @navigate="navigate"></u-parse>
				</view>
			</view>
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
				id: '',
				html: '',
				list: {}
			}
		},
		components:{
			uParse
		},
		onLoad(option) {
			this.id = option.id
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data1 = {
					cmd: 'getMsgById',
					id
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.list = res.data
								self.html = res.data.content
								console.log(res)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
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
			padding: 28rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			
			.item {
				width: 100%;
				display: flex;
				padding: 18rpx 0;
				box-sizing: border-box;
				border-radius: 4px;
				background: #fff;
				margin-bottom: 24rpx;
				
				.circle {
					width: 24rpx;
					height: 24rpx;
					background: #E52031;
					border-radius: 50%;
					margin-top: 8rpx;
				}
				
				.message {
					width: 80%;
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;
					box-sizing: border-box;
					
					.warn {
						display: flex;
						align-items: center;
						
						.warn-title {
							font-size: 30rpx;
							color: #08A8C0;
							font-weight: 600;
						}
					}
					
					.content {
						width: 100%;
						font-size: 28rpx;
						color: #333;
						padding: 28rpx 0 0;
						border-top: 1px solid #eee;
					}
					
					.time {
						width: 100%;
						font-size: 24rpx;
						color: #999;
						margin: 24rpx 0;
					}
				}
			}
		}
	}
</style>
