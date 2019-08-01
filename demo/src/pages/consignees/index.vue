<template>
	<div id="consignees">
		<div class="conList">
			<radio-group class="ul" @change="setDefault">
				<div v-for="(item,index) in getConsignees" :key="index">
					<radio :value="item.id" class="lis" :checked="item.is_default">
						<div class="radioRight">
							<div><span>{{item.name}}，</span><span>{{item.phone}}</span></div>
							<p>收货地址：<span>{{item.address}}</span></p>
						</div>
						<div class="bianji" @click.stop="taps(item)">
							<van-icon name="edit" />
						</div>
					</radio>
				</div>
			</radio-group>
		</div>
		<button class="addNew" :class="{ 'text-danger':hasError }" @click="add">新增地址</button>
		<mp-toast type="success" v-model="validateSuc" content="切换默认地址成功" duration="1500"></mp-toast>
		<mp-toast type="warn" v-model="validateError" content="切换默认地址失败" duration="1500"></mp-toast>
		<mp-toast type="warn" v-model="validateWarn" content="暂时没有收货人信息哦，去新建一个吧" duration="1500"></mp-toast>
		<mp-toast type="warn" v-model="addWarn" content="最多只能添加6条地址信息" duration="1500"></mp-toast>
		<div class="mask" v-if="isShowLoading"></div>
	</div>
</template>

<script>
	import mpToast from 'mpvue-weui/src/toast'
	import Consignee from '@lib/pagination/Consignee'
	import vantContact from '@lib/vant/contact'
	import _ from 'underscore'
	import mpLoading from 'mpvue-weui/src/loading'
	export default {
		components: {
			mpLoading,
			mpToast,
		},
		data() {
			return {
				defaultConsigneeId: '',
				timer: null,
				validateSuc: false,
				validateError: false,
				validateWarn: false,
				addWarn: false,
				hasError: false,
				isShowLoading: true,
				isShowMask: true,
				getConsignees: []
			}
		},
		onUnload: function() {
			wx.redirectTo({
				url: '../cardOrder/main'
			})
		},
		mounted() {
			let self = this
			self.isShowLoading = true
			wx.showLoading({
				title: '加载中...'
			})
			if (self.getConsignees.length <= 6) {
				self.hasError = false;

			} else {
				self.addWarn = true;
				self.hasError = true;
			}
			this.$store.commit('consignee/SET_DATA_TO_LOC', [])

			Consignee.init({
				store: this.$store
			})

			Consignee.loadInitData({
				timeout: 100,
				needConcat: false,
				forceLoad: true,
				cb: (response) => {
					self.isShowLoading = false
					wx.hideLoading({
						title: '加载中...'
					})
					if (response.data.data && response.data.data.length === 0) {
						self.validateWarn = true
					}
				}
			})

			setTimeout(function() {
				let data = self.$store.getters['consignee/getData']
				let arr = []
				_.map(data.data, (item, index) => {
					if (item.is_default == true) {
						self.defaultConsigneeId = item.id
					}
					arr.push(vantContact.covert(item))
				})
				self.getConsignees = arr
				console.log(self.getConsignees, '数据存储了吗')
			}, 2000)
		},
		computed: {
			getDefaultConsigneeId() {
				return this.$store.getters['all/getDefaultConsignee']
			}
		},
		methods: {
			taps(item) {
				console.log(item, "点击编辑")
				this.$store.commit('account/COMMET_SET_SELECTED_CONSIGNEE', item)
				// this.$router.push({path: '/consignee/edit?hide-tab-bar', query: {type: 'edit'}})
				wx.navigateTo({
					url: "textCons/main?type=edit"
				})
				console.log("点击-编辑")
			},
			add() {
				let self = this;
				this.$store.commit('account/COMMET_SET_SELECTED_CONSIGNEE', {
					identity_card_photo: '',
					identity_rear_photo: ''
				})
				if (self.getConsignees.length < 6) {
					self.hasError = false;
					wx.navigateTo({
						url: "textCons/main?type=add"
					})
				} else {
					self.addWarn = true;
					self.hasError = true;
				}
			},


			setDefault(e) {
				console.log(e, '初始化数据')
				let id = e.mp.detail.value
				let that = this
				let endpoint = this.$store.getters['server/getEndpoint']
				let token = this.$store.getters['account/getCustomerToken']
				let apiurl = endpoint + this.$store.getters['configs/getApiList'].consignee_api_endpoint + '/default/' + id
				wx.request({
					url: apiurl,
					method: 'GET',
					header: {
						'Authorization': token,
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if (res.data.code === 200) {
							that.validateSuc = true
							for (let i = 0; i < that.getConsignees.length; i++) {
								that.getConsignees[i].is_default = false
								if (that.getConsignees[i].id == id) {
									that.getConsignees[i].is_default = true
								}
							}
							that.$router.push('/pages/card/cardOrder/main')
						}
					},
					fail() {},
				})
			}
		},
		components: {
			mpToast
		}
	}
</script>

<style lang="scss">
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .3);
		z-index: 9999;
	}

	#consignees {
		height: 100vh;


		.conList {
			width: 100%;
			height: 90vh;
			overflow: hidden;

			.ul {
				width: 100%;

				.lis {
					width: 90%;
					margin: 0 5%;
					padding: 20rpx 0;
					height: 100rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid rgb(179, 179, 179);
					position: relative;

					.radioRight {
						width: 430rpx;
						float: left;
						margin-left: 20rpx;
						font-size: 30rpx;

						p {
							font-size: 28rpx;
							color: #7c7b7b;
						}
					}

					.bianji {
						position: absolute;
						right: -50rpx;
						top: 50rpx;
						width: 20%;

						.van-icon {
							font-size: 50rpx;
						}
					}
				}
			}
		}

		.addNew {
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 100rpx;
			border: none;
			background: #1AAD19;
			color: #FFFFFF;
			border-radius: 0;
		}

		.text-danger {
			background: #EC8B89;
		}

		.button-hover {
			opacity: .8;
		}
	}
</style>
