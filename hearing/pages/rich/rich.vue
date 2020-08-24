<template>
	<view class="contain">
		<scroll-view class="box scroll-Y" scroll-y="true" style="height: calc(100vh - 88rpx);">
			<view class="content">
				<view class="title">资讯标题</view>
				<input class="inputs" type="text" v-model="val" placeholder="请输入资讯标题">
				<jxImgTextEdit ref="jxImgTextEdit" :editData="edits" @delImg="delImg"></jxImgTextEdit>
				<!-- 底部 -->
			</view>
		</scroll-view>
		<view class="footer" id="footer">
			<view class="submit" @tap="goSubmit">提交</view>
			<view class="upImg_btn" @click="uploadImg()">
				<image class="image" src="../../static/images/tjzp.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import jxImgTextEdit from '../../components/jx-imgText-edit/jx-imgText-edit.vue'
	export default {
		components: {
			jxImgTextEdit
		},
		data() {
			return {
				Color: '#333',
				backColor: '#fff',
				val: '',
				edits: [],
				img2: [],
				num: -1
			}
		},
		onLoad(option) {
			this.edits = [];
			this.edits.push({
				type: 'textarea',
				value: ''
			});
		},
		methods: {
			uploadImg() {
				let self = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://xcx.boinhearing.cn/api/addimgs', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										let obj = JSON.parse(uploadFileRes.data)
										self.img2.push(obj.objects[0])
										console.log(self.img2)
										let data = self.$refs.jxImgTextEdit.submit()
										data.push({
											type: 'img',
											value: obj.objects[0]
										})
										data.push({
											type: 'textarea',
											value: ''
										})
										self.edits = data
										console.log(self.edits)
									},
									fail: (res) => {
										Toast.hideLoading()
										Toast.showToast('上传失败')
									}
								})
							})
						})
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			//删除图片
			delImg(index) {
				let arr = this.img2
				arr.forEach((item, ind) => {
					if(item == this.edits[index]['value']) {
						arr.splice(ind,1)
					}
				})
				this.img2 = arr
				this.edits.splice(index, 1)
				if (this.edits[index].value == "") {
					this.edits.splice(index, 1)
				}
			},
			//提交
			goSubmit() {
				let data = this.$refs.jxImgTextEdit.submit()
				console.log(data)
				let content = `` //富文本html
				let content_raw = `` //获取输入的文字
				data.forEach(ele => {
					if (ele.type == "textarea" && ele.value != "") {
						content += `<p style='margin: 0'>${ele.value}</p>`
						content_raw += `${ele.value}。`
					} else if (ele.type == "img" && ele.value != "") {
						content += `<p style='margin-top: 10px'><img style='max-width:100%' src='${ele.value}'/></p>`
					}
				})
				console.log(content)
				let self = this
				if(this.val == '') {
					Toast.showToast('标题不能为空')
					return
				}
				if(this.content == '') {
					Toast.showToast('资讯详情不能为空')
					return
				}
				let img2 = this.img2.join('|')
				let data1 = {
					cmd: 'saveHearthToo',
					message: this.val,
					content: encodeURIComponent(content),
					images: img2,
					uid: uni.getStorageSync('uid')
				}
				console.log(data1)
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								uni.navigateTo({
								    url: '/pages/publicResult/publicResult'
								})
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
		padding: 0 28rpx;
		box-sizing: border-box;

		.fixed {
			width: 100%;
			position: relative;
			z-index: 9999;
		}
		
		.box {
			width: 100%;
			padding-bottom: 24rpx;
			
			.content {
				width: 100%;
				display: flex;
				flex-direction: column;
				min-height: 80vh;
				padding-bottom: 30rpx;
				
				.title {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 30rpx;
					color: #333;
				}
				
				.inputs {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					border-bottom: 1px solid #eee;
					font-size: 30rpx;
					color: #333;
				}
			}
		}

		.footer {
			width: 100%;
			height: 88rpx;
			position: fixed;
			z-index: 80;
			left: 0;
			bottom: 0px;
			border-top: 1rpx solid #E6E6E6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #FFF;
			padding: 0 28rpx;
			box-sizing: border-box;
			
			.submit {
				width: 140rpx;
				height: 50rpx;
				border-radius: 4px;
				background: #06A5C4;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				color: #fff;
			}

			.upImg_btn {
				width: 100rpx;
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>
