<template>
	<div>
		<div class="footerNav">
			<div class="footerList" v-for="(item,indx) in images" :key="indx" @click="changeNav(indx)">
				<img :src="item.url" alt="">
				<span :class="{active:indx == 0}">{{item.text}}</span>
			</div>
		</div>
		<div class="search">
			<div class="search_box">
				<van-search placeholder="请输入搜索关键词" v-model="value" input-align="center" @focus="goSearch" />
			</div>
			<div class="speak">
				<img src="../../../static/images/cs.png" alt="" @click="goService">
			</div>
		</div>
		<div class="contain">
			<scroll-view scroll-y @scrolltolower="loadMore">
				<div class="banner" v-if="getContentPageDataList">
					<swiper indicator-dots="getContentPageDataList.length > 1" autoplay="true" interval="2000">
						<swiper-item v-for="(item, index) in getContentPageDataList" :key="index">
							<image :src="item.img" class="slide-image" mode="aspectFill" @click="imgSearch(item)" />
						</swiper-item>
					</swiper>
				</div>
				<ul class="nav" v-if="getContentPageNavList">
					<li v-for="(item, i) in getContentPageNavList" :key="i" @click="imgSearch(item)">
						<img :src="item.img" alt="">
						<span>{{item.title}}</span>
					</li>
				</ul>
				<ul class="nav-list" v-if="getContentPageImgList">
					<li v-for="(item,i) in getContentPageImgList" :key="i" @click="imgClick(item)">
						<img :src="item.img" alt="">
					</li>
				</ul>
				<div class="block-d">
					<div class="list-header" v-if="getCartTitle">
						<img src="../../../static/images/divider.png" alt="">
						<span>{{getCartTitle}}</span>
						<img src="../../../static/images/divider.png" alt="">
					</div>

					<div class="banner" v-if="getContentPageCartList">
						<swiper indicator-dots="getContentPageCartList.length > 1" autoplay="true" interval="2000">
							<swiper-item v-for="(item, index) in getContentPageCartList" :key="index">
								<image :src="item.img" class="slide-image" mode="aspectFill" @click="imgSearch(item)" />
							</swiper-item>
						</swiper>
					</div>
					<ul class="cart-list" v-if="getContentPageProductList">
						<li v-for="(item, i) in getContentPageProductList" :key="i" @click="goDetail(item.uuid)">
							<image :src="item.photos.length > 0 ? item.photos[0].image : '../../../static/images/logobig.png'" class="slide-image"
							 mode="scaleToFill" @click="imgSearch(item)" />
							<span class="name">{{item.name}}</span>
							<span class="list_price">AUD${{item.price}}</span>
						</li>
					</ul>
				</div>
				<div class="block-e">
					<div class="list-header" v-if="getCartETitle">
						<img src="../../../static/images/divider.png" alt="">
						<span>{{getCartETitle}}</span>
						<img src="../../../static/images/divider.png" alt="">
					</div>

					<div class="banner" v-if="getContentPageProductImg">
						<swiper indicator-dots="getContentPageProductImg.length > 1" autoplay="true" interval="2000">
							<swiper-item v-for="(item, index) in getContentPageProductImg" :key="index">
								<image :src="item.img" class="slide-image" mode="aspectFill" @click="imgSearch(item)" />
							</swiper-item>
						</swiper>
					</div>
					<ul class="e-list">
						<li v-for="(item, i) in cmsProductList" :key="i" @click="goDetail(item.uuid)">
							<div class="line"></div>
							<div class="e-product">
								<image :src="item.photos.length > 0 ? item.photos[0].image : '../../../static/images/logobig.png'" class="slide-image"
								 mode="scaleToFill" />
								<div class="e-content">
									<div class="e-title">{{item.name}}</div>
									<div class="e-price">
										<span class="e-left">UAD${{item.price}}</span>
										<span class="e-right">（约合¥{{item.currency_price}}）</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</scroll-view>
		</div>
		<div class="mask" v-if="isShowLoading"></div>
	</div>
</template>

<script>
	import Category from '@lib/pagination/Category'
	import Home from '@lib/pagination/CmsProduct'
	import Pagination from '@lib/system/Pagination'
	import searchLib from '@lib/search'
	import Utli from '@lib/Utli'
	import mpLoading from 'mpvue-weui/src/loading'
	import LoadingApi from '@lib/loading'

	export default {
		components: {
			mpLoading,
		},
		data() {
			return {
				value: '',
				images: [{
						text: "首页",
						url: "../../static/tabs/first-icon.png"
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
						url: "../../static/tabs/person.png"
					}
				],
				activeKey: 0,
				timer: null,
				getContentPageDataList: null,
				getContentPageNavList: null,
				getContentPageImgList: null,
				getContentPageCartList: null,
				getCartTitle: null,
				getContentPageProductList: null,
				getCartETitle: null,
				cmsProductList: null,
				isShowLoading: false,
				isShowMask: true
			}
		},
		beforeUpdate() {
			this.getContentPageDataList = this.getContentPageData.data.block_a.data
			this.getContentPageNavList = this.getContentPageData.data.block_b.data
			this.getContentPageImgList = this.getContentPageData.data.block_c.data
			this.getCartTitle = this.getContentPageData.data.block_d.title
			this.getCartETitle = this.getContentPageData.data.block_e.title
			this.getContentPageCartList = this.getContentPageData.data.block_d.data
			this.getContentPageProductList = this.getContentPageData.data.category_products[0].products
			this.getContentPageProductImg = this.getContentPageData.data.block_e.data
			this.cmsProductList = this.homepageProductData.data
		},
		onShow() {
			this.init()
		},
		computed: {
			getContentPageData() {
				return this.$store.getters['page/getContentPageData']
			},
			homepageProductData() {
				return this.$store.getters['product/allProducts']
			}
		},
		methods: {
			changeNav(index) {
				if (index == 1) {
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
					Utli.loginCheck(
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
				} else if (index == 3) {
					let path = this.$route.path;
					if ((path = "/pages/person/main")) {
						path = "person";
					}
					let page = {
						url: path,
						query: {
							uuid: this.$route.query.uuid,
							"hide-tab-bar": true
						}
					};
					Utli.loginCheck(
						this.$store,
						this.$router,
						page,
						"login?hide-tab-bar",
						function() {
							wx.redirectTo({
								url: '../person/main'
							})
						}.bind(this)
					);
				}
			},
			init() {
				LoadingApi.start()
				var that = this
				Category.init({
					store: this.$store
				})
				Category.loadInitData({
					timeout: 100,
					needConcat: false,
					forceLoad: true
				})
				let pages = getCurrentPages()
				let currentPage = pages[pages.length - 1]
				let url = currentPage.route
				let id = null
				Home.init({
					store: this.$store,
					id
				})
				this.loadHomeCategoryProduct(() => {
					Home.loadInitData({
						timeout: 200,
						needConcat: false,
						forceLoad: true,
						cb: (r) => {
							LoadingApi.destroy()
						}
					})
					LoadingApi.destroy()
				})
			},

			loadHomeCategoryProduct(cb) {
				let request = `?size=100&currency=CNY&has_photo=true&is_base64=false&type=homepage&device=mobile`
				this.$store.dispatch('page/GET_CONTENT_PAGE_DATA_FROM_CLOUD', {
					request,
					cb
				})
			},
			moreHome() {
				Home.more()
			},
			bannerClick(item) {
				console.log(item)
				if (item.link.type === 'keyword') {
					this.goToSearch(item.link.value)
				} else {
					this.goToTarget(item.link.value)
				}
			},
			imgSearch(item) {
				if (item.link.type === 'keyword') {
					this.goToSearch(item.link.value)
				} else {
					this.goToTarget(item.link.value)
				}
			},
			goToSearch(keyword) {
				var that = this
				searchLib.findResultByKeyword(this.$store, this.$router, keyword, function() {}, 1)
				setTimeout(function() {
					that.$router.push('../search/main')
				}, 2000)
			},
			goToTarget(url) {
				let patten = /product|category|home|service|cms/ig
				if (patten.test(url)) {
					Utli.goToUrlWithAuth(this.$store, this.$router, {
						url
					}, 'push')
				} else if (!patten.test(url)) {
					let isLogin = this.$store.getters['account/isLogin']
					if (!isLogin) {
						this.$router.push('/pages/login/main')
					} else {
						Utli.goToUrl(this.$router, {
							url
						}, 'push')
					}
				}
			},
			goSearch() {
				// this.$router.push('../search/main')
				wx.reLaunch({
					url: '../search/main'
				})
			},
			goService() {
				this.$router.push('../customerService/main')
			},
			imgClick(item) {
				if (item.link.type === 'keyword') {
					this.goToSearch(item.link.value)
				} else if (item.link.type !== 'keyword') {
					this.goToTarget(item.link.value)
				}
			},
			goDetail(uuid) {
				this.$router.push({
					path: '../productDetail/main',
					query: {
						uuid: uuid
					}
				})
			},
			loadMore() {
				console.log('加载更多')
				this.moreHome()
			}
		},
// 		async onPullDownRefresh() {
// 			this.refreshHome()
// 		},
		onReachBottom() {
			this.moreHome()
		}
	}
</script>

<style>
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
		color: #333;
	}

	.active {
		color: rgb(102, 133, 96) !important;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.search {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		box-sizing: border-box;
		position: fixed;
		z-index: 10;
		background: #fff;
		top: 0;
		left: 0;
	}

	.search_box {
		width: 86%;
	}

	.van-search {
		background: #fff !important;
		border: 3px solid #eee;
		border-radius: 8px;
		padding: 3px !important;
	}

	.speak {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.speak img {
		width: 32px;
		height: 32px;
	}

	scroll-view {
		padding-top: 56px;
		padding-bottom: 56px;
	}

	.banner {
		width: 100%;
		height: 386rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px 10px;
		box-sizing: border-box;
		border-radius: 8px;
		overflow: hidden;
	}

	swiper {
		width: 100%;
		height: 376rpx;
	}

	swiper image {
		width: 100%;
		height: 100%;
	}

	.nav {
		width: 100%;
		display: flex;
		padding: 18px 10px;
		box-sizing: border-box;
		justify-content: space-around;
		align-items: center;
	}

	.nav li {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.nav li img {
		width: 32px;
		height: 32px;
	}

	.nav li span {
		font-size: 28rpx;
		color: #333;
		margin: 18px 0 10px;
	}

	.nav-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.nav-list li {
		width: 49.5%;
		height: 212rpx;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 1%;
	}

	.nav-list li img {
		width: 100%;
		height: 100%;
	}

	.block-d {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		box-sizing: border-box;
		margin-top: 20px;
	}

	.list-header {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	.list-header img {
		width: 120rpx;
		height: 24rpx;
	}

	.list-header span {
		font-size: 32rpx;
		color: #333;
		margin: 0 20rpx;
	}

	.cart-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.cart-list .name {
		font-size: 12px !important;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.cart-list li {
		background: rgb(248, 248, 248);
		width: 33.3%;
		display: flex;
		padding: 12rpx;
		box-sizing: border-box;
		flex-direction: column;
	}

	.cart-list li image {
		width: 100%;
		height: 210rpx;
	}

	.cart-list li span {
		font-size: 28rpx;
		color: #333;
		margin: 8px 0;
	}

	.cart-list li .list_price {
		font-size: 36rpx;
		color: red;
		margin: 0;
	}

	.block-e {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20px;
	}

	.e-list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.e-list li {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.line {
		width: 100%;
		height: 32rpx;
		background: rgb(247, 247, 247);
		padding: 0 10px;
		box-sizing: border-box;
	}

	.e-product {
		width: 100%;
		padding: 16rpx 32rpx;
		box-sizing: border-box;
		display: flex;
		height: auto !important;
	}

	.e-product image {
		width: 180rpx;
		height: 180rpx;
	}

	.e-content {
		flex: 1;
		height: 180rpx;
		padding-left: 32rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.e-title {
		width: 100%;
		color: #333;
		font-size: 32rpx;
	}

	.e-price {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.e-left {
		font-size: 32rpx;
		color: red;
	}

	.e-right {
		font-size: 28rpx;
		color: #333;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .3);
		z-index: 9999;
	}
</style>
