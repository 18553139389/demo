<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">个人信息</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="list">
				<view class="head">
					<view>更换头像</view>
					<img @tap="changHead" :src="head" alt="">
				</view>
				<view class="head">
					<view>姓名：</view>
					<input type="text" placeholder="请输入" v-model="name">
				</view>
				<view class="head" @tap="changeSex">
					<view>性别：</view>
					<view class="right">
						<input type="text" placeholder="请选择" disabled v-model="sex">
						<img src="../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="head" @tap="changeDate">
					<view>生日：</view>
					<view class="right">
						<input type="text" placeholder="请选择" disabled v-model="birth">
						<img src="../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="head">
					<view>职务：</view>
					<input type="text" placeholder="请输入" v-model="work">
				</view>
				<view class="head">
					<view>职业：</view>
					<input type="text" placeholder="请输入" v-model="hot">
				</view>
				<view class="head" @tap="openPicker">
					<view>地区：</view>
					<view class="right">
						<input type="text" placeholder="请选择" disabled v-model="area">
						<img src="../../static/img/right.png" alt="">
					</view>
				</view>
				<view class="head">
					<view>公司名称：</view>
					<input type="text" placeholder="请输入" v-model="nick">
				</view>
				<view class="head">
					<view>手机号：</view>
					<input type="text" placeholder="请输入" v-model="phone">
				</view>
				<view class="head" style="border-bottom: none">
					<view>个性签名：</view>
					<input type="text" placeholder="请输入" v-model="mark">
				</view>
			</view>
			<view class="submit" @tap="submit">提交</view>
		</view>
		<van-popup v-model="show1" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
		</van-popup>
		<van-popup v-model="show2" position="bottom">
			<van-datetime-picker v-model="currentTime" type="date" :min-date="minDate" @cancel="cancelStart" @confirm="confirmStart" />
		</van-popup>
		<lotus-address @choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
	import { ajax } from '../../common/js/util.js'
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				head: '',
				name: '',
				sex: '',
				birth: '',
				work: '',
				hot: '',
				area: '',
				nick: '',
				phone: '',
				mark: '',
				show1: false,
				show2: false,
				currentTime: new Date(),
				minDate: new Date('1919'),
				columns: ['男', '女', '保密'],
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				}
			}
		},
		components: {
			"lotus-address": lotusAddress,
			Toast
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
		},
		onReady() {
			this.init()
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			init() {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/userInfo',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0) {
							self.head = res.data.icon
							self.name = res.data.username
							if(res.data.sex == 0){
								self.sex = "女"
							}else if(res.data.sex == 1){
								self.sex = "男"
							}else{
								self.sex = "保密"
							}
							self.birth = res.data.birthday
							self.work = res.data.position
							self.hot = res.data.job
							self.area = res.data.address
							self.nick = res.data.company
							self.phone = res.data.phone
							self.mark = res.data.description
						}
					}
				}
				ajax(data)
			},
			changHead() {
				let _this = this
				uni.chooseImage({
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths
						// _this.getImageInfo(tempFilePaths[0])
						uni.uploadFile({
							url: 'https://m.xgcyz1978.com/api/uploadFile', 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								this.head = 'https://m.xgcyz1978.com' + data.url
							}
						})
					}
				});
			},
			getImageInfo(src) {
				let _this = this
				uni.getImageInfo({
					src,
					success(res) {
						console.log('压缩前', res)
						let canvasWidth = res.width //图片原始长宽
						let canvasHeight = res.height
						let img = new Image()
						img.src = res.path
						let canvas = document.createElement('canvas');
						let ctx = canvas.getContext('2d')
						canvas.width = canvasWidth / 2
						canvas.height = canvasHeight / 2
						ctx.drawImage(img, 0, 0, canvasWidth / 2, canvasHeight / 2)
						canvas.toBlob(function(fileSrc) {
							let imgSrc = window.URL.createObjectURL(fileSrc)
							console.log('压缩后', imgSrc)
							_this.uploadFile(imgSrc)
						})
					}
				})
			},
			uploadFile(filePath) {
				let _this = this
				uni.uploadFile({
					url: 'https://m.xgcyz1978.com/api/uploadFile',
					name: 'file',
					filePath,
					success: (res) => {
						let { data } = JSON.parse(res.data)
						_this.head = 'https://m.xgcyz1978.com' + data.url
					},
					fail: (err) => {
						uni.showToast({
							title: err.errMsg,
							icon: 'none'
						})
					}
				})
			},
			changeSex() {
				this.show1 = true
			},
			dateFtt(fmt, date) {
				var o = {
					"M+": date.getMonth() + 1, //月份   
					"d+": date.getDate(), //日   
					"h+": date.getHours(), //小时   
					"m+": date.getMinutes(), //分   
					"s+": date.getSeconds(), //秒   
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
					"S": date.getMilliseconds() //毫秒   
				}
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
				return fmt
			},
			onCancel() {
				this.show1 = false
			},
			onConfirm(val) {
				console.log(val)
				this.show1 = false
				this.sex = val
			},
			changeDate() {
				this.show2 = true
			},
			cancelStart() {
				this.show2 = false
			},
			confirmStart(val) {
				this.show2 = false
				this.birth = this.dateFtt("yyyy-MM-dd", val)
			},
			openPicker() {
				this.lotusAddressData.visible = true;
			},
			//回传已选的省市区的值
			choseValue(res) {
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.provice; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.area = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
				console.log(this.region)
			},
			submit() {
				if (this.head == '') {
					Toast('请上传头像')
					return
				}
				
				if (this.name == '') {
					Toast('姓名不能为空')
					return
				}
				
				if (this.sex == '') {
					Toast('请选择性别')
					return
				}
				
				if (this.sex == '') {
					Toast('请选择生日')
					return
				}
				
				if (this.work == '') {
					Toast('职务不能为空')
					return
				}
				
				if (this.hot == '') {
					Toast('职业不能为空')
					return
				}
				
				if (this.area == '') {
					Toast('请选择地区')
					return
				}
				
				if (this.nick == '') {
					Toast('公司不能为空')
					return
				}
				
				if (this.phone == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					Toast('手机号格式不正确')
					return
				}
				
				if (this.mark == '') {
					Toast('签名不能为空')
					return
				}
				
				let self = this
				let sex = this.sex
				if(this.sex == "女"){
					sex = 0
				}else if(this.sex == "男"){
					sex = 1
				}else{
					sex = 2
				}
				let datas = {
					uid: this.$store.state.uid,
					icon: this.head,
					username: this.name,
					sex: sex,
					birthday: this.birth,
					position: this.work,
					job: this.hot,
					address: this.area,
					company: this.nick,
					description: this.mark,
					phone: this.phone
				}
				let data = {
					url: '/api/gzh/updateUserInfo',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0) {
							Toast('保存成功')
							uni.navigateBack({
								delta: 1
							})
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
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.lists {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		padding: 20upx;
		background: #fff;
		border-radius: 4px;
	}

	.head {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
		padding: 20upx 0;
	}

	.head>img {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.head>input {
		text-align: right;
		margin-right: 34upx;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.right>img {
		width: 24upx;
	}

	.right>input {
		text-align: right;
		margin-right: 12upx;
	}

	.submit {
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		border-radius: 4px;
		background: #DE2910;
		font-size: 15px;
		color: #fff;
		margin: 30upx auto;
	}
</style>
