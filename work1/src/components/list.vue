<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<scroll :click="clicks" class="wrapper_box">
			<div class="formData">
				<div class="list">
					<span><i>*</i>车牌号：</span>
					<input v-model="tel" type="text" placeholder="请输入违规车辆车牌号">
				</div>
				<div class="list">
					<span><i>*</i>交警申请理由：</span>
					<div class="validate">
						<input v-model="code" type="text" placeholder="请输入加入黑名单的理由">
					</div>
				</div>
				<div class="list">
					<span>上传车辆信息</span>
				</div>
				<div class="cars">
					<div class="cars_img">
						<van-uploader :after-read="onRead1">
							<img src="../../static/img/add.png" alt="">
							<span>车辆行驶证</span>
							<img class="upImg" :src="load1" alt="">
						</van-uploader>
					</div>
					<div class="cars_img">
						<van-uploader :after-read="onRead2">
							<img src="../../static/img/add.png" alt="">
							<span>驾驶证照片</span>
							<img class="upImg" :src="load2" alt="">
						</van-uploader>
					</div>
				</div>
				<div class="list">
					<span>上传现场照片</span>
				</div>
				<div class="cars">
					<div class="cars_img">
						<van-uploader :after-read="onRead3">
							<img src="../../static/img/add.png" alt="">
							<span>上传现场照片</span>
							<img class="upImg" :src="load3" alt="">
						</van-uploader>
					</div>
				</div>
			</div>
		</scroll>
		<div class="btn" @click="submit">提交</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import Scroll from '@/components/component/scroll'
	import {
		Toast
	} from 'vant'

	export default {
		data() {
			return {
				text: '加入黑名单',
				tel: '',
				code: '',
				clicks: true,
				load1: '',
				load2: '',
				load3: '',
				uid: ''
			}
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		components: {
			MainHeader,
			Scroll
		},
		methods: {
			onRead1(item) {
				let self = this
				var formdata = new FormData()
				formdata.append('file',item.file)
				Request.postRequest('api/upload', formdata).then(res => {
					if (res.data.success == true) {
						self.load1 = res.data.body.list[0]
					}
				}).catch(res => {
					console.log(res)
				})
			},
			onRead2(item) {
				let self = this
				var formdata = new FormData()
				formdata.append('file',item.file)
				Request.postRequest('api/upload', formdata).then(res => {
					if (res.data.success == true) {
						self.load2 = res.data.body.list[0]
					}
				}).catch(res => {
					console.log(res)
				})
			},
			onRead3(item) {
				let self = this
				var formdata = new FormData()
				formdata.append('file',item.file)
				Request.postRequest('api/upload', formdata).then(res => {
					if (res.data.success == true) {
						self.load3 = res.data.body.list[0]
					}
				}).catch(res => {
					console.log(res)
				})
			},
			submit() {
				var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
				if (!express.test(this.tel)) {
					Toast('请输入合法的车牌号')
					return
				}

				if (this.code == '') {
					Toast('申请理由不能位空')
					return
				}

				if (this.load1 == '' || this.load2 == '' || this.load3 == '') {
					Toast('请上传图片')
					return
				}

				let self = this
				let datas = {
					uid: self.uid,
					plateNumber: self.tel,
					reason: self.code,
					driverLicence: self.load1,
					drivingLicence: self.load2,
					scence: self.load3
				}
				Request.postRequest('api/black/blacklist/add', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						Toast('提交成功')
						this.$router.go(-1)
					}else{
						Toast(res.data.msg)
					}
				}).catch(res => {
					console.log(res)
				})
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.formData {
		width: 100%;
		padding: 0.4rem 0.6rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.wrapper_box {
		width: 100%;
		position: absolute;
		top: 1rem;
		bottom: 50px;
		left: 0;
		overflow: hidden;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 0.8rem;
	}

	.list span {
		font-size: 16px;
		color: #333;
	}

	.list>input {
		width: 100%;
		border-bottom: 1px solid #eee;
		font-size: 16px;
		margin-top: 0.2rem;
		padding: 0.2rem 0;
	}

	.validate {
		width: 100%;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		padding: 0.2rem 0;
		font-size: 16px;
		margin-top: 0.2rem;
	}

	.validate input {
		width: 65%;
	}

	.validate button {
		display: inline-block;
		width: 30%;
		margin-left: 5%;
		font-size: 15px;
		background: #fff;
	}

	.text {
		font-size: 14px !important;
		color: #333;
	}

	.submit {
		width: 100%;
		border-radius: 8px;
		background: rgb(23, 173, 246);
		height: 1.2rem;
		font-size: 15px;
		color: #fff;
		margin-top: 0.8rem;
	}

	i {
		color: red;
	}

	.cars {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.cars>span {
		font-size: 15px;
		color: #333;
	}

	.cars_img {
		width: 48%;
		height: 2.5rem;
		border: 1px dashed #eee;
		margin-top: 0.8rem;
	}

	.cars_img img {
		width: 22px;
		height: 22px;
	}

	.cars_img span {
		font-size: 15px;
		color: #999;
	}

	.van-uploader {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 0.3rem 0;
		box-sizing: border-box;
	}

	.upImg {
		width: 100% !important;
		height: 100% !important;
		position: absolute;
		left: 0;
		top: 0;
	}

	.btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: #fff;
		background: #17ACE6;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
	}
</style>
