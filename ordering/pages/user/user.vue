<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">个人资料</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="user">
				<view class="head">
					<view>照片</view>
					<view class="img-box" @tap="upLoad">
						<image src="../../static/images/logo.png" v-if="head == ''"></image>
						<image :src="head" v-if="head"></image>
						<image src="../../static/images/enter.png" class="right"></image>
					</view>
				</view>
				<view class="head">
					<view>姓名</view>
					<view style="margin-right: 24rpx;">{{userInfo.username}}</view>
				</view>
				<view class="head">
					<view>学校</view>
					<view style="margin-right: 24rpx;">{{userInfo.schoolName}}</view>
				</view>
				<view class="head">
					<view>班级</view>
					<view style="margin-right: 24rpx;">{{userInfo.classisName}}</view>
				</view>
			</view>
			<view class="titles">其他信息</view>
			<view class="user">
				<view class="head">
					<view>学号</view>
					<input type="text" v-model="count" placeholder="请填写学号学籍编号">
				</view>
				<view class="head">
					<view>性别</view>
					<view class="sex">
						<view :class="sexIndex == k ? 'active sex-item' : 'sex-item'" v-for="(v,k) in sex" :key="k" @tap="changeNav(k)">{{v}}</view>
					</view>
				</view>
				<view class="head">
					<view>民族</view>
					<input type="text" v-model="type" placeholder="请填写学生民族">
				</view>
				<view class="head" @tap="showPop">
					<view>生日</view>
					<view class="boxs">
						<input type="text" v-model="birthday" placeholder="请设置学生生日" disabled>
						<image src="../../static/images/enter.png" class="rights"></image>
					</view>
				</view>
				<view class="head">
					<view>家长</view>
					<input type="text" v-model="name" placeholder="请填写家长姓名">
				</view>
				<view class="head">
					<view>联系电话</view>
					<input type="text" v-model="call" placeholder="请填写家长联系电话">
				</view>
				<view class="head">
					<view>地址</view>
					<input type="text" v-model="address" placeholder="请填写家长住址">
				</view>
			</view>
			<view class="submit" @tap="goSubmit">提交</view>
		</view>
		<min-popup heightSize="500" :show="show1" @close='close'>
		    <min-picker 
		    :endTime="endTime"
		    :startTime="startTimes"
		    @cancel="cancel"
		    @sure="sure"
		    >
		    </min-picker>
		</min-popup>
	</view>
</template>

<script>
	import Toast from '../../common/toast.js'
	import {ajax} from '../../request/request.js'
	import MinPopup from "../../components/min-picker/min-popup.vue"
	import MinPicker from "../../components/min-picker/min-picker.vue"
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#f7f7f7',
				count: '',
				type: '',
				birthday: '',
				name: '',
				call: '',
				address: '',
				sex: ['男','女'],
				sexIndex: 0,
				userInfo: {},
				startTimes: [2002,1,1],
				endTime: 2021,
				show1:false,
				schoolId: '',
				greeId: '',
				head: ''
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			if(this.$store.state.school) {
				this.schoolId = this.$store.state.schoolId
			}
			if(this.$store.state.gree) {
				this.greeId = this.$store.state.greeId
			}
		},
		components: {
			MinPopup,
			MinPicker
		},
		methods: {
			changeNav(k) {
				this.sexIndex = k
			},
			init() {
				let self = this
				let data1 = {
					studentId: uni.getStorageSync('studentId')
				}
				let data = {
					url: '/studentInfo',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.userInfo = res.data
							self.count = self.userInfo.account
							self.sexIndex = self.userInfo.sex
							self.type = self.userInfo.nation
							self.birthday = self.userInfo.birthday
							self.name = self.userInfo.parentName
							self.call = self.userInfo.phone
							self.address = self.userInfo.address
							self.head = self.userInfo.icon
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
			},
			// 取消事件
			cancel(){
			    this.close()
			},
			// 确认事件
			sure(e){
			    console.log(e)
				this.birthday = e.a + '-' + e.b + '-' + e.c
			    // 输出 { year: 2020,month: 3,day: 23}
			},
			// picker显示
			showPop(){
			    this.show1 = true
			},
			// 关闭picker
			close(){
			    this.show1 = false
			},
			upLoad() {
				//从相册中选择图片上传
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						// 预览图片
						Toast.showLoading('上传中...', function() {
							res.tempFilePaths.forEach((item, index) => {
								uni.uploadFile({
									url: 'https://xxtc.hnsgsmyxgs.com/api/uploadFile', //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									success: (uploadFileRes) => {
										Toast.hideLoading()
										console.log(uploadFileRes)
										let obj = JSON.parse(uploadFileRes.data)
										self.head = obj.url
									},
									fail: (res) => {
										Toast.hideLoading()
										Toast.showToast('上传失败')
									}
								})
							})
						})
					},
					fail: function(res) {
						Toast.hideLoading()
						Toast.showToast('上传失败')
					}
				})
			},
			goSubmit() {
				if(this.call) {
					if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.call))){
						Toast.showToast('手机号格式不正确') 
						return
					}
				}
				
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					studentId: uni.getStorageSync('studentId'),
					icon: this.head,
					schoolId: this.schoolId,
					classisId: this.greeId,
					username: this.user,
					account: this.count,
					sex: this.sexIndex,
					nation: this.type,
					birthday: this.birthday,
					parentName: this.name,
					phone: this.call,
					address: this.address
				}
				let data = {
					url: '/saveStudent',
					data: data1,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							Toast.showToast('修改成功')
							setTimeout(() => {
								uni.navigateBack({
								    delta: 1
								})
							},500)
						} else {
							Toast.showToast(res.data.resultNote)
						}
					}
				}
				ajax(data)
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
		background: #f7f7f7;
		
		.fixed {
			width: 100%;
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 28rpx;
			box-sizing: border-box;
			
			.user {
				width: 100%;
				padding: 24rpx;
				border-radius: 4px;
				background: #FFFFFF;
				display: flex;
				flex-direction: column;
				
				.head {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					margin-bottom: 28rpx;
					
					input {
						width: 70%;
						text-align: right;
						font-size: 28rpx;
						color: #333;
						margin-right: 24rpx;
					}
					
					.img-box {
						display: flex;
						align-items: center;
						
						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}
						
						.right {
							width: 42rpx;
							height: 42rpx;
							margin-left: 20rpx;
						}
					}
					
					.sex {
						display: flex;
						align-items: center;
						
						.sex-item {
							padding: 4rpx 30rpx;
							border-radius: 20px;
							background: #EEEFF3;
							font-size: 28rpx;
							color: #666;
							margin-right: 24rpx;
							
							&.active {
								background: #F91D37;
								color: #FFFFFF;
							}
						}
					}
					
					.boxs {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						
						input {
							text-align: right;
							font-size: 28rpx;
							color: #333;
							margin-right: 24rpx;
						}
						
						.rights {
							width: 36rpx;
							height: 36rpx;
							margin-right: 24rpx;
							margin-top: 4rpx;
						}
					}
				}
			}
			
			.titles {
				width: 100%;
				font-size: 28rpx;
				color: #333;
				margin: 28rpx 0;
				padding-left: 28rpx;
				box-sizing: border-box;
			}
			
			.submit {
				width: 50%;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 30px;
				background: #F91D37;
				text-align: center;
				margin: 40rpx auto;
				color: #FFFFFF;
			}
		}
	}
</style>
