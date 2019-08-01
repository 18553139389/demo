<template>
	<div id="accountInfo">
		<mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask="isShowMask"></mp-loading>
		<div class="title">
			<p>个人头像</p>
			<div class="logo" @click="changImg">
				<img :src="head" alt="">
			</div>
		</div>

		<div class="InfoList">
			<div>
				<span>姓</span>
				<input type="text" placeholder="请输入用户的姓" v-model="lastName">
			</div>
			<div>
				<span>名</span>
				<input type="text" placeholder="请输入用户的名" v-model="firstName">
			</div>
			<div @click="showItem">
				<span>性别</span>
				<input type="primary" v-model="genderValue" class="btn" disabled="disabled">
				<div class="right_icon">
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<mp-picker ref="mpPicker" :pickerValueArray="list1" @onConfirm="sure"></mp-picker>
		<mp-picker ref="mpPicker" :pickerValueArray="list2" @onConfirm="sure"></mp-picker>
		<mp-toast type="success" v-model="validateSuc" content="保存成功" duration="1500"></mp-toast>
		<mp-toast type="warn" v-model="validateError" content="保存失败" duration="1500"></mp-toast>
		<button @click="save" class="save">保存</button>
	</div>
</template>

<script>
	import mpPicker from 'mpvue-weui/src/picker'
	import mpButton from 'mpvue-weui/src/button'
	import mpToast from 'mpvue-weui/src/toast';
	import mpLoading from 'mpvue-weui/src/loading';
	export default {
		data() {
			return {
				show: false,
				list2: [{
					label: '女'
				}, {
					label: '男'
				}],
				genderValue: '',
				firstName: '',
				lastName: '',
				head_portrait: '',
				head: "../../../static/img/user.jpg",
				validateSuc: false,
				validateError: false,
				isShowLoading: false,
			}
		},
		components: {
			mpLoading,
			mpPicker,
			mpToast,
			mpButton
		},
		mounted() {
			this.init()
		},
		methods: {
			showItem() {
				console.log(1111)
				this.$refs.mpPicker.show();
			},
			sure(item) {
				console.log(item)
				this.genderValue = item.label
			},
			changImg() {
				let that = this
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						var tempFilePaths = res.tempFilePaths[0];
						// that.head_portrait =  res.tempFilePaths[0]
						// that.head =  res.tempFilePaths[0]
						console.log(tempFilePaths);
						var base64 = 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(tempFilePaths, "base64");
						that.head_portrait = base64
						that.head = base64
						console.log(that.head_portrait, "图片地址")
					}
				})
			},
			init() {
				let that = this
				that.isShowLoading = true
				let endpoint = this.$store.getters['server/getEndpoint']
				let token = this.$store.getters['account/getCustomerToken']
				let api = this.$store.getters['configs/getApiList'].customer_api_endpoint + '/profile'
				let apiurl = endpoint + api

				wx.request({
					url: apiurl,
					method: 'GET',
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log("init成功了", res)
						if (res.data.code === 200) {
							that.$store.dispatch('account/SAVE_ACCOUNT', {
								account: res.data
							})
							that.firstName = (res.data.data.first_name === ' ') ? '' : res.data.data.first_name
							that.lastName = res.data.data.last_name
							// console.log( that.firstName,that.lastName,"啊哈哈哈")
							that.isShowLoading = false
							if (res.data.data.gender === 'f') {
								that.genderValue = '女'
							} else if (res.data.data.gender === 'm') {
								that.genderValue = '男'
							}
							if (res.data.data.head_portrait.image) {
								that.head = res.data.data.head_portrait.image
							}
							console.log("走完了啊")
						}
					},
					fail() {

					}
				})
			},
			save() {
				console.log("点了保存")
				let self = this
				let endpoint = this.$store.getters['server/getEndpoint']
				let token = this.$store.getters['account/getCustomerToken']
				let api = this.$store.getters['configs/getApiList'].customer_api_endpoint + '/update/profile'
				let apiurl = endpoint + api
				let data = {
					data: {
						first_name: this.firstName,
						last_name: this.lastName
					}
				}
				console.log(endpoint, token, apiurl, "传参信息")
				if (this.head_portrait) {
					data.data.head_portrait = this.head_portrait
				}
				if (this.genderValue === '男') {
					data.data.gender = 'm'
				} else {
					data.data.gender = 'f'
				}
				console.log(data, "提交的data")
				wx.request({
					url: apiurl,
					method: 'POST',
					data: data,
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if (res.data.code === 200) {
							self.validateSuc = true
							self.init()
						}
					},
					fail() {
						self.warnError = true
						self.init()
					}
				})
			},
		},
		components: {
			mpPicker,
			mpButton,
			mpToast
		}
	}
</script>

<style lang='scss'>
	#accountInfo {
		height: 500px;
		width: 100%;

		.title {
			height: 70px;
			width: 100%;
			line-height: 70px;
			border-bottom: 1px solid #eeeeee;

			p {
				width: 30%;
				padding-left: 10px;
				font-size: 16px;
				font-weight: 500;
				float: left;
			}

			.logo {
				float: right;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				margin-right: 10px;
				margin-top: 5px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.InfoList {
			div {
				width: 100%;
				height: 45px;
				line-height: 45px;
				border-bottom: 1px solid #eeeeee;
				font-size: 16px;
				font-weight: 500;
				display: flex;
				align-items: center;

				span {
					display: block;
					padding: 0 10px;
					float: left;
				}

				input {
					float: left;
					height: 45px;
					line-height: 45px;
					width: 70%;
					padding-left: 10px;
				}

				.btn {
					width: 72%;
					background: #ffffff;
					text-align: right;
					border: none;
				}
			}
		}
		
		.right_icon {
			width: 30px !important;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.save {
			position: fixed;
			top: 60%;
			left: 5%;
			width: 90%;
			height: 40px;
			background: #1AAD19;
			border-radius: 6px;
			margin: 20px auto;
			color: #fff;
			line-height: 40px;
			z-index: 1;
		}
	}
</style>
