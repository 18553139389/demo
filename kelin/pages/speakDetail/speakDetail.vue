<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">销售话术</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<img :src="obj.coverImage" alt="">
				<view class="titles">{{obj.title}}</view>
				<view class="update">更新时间：{{obj.updateDate}}</view>
				<view class="btns">
					<view class="preview" @tap="downloader(obj.previewUrl)">预览</view>
				</view>
				<ul class="mark">
					<li @click="goSuggest">
						<img src="../../static/images/fankui.png" alt="">
						<span>反馈</span>
					</li>
					<li @tap="goZan">
						<img src="../../static/images/huace_dianzan.png" alt="">
						<span>点赞({{count}})</span>
					</li>
					<li @click="goStore">
						<img :src="store ? '../../static/images/huace_shoucang2.png' : '../../static/images/huace_shoucang.png'" alt="">
						<span>收藏</span>
					</li>
				</ul>
			</view>
		</view>
		<view class="suggest" v-if="show" @click="goHide">
			<view class="suggest-bg" @click.stop="">
				<view class="contents">如果您对材料有任何意见或建议，请在此填写提交</view>
				<view class="texts">
					<textarea v-model="val" placeholder="请输入反馈信息~" cursor-spacing="100" @input="maxFont" @confirm="goSubmit" maxlength="100"></textarea>
					<span>{{total}}/100</span>
				</view>
				<view class="btns" @tap.stop="goSubmit">提交</view>
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
				obj: {},
				count: 0,
				total: 0,
				liked: false,
				store: false,
				show: false,
				val: '',
				ids: ''
			}
		},
		onLoad(option) {
			
			this.message = uni.getStorageSync('message')
			this.ids = option.id
			this.init()
		},
		methods: {
			init() {
				let self = this
				//请求故事案例详情数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/salesTechniques/detail',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.obj = res.data.body.techniques
								self.store = res.data.body.techniques.collected
								self.liked = res.data.body.techniques.liked
								self.count = res.data.body.techniques.likedCount
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goStore() {
				let self = this
				if (!this.store) {
					//收藏成功
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 11
					}
					let data = {
						url: '/app/service/collect/add',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.store = !self.store
								Toast.showToast('收藏成功')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				} else {
					//取消收藏
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 11
					}
					let data = {
						url: '/app/service/collect/delete',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.store = !self.store
								Toast.showToast('取消收藏')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				}
			},
			maxFont() {
				if (this.val.length >= 100) {
					Toast.showToast('反馈内容不能超过100字')
					return
				}
				this.total = this.val.length
			},
			goSuggest() {
				this.show = true
			},
			goSubmit() {
				let self = this
				if (self.val == '') {
					Toast.showToast('内容不能为空')
					return
				}
				//请求空调详情数据
				let data2 = {
					Token: this.message.Token,
					id: this.ids,
					infoType: 11,
					content: this.val
				}
				Toast.showLoading('加载中...', function() {
					let data = {
						url: '/app/service/feedback/add',
						data: data2,
						success: (res) => {
							if (res.data.success == true) {
								Toast.hideLoading()
								self.show = false
								self.val = ''
								self.total = 0
								Toast.showToast('提交成功')
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				})
			},
			goHide() {
				this.show = false
			},
			downloader(path) {
				let url = 'https://sale.clingcenter.net/' + path
				uni.navigateTo({
				    url: `/pages/parse/parse?url=${url}&type=3`
				})
			},
			goZan() {
				let self = this
				if (!this.liked) {
					//点赞成功
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 11
					}
					let data = {
						url: '/app/service/like/add',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.count++
								self.liked = !self.liked
								Toast.showToast('点赞成功')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				} else {
					//取消点赞
					let data2 = {
						Token: this.message.Token,
						id: this.ids,
						infoType: 11
					}
					let data = {
						url: '/app/service/like/delete',
						data: data2,
						success: (res) => {
							console.log(res)
							if (res.data.success == true) {
								self.count--
								self.liked = !self.liked
								Toast.showToast('取消点赞')
							} else {
								Toast.showToast(res.data.msg)
							}
						}
					}
					ajax(data)
				}
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
		background: #F8F9FB;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			padding: 0 28upx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 40upx;

			.list {
				width: 100;
				padding: 40upx;
				box-sizing: border-box;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-items: center;

				img {
					width: 260upx;
					height: 180upx;
					border-radius: 4px;
				}

				.titles {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 24upx 0;
					font-size: 14px;
					color: #333;
				}

				.update {
					width: 100%;
					height: 40upx;
					line-height: 40upx;
					text-align: center;
					font-size: 12px;
					color: #999;
				}

				.btns {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 30upx;

					.preview {
						padding: 0 80upx;
						height: 60upx;
						line-height: 60upx;
						text-align: center;
						font-size: 14px;
						color: #FFFFFF;
						background: #0081FF;
						border-radius: 30px;
					}
				}

				.mark {
					width: 100%;
					display: flex;
					align-items: center;
					margin: 30upx 0;

					li {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						font-size: 14px;
						color: #999;

						img {
							width: 40upx;
							height: 40upx;
							margin-bottom: 20upx;
						}
					}
				}
			}
		}

		.suggest {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 10000;
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
