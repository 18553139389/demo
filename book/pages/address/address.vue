<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">地址管理</block>
			</cu-custom>
		</view>
		<view class="wrapper" v-if="list.length > 0">
			<radio-group @change="radioChange">
				<ul class="item">
					<li v-for="(v,k) in list" :key="k" @tap="goChange(v)">
						<view class="user">
							<span>{{v.name}}</span>
							<span style="margin-left: 24upx;">{{v.phone}}</span>
						</view>
						<view class="content">{{v.address}}{{v.addressdetail}}</view>
						<view class="status" @tap.stop="">
							<view class="status-left">
								<radio :value="v.aid" :checked="k === current" color="#FF6600" />
								<span>设为默认</span>
							</view>
							<view class="status-left">
								<view class="del" v-if="k !== current" @tap="goDel(v.aid,k)">删除</view>
								<view class="editor" @tap="goEditor(v)">编辑</view>
							</view>
						</view>
					</li>
				</ul>
			</radio-group>
		</view>
		<view class="add" @tap="goAdd">添加地址</view>
	</view>
</template>

<script>
	import {ajax} from '../../request/request.js'
	import Toast from '../../common/toast.js'
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#F8F9FB',
				current: 0,
				list: []
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				let data1 = {
					cmd: 'myaddresslist',
					uid: uni.getStorageSync('uid')
				}
				Toast.showLoading('', function() {
					let data = {
						data: data1,
						success: function(res) {
							if (res.data.result == 0) {
								Toast.hideLoading()
								if (res.data.dataList) {
									self.list = res.data.dataList
									self.list.forEach((item) => {
										if(item.isdefault == 1) {
											uni.setStorageSync('changeAddress', item.address + item.addressdetail)
											uni.setStorageSync('changeItem', JSON.stringify(item))
										}
									})
								}
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			radioChange(e) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].aid === e.target.value) {
						this.current = i
						break
					}
				}

				let self = this
				let data1 = {
					cmd: 'addoreditaddresslist',
					uid: uni.getStorageSync('uid'),
					aid: this.list[this.current].aid,
					name: this.list[this.current].name,
					phone: this.list[this.current].phone,
					address: this.list[this.current].address,
					addressdetail: this.list[this.current].addressdetail,
					isdefault: 1
				}
				let data = {
					data: data1,
					success: function(res) {
						if (res.data.result == 0) {
							// self.$store.commit('changeAddress', self.list[self.current].address + self.list[self.current].addressdetail)
							// self.$store.commit('changeItem', JSON.stringify(self.list[self.current]))
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			goAdd() {
				uni.navigateTo({
					url: '/pages/editorAddress/editorAddress?type=1'
				})
			},
			goDel(id, k) {
				let self = this
				uni.showModal({
				    content: '确认删除该地址吗？',
					confirmColor: '#FF6600',
				    success: function (res) {
				        if (res.confirm) {
							let data1 = {
								cmd: 'deleteaddress',
								uid: uni.getStorageSync('uid'),
								aid: id,
							}
							Toast.showLoading('', function() {
								let data = {
									data: data1,
									success: function(res) {
										if (res.data.result == 0) {
											Toast.hideLoading()
											Toast.showToast('删除成功')
											self.list.splice(k, 1)
										} else {
											Toast.hideLoading()
											Toast.showToast(res.data.resultNote)
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
			},
			goEditor(item) {
				let list = JSON.stringify(item)
				uni.navigateTo({
					url: '/pages/editorAddress/editorAddress?type=0&list=' + list
				})
			},
			goChange(list) {
				uni.setStorageSync('changeAddress', list.address + list.addressdetail)
				uni.setStorageSync('changeItem', JSON.stringify(list))
				uni.setStorageSync('changeAid', list.aid)
				setTimeout(() => {
					uni.navigateBack({
					    delta: 1
					})
				},300)
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
		background: #F8F9FB;
		position: relative;

		.fixed {
			width: 100%;
		}

		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding-bottom: 120upx;

			.item {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 14px;
				color: #333;
				padding: 0 28upx;
				box-sizing: border-box;

				li {
					width: 100%;
					padding: 24upx 0 0;
					border-radius: 4px;
					display: flex;
					flex-direction: column;
					background: #FFFFFF;
					margin-bottom: 30upx;

					.user {
						width: 100%;
						display: flex;
						align-items: center;
						padding: 0 28upx;
						box-sizing: border-box;
					}

					.content {
						width: 100%;
						color: #666;
						margin: 30upx 0;
						padding: 0 28upx;
						box-sizing: border-box;
					}

					.status {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 40upx 28upx;
						box-sizing: border-box;
						border-top: 1px solid #eee;

						.status-left {
							display: flex;
							align-items: center;

							span {
								margin-left: 24upx;
							}

							.del {
								padding: 8upx 30upx;
								border: 1px solid #eee;
								border-radius: 4px;
							}

							.editor {
								padding: 8upx 30upx;
								border-radius: 4px;
								background: #FF6600;
								color: #FFFFFF;
								margin-left: 24upx;
							}
						}
					}
				}
			}
		}

		.add {
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			font-size: 15px;
			color: #FFFFFF;
			background: #FF6600;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
		}
	}
</style>
