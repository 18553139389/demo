<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{head}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="titles">{{title}}</view>
			<u-parse :content="content" />
			<view class="zan">
				<image src="../../static/images/dian.png" @tap="goLike" v-if="like == 1"></image>
				<image src="../../static/images/weidian.png" @tap="goLike" v-if="like == 2"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import uParse from '../../components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				Color: '#333',
				content: '',
				title: '',
				head: '',
				ids: '',
				like: 2
			}
		},
		components: {
			uParse
		},
		onLoad(option) {
			this.ids = option.id
			if(option.type == 0) {
				this.head = '政策法规'
			} else {
				this.head = '典型案例'
			}
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let data3 = {
					uid: uni.getStorageSync('uid'),
					id
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'lawyerMessageById',
						data: data3,
						success: function(res) {
							console.log(res)
							if (res.data.success) {
								Toast.hideLoading()
								self.content = res.data.body.content
								self.title = res.data.body.title
								self.like = res.data.body.like
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goLike() {
				
				if(!uni.getStorageSync('uid')) {
					Toast.showToast('请先登录')
					return
				}
				
				let self = this
				let data3 = {
					uid: uni.getStorageSync('uid'),
					id: this.ids
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'like',
						data: data3,
						success: function(res) {
							console.log(res)
							if (res.data.success) {
								Toast.hideLoading()
								if(self.like == 1) {
									self.like = 2
								} else {
									self.like = 1
								}
								self.$forceUpdate()
								Toast.showToast(res.data.msg)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
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
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.titles {
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 30rpx;
			}
			
			.wxParse {
				text-align: justify;
			}
			
			.zan {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				
				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
		}
	}
</style>
