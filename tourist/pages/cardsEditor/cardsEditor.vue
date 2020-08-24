<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">编辑名片</block>
			</cu-custom>
		</view>
		<view class="forms">
			<img @tap="upload" class="imgs" :src="head == '' ? 'http://pic13.nipic.com/20110409/7119492_114440620000_2.jpg' : head"
			 alt="">
			<view class="form-item">
				<view class="items">
					<view>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
					<input type="text" v-model="user" placeholder="请输入姓名" placeholder-class="place">
				</view>
				<view class="items">
					<view>公司名称：</view>
					<input type="text" v-model="company" placeholder="请输入公司名称" placeholder-class="place">
				</view>
				<view class="items">
					<view>联系方式：</view>
					<input type="text" v-model="tel" placeholder="请输入联系方式" placeholder-class="place">
				</view>
				<view class="items">
					<view>微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信：</view>
					<input type="text" v-model="wx" placeholder="请输入微信号" placeholder-class="place">
				</view>
				<view class="items">
					<view>行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</view>
					<input type="text" v-model="work" placeholder="请输入所属行业" placeholder-class="place">
				</view>
				<view class="items" @tap="openPicker">
					<view>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</view>
					<input type="text" v-model="section" placeholder="请选择所属地区" placeholder-class="place" disabled>
				</view>
				<view class="contents">
					<view class="user_msg">公司简介</view>
					<view class="msg">
						<textarea v-model="text1" placeholder="公司简介" placeholder-class="places"></textarea>
					</view>
				</view>
				<view class="contents" style="padding-top: 0;">
					<view class="user_msg">个性签名</view>
					<view class="msg">
						<textarea v-model="text2" placeholder="个性签名" placeholder-class="places"></textarea>
					</view>
				</view>
				<view class="contents" style="padding-top: 0;">
					<view class="user_msg" style="margin-bottom: 30upx;">隐私设置</view>
					<view class="items">
						<view>联系方式：</view>
						<van-switch v-model="checked1" size="20px" active-color="#DE2910" inactive-color="#e3e3e3" />
					</view>
					<view class="items">
						<view>微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信：</view>
						<van-switch v-model="checked2" size="20px" active-color="#DE2910" inactive-color="#e3e3e3" />
					</view>
				</view>
			</view>
		</view>
		<view class="sure" @tap="publics">确定发布</view>
		<lotus-address @choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
	import mSearch from '../../components/search/search.vue'
	import {
		ajaxs
	} from '../../common/js/util.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				head: '',
				user: '',
				company: '',
				tel: '',
				wx: '',
				work: '',
				section: '',
				text1: '',
				text2: '',
				checked1: false,
				checked2: false,
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
					url: '/api/gzh/userCard',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.head = res.data.icon
							self.user = res.data.username
							self.company = res.data.company
							self.tel = res.data.phone
							self.wx = res.data.weixin
							self.work = res.data.industry
							self.section = res.data.city
							self.text1 = res.data.content
							self.text2 = res.data.introduction
							if (res.data.phoneState == 0) {
								self.checked1 = false
							} else {
								self.checked1 = true
							}
							if (res.data.weixinState == 0) {
								self.checked2 = false
							} else {
								self.checked2 = true
							}
						}
					}
				}
				ajaxs(data)
			},
			upload() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						console.log(chooseImageRes)
						if(chooseImageRes.tempFiles[0].size > 2097152) {
							Toast('上传头像大小不能超过2M')
							return
						}
						const tempFilePaths = chooseImageRes.tempFilePaths
						uni.uploadFile({
							url: 'https://m.xgcyz1978.com/api/uploadFile',
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								this.head = 'https://m.xgcyz1978.com' + data.url
								// this.head = data.url
								console.log(this.head)
							}
						});
					}
				})
			},
			//打开picker
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
					this.section = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
				console.log(this.section)
			},
			publics() {
				let self = this
				if (this.head == '') {
					Toast('请上传头像')
					return
				}
				if (this.user == '') {
					Toast('请输入姓名')
					return
				}
				if (this.company == '') {
					Toast('请输入公司名称')
					return
				}
				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}
				if (this.wx == '') {
					Toast('请输入微信号')
					return
				}
				if (this.work == '') {
					Toast('请输入所属行业')
					return
				}
				if (this.section == '') {
					Toast('请选择所属地区')
					return
				}
				if (this.text1 == '') {
					Toast('请输入公司简介')
					return
				}
				if (this.text2 == '') {
					Toast('请输入个性签名')
					return
				}
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let datas = {
					uid: this.$store.state.uid,
					username: this.user,
					icon: this.head,
					company: this.company,
					phone: this.tel,
					weixin: this.wx,
					industry: this.work,
					city: this.section,
					content: this.text1,
					introduction: this.text2,
					phoneState: this.checked1 ? '0' : '1',
					weixinState: this.checked2 ? '0' : '1',
				}
				let data = {
					url: '/api/gzh/saveCard',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							uni.hideLoading()
							uni.navigateBack({
								delta: 1
							})
						}
					}
				}
				ajaxs(data)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #FFFFFF;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx 110upx;
		box-sizing: border-box;
		align-items: center;
	}

	.imgs {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		overflow: hidden;
		margin: 30upx 0 50upx;
	}

	.form-item {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.items {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px dashed #eee;
		font-size: 14px;
		color: #333;
	}

	.place {
		font-size: 14px;
		color: #999;
	}

	.places {
		font-size: 12px;
		color: #999;
	}

	input {
		text-align: right;
	}

	.contents {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 50upx 0 25upx;
	}

	.user_msg {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 14px;
		color: #333;
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
	}

	.msg {
		width: 100%;
		height: 240upx;
		border-radius: 4px;
		background: #E3E3E6;
		margin: 30upx 0;
	}

	textarea {
		display: inline-block;
		width: 100%;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
	}

	.sure {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		background: #DE2910;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
	}
</style>
