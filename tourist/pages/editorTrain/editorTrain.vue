<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white" @goRight="goRight">
				<block slot="backText"></block>
				<block slot="content">{{text}}</block>
				<block slot="right">
					<view v-if="type != 0">删除</view>
				</block>
			</cu-custom>
		</view>
		<view class="lists">
			<view class="listMsg">
				<view class="head">姓名</view>
				<input type="text" placeholder="请与证件保持一致" v-model="user">
			</view>
			<view class="cards" @tap="choice">
				<view class="card">
					<view class="head">证件类型</view>
					<input type="text" placeholder="身份证" v-model="cardType" disabled>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="cards" @tap="choiceBirth">
				<view class="card">
					<view class="head">出生日期</view>
					<input type="text" placeholder="请选择出生日期" v-model="birthday" disabled>
				</view>
				<img src="../../static/img/right.png" alt="">
			</view>
			<view class="listMsg">
				<view class="head">证件号码</view>
				<input type="text" placeholder="请与证件保持一致" v-model="card">
			</view>
			<view class="listMsg">
				<view class="head">手机号码</view>
				<input type="text" placeholder="用于接受出票通知" v-model="tel">
			</view>
		</view>
		<view class="submit" @tap="submit">确定</view>
		<van-popup v-model="show" position="bottom">
			<van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
		</van-popup>
		<van-popup v-model="show3" position="bottom" :overlay="true">
			<van-datetime-picker v-model="currentTime" type="date" :min-date="minDate" @cancel="cancel3" @confirm="confirm3" />
		</van-popup>
		<van-popup v-model="sub" :close-on-click-overlay="false">
			<van-loading type="spinner" />
		</van-popup>
	</view>
</template>

<script>
	import {
		Toast,
		Dialog
	} from 'vant'
	import {
		ajaxs
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				user: '',
				cardType: '身份证',
				card: '',
				tel: '',
				show: false,
				text: '新增乘客',
				birthday: '',
				show3: false,
				currentTime: new Date(),
				minDate: new Date('1900-01-01'),
				sub: false,
				columns: [{
						id: 0,
						text: '身份证'
					},
					{
						id: 1,
						text: '护照'
					},
					{
						id: 4,
						text: '港澳通行证'
					},
					{
						id: 6,
						text: '台湾通行证'
					}
				],
				index: 0,
				userList: {},
				type: '',
				userId: ''
			}
		},
		components: {
			Toast,
			Dialog
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			let self = this
			this.type = option.type
			if (option.type == 1) {
				this.userId = option.id
				let id = option.id
				this.text = '编辑乘客'
				//初始化乘机人数据
				let users = {
					uid: this.$store.state.uid
				}

				let user = {
					url: '/api/gzh/passengerList',
					data: users,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							for (let i = 0; i < res.data.dataList.length; i++) {
								if (id == res.data.dataList[i].id) {
									self.userList = res.data.dataList[i]
									console.log(self.userList)
									self.user = self.userList.username
									if (self.userList.cardType == 0) {
										self.cardType = '身份证'
									} else if (self.userList.cardType == 1) {
										self.cardType = '护照'
									} else if (self.userList.cardType == 4) {
										self.cardType = '港澳通行证'
									} else if (self.userList.cardType == 6) {
										self.cardType = '台湾通行证'
									} 
									self.tel = self.userList.phone
									self.card = self.userList.cardNo
									self.birthday = self.userList.birthday.split('/').join('-')
								}
							}
						}
					}
				}
				ajaxs(user)
			}
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
			onCancel() {
				this.show = false
			},
			onConfirm(e) {
				console.log(e)
				this.show = false
				this.cardType = e.text
				this.index = e.id
			},
			cancel3() {
				this.show3 = false
			},
			confirm3(e) {
				this.show3 = false
				this.birthday = this.dateFtt('yyyy-MM-dd', e)
				console.log(this.birthday)
			},
			choice() {
				this.show = true
			},
			choiceBirth() {
				this.show3 = true
			},
			dateFtt(fmt, date) { //author: meizz   
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
			goRight() {
				let self = this
				Dialog.confirm({
					title: '删除',
					message: '确认删除此编辑人吗'
				}).then(() => {
					// on confirm
					let users = {
						uid: self.$store.state.uid,
						passengerId: self.userId
					}
					
					let user = {
						url: '/api/gzh/delPassenger',
						data: users,
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								Toast('删除成功')
								setTimeout(function(){
									uni.navigateBack({
										delta: 1
									})
								},300)
							}else{
								Toast(res.data.resultNote)
							}
						}
					}
					ajaxs(user)
				}).catch(() => {
					// on cancel
				})
			},
			submit() {
				if (this.user == '') {
					Toast('姓名不能为空')
					return
				}

				if (this.card == '') {
					Toast('证件号码不能为空')
					return
				}

				if (this.cardType == '身份证') {
					let idcardReg =
						/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
					if (!(idcardReg.test(this.card))) {
						Toast('身份证不合法')
						return
					}
				}

				if (this.birthday == '') {
					Toast('请选择出生日期')
					return
				}

				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[345789]\d{9}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}

				let self = this
				this.sub = true
				if (this.type == 0) {
					let datas = {
						url: '/api/gzh/savePassenger',
						data: {
							uid: this.$store.state.uid,
							username: this.user,
							cardType: this.index,
							cardNo: this.card,
							phone: this.tel,
							birthday: this.birthday
						},
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								self.sub = false
								Toast('新增成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast(res.data.resultNote)
							}
						}
					}
					ajaxs(datas)
				} else if (this.type == 1) {
					let datas = {
						url: '/api/gzh/savePassenger',
						data: {
							uid: this.$store.state.uid,
							passengerId: this.userId,
							username: this.user,
							cardType: this.index,
							cardNo: this.card,
							phone: this.tel,
							birthday: this.birthday
						},
						success: function(res) {
							console.log(res)
							if (res.data.result == 0) {
								self.sub = false
								Toast('编辑成功')
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							} else {
								Toast(res.data.resultNote)
							}
						}
					}
					ajaxs(datas)
				}
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	.van-popup {
		background: none !important;
	}

	.lists {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		border-top: 8px solid #F8F8F8;
		display: flex;
		flex-direction: column;
	}

	.listMsg,
	.cards {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	.head {
		width: 160upx;
		height: 90upx;
		line-height: 90upx;
	}

	.listMsg>input,
	.card>input {
		margin-left: 50upx;
		font-size: 14px;
	}

	.cards>img {
		width: 24upx;
		float: right;
	}

	.cards {
		justify-content: space-between;
	}

	.card {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.submit {
		width: 70%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		border-radius: 4px;
		background: #DE2910;
		margin: 160upx auto;
	}
</style>
