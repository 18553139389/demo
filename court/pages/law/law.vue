<template>
	<view class="contain">
		<view class="list">
			<view class="forms">
				<view class="form-item" @tap="shows">
					<view>举报类型</view>
					<view style="color: #999;" v-if="radio == 1">环境保护</view>
					<view style="color: #999;" v-if="radio == 2">国土资源</view>
					<view style="color: #999;" v-if="radio == 3">食药安全</view>
					<view style="color: #999;" v-if="radio == 4">国土安全</view>
					<view style="color: #999;" v-if="radio == 5">国有财产</view>
					<view style="color: #999;" v-if="radio == 6">英烈保护</view>
					<view style="color: #999;" v-if="radio == 7">其他</view>
				</view>
				<view class="form-item">
					<view>举报位置</view>
					<input type="text" v-model="address" placeholder="请输入" placeholder-class="place">
				</view>
				<view class="form-item">
					<view>举报人姓名</view>
					<input type="text" v-model="user" placeholder="请输入" placeholder-class="place">
				</view>
				<view class="form-item">
					<view>联系电话</view>
					<input type="text" v-model="tel" placeholder="请输入" placeholder-class="place">
				</view>
				<view class="tit">举报内容</view>
				<view class="content">
					<textarea v-model="content" placeholder="举报内容" placeholder-class="place" />
				</view>
				<view class="tit">资料上传</view>
				<view class="content">
					<robby-image-upload 
					v-model="imageData" 
					@delete="deleteImage" 
					@add="addImage" 
					enable-del="true" 
					enable-add="true" 
					show-upload-progress="true"
					limit="6">
					</robby-image-upload>
				</view>
				<view class="submit" @tap="submit">提交</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal bottomModal" :class="show ? 'show' : ''" @tap="control">
			<view class="cu-dialog">
				<!-- #ifndef MP-ALIPAY -->
				<radio-group class="block" @change.stop="RadioChange">
					<view class="cu-form-group">
						<view class="title">环境保护</view>
						<radio class='radio blue' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">国土资源</view>
						<radio class='radio blue' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">食药安全</view>
						<radio class='radio blue' :class="radio=='3'?'checked':''" :checked="radio=='3'?true:false" value="3"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">国土安全</view>
						<radio class='radio blue' :class="radio=='4'?'checked':''" :checked="radio=='4'?true:false" value="4"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">国有财产</view>
						<radio class='radio blue' :class="radio=='5'?'checked':''" :checked="radio=='5'?true:false" value="5"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">英烈保护</view>
						<radio class='radio blue' :class="radio=='6'?'checked':''" :checked="radio=='6'?true:false" value="6"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">其他</view>
						<radio class='radio blue' :class="radio=='7'?'checked':''" :checked="radio=='7'?true:false" value="7"></radio>
					</view>
				</radio-group>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import robbyImageUpload from '../../components/robby-image-upload/robby-image-upload.vue'
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	import global_ from '../../common/js/global.js'
	import amapFile from '../../common/js/amap-wx.js'
	export default {
		data() {
			return {
				show: false,
				radio: 1,
				address: '',
				user: '',
				tel: '',
				content: '',
				imageData: [],
				url: global_.baseUrl,
				longitude: '',
				latitude: ''
			}
		},
		components: {
			robbyImageUpload
		},
		onLoad() {
			let self = this
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					self.latitude = res.latitude
					self.longitude = res.longitude
					var myAmapFun = new amapFile.AMapWX({key:'196ae56c16a196319ccabd73b260c593'})
					myAmapFun.getRegeo({
					  location: self.longitude + ',' + self.latitude,
					  success: function(data){
						//成功回调
						console.log(data)
						self.address = data[0].name
					  },
					  fail: function(info){
						//失败回调
						console.log(info)
					  }
					})
				}
			})
		},
		methods: {
			shows() {
				this.show = true
			},
			RadioChange(e) {
				this.radio = e.detail.value
				this.show = false
			},
			deleteImage(obj) {
				console.log(obj)
			},
			addImage(obj) {
				console.log(obj)
			},
			control() {
				this.show = false
			},
			submit() {
				if(this.address == ''){
					toast.showTitle('位置不能为空')
					return
				}
				
				if(this.user == ''){
					toast.showTitle('姓名不能为空')
					return
				}
				
				if(this.tel == ''){
					toast.showTitle('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))){
					toast.showTitle('手机号格式不正确')
					return
				}
				
				if(this.content == ''){
					toast.showTitle('举报内容不能为空')
					return
				}
				
				if(this.content.length > 300){
					toast.showTitle('举报内容不能超过300字')
					return
				}
				
				if(this.imageData.length == 0){
					toast.showTitle('请上传图片')
					return
				}
				
				let self = this
				let arr = this.imageData
				for(let i=0;i<arr.length;i++){
					if(arr[i].indexOf(this.url) > -1){
						arr[i] = arr[i].substr(this.url.length)
					}
				}
				let files = arr.join('|')
				
				let datas = {
					uid: uni.getStorageSync('uid'),
					complType: this.radio,
					cname: this.user,
					telnum: this.tel,
					content: this.content,
					material: files,
					location: this.address,
					longitude: this.longitude,
					latitude: this.latitude
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/complPhotograph/submit',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							// self.clear()
							toast.showTitle('提交成功')
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								})
							},500)
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #fff;
	}
	
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid #eee;
		padding: 0 0 30upx;
	}
	
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	
	.form-item {
		width: 100%;
		height: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16upx 0;
		border-bottom: 1px solid #eee;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
	}
	
	input {
		text-align: right;
	}
	
	.place {
		font-size: 12px;
		color: #999;
	}
	
	.content {
		width: 100%;
		box-sizing: border-box;
	}
	
	textarea {
		width: 100%;
		height: 260upx;
		border: 1px solid #eee;
		border-radius: 4px;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
	}
	
	.tit {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		font-size: 14px;
		color: #333;
	}
	
	.submit {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		border-radius: 4px;
		background: #007AFF;
		margin: 30upx auto 0;
	}
</style>
