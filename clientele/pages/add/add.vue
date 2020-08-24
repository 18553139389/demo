<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">添加证书</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="list">
				<view class="list-item">
					<view class="titles">
						<view>证书名称</view>
					</view>
					<view class="choice">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" style="width: 100%;">
							<input type="text" v-model="name" placeholder="请选择" disabled style="width: 100%;">
						</picker>
					</view>
				</view>
				<view class="list-item">
					<view>证书所在单位</view>
					<view class="choice">
						<input type="text" v-model="danwei" placeholder="请输入单位">
					</view>
				</view>
				<view class="list-item">
					<view>发证时间</view>
					<view class="choice" @tap="choiceDate1">
						<input type="text" v-model="date1" placeholder="请选择时间" disabled>
					</view>
				</view>
				<view class="list-item">
					<view>到期时间</view>
					<view class="choice" @tap="choiceDate2">
						<input type="text" v-model="date2" placeholder="请选择时间" disabled>
					</view>
				</view>
				<view class="list-item">
					<view class="common">
						<view>提前提醒时间</view>
					</view>
					<view class="choice">
						<input type="number" v-model="warn" placeholder="3/6个月" disabled>
					</view>
				</view>
			</view>
			<view class="del" v-if="sid" @tap="goDel">删除证书</view>
			<view class="btn" @tap="goAdd">添加</view>
		</view>
		<w-picker mode="date" startYear="2015" endYear="2030" step="1" :current="false" @confirm="onConfirm1" ref="picker1"
		themeColor="#00AAEF"></w-picker>
		<w-picker mode="date" startYear="2015" endYear="2030" step="1" :current="false" @confirm="onConfirm2" ref="picker2"
		themeColor="#00AAEF"></w-picker>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import wPicker from "../../components/w-picker/w-picker.vue"
	export default {
		data() {
			return {
				Color: '#333',
				name: '',
				warn: '',
				date1: '',
				date2: '',
				index: 0,
				sid: '',
				danwei: '',
				array: []
			}
		},
		components: {
			wPicker
		},
		onLoad(option) {
			this.init()
			if(option.item) {
				let item = JSON.parse(option.item)
				this.name = item.certificatename
				this.danwei = item.companyname
				this.date1 = item.sendtime
				this.date2 = item.endtime
				this.sid = item.stid
			}
		},
		methods: {
			init() {
				let self = this
				let data1 = {}
				Toast.showLoading('', function() {
					let data = {
						url: 'getsubmitdepositList',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								self.array = res.data.dataList
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			goDel() {
				let self = this
				uni.showModal({
				    title: '提示',
				    content: '确认删除该证书吗？',
				    success: function (res) {
				        if (res.confirm) {
				            let data1 = {
				            	uid: uni.getStorageSync('uid'),
				            	stid:self.sid
				            }
				            Toast.showLoading('', function() {
				            	let data = {
				            		url: 'deletesubmittrusteeship',
				            		data: data1,
				            		success: function(res) {
				            			console.log(res)
				            			if (res.data.result == 0) {
				            				Toast.hideLoading()
				            				Toast.showToast('删除成功')
				            				setTimeout(() => {
				            					uni.navigateBack({
				            					    delta: 1
				            					})
				            				},500)
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
			goAdd() {
				if (this.name == '') {
					Toast.showToast('请选择证书')
					return
				}
				if (this.danwei == '') {
					Toast.showToast('请输入单位')
					return
				}
				if (this.choiceDate1 == '') {
					Toast.showToast('请选择发证时间')
					return
				}
				if (this.choiceDate2 == '') {
					Toast.showToast('请选择到期时间')
					return
				}
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					stid:this.sid,
					certificatename: this.name,
					companyname: this.danwei,
					sendtime: this.date1,
					endtime: this.date2
				}
				Toast.showLoading('', function() {
					let data = {
						url: 'addsubmittrusteeship',
						data: data1,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast.hideLoading()
								if(this.sid) {
									Toast.showToast('修改成功')
								} else {
									Toast.showToast('添加成功')
								}
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									})
								},500)
							} else {
								Toast.hideLoading()
								Toast.showToast(res.data.resultNote)
							}
						}
					}
					ajax(data)
				})
			},
			choiceDate1() {
				this.$refs.picker1.show()
			},
			choiceDate2() {
				this.$refs.picker2.show()
			},
			onConfirm1(e) {
				this.date1 = e.result
				let d2 = new Date(e.result)
				d2.setDate(d2.getDate() + 7)
			},
			onConfirm2(e) {
				let date1 = this.date1.replace(/-/g, '/')
				let date2 = e.result
				date2 = date2.replace(/-/g, '/')
				date1 = Date.parse(date1)
				date2 = Date.parse(date2)
				if (date1 >= date2) {
					Toast.showToast('到期时间不能小于发证时间')
					return
				}
				this.date2 = e.result
			},
			bindPickerChange(e) {
				this.index = e.target.value
				this.name = this.array[this.index].name
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
			
			.top {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #EAF5FF;
				font-size: 28rpx;
				color: #249AFD;
			}
			
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				
				.list-item {
					width: 100%;
					padding: 40rpx 28rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
					color: #333;
					
					.choice {
						width: 100%;
						height: 70rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-radius: 4px;
						background: #f6f6f6;
						padding: 0 24rpx;
						margin-top: 36rpx;
						
						input {
							width: 80%;
							height: 70rpx;
							box-sizing: border-box;
							font-size: 28rpx;
							color: #333;
						}
					}
					
					.titles {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					
					.common {
						width: 100%;
						display: flex;
						align-items: center;
					}
				}
			}
			
			.del {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;
				text-align: right;
				font-size: 28rpx;
				color: #249AFD;
			}
			
			.btn {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin: 40rpx auto;
				border-radius: 30px;
				background: #00C700;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
</style>
