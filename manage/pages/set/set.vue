<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">设置</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="common" style="border-bottom: 1px solid #eee;">
				<view>姓名</view>
				<view class="name">
					<span>{{cnname}}</span>
					<view>{{job}}</view>
				</view>
			</view>
			<view class="common">
				<view>单位</view>
				<view>{{company}}</view>
			</view>
			<view class="company" v-if="show">
				<view>您还有({{count}})个关联公司</view>
				<view class="tab" @tap="showModal" data-target="bottomModal">切换</view>
			</view>
			<view class="common" style="border-bottom: 1px solid #eee;">
				<view>车辆出行发送APP通知</view>
				<image @tap="change1" :src="check1 ? '../../static/images/kaiguan-kai.png' : '../../static/images/kaiguan-guan.png'" alt=""></image>
			</view>
			<view class="common">
				<view>货物进出发送APP通知</view>
				<image @tap="change2" :src="check2 ? '../../static/images/kaiguan-kai.png' : '../../static/images/kaiguan-guan.png'" alt=""></image>
			</view>
			<view class="common" @tap="modifyPass" style="border-bottom: 1px solid #eee;">
				<view>修改密码</view>
				<image class="right" src="../../static/images/jiantou.png" alt=""></image>
			</view>
			<view class="common" @tap="goRead" style="border-bottom: 1px solid #eee;">
				<view>使用协议</view>
				<image class="right" src="../../static/images/jiantou.png" alt=""></image>
			</view>
			<view class="common" style="border-bottom: 1px solid #eee;" @tap="goVersion">
				<view>版本号</view>
				<view>{{version}}</view>
			</view>
			<view class="common">
				<view>客服电话</view>
				<view>{{call}}</view>
			</view>
			<view class="back" @tap="goLoginout">退出登录</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="goSure">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<radio-group class="block" @change="RadioChange">
					<ul class="content">
						<li v-for="(v,k) in navList" :key='k'>
							<view>{{v.name}}</view>
							<radio :checked="v.isdefault == 1 ? true : false" :value="v.id" color="#0081FF"></radio>
						</li>
					</ul>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				val: '',
				cnname: '',
				job: '',
				company: '',
				count: 1,
				call: '',
				show: false,
				check1: false,
				check2: false,
				modalName: null,
				radio: '0',
				oldRadio: '0',
				select: 0,
				ids: '',
				version: '',
				navList: []
			}
		},
		onShow() {
			if (uni.getStorageSync('cnname')) {
				this.cnname = uni.getStorageSync('cnname')
			}

			if (uni.getStorageSync('job')) {
				this.job = uni.getStorageSync('job')
			}

			this.version = uni.getStorageSync('appversion')
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					companyid: uni.getStorageSync('id'),
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/GetAppSetting',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								self.company = res.data.Customerdata.companysetting.companyname
								self.call = res.data.Customerdata.companysetting.tel
								if (res.data.Customerdata.companysetting.companycount > 1) {
									self.count = res.data.Customerdata.companysetting.companycount
									self.navList = res.data.Customerdata.companys
									self.navList.forEach((item) => {
										if (item.isdefault == 1) {
											self.ids = item.id
										}
									})
									self.show = true
								}

								if (res.data.Customerdata.companysetting.notice_track == 0) {
									self.check1 = false
								} else {
									self.check1 = true
								}

								if (res.data.Customerdata.companysetting.notice_product == 0) {
									self.check2 = false
								} else {
									self.check2 = true
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
			change1() {
				this.check1 = !this.check1
				let type1 = 0
				let type2 = 0
				if (this.check1) {
					type1 = 1
				}
				if (this.check2) {
					type2 = 1
				}
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					companyid: this.ids,
					notice_track: type1,
					notice_product: type2,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/SaveAppSetting',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
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
			change2() {
				this.check2 = !this.check2
				let type1 = 0
				let type2 = 0
				if (this.check1) {
					type1 = 1
				}
				if (this.check2) {
					type2 = 1
				}
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					companyid: this.ids,
					notice_track: type1,
					notice_product: type2,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/SaveAppSetting',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('修改成功')
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.radio = this.oldRadio
				this.modalName = null
			},
			RadioChange(e) {
				this.oldRadio = this.radio
				this.radio = e.detail.value
			},
			goSure() {
				this.select = this.radio
				this.modalName = null
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					companyid: this.radio,
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/ChangeDefaultCompany',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								Toast.showToast('切换成功')
								self.ids = self.radio
								uni.setStorageSync('id', self.radio)
								uni.setStorageSync('token', res.data.Customerdata.token)
								uni.setStorageSync('apisecret', res.data.Customerdata.apisecret)
								self.init()
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
			modifyPass() {
				uni.navigateTo({
					url: '/pages/modify/modify'
				})
			},
			goRead() {
				uni.navigateTo({
					url: '/pages/read/read'
				})
			},
			goLoginout() {
				uni.removeStorageSync('token')
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			goVersion() {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/Upgrade/Req',
						data: datas,
						success: function(res) {
							console.log(JSON.stringify(res))
							if (res.data.Code == 0) {
								Toast.hideLoading()
								if (res.data.Customerdata.isforce == 0) {
									uni.showModal({
										title: '在线升级',
										content: res.data.Customerdata.Trips,
										success: function(re) {
											if (re.confirm) {
												plus.nativeUI.showWaiting("下载最新文件中,请稍候...")
												plus.downloader.createDownload(res.data.Customerdata.apk, {
													filename: "_doc/update/"
												}, function(d, status) {
													if (status == 200) {
														plus.nativeUI.closeWaiting()
														console.log("下载wgt成功：" + d.filename)
														self.installWgt(d.filename); // 安装wgt包
													} else {
														console.log("下载wgt失败！")
														plus.nativeUI.alert("下载APP失败！")
													}
												}).start()
											} else if (re.cancel) {
												console.log('用户点击取消')
											}
										}
									})
								} else {
									uni.showModal({
										title: '在线升级',
										content: res.data.Customerdata.Trips,
										showCancel: false,
										success: function(re) {
											if (re.confirm) {
												plus.nativeUI.showWaiting("下载最新文件中,请稍候...")
												plus.downloader.createDownload(res.data.Customerdata.apk, {
													filename: "_doc/update/"
												}, function(d, status) {
													if (status == 200) {
														plus.nativeUI.closeWaiting()
														console.log("下载wgt成功：" + d.filename)
														self.installWgt(d.filename); // 安装wgt包
													} else {
														console.log("下载wgt失败！")
														plus.nativeUI.alert("下载APP失败！")
													}
												}).start()
											} else if (re.cancel) {
												console.log('用户点击取消')
											}
										}
									})
								}
							} else if (res.data.Code == -1) {
								Toast.hideLoading()
								Toast.showToast(res.data.Description)
							} else if (res.data.Code == -2) {
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
			installWgt(path) {
				plus.nativeUI.showWaiting("正在安装...");
				plus.runtime.install(path, {
					force: true
				}, function() {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.alert("APP更新完成！", function() {
						plus.runtime.restart()
					})
				}, function(e) {
					plus.nativeUI.closeWaiting()
					plus.nativeUI.alert("安装失败：" + e.message)
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
			display: flex;
			flex-direction: column;
			border-top: 24upx solid #FAFAFA;

			.common {
				width: 100%;
				height: 90upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 28upx;
				font-size: 14px;
				color: #333;
				border-bottom: 16upx solid #eee;

				.name {
					display: flex;
					align-items: center;

					view {
						padding: 4upx 20upx;
						border-radius: 4px;
						font-size: 12px;
						color: #333;
						margin-left: 20upx;
						border: 1px solid #eee;
					}
				}

				image {
					width: 108upx;
					height: 73upx;
					margin-top: 10upx;
				}

				.right {
					width: 14upx;
					height: 23upx;
				}
			}

			.back {
				width: 70%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 14px;
				color: #FFFFFF;
				border-radius: 4px;
				background: #00AAEF;
				margin: 50upx auto;
			}

			.company {
				width: 100%;
				height: 110upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 28upx;
				box-sizing: border-box;
				font-size: 14px;
				color: #333;
				border-bottom: 20upx solid #eee;
				background: #FAFAFA;

				.tab {
					padding: 10upx 30upx;
					border-radius: 4px;
					background: #00AAEF;
					font-size: 15px;
					color: #FFFFFF;
					margin-left: 20upx;
				}
			}
		}

		.content {
			width: 100%;
			display: flex;
			flex-direction: column;

			li {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 14px;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30upx;
				box-sizing: border-box;
			}
		}
	}
</style>
