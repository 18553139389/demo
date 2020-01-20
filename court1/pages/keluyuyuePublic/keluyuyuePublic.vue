<template>
	<view class="contain">
		<view class="forms">
			<view class="form-item">
				<view>犯罪嫌疑人姓名</view>
				<input type="text" v-model="user" placeholder="请输入" placeholder-class="place">
			</view>
			<view class="form-item">
				<view>案由</view>
				<input type="text" v-model="title" placeholder="请输入" placeholder-class="place">
			</view>
			<view class="form-item">
				<view>申请人身份</view>
				<input type="text" v-model="apply" placeholder="请输入" placeholder-class="place">
			</view>
			<view class="form-item">
				<view>申请人姓名</view>
				<input type="text" v-model="names" placeholder="请输入" placeholder-class="place">
			</view>
			<view class="form-item">
				<view>联系方式</view>
				<input type="text" v-model="tel" placeholder="请输入" placeholder-class="place">
			</view>
			<view class="form-item">
				<view>申请人身份证号码</view>
				<input type="text" v-model="card" placeholder="请输入" placeholder-class="place">
			</view>
			<view class="form-item">
				<view>申请卷宗时间</view>
				<!-- <input type="text" v-model="time" placeholder="请选择" placeholder-class="place" disabled> -->
				<date-picker @getData="getData"></date-picker>
			</view>
			<view class="tit">证件上传</view>
			<view class="upload">
				<view class="upload-item" @tap="load(1)">
					<view class="icon">+</view>
					<view>律师证</view>
					<img :src="img1" alt="">
				</view>
				<view class="upload-item" @tap="load(2)">
					<view class="icon">+</view>
					<view>身份证</view>
					<img :src="img2" alt="">
				</view>
				<view class="upload-item" @tap="load(3)">
					<view class="icon">+</view>
					<view>律师委托函</view>
					<img :src="img3" alt="">
				</view>
			</view>
			<view class="submit" @tap="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import datePicker from '../../components/dy-Date/dy-Date.vue'
	import toast from '../../common/js/toast.js'
	import {ajax} from '../../common/js/util.js'
	import global_ from '../../common/js/global.js'
	export default {
		data() {
			return {
				user: '',
				title: '',
				apply: '',
				names: '',
				tel: '',
				card: '',
				time: '',
				img1: '',
				img2: '',
				img3: '',
				img4: '',
				img5: '',
				img6: '',
				url: global_.baseUrl
			}
		},
		components: {
			datePicker
		},
		methods: {
			submit() {
				if (this.user == '') {
					toast.showTitle('姓名不能为空')
					return
				}

				if (this.title == '') {
					toast.showTitle('请输入案由')
					return
				}

				if (this.apply == '') {
					toast.showTitle('请输入申请人身份')
					return
				}

				if (this.names == '') {
					toast.showTitle('请输入申请人姓名')
					return
				}

				if (this.tel == '') {
					toast.showTitle('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					toast.showTitle('手机号格式不正确')
					return
				}

				let idcardReg =/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if (this.card == '') {
					toast.showTitle('身份证不能为空')
					return
				} else if (!(idcardReg.test(this.card))) {
					toast.showTitle('身份证不合法')
					return
				}

				if (this.time == '') {
					toast.showTitle('请选择时间')
					return
				}

				if (this.img1 == '' || this.img2 == '' || this.img3 == '') {
					toast.showTitle('请上传证件图片')
					return
				}
				
				let self = this
				let datas = {
					uid: uni.getStorageSync('uid'),
					suspect: this.user,
					cause: this.title,
					lname: this.names,
					identity: this.apply,
					idnum: this.card,
					telnum: this.tel,
					readingDate: this.time,
					lawyerCertificate: this.img4,
					idCard: this.img5,
					attorneyLetter: this.img6
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/lawyerRecord/submit',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							toast.showTitle('提交成功')
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 500)
						}
					}
				}
				ajax(data)
			},
			load(type) {
				let self = this
				let datas = {
					uid: self.$store.state.uid
				}
				toast.showLoading('上传中...')
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths
						uni.uploadFile({
							url: 'https://24h.haisongzi.com/service/uploadFile',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: datas,
							success: (uploadFileRes) => {
								toast.hideLoading()
								let path = JSON.parse(uploadFileRes.data)
								if (type == 1) {
									self.img1 = self.url + path.body.filePath
									self.img4 = path.body.filePath
								} else if (type == 2) {
									self.img2 = self.url + path.body.filePath
									self.img5 = path.body.filePath
								} else if (type == 3) {
									self.img3 = self.url + path.body.filePath
									self.img6 = path.body.filePath
								}
							}
						})
					}
				})
			},
			getData(val) {
				console.log(val)
				this.time = val
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #fff;
	}

	.contain {
		width: 100%;
		height: 100%;
		border-top: 1px solid #eee;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.form-item {
		width: 100%;
		height: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16upx 0;
		border-bottom: 1px solid #eee;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
	}

	input {
		width: 65%;
		text-align: right;
	}

	.place {
		font-size: 14px;
		color: #999;
	}

	.tit {
		width: 100%;
		height: 84upx;
		line-height: 84upx;
		font-size: 14px;
		color: #333;
	}

	.upload {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.upload-item {
		width: 45%;
		height: 180upx;
		background: #f6f6f6;
		border-radius: 4px;
		margin-right: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #aaa;
		margin-bottom: 30upx;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
		box-shadow: 1px 1px 5px #bbb;
	}

	.upload-item>img {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.icon {
		width: 70upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 50%;
		border: 1px solid #aaa;
		text-align: center;
		font-size: 18px;
		color: #aaa;
		margin-bottom: 20upx;
	}

	.submit {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		border-radius: 4px;
		background: #007AFF;
		margin: 0 auto;
	}
</style>
