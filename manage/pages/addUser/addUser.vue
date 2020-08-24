<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">{{title}}</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul class="all">
				<li class="lis">
					<span>登录账号</span>
					<input type="text" :class="type == 1 ? 'colors' : ''" v-model="user" :disabled="check1" placeholder="请输入6到12位账号">
				</li>
				<li class="lis">
					<span>手机号码</span>
					<input type="text" :class="type == 1 ? 'colors' : ''" v-model="tel" :disabled="check2" placeholder="请输入手机号码">
				</li>
				<li class="lis">
					<span>用户姓名</span>
					<input type="text" v-model="name" placeholder="请输入用户姓名">
				</li>
				<li class="lis" v-if="check4">
					<span>登录密码</span>
					<input type="password" v-model="pass" :checked="check3" placeholder="请输入6到12位登录密码">
				</li>
				<li class="lis">
					<span>角色管理</span>
					<radio-group class="block" @change="RadioChange">
						<ul class="content">
							<li v-for="(v,k) in navList" :key='k'>
								<radio :checked="radio == v.id ? true : false" :value="v.id" color="#0081FF"></radio>
								<view class="name">{{v.name}}</view>
							</li>
						</ul>
					</radio-group>
				</li>
				<li class="lis">
					<span>是否启用</span>
					<image @tap="change" :src="check ? '../../static/images/kaiguan-kai.png' : '../../static/images/kaiguan-guan.png'" alt=""></image>
				</li>
			</ul>
			<view class="submit" @tap="goSubmit">提交</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				title: '新增成员',
				Color: '#333',
				user: '',
				tel: '',
				name: '',
				navList: [{
					id: '1',
					name: '董事长'
				}, {
					id: '2',
					name: '管理员'
				}, {
					id: '3',
					name: '员工'
				}],
				radio: '1',
				pass: '',
				check: false,
				check1: false,
				check2: false,
				check3: false,
				check4: false,
				type: 0,
				ids: ''
			}
		},
		onLoad(option) {
			if(option.type == 1) {
				this.title = '修改信息'
				this.type = option.type
				this.ids = option.id
				this.check4 = false
				this.init(option.id)
			} else if(option.type == 0) {
				this.check4 = true
			}
		},
		methods: {
			init(id) {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					id,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/GetUserInfo',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.user = res.data.Customerdata.account
								self.tel = res.data.Customerdata.mobile
								self.name = res.data.Customerdata.cnname
								self.radio = res.data.Customerdata.jobid
								self.check1 = true
								self.check2 = true
								self.check3 = true
								if(res.data.Customerdata.enabled == 1) {
									self.check = true
								}
							} else if (res.data.Code == -2 || res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
								uni.removeStorageSync('token')
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							}
						}
					}
					ajax(data)
				})
			},
			change() {
				this.check = !this.check
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			goSubmit() {
				let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if (!reg.test(this.user) || this.user.length < 6 || this.user.length > 12) {
					Toast.showToast('账号只能是字母和数字组合6-12位')
					return
				}
				
				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				
				let reg1 = /^[\u2E80-\u9FFF]+$/
				if (!reg1.test(this.name) || this.name.length > 6 || this.name.length == 0) {
					Toast.showToast('请输入6位以内的汉字')
					return
				}
				
				let self = this
				if(this.type == 1) {
					let datas = {
						token: uni.getStorageSync('token'),
						id: self.ids,
						cnname: this.name,
						jobid: self.radio,
						enabled: self.check ? 1 : 0,
						os: uni.getSystemInfoSync().platform,
						osversion: uni.getSystemInfoSync().system,
						appversion: uni.getStorageSync('appversion')
					}
					Toast.showLoading('', function() {
						let data = {
							url: '/api/CompanyUser/ModifyInfo',
							data: datas,
							success: function(res) {
								console.log(JSON.stringify(res))
								if (res.data.Code == 0) {
									Toast.hideLoading()
									Toast.showToast('修改成功')
									setTimeout(() => {
										uni.navigateBack({
										    delta: 1
										})
									},500)
								} else if (res.data.Code == -2 || res.data.Code == -1) {
									Toast.hideLoading()
									Toast.showToast(res.data.Description)
									uni.removeStorageSync('token')
									setTimeout(() => {
										uni.redirectTo({
											url: '/pages/login/login'
										})
									}, 500)
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.Description)
								}
							}
						}
						ajax(data)
					})
				} else {
					if (!reg.test(this.pass) || this.pass.length < 6 || this.pass.length > 12) {
						Toast.showToast('密码只能是字母和数字组合6-12位')
						return
					}
					
					let datas = {
						token: uni.getStorageSync('token'),
						account: this.user,
						password: this.pass,
						mobileno: this.tel,
						cnname: this.name,
						isuse: this.check ? 1 : 0,
						jobid: this.radio,
						os: uni.getSystemInfoSync().platform,
						osversion: uni.getSystemInfoSync().system,
						appversion: uni.getStorageSync('appversion')
					}
					Toast.showLoading('', function() {
						let data = {
							url: '/api/CompanyUser/AddCompanyUser',
							data: datas,
							success: function(res) {
								console.log(JSON.stringify(res))
								if (res.data.Code == 0) {
									Toast.hideLoading()
									Toast.showToast('添加成功')
									setTimeout(() => {
										uni.navigateBack({
										    delta: 1
										})
									},500)
								} else if (res.data.Code == -2 || res.data.Code == -1) {
									Toast.hideLoading()
									Toast.showToast(res.data.Description)
									uni.removeStorageSync('token')
									setTimeout(() => {
										uni.redirectTo({
											url: '/pages/login/login'
										})
									}, 500)
								} else {
									Toast.hideLoading()
									Toast.showToast(res.data.Description)
								}
							}
						}
						ajax(data)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			box-sizing: border-box;
			border-top: 20upx solid #FAFAFA;

			.all {
				width: 100%;
				display: flex;
				flex-direction: column;

				.lis {
					width: 100%;
					height: 90upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 28upx;
					box-sizing: border-box;
					font-size: 14px;
					color: #333;
					border-bottom: 1px solid #eee;

					input {
						text-align: right;
						
						&.colors {
							color: #999;
						}
					}

					.block {
						display: flex;

						.content {
							display: flex;
							align-items: center;

							li {
								display: flex;
								align-items: center;
								font-size: 14px;
								color: #333;
								margin-left: 20upx;

								.name {
									margin-left: 16upx;
								}
							}
						}
					}

					image {
						width: 108upx;
						height: 73upx;
						margin-top: 10upx;
					}
				}
			}

			.submit {
				width: 40%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				border-radius: 4px;
				background: #00AAEF;
				margin: 50upx auto 0;
				font-size: 14px;
				color: #FFFFFF;
			}
		}
	}
</style>
