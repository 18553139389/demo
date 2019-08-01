<template>
	<div class="textCons">
		<div class="Infolist">
			<div><span>收货人</span><input type="text" placeholder="姓名" v-model="addressInfo.name"></div>
			<div><span>联系电话</span><input type="text" placeholder="手机或固定电话" v-model="addressInfo.phone"></div>
			<div @click="shouwCountry"><span>收件地区</span><input type="text" placeholder="收件地区" v-model="countryN"></div>
			<div><span>详细地址</span><input type="text" placeholder="如街道、楼层、门牌号等" v-model="addressInfo.address"></div>
			<div><span>邮政编码</span><input type="text" placeholder="选填" v-model="post_code"></div>
			<div><span>身份证号码</span><input type="text" placeholder="请输入身份证号码" v-model="identity_card"></div>
		</div>
		<mp-picker ref="mpPicker" :pickerValueArray="list1" @onConfirm="sure"></mp-picker>

		<div class="photo">
			<div @click="onReadCard" class="identity_card">
				<img v-if="!!identity_card_photo" class="identity-photo" :src="identity_card_photo">
				<div class="identity-photo" v-if="!identity_card_photo">身份证正面照 </div>
			</div>
			<div @click="onReadRear" class="identity_rear">
				<img v-if="!!identity_rear_photo" class="identity-photo" :src="identity_rear_photo">
				<div class="identity-photo" v-if="!identity_rear_photo">身份证反面照 </div>
			</div>
		</div>
		<van-notice-bar mode="closeable" text="根据中国海关要求，请上传身份证正反面，且图片清晰、完整、并在有效期内，此身份证照片仅限海关清关使用。" />
		<div class="btn" v-if="titNum == 1">
			<button @click="onSave" :disabled="save">保存</button>
			<button @click="onDelete" v-if="!isDefault">删除</button>
		</div>
		<div class="btn" v-else>
			<div class="moren"><span>设为默认收货地址</span>
				<mp-switch v-model="switchValue" @change="switchChange($event)"></mp-switch>
			</div>
			<button @click="onSave" :disabled="save">保存</button>
		</div>
		<mp-toast type="success" v-model="validateSuc" content="保存成功" duration="1500"></mp-toast>
		<mp-toast type="warn" v-model="validateError" content="保存失败" duration="1500"></mp-toast>
		<mp-toast type="success" v-model="deldateSuc" content="删除成功" duration="1500"></mp-toast>
		<mp-toast type="warn" v-model="deldateError" content="删除失败" duration="1500"></mp-toast>
	</div>
</template>
<script>
	import mpPicker from 'mpvue-weui/src/picker'
	import mpButton from 'mpvue-weui/src/button';
	import mpSwitch from 'mpvue-weui/src/switch';
	import mpToast from 'mpvue-weui/src/toast';

	import mpUploader from 'mpvue-weui/src/uploader';
	import Consignee from '@lib/pagination/Consignee'
	import vantContact from '@lib/vant/contact'
	export default {
		data() {
			return {
				list1: [{
					label: '中国'
				}, {
					label: '澳洲'
				}],
				country: '',
				countryN: '',
				validateSuc: false,
				validateError: false,
				deldateSuc: false,
				delidateError: false,
				upNum: 0,
				tit: "",
				type: 'add',
				titNum: 1,
				checked: true,
				zmImage: '',
				bmImage: '',
				addressInfo: {},
				name: '',
				phone: '',
				//      country: '',
				address: '',
				addressDetail: '',
				setDefault: false,
				post_code: '',
				identity_card: '',
				identity_card_photo: '',
				identity_rear_photo: '',
				isDefault: false,
				save: false
			};
		},
		components: {
			mpButton,
			mpUploader,
			mpSwitch,
			mpToast,
			mpPicker
		},
		onLoad(option) {
			console.log(option);
			this.save = false
			this.type = option.type
			let _this = this;
			if (option.type == 'edit') {
				_this.tit = "编辑收件人信息",
					_this.titNum = 1;

			} else if (option.type == 'add') {
				_this.tit = "新增收件人";
				_this.titNum = 0;
			}
			console.log(_this.tit);
			wx.setNavigationBarTitle({
				title: _this.tit
			});
			if (this.$route.query.type == 'edit') {
				let data = this.$store.getters['account/selectConsignee']
				console.log(data, "获取用户信息1111")
				this.addressInfo = data
				this.post_code = data.post_code
				this.identity_card = data.identity_card
				this.identity_card_photo = data.identity_card_photos.base64image
				this.identity_rear_photo = data.identity_rear_photos.base64image
				this.isDefault = data.isDefault
			} else if (this.$route.query.type == 'add') {
				this.addressInfo = {}
				this.post_code = ''
				this.identity_card = ''
				this.identity_card_photo = ''
				this.identity_rear_photo = ''
				this.isDefault = true
			}
		},
		mounted() {
			let data = this.$store.getters['account/selectConsignee']
			console.log(data, "获取用户信息1111")
			this.addressInfo = data
			// this.name = data.name
			// this.phone = data.phone
			// this.country = data.country
			// this.address = data.address
			// this.addressDetail = data.addressDetail
			this.post_code = data.post_code
			this.identity_card = data.identity_card
			this.identity_card_photo = data.identity_card_photos.base64image
			this.identity_rear_photo = data.identity_rear_photos.base64image
			this.isDefault = data.isDefault
			/* eslint-disable */
			if (this.addressInfo.id) {
				this.type = 'update'
				this.setDefault = true
			}
			/* eslint-enable */
			if (this.addressInfo.country == '110101') {
				this.countryN = '中国'
			} else {
				this.countryN = '澳洲'
			}
		},

		methods: {
			upLoad() {
				let that = this
				if (this.titNum = 1) {
					this.titNum = 0
				} else if (this.titNum = 0) {
					this.titNum = 1
				}

			},
			onReadCard() {
				let that = this
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						// const tempFilePaths = res.tempFilePaths
						var tempFilePaths = res.tempFilePaths[0];
						console.log(tempFilePaths);
						var base64 = 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(tempFilePaths, "base64");
						console.log(res, base64, "微信上传图片")
						that.identity_card_photo = base64
					}
				})

			},
			onReadRear() {
				let that = this
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						// const tempFilePaths = res.tempFilePaths
						var tempFilePaths = res.tempFilePaths[0];
						console.log(tempFilePaths);
						if (parseInt(res.tempFiles.size) > 1048576) {
							alert("请上传小于1M的图片")
						} else {
							var base64 = 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(tempFilePaths, "base64");
							console.log(res, base64, "微信上传图片")
							that.identity_rear_photo = base64
						}

					}
				})
			},

			switchChange(event) {
				console.log(event, "切换默认")
				this.isDefault = event
			},
			shouwCountry() {
				console.log("要弹穿了")
				this.$refs.mpPicker.show();
			},
			sure(item) {
				console.log(item)
				if (item.label == "中国") {
					this.countryN = item.label
					this.country = '110101'
					console.log(this.country,'是这里吗')
				} else {
					this.countryN = item.label
					this.country = '120101'
					console.log(this.country,'是这里吗222')
				}
			},
			onSave() {
				this.save = true
				let self = this
				let endpoint = this.$store.getters['server/getEndpoint']
				let api = this.$store.getters['configs/getApiList'].consignee_api_endpoint + '/' + this.type
				let token = this.$store.getters['account/getCustomerToken']
				let apiurl = endpoint + api
				// let content = {
				//   name: this.name,
				//   phone: this.phone,
				//   country: this.country,
				//   addressDetail: this.addressDetail,
				//   identity_card_photo: this.identity_card_photo,
				//   identity_rear_photo: this.identity_rear_photo,
				//   identity_card:this.identity_card,
				//   post_code: this.post_code,
				//   is_default:this.isDefault
				// }

				let content = this.addressInfo
				content.is_default = this.isDefault
				content.country = this.country
				content.identity_card_photo = this.identity_card_photo
				content.identity_rear_photo = this.identity_rear_photo
				content.identity_card = this.identity_card
				content.post_code = this.post_code
				let data = JSON.stringify(vantContact.covert(content))
				wx.request({
					url: apiurl,
					method: 'POST',
					data: data,
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if (res.data.code === 200) {
							self.validateSuc = true
							setTimeout(() => {
								self.$router.push('/pages/consignees/main');
							}, 1000)
						}
					},
					fail() {
						self.warnError = true
					}
				})
				// client.post(apiurl, token, data, (s) => {
				//   if (s.code === 200) {
				//     this.$toast(this.$t('保存成功'))
				//     Toast.clear()
				//     this.$router.go(-1)
				//   }
				// }, (e) => {
				//   Toast.fail(this.$t('保存失败'))
				// })
				if (this.type === 'update' && content.isDefault === true) {
					console.log("来更换默认地址了")
					apiurl = endpoint + this.$store.getters['configs/getApiList'].consignee_api_endpoint + '/default/' + content.id
					wx.request({
						url: apiurl,
						method: 'GET',
						header: {
							'Authorization': token,
							'content-type': 'application/json' // 默认值
						},
						success(res) {
							console.log(res, "更改默认地址成功了")
							if (res.data.code === 200) {}
						},
						fail() {}
					})
					// client.get(apiurl, token, (s) => {
					//   if (s.code === 200) {
					//   }
					// }, (e) => {
					// })
				}
			},
			onDelete() {
				let self = this
				let endpoint = this.$store.getters['server/getEndpoint']
				let api = this.$store.getters['configs/getApiList'].consignee_api_endpoint + '/remove'
				let token = this.$store.getters['account/getCustomerToken']
				let apiurl = endpoint + api

				let content = this.addressInfo
				console.log("这是啥", content)
				let data = JSON.stringify({
					consignee_id: content.id
				})
				wx.request({
					url: apiurl,
					method: 'POST',
					data: data,
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log(res, "嗯,成功了")
						if (res.data.code === 200) {
							self.deldateSuc = true
							setTimeout(() => {
								self.$router.push('/pages/consignees/main');
							}, 1000)
						}
					},
					fail() {

					}
				})
				// client.post(apiurl, token, data, (s) => {
				//   if (s.code === 200) {
				//     this.$toast(this.$t('删除成功'))
				//     this.$router.go(-1)
				//   }
				// }, (e) => {
				// })
			},

		},

	};
</script>
<style lang="scss">
	.photo {
		margin-top: 10rpx;
		width: 100%;
		height: 180rpx;
		display: flex;
		position: relative;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;

		.identity-photo {
			width: 110px;
			height: 80px;
			line-height: 80px;
		}
	}

	.Infolist {
		div {
			display: flex;
			padding: 10px 0;
			margin: 0 15px;
			line-height: 24px;
			color: #333;
			font-size: 15px;
			border-bottom: 1px solid #dfdfdf;

			input {
				width: 75%;
				border: none;
				background: #fff;
				margin-left: 10px;
			}
		}
	}

	.btn {
		margin-top: 20rpx;

		// 默认地址
		.moren {
			width: 96%;
			height: 100rpx;
			margin: 0 auto;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #F3F3F3;

			._switch {
				width: 100rpx;
				height: 50rpx;
				font-size: 20rpx;
			}
		}

		button {
			margin: 0 auto;
			width: 80%;
			height: 88rpx;
			border: 1px solid #4b0;
			background: rgb(0,178,106);
			color: #fff;
			font-size: 28rpx;
			line-height: 88rpx;
			margin-top: 40rpx;
		}


	}
</style>
