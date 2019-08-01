<template>
	<div class="contain">
		<mp-loading :showLoading="isShowLoading" loadingText="加载中..." :mask="isShowMask"></mp-loading>
		<div class="footerNav">
			<div class="footerList" v-for="(item,indx) in images" :key="indx" @click="changeNav(indx)">
				<img :src="item.url" alt="">
				<span :class="{actived:indx == 1}">{{item.text}}</span>
			</div>
		</div>
		<div class="search">
			<div class="search_box">
				<van-search placeholder="请输入搜索关键词" v-model="value" input-align="center" @focus="goSearch" />
			</div>
			<div class="speak" @click="goFirst">
				<img src="../../../static/images/cs.png" alt="">
			</div>
		</div>
		<div class="list">
			<scroll-view scroll-y="true">
				<ul>
					<li @click="choose_category(-1,'all','全部')" :class="{active:activeKey == -1}">
						<p>全部</p>
					</li>
					<li v-for="(item, i) in sliderList" :key="i" @click="choose_category(i,item.uuid,item.name)" :class="{active:activeKey == i}">
						<p>{{item.name}}</p>
					</li>
				</ul>
			</scroll-view>
			<div class="list_box">
				<div class="banner">
					<swiper :images="imgList" :indicatorDots="indicatorDots"></swiper>
				</div>
				<divider :text="selectCategoryName"></divider>
				<scroll-view scroll-y="true" style="width:100%;height: 660rpx;" @scrolltolower="moreProduct">
					<div class="product">
						<block v-for="(item, i) in productList" :key="i">
							<div class="content" @click="goDetail(item.uuid)">
								<img :src="item.photos[0].image" alt="">
								<div class="detail">
									<span class="title">{{item.name}}</span>
									<span class="price">AUD${{item.price}}</span>
									<span class="currency">（约合¥{{item.currency_price}}）</span>
								</div>
							</div>
						</block>
					</div>
				</scroll-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from "@/components/swiper"
	import Divider from "@/components/divider"
	import Category from '@lib/pagination/Category'
	import Product from '@lib/pagination/Product'
	import _ from 'underscore'
	import Utli from '@lib//Utli'
	import mpLoading from 'mpvue-weui/src/loading'
	import LoadingApi from '@lib/loading'

	export default {
		data() {
			return {
				images: [{
						text: "首页",
						url: "../../static/tabs/first.png"
					},
					{
						text: "分类",
						url: "../../static/tabs/type-icon.png"
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
				scrollTop: 0,
				activeKeys: 1,
				text: '全部',
				indicatorDots: false,
				key: -1,
				currentCategory: '',
				activeKey:-1,
				type: 'product_category_all',
				selectCategoryName: '全部',
				needResetProduct: false,
				sliderList: null,
				productList: null,
				isShowLoading:false,
				isShowMask:true,
				uuid:''
			}
		},
		onLoad() {
			this.sliderList = this.categories.data
			this.productList = this.showProductList.data
			this.imgList = this.bannerList
		},
		mounted() {
			var self = this
			this.currentCategory = ''
			this.$store.commit('category/SET_DATA_TO_LOC', [])
			Category.init({
				store: this.$store
			})
			
			Category.loadInitData({
				timeout: 100,
				needConcat: false,
				forceLoad: true,
				cb: function(response) {
					let result = self.findCategory(response.data)
					if (result.key >= 0) {
						self.key = parseInt(result.key)
					}
					self.activeCategory(result.key, result.uuid, result.name)
					// self.isShowLoading = false
					LoadingApi.destroy()
				}
			})
			this.changeProductByCategoryUUID(this.$route.query.cid)
			// self.isShowLoading = true
			LoadingApi.start()
		},
		components: {
			Swiper,
			Divider,
			mpLoading
		},
		computed: {
			categories() {
				return this.$store.getters['category/allCategory']
			},
			showProductList() {
				return this.$store.getters['product/allProducts']
			},
			bannerList() {
				let src
				if (this.activeKey === -1) {
					src = '../../static/images/homeBanner.png'
				} else {
					src = this.sliderList[this.activeKey].banner_img
				}
				if (!src) {
					src = '../../static/images/homeBanner.png'
				}
				return [{
					url: 'javascript:',
					img: src,
					title: ''
				}]
			}
		},
		methods: {
			changeNav(index) {
				if (index == 0) {
					wx.redirectTo({
						url: '../index/main'
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
			goFirst() {
				this.$router.push('../customerService/main')
			},
			goSearch() {
				this.$router.push('../search/main')
			},
			findCategory(categories) {
				let result = {
					status: false
				}
				let id ='all'
				if(this.$route.query.cid){
					id = this.$route.query.cid
				}
				if (id !== 'all' && id !== undefined) {
					result.status = true
					if (id !== undefined && id !== this.currentCategory) {
						const findKey = _.findKey(categories.data, item => item.uuid === id)
						console.log(findKey)
						if (findKey !== undefined) {
							this.currentCategory = id
							result.key = findKey
							result.uuid = id
							result.name = categories.data[findKey].name
						}
					}
				} else {
					result.key = -1
					result.uuid = 'all'
					result.name = '全部'
				}
				wx.clearStorageSync()
				return result
			},
			activeCategory(key, uuid, name) {
				this.activeKey = parseInt(key) 
				if (uuid !== 'all' && uuid !== undefined) {
					this.type = 'cat_' + uuid
				} else {
					this.type = 'product_category_all'
				}
				this.selectCategoryName = name
				this.currentCategory = uuid
			},
			goDetail(uuid) {
				this.$router.push({path:'../productDetail/main',query:{uuid: uuid,cid: this.uuid}})
			},
			choose_category(key, uuid, name) {
				this.text = name
				this.key = key
				this.scrollTop = 0
				LoadingApi.start()
				this.changeProductByCategoryUUID(uuid)
				this.activeCategory(key, uuid, name)
				this.uuid = uuid
				console.log(this.uuid,'选择的uuid')
			},
			changeProductByCategoryUUID(uuid) {
				var that = this
				that.$store.commit('product/SET_DATA_TO_LOC', [])
				let request = {
					store: that.$store,
					type: that.type
				}
				if (uuid !== 'all' && uuid !== undefined) {
					request.category = uuid
				}
				Product.init(request)
				Product.loadInitData({
					timeout: 100,
					needConcat: false,
					forceLoad: true,
					cb: function() {
						that.isShowLoading = false
						setTimeout(function(){
							that.productList = that.showProductList.data
							LoadingApi.destroy()
						},500)
					}
				})
				// that.isShowLoading = false
			},
			moreProduct (cb) {
			   console.log('到达底部了')
			   Product.more(cb)
			}
		}
	}
</script>

<style>
	page {
		height: 100vh;
		overflow: hidden;
	}
	
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

	.contain {
		height: 100vh;
	}
	
	.active {
		background: #fff !important;
		border-left: 3px solid green;
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

	.list {
		width: 100%;
		display: flex;
		padding-top: 56px;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 50px;
	}

	scroll-view {
		width: 184rpx;
	}

	scroll-view ul {
		width: 184rpx;
		display: flex;
		flex-direction: column;
		background: rgb(248, 248, 248);
	}

	scroll-view ul li {
		width: 184rpx;
		height: 116rpx;
		text-align: left;
		font-size: 30rpx;
		color: #333;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	scroll-view ul li p {
		text-align: center;
	}

	.list_box {
		width: 78%;
		padding: 16rpx 40rpx;
		background: rgb(251, 249, 254);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.banner {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.product {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.content {
		width: 47%;
		display: flex;
		flex-direction: column;
		margin-bottom: 2%;
		border-bottom: 1px solid #eee;
		padding-right: 3%;
		padding-bottom: 2%;
	}

	.content>img {
		width: 100%;
		height: 200rpx;
	}

	.detail {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 12rpx;
	}

	.title,
	.des {
		font-size: 26rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.price {
		font-size: 30rpx;
		color: red;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.currency {
		font-size: 24rpx;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
</style>
