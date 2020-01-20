<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">通讯录</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="box" v-if="show">
				<uni-swipe-action v-for="(v,k) in list" :key="k">
					<uni-swipe-action-item :options="options" @click="onClick($event,k,v.id,v.account)" :disabled="jobid == 1 ? false : true">
						<view class="lists" @tap.stop=''>
							<view class="name">
								<span>{{v.cnname}}</span>
								<view>{{v.job}}</view>
							</view>
							<view @tap="goCall(v.mobile)">{{v.mobile}}</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view class="no" v-if="!show">通讯录还没有添加联系人</view>
			<view class="add" @tap="goAdd" v-if="jobid == 1">+ 添加</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		data() {
			return {
				Color: '#333',
				show: true,
				list: [],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#00AAEF'
					}
				}, {
					text: '重置密码',
					style: {
						backgroundColor: '#FE9C01'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				jobid: 0
			}
		},
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		onShow() {
			this.jobid = uni.getStorageSync('jobid')
			this.init()
		},
		methods: {
			init() {
				let self = this
				let datas = {
					token: uni.getStorageSync('token'),
					os: uni.getSystemInfoSync().platform,
					osversion: uni.getSystemInfoSync().system,
					appversion: uni.getStorageSync('appversion')
				}
				Toast.showLoading('', function() {
					let data = {
						url: '/api/CompanyUser/UserListByCompany',
						data: datas,
						success: function(res) {
							if (res.data.Code == 0) {
								Toast.hideLoading()
								if (res.data.Customerdata.length > 0) {
									self.list = res.data.Customerdata
									self.show = true
								} else {
									self.show = false
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
			goCall(val) {
				uni.makePhoneCall({
					phoneNumber: val
				})
			},
			goAdd() {
				uni.navigateTo({
					url: '/pages/addUser/addUser?type=0'
				})
			},
			onClick(e, k, id, order) {
				if (e.index == 0) {
					uni.navigateTo({
						url: '/pages/addUser/addUser?type=1&id=' + id
					})
				} else if (e.index == 1) {
					uni.navigateTo({
						url: '/pages/reset/reset?tel=' + order
					})
				} else if (e.index == 2) {
					let self = this
					uni.showModal({
						title: '提示',
						content: '确认删除此职工吗',
						success: function(res) {
							if (res.confirm) {
								let datas = {
									token: uni.getStorageSync('token'),
									account: order,
									os: uni.getSystemInfoSync().platform,
									osversion: uni.getSystemInfoSync().system,
									appversion: uni.getStorageSync('appversion')
								}
								Toast.showLoading('', function() {
									let data = {
										url: '/api/CompanyUser/DeleteCompanyUser',
										data: datas,
										success: function(res) {
											if (res.data.Code == 0) {
												Toast.hideLoading()
												self.list.splice(k,1)
												Toast.showToast('删除成功')
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
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
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
		align-items: center;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			border-top: 20upx solid #FAFAFA;
			padding-bottom: 80upx;

			.box {
				width: 100%;
				display: flex;
				flex-direction: column;

				.lists {
					width: 100%;
					padding: 32upx 28upx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #333;
					border-bottom: 1px solid #eee;

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
				}
			}

			.no {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 14px;
				color: #333;
				padding-top: 28upx;
			}
			
			.add {
				width: 50%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 14px;
				color: #FFFFFF;
				margin: 50upx auto 0;
				background: #00AAEF;
				border-radius: 4px;
			}
		}
	}
</style>
