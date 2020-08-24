<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">办证</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="head">请选择要办理的证书</view>
			<view class="list">
				<checkbox-group @change="checkboxChange">
					<view class="item" v-for="(v,k) in checkbox" :key="k">
						<view class="item-nav" @tap="goShow(k)">
							<view>{{v.name}}</view>
							<view class="item-right">
								<view>{{v.accreditationsList.length}}</view>
								<image src="../../static/images/next.png" v-show="!v.status1"></image>
								<image src="../../static/images/down.png" v-show="v.status1"></image>
							</view>
						</view>
						<view class="item-list" v-if="v.status1" v-for="(item,index) in v.accreditationsList" :key="index">
							<view class="list-left">
								<checkbox class='rounds' :class="item.status?'checked':''" :checked="item.status ? true : false" :value="item.aid"></checkbox>
								<view>{{item.name}}</view>
							</view>
							<view class="list-right">
								<view @tap="goText(item.content1,1)">所需资料</view>
								<view v-if="item.state == 1" style="margin-left: 30rpx;" @tap="goText(item.content2,2)">办理标准</view>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view class="btn" @tap="goOrder">下一步</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {
		ajax
	} from '../../request/request.js'
	export default {
		data() {
			return {
				Color: '#333',
				checkbox: [],
				all: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			checkboxChange(e) {
				let items = this.checkbox
				let values = e.detail.value
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					for (var j = 0; j < item.accreditationsList.length; ++j) {
						if (values.includes(item.accreditationsList[j].aid)) {
							this.$set(item.accreditationsList[j], 'status', true)
						} else {
							this.$set(item.accreditationsList[j], 'status', false)
						}
					}
				}
				this.idArr()
				this.$forceUpdate()
			},
			idArr() {
				let arr = []
				if (this.checkbox.length > 0) {
					for (var i = 0, lenI = this.checkbox.length; i < lenI; i++) {
						const item = this.checkbox[i]
						for (var j = 0; j < item.accreditationsList.length; j++) {
							if (item.accreditationsList[j].status == true) {
								arr.push(item.accreditationsList[j].name)
							}
						}
					}
				}
				this.all = arr
			},
			goOrder() {
				if(this.all.length == 0) {
					Toast.showToast('请选择证书')
					return
				}
				this.$store.commit('changeArr',this.all)
				uni.navigateTo({
				    url: '/pages/getPrice/getPrice'
				})
			},
			goShow(k) {
				this.checkbox[k].status1 = !this.checkbox[k].status1
				this.$forceUpdate()
			},
			goText(text, type) {
				this.$store.commit('changeContent', text)
				uni.navigateTo({
					url: '/pages/web/web?type=' + type
				})
			},
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'getsubmitdoList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList) {
									self.checkbox = res.data.dataList
									for (let i = 0; i < self.checkbox.length; i++) {
										self.checkbox[i].status1 = false
										for (let j = 0; j < self.checkbox[i].accreditationsList.length; j++) {
											self.checkbox[i].accreditationsList[j].status = false
										}
									}
									console.log(self.checkbox)
								}
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
			border-top: 10rpx solid #eee;

			.head {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				padding: 0 28rpx 0 60rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				color: #333;
				position: relative;
			}

			.head:before {
				content: '';
				position: absolute;
				width: 3px;
				height: 24rpx;
				border-radius: 30px;
				top: 33rpx;
				left: 28rpx;
				background: #00C800;
			}

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;

				.item {
					width: 100%;
					display: flex;
					flex-direction: column;

					.item-nav {
						width: 100%;
						height: 80rpx;
						padding: 0 28rpx;
						box-sizing: border-box;
						background: #FAF9F9;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						color: #666;

						.item-right {
							display: flex;
							align-items: center;

							image {
								width: 32rpx;
								height: 32rpx;
								margin-left: 16rpx;
							}
						}
					}

					.item-list {
						width: 100%;
						padding: 0 28rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin: 30rpx 0;

						.list-left {
							display: flex;
							align-items: center;

							.rounds {
								display: flex;
								justify-content: center;
								align-items: center;
								border-color: none !important;
								margin-right: 30rpx;
							}
						}

						.list-right {
							display: flex;
							font-size: 28rpx;
							color: #249AFD;
						}
					}
				}
			}

			.btn {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin: 40rpx auto 0;
				border-radius: 30px;
				background: #00C700;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
