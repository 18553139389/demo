<template>
	<view class="contain">
		<view class="list">
			<view class="tit">举报人信息</view>
			<view class="forms">
				<view class="form-item">
					<view>姓名</view>
					<input type="text" v-model="user" placeholder="请输入姓名" placeholder-class="place">
				</view>
				<view class="form-item" @tap="shows">
					<view>是否匿名</view>
					<view style="color: #999;" v-if="radio == 1">是</view>
					<view style="color: #999;" v-if="radio == 0">否</view>
				</view>
				<view class="form-item">
					<view>身份证号</view>
					<input type="text" v-model="card" placeholder="请输入身份证" placeholder-class="place">
				</view>
				<view class="form-item">
					<view>联系电话</view>
					<input type="text" v-model="tel" placeholder="请输入联系电话" placeholder-class="place">
				</view>
				<view class="form-item">
					<view>联系地址</view>
					<input type="text" v-model="address" placeholder="请输入地址" placeholder-class="place" style="width: 70%;">
				</view>
			</view>
			<view class="tit" style="margin-top: 30upx;">举报事项</view>
			<view class="content">
				<textarea v-model="content" placeholder="举报内容" placeholder-class="place" />
			</view>
			<view class="tit">其它补充材料</view>
			<view class="content">
				<robby-image-upload 
				v-model="imageData" 
				@delete="deleteImage" 
				@add="addImage" 
				@input="inputList"
				enable-del="true" 
				enable-add="true" 
				show-upload-progress="true"
				limit="6">
				</robby-image-upload>
			</view>
			<view class="maps" @tap="goMap">
				<img src="../../static/img/weizhi.png" alt="">
				<view style="margin-left: 30upx;">{{location}}</view>
			</view>
		</view>
		<view class="submit" @tap="submit">提交</view>
		<view class="cu-modal bottom-modal bottomModal" :class="show ? 'show' : ''">
			<view class="cu-dialog">
				<!-- #ifndef MP-ALIPAY -->
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group">
						<view class="title">是</view>
						<radio class='radio blue' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title">否</view>
						<radio class='radio blue' :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0"></radio>
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
	export default {
		data() {
			return {
				show: false,
				radio: 1,
				user: '',
				card: '',
				tel: '',
				address: '',
				content: '',
				location: '上传位置',
				imageData: [],
				url: global_.baseUrl
			}
		},
		components: {
			robbyImageUpload
		},
		onShow() {
			if(this.$store.state.location){
				this.location = this.$store.state.location
			}
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
				console.log(this.imageData)
				console.log(obj)
			},
			inputList(list) {
				console.log(list)
			},
			goMap() {
				uni.navigateTo({
					url: '../map/map'
				})
			},
			submit() {
				if(this.user == ''){
					toast.showTitle('姓名不能为空')
					return
				}
				
				let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if(this.card == ''){
					toast.showTitle('身份证不能为空')
					return
				}else if(!(idcardReg.test(this.card))){
					toast.showTitle('身份证不合法')
					return
				}
				
				if(this.tel == ''){
					toast.showTitle('手机号不能为空')
					return
				}else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))){
					toast.showTitle('手机号格式不正确')
					return
				}
				
				if(this.address == ''){
					toast.showTitle('地址不能为空')
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
				
				if(this.location == '上传位置'){
					toast.showTitle('请上传位置')
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
					anonymous: this.radio,
					cname: this.user,
					idnum: this.card,
					telnum: this.tel,
					address: this.address,
					content: this.content,
					material: files,
					location: this.location,
					latitude: this.$store.state.lat,
					longitude: this.$store.state.lon
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/complSchool/submit',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							self.clear()
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
			},
			clear() {
				this.radio = 1
				this.user = ''
				this.card = ''
				this.tel = ''
				this.address = ''
				this.content = ''
				this.location = '上传位置'
				this.imageData = []
				this.$store.commit('changeLocation', '')
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
		padding: 30upx 0;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.tit {
		width: 100%;
		height: 32upx;
		line-height: 32upx;
		position: relative;
		font-size: 14px;
		color: #3175E4;
		padding: 0 30upx 0 50upx;
	}

	.tit::after {
		content: '';
		position: absolute;
		left: 30upx;
		top: 0;
		width: 3px;
		height: 32upx;
		background: #3175E4;
		border-radius: 4px;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 4px solid #eee;
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
	
	.form-item:last-of-type {
		border-bottom: none;
	}

	input {
		text-align: right;
	}

	.place {
		font-size: 14px;
		color: #999;
	}
	
	.content {
		width: 100%;
		padding: 30upx;
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
	
	.maps {
		width: 100%;
		height: 50upx;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	
	.maps>img {
		width: 28upx;
		height: 39upx;
	}
	
	.submit {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		border-radius: 4px;
		background: #007AFF;
		margin: 30upx auto 0;
	}
</style>
