<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">新增收货地址</block>
				<block slot="right">
					<view @tap="goDel">删除</view>
				</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="list_item">
				<view>联系人：</view>
				<input type="text" placeholder="收货人姓名" v-model="user">
			</view>
			<view class="list_item">
				<view>联系人手机：</view>
				<input type="text" placeholder="请输入手机号" v-model="phone">
			</view>
			<view class="list_item" @tap="openPicker">
				<view>所在地区：</view>
				<input type="text" placeholder="请选择省/市/区" v-model="area" disabled>
			</view>
			<view class="list_item">
				<view>详细地址：</view>
				<input type="text" placeholder="详细地址" v-model="address">
			</view>
			<view class="list_item" style="border-bottom: none;">
				<view>邮政编码：</view>
				<input type="text" placeholder="邮政编码" v-model="code">
			</view>
		</view>
		<view class="buy" @tap="save">保存</view>
		<lotus-address @choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
	import {
		Toast,
		Dialog
	} from 'vant'
	import {
		ajax
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				user: '',
				phone: '',
				area: '',
				code: '',
				address: '',
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
				list: {},
				listData: [],
				ids: ''
			}
		},
		components: {
			"lotus-address": lotusAddress,
			Toast
		},
		onLoad(option) {
			if (option.type == 1) {
				this.list = JSON.parse(option.list)
				this.ids = this.list.id
				this.user = this.list.username
				this.phone = this.list.phone
				this.area = this.list.city
				this.address = this.list.address
				this.code = this.list.postCode
			}
		},
		methods: {
			save() {
				let self = this
				if (this.user == '') {
					Toast('收货人不能为空')
					return
				}

				if (this.phone == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^1[345789]\d{9}$/.test(this.phone))) {
					Toast('手机号格式不正确')
					return
				}

				if (this.area == '') {
					Toast('请选择省市区')
					return
				}

				if (this.address == '') {
					Toast('请填写详细地址')
					return
				}

				if (this.code == '') {
					Toast('邮政编码不能为空')
					return
				}

				let datas = {
					uid: this.$store.state.uid,
					receiverId: this.ids,
					username: this.user,
					phone: this.phone,
					city: this.area,
					address: this.address,
					postCode: this.code
				}
				let data = {
					url: '/api/gzh/saveReceiver',
					data: datas,
					success: function(res) {
						if (res.data.result == 0) {
							Toast('保存成功')
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 300)
						}
					}
				}
				ajax(data)
			},
			goDel() {
				let self = this
				Dialog.confirm({
					title: '删除',
					message: '确认删除此收货地址吗'
				}).then(() => {
					// on confirm
					let datas = {
						uid: this.$store.state.uid,
						receiverId: this.ids
					}
					let data = {
						url: '/api/gzh/delReceiver',
						data: datas,
						success: function(res) {
							if (res.data.result == 0) {
								Toast('删除成功')
								console.log(self.$store.state.saveAddress)
								if(self.$store.state.saveAddress != null){
									if(self.ids == self.$store.state.saveAddress.id){
										self.$store.commit('changeSaveAddress', null)
									}
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 300)
								}else{
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 300)
								}
							}
						}
					}
					ajax(data)
				}).catch(() => {
					// on cancel
				});
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
					this.area = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.list {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		border-top: 6px solid #f9f9f9;
		background: #fff;
	}

	.list_item {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #333;
		border-bottom: 1px solid #eee;
	}

	input {
		border: none;
		background: none;
		text-align: right;
	}

	.buy {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
</style>
