<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">车辆编辑</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<ul class="all">
				<li class="lis">
					<span>姓&nbsp;&nbsp;&nbsp;名</span>
					<input type="text" v-model="user" placeholder="请输入姓名">
				</li>
				<li class="lis">
					<span>手机号</span>
					<input type="text" v-model="tel" placeholder="请输入手机号">
				</li>
				<li class="lis">
					<span>行车证</span>
					<input type="text" v-model="passport" placeholder="请输入行车证">
				</li>
				<li class="lis">
					<span>自&nbsp;&nbsp;&nbsp;重</span>
					<input type="number" v-model="weight" placeholder="吨">
				</li>
			</ul>
			<view class="submit" @tap="goSubmit">保存</view>
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				ids: '',
				user: '',
				tel: '',
				passport: '',
				weight: 0
			}
		},
		onLoad(option) {
			let list = JSON.parse(option.item)
			this.ids = list.id
			this.user = list.owner
			this.tel = list.ownermobile
			this.passport = list.passportnum
			this.weight = list.weight
		},
		methods: {
			goSubmit() {
				let self = this
				let reg1 = /^[\u2E80-\u9FFF]+$/
				if (!reg1.test(this.user) || this.user.length > 6 || this.user.length == 0) {
					Toast.showToast('请输入6位以内的汉字')
					return
				}

				if (this.tel == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast.showToast('手机号格式不正确')
					return
				}

				if (this.passport == '') {
					Toast.showToast('行车证不能为空')
					return
				}

				if (this.weight == '' || this.weight <= 0) {
					Toast.showToast('自重必须大于0')
					return
				}

				let datas = {
					token: uni.getStorageSync('token'),
					id: this.ids,
					owner: this.user,
					ownermobile: this.tel,
					passportnum: this.passport,
					weight: this.weight,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/truck/updtruckinfo',
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
								}, 500)
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
					align-items: center;
					padding: 0 28upx;
					box-sizing: border-box;
					font-size: 14px;
					color: #333;
					border-bottom: 1px solid #eee;

					span {
						display: inline-block;
						width: 25%;
					}

					input {
						font-size: 14px;
						color: #333;
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

					img {
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
