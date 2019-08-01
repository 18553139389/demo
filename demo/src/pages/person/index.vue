<template>
	<div class="container ">
		<div class="footerNav">
			<div class="footerList" v-for="(item,indx) in images" :key="indx" @click="changeNav(indx)">
				<img :src="item.url" alt="">
				<span :class="{actived:indx == 3}">{{item.text}}</span>
			</div>
		</div>
		<!-- 头部 -->
		<div class="vipCard">
			<img class="banner" src="../../../static/images/userbanner.png" alt="">
			<div class="usrInfos">
				<div class="userImg">
					<img :src="img" alt="">
					<h3 @click="tologin">{{custName}}</h3>
				</div>
				<div class="userName"> {{mobile}}</div>
			</div>
		</div>

		<div class="userList">
			<van-cell-group class="user-group">
				<van-cell icon="records" title="全部订单" url="/pages/order/main" is-link />
				<van-cell icon="exchange" title="我的积分" url="/pages/points/main" is-link />
				<van-cell icon="gold-coin" title="优惠券" url="/pages/coupon/main" is-link />
				<van-cell icon="contact" title="我的信息" url="/pages/accountInfo/main" is-link />
				<van-cell icon="location" title="收货人信息" url="/pages/consignees/main" is-link />
				<van-cell icon="chat" title="版本号" :value="version" />
				<van-cell icon="arrow-left" title="退出" @click="logout" />
			</van-cell-group>
			<div class="van-bottom"></div>
		</div>
		<!-- <mp-loading :showLoading="isShowLoading" loadingText="登陆中..." :mask="isShowMask"></mp-loading> -->
		<!-- <mp-toast type="success" v-model="validateSuc" content="登录成功" duration="1000" ></mp-toast> -->
		<mp-modal ref="mpModal" :title="title" :content="content" :showCancel="true" @confirm="confirm" @cancel="cancel"></mp-modal>
	</div>
</template>

<script>
	import personTop from '@/components/person/personTop.vue'
	import personList from '@/components/person/personList.vue'
	import Toast from '@/../static/vant/toast/toast'
	import utli from "@lib/Utli"
	import mpToast from 'mpvue-weui/src/toast'
	import mpModal from 'mpvue-weui/src/modal';
	export default {
		components: {
			mpToast,
			mpModal,
		},
		data() {
			return {
				images: [{
						text: "首页",
						url: "../../static/tabs/first.png"
					},
					{
						text: "分类",
						url: "../../static/tabs/type.png"
					},
					{
						text: "购物车",
						url: "../../static/tabs/card.png"
					},
					{
						text: "个人中心",
						url: "../../static/tabs/person-icon.png"
					}
				],
				activeKeys: 3,
				custName: '去登录',
				mobile: '',
				img: '',
				version: 1.12,
				validateSuc: false,
				isShowMask: true,
				title: '确认退出',
				content: ''
			}
		},
		onShow() {
			let accountInfo = this.account
			this.custName = (accountInfo.lastName ? accountInfo.lastName : '') + accountInfo.firstName
			this.mobile = accountInfo.mobile
			this.img = accountInfo.head_portrait.image
			console.log(accountInfo, '初始化信息')
		},
		computed: {
			account() {
				let accountInfo = this.$store.getters['account/getAccountData']
				this.custName = (accountInfo.lastName ? accountInfo.lastName : '') + accountInfo.firstName
				console.log(accountInfo, "用户数据")
				return accountInfo
			},
			isLogin() {
				return this.$store.getters['account/isLogin']
				console.log("走了-判断登录")
			}
		},
		methods: {
			changeNav(index) {
				console.log(index)
				if (index == 0) {
					wx.redirectTo({
						url: '../index/main'
					})
				} else if (index == 1) {
					wx.redirectTo({
						url: '../category/main'
					})
				} else if (index == 2) {
					let path = this.$route.path;
					if ((path = "/pages/card/main")) {
						path = "card";
					}
					let page = {
						url: path,
						query: {
							uuid: this.$route.query.uuid,
							"hide-tab-bar": true
						}
					};
					utli.loginCheck(
						this.$store,
						this.$router,
						page,
						"login?hide-tab-bar",
						function() {
							wx.redirectTo({
								url: '../card/main'
							})
						}.bind(this)
					);
				}
			},
			getHeaderPhoto(account) {
				return (account.head_portrait.image) ? account.head_portrait.image : img
			},
			confirm() {
				let self = this;
				self.$store.dispatch('account/RESET').then(() => {
					self.alertDialog1Visible = false
					wx.redirectTo({
						url: '../index/main'
					})
				})
			},
			logout() {
				let self = this
				this.$refs.mpModal.show()
			},
			tologin() {
				let self = this
				this.$store.dispatch('account/RESET').then(() => {
					self.alertDialog1Visible = false
					self.$router.replace({
						path: '/pages/login/main'
					})
				})
			}
		}
	}
</script>

<style lang='scss'>
	.footerNav {
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		background: rgb(247, 247, 249);
		border-top: 2px solid #eee;
		z-index: 20;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.footerList {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.footerList img {
		width: 26px;
		height: 26px;
	}

	.footerList span {
		font-size: 28rpx;
		color: #999;
	}

	.actived {
		color: rgb(102, 133, 96) !important;
	}

	.vipCard {
		width: 100%;
		height: 420rpx;
		position: relative;

		.banner {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		.usrInfos {
			width: 90%;
			height: 85%;
			margin: 0 auto;
			padding-top: 30rpx;
			position: relative;
			color: #fff;
			z-index: 5;

			.userImg {
				width: 100%;
				height: 120rpx;
				border-radius: 50%;

				img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					float: left;
				}

				h3 {
					float: left;
					line-height: 120rpx;
					padding-left: 40rpx;
					font-weight: 500;
				}
			}

			.userName {
				position: absolute;
				bottom: 10rpx;
				font-size: 32rpx;
				text-indent: 10rpx;
			}
		}
	}
</style>
