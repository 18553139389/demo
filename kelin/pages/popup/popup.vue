<template>
	<view class="mask">
		<view class="suggest" @tap="close">
			<view class="suggest-bg" @click.stop="">
				<view class="contents">如果您对材料有任何意见或建议，请在此填写提交</view>
				<view class="texts">
					<textarea v-model="val" placeholder="请输入反馈信息~" cursor-spacing="100" @input="maxFont" maxlength="100"></textarea>
					<span>{{total}}/100</span>
				</view>
				<view class="btns" @tap="goSubmit">提交</view>
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
				val: '',
				ids: ''
			}
		},
		computed: {
			total() {
				let len = 0
				if (this.val.length > 0) {
					len = this.val.length
				} else {
					len = 0
				}
				return len
			}
		},
		onLoad(option) {
			this.message = uni.getStorageSync('message')
			this.ids = option.id
		},
		methods: {
			maxFont() {
				if (this.val.length >= 100) {
					Toast.showToast('反馈内容不能超过100字')
					return
				}
			},
			close() {
				uni.navigateBack()
			},
			goSubmit() {
				let self = this
				if(self.val == '') {
					Toast.showToast('内容不能为空')
					return
				}
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: 3,
					content: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/feedback/add',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								Toast.showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
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
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		
		.suggest {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 100000000000;
			background: rgba(0, 0, 0, .5);
		
			.suggest-bg {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				padding: 40upx 28upx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-top-left-radius: 30px;
				border-top-right-radius: 30px;
		
				.contents {
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					font-size: 14px;
					color: #666;
				}
		
				.texts {
					width: 100%;
					display: flex;
					flex-direction: column;
					background: #FAFAFA;
					border-radius: 4px;
					border: 1px solid #eee;
					padding: 24upx;
					box-sizing: border-box;
					align-items: flex-end;
		
					textarea {
						width: 100%;
						height: 240upx;
		
					}
				}
		
				.btns {
					width: 40%;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					border-radius: 30px;
					background: #0081FF;
					font-size: 14px;
					color: #FFFFFF;
					margin: 40upx auto 0;
				}
			}
		}
	}
</style>
