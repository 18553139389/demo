<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="false" :Color="Color" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">添加学生</block>
			</cu-custom>
		</view>
		<view class="wrapper">
			<view class="tit">必填项</view>
			<view class="user">
				<view class="head" @tap="goSchool">
					<view class="head-left">
						<view style="color: red;margin-right: 20rpx;">*</view>
						<view>{{school}}</view>
					</view>
					<view class="head-right">
						<!-- <view>请选择</view> -->
						<image src="../../static/images/enter.png"></image>
					</view>
				</view>
				<view class="head" @tap="goGree">
					<view class="head-left">
						<view style="color: red;margin-right: 20rpx;">*</view>
						<view>{{gree}}</view>
					</view>
					<view class="head-right">
						<!-- <view>请选择</view> -->
						<image src="../../static/images/enter.png"></image>
					</view>
				</view>
				<view class="head" style="border-bottom: none;">
					<view class="head-left">
						<view style="color: red;margin-right: 20rpx;">*</view>
						<view>请填写学生名字</view>
					</view>
					<view class="head-right">
						<input type="text" v-model="user" placeholder="请输入名字">
					</view>
				</view>
			</view>
			<view class="tit">选填项</view>
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
					<view class="head-left">
						<view style="color: red;margin-right: 20rpx;">*</view>
						<view>联系电话</view>
					</view>
					<input type="text" v-model="call" placeholder="请填写家长联系电话">
				</view>
				<view class="head">
					<view class="head-left">
						<view style="color: red;margin-right: 20rpx;">*</view>
						<view>地址</view>
					</view>
					<input type="text" v-model="address" placeholder="请填写家长住址">
				</view>
			</view>
			<view class="submit" @tap="goSubmit">提交</view>
		</view>
		<view class="bg" v-if="show">
			<view class="bg-box">
				<image src="../../static/images/tankuang_bg.png" mode="widthFix"></image>
				<view class="content">学校：{{school}}</view>
				<view class="content">班级：{{gree}}</view>
				<view class="content">姓名：{{user}}</view>
				<view class="btns">
					<view class="btn" @tap="goCancel">取消</view>
					<view class="btn" style="color: #FFFFFF;background: #F91D37;" @tap="goSure">确定</view>
				</view>
			</view>
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
				school: '请选择所在学校',
				schoolId: '',
				gree: '请选择所在班级',
				greeId: '',
				user: '',
				count: '',
				type: '',
				birthday: '',
				name: '',
				call: '',
				address: '',
				sex: ['女','男'],
				sexIndex: 0,
				show: false,
				startTimes: [2002,1,1],
				endTime: 2021,
				show1:false
			}
		},
		onShow() {
			if(this.$store.state.schoolId) {
				this.school = this.$store.state.school
				this.schoolId = this.$store.state.schoolId
			}
			if(this.$store.state.greeId) {
				this.gree = this.$store.state.gree
				this.greeId = this.$store.state.greeId
			} else {
				this.gree = '请选择所在班级'
				this.greeId = ''
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
			goSchool() {
				uni.navigateTo({
				    url: '/pages/school/school'
				})
			},
			goGree() {
				if(!this.$store.state.schoolId) {
					Toast.showToast('请先选择学校')
					return
				}
				uni.navigateTo({
				    url: '/pages/gree/gree'
				})
			},
			goSubmit() {
				if(this.schoolId == '') {
					Toast.showToast('请选择学校')
					return
				}
				if(this.greeId == '') {
					Toast.showToast('请选择班级')
					return
				}
				if(this.user == '') {
					Toast.showToast('请填写学生名字')
					return
				}
				if (this.call == '') {
					Toast.showToast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[01235678]|18[0-9]|19[189])\d{8}$/.test(this.call))) {
					Toast.showToast('手机号格式不正确')
					return
				}
				if(this.address == '') {
					Toast.showToast('请填写家长住址')
					return
				}
				this.show = true
			},
			goCancel() {
				this.show = false
			},
			goSure() {
				let self = this
				let data1 = {
					uid: uni.getStorageSync('uid'),
					studentId: '',
					icon: '',
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
							self.show = false
							uni.setStorageSync('student', self.user)
							uni.setStorageSync('studentId', res.data.studentId)
							uni.switchTab({
							    url: '/pages/index/index'
							})
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
		
		.fixed {
			width: 100%;
		}
		
		.bg {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.4);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 99999999;
			
			.bg-box {
				width: 80%;
				border-radius: 12px;
				background: #FFFFFF;
				
				image {
					width: 100%;
				}
				
				.content {
					width: 100%;
					margin-bottom: 28rpx;
					font-size: 28rpx;
					color: #333;
					padding: 0 36rpx;
					box-sizing: border-box;
				}
				
				.btns {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					margin: 30rpx 0;
					
					.btn {
						width: 180rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 24px;
						border: 1px solid #eee;
					}
				}
			}
		}
		
		.wrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.tit {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				padding: 0 28rpx;
				box-sizing: border-box;
				background: #F9F9F9;
				font-size: 28rpx;
				color: #666;
			}
			
			.user {
				width: 100%;
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
					padding: 28rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					
					input {
						text-align: right;
						font-size: 28rpx;
						color: #333;
					}
					
					.head-left {
						display: flex;
						align-items: center;
					}
					
					.head-right {
						display: flex;
						align-items: center;
						
						image {
							width: 36rpx;
							height: 36rpx;
							margin-left: 20rpx;
						}
						
						input {
							text-align: right;
							font-size: 28rpx;
							color: #333;
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
							margin-top: 4rpx;
						}
					}
				}
			}
			
			.submit {
				width: 50%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 28rpx;
				color: #FFFFFF;
				border-radius: 30px;
				background: #F91D37;
				margin: 50rpx auto;
			}
		}
	}
</style>
