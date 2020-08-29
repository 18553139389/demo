<template>
	<view class="contain">
		<view class="wrapper">
			<view class="title">{{head}}</view>
			<view class="box">
				<view class="tit">{{title}}</view>
				<u-parse :content="content" style="font-size: 15px;line-height: 20px;text-align: justify;" />
				<view class="zan">
					<image src="../../static/images/dian.png" @tap="goLike" v-if="like == 1"></image>
					<image src="../../static/images/weidian.png" @tap="goLike" v-if="like == 2"></image>
				</view>
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
				content: '',
				title: '',
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
				let data = {
					url: 'lawyerMessageById',
					data: data3,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							self.content = res.data.body.content
							self.title = res.data.body.title
							self.like = res.data.body.like
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
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
				let data = {
					url: 'like',
					data: data3,
					success: function(res) {
						console.log(res)
						if (res.data.success) {
							if(self.like == 1) {
								self.like = 2
							} else {
								self.like = 1
							}
							self.$forceUpdate()
							Toast.showToast(res.data.msg)
						} else {
							Toast.showToast(res.data.msg)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		
		.wrapper {
			width: 1200px;
			min-height: 100vh;
			margin: 0 auto;
			padding-top: 15rpx;
			box-sizing: border-box;
			
			.title {
				width: 100%;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				color: #333;
			}
			
			.box {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 15rpx;
				border-top: 1px solid #eee;
				
				.tit {
					width: 100%;
					text-align: center;
					font-size: 15px;
					color: #333;
					margin: 10rpx 0;
				}
				
				.zan {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 10rpx 0;
					
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
	}
</style>
