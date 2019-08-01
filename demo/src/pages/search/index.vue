<template>
	<div>
		<div class="search">
			<div class="search_box">
				<van-icon name="search" size="16px" />
				<input type="text" placeholder="请输入搜索关键词" focus="true" confirm-type="搜索" v-model="value" @confirm="onSearch">
			</div>
			<div class="speak">
				<img src="../../../static/images/cs.png" alt="" @click="goService">
			</div>
		</div>
		<div class="searchBox">
			<div v-if="countLength === 0" style="z-index: 10;position: relative;">
				<h5 class="word-title">热门搜索</h5>
				<van-tag class="default-word" plain v-for="(item,index) in defaultWord" :key="index" @click="wordClick(item.text)">{{item.text}}</van-tag>
			</div>
			<div class="center">
				<span v-if="showResult">发现{{allTotal}}个含有"{{getKeyword}}"的产品</span>
				<span v-if="showNotFound">建议您搜索下品牌试试？</span>
				<span v-if="isLoading">Loading...</span>
			</div>
			<div class="scroll-container">
				<scroll-view scroll-y @scrolltolower="moreProduct" style="height: 100%;">
					<ul class="list_box">
						<li v-for="(item,index) in productList" :key="index" @click="goProduct(item.uuid)">
							<div class="img_list">
								<img :src="item.photos[0].image" alt="">
							</div>
							<div class="produce">
								<span class="title">{{item.name}}</span>
								<span class="price">AUD${{item.price}}</span>
								<span class="currentPrice">（约合¥{{item.currency_price}}）</span>
							</div>
						</li>
					</ul>
				</scroll-view>
			</div>
		</div>
	</div>
</template>

<script>
	import searchLib from '@lib/search'
	import Search from '@lib/pagination/Search'
	import eventBus from '../../library/eventBus'

	export default {
		data() {
			return {
				defaultWord: [{
					text: '奶粉'
				}, {
					text: 'swisse'
				}, {
					text: '孕妇'
				}, {
					text: 'Blackmores'
				}],
				needReset: false,
				page: 1,
				value: '',
				inputKeyword: '',
				countLength: 0,
				productList: null,
				allTotal: null
			}
		},
		onShow() {
			this.$store.commit('page/RESET_SEARCH_TO_LOC')
			this.page = 1
		},
		onUnload: function() {
			console.log('111')
			wx.reLaunch({
				url: '../index/main'
			})
		},
// 		onLoad() {
// 			if(this.getSearchResult.data.length > 0){
// 				this.countLength = this.getSearchResult.data.length
// 				this.productList = this.getSearchResult.data
// 				this.allTotal = this.getSearchTotal
// 			}
// 		},
		computed: {
			isNewSearch() {
				return this.$store.getters['page/isNewSearch']
			},
			showResult() {
				let result = false
				if (this.getKeyword !== null && this.countLength > 0 && this.isLoading !== true) {
					result = true
				}
				return result
			},
			getSearchResult() {
				return this.$store.getters['page/getSearchResult']
			},
			getKeyword() {
				return this.$store.getters['page/getKeyword']
			},
			isLoading() {
				return this.$store.getters['page/getSearchLoading']
			},
			showNotFound() {
				return !this.showResult && !this.isLoading && this.getKeyword != null && this.getSearchResult.data.length == 0		
			},
			getSearchTotal() {
				return this.$store.getters['page/getSearchResultTotal']
			}
		},
		methods: {
			goBack() {
				this.$store.commit('page/SET_SEARCH_DATA_TO_LOC', {data:{
					data:[],
					totalItemCount: ''
				}})
				this.countLength = 0
				this.productList = null
				this.value = ''
				this.$router.go(-1)
			},
			submitSearch(text) {
				var that = this
				console.log(this.value)
				if(text !== '' && text !== undefined) {
					this.value = text
				}
				let keyword = this.value
				console.log(keyword)
				let inputKeyword = keyword ? keyword : this.inputKeyword
				searchLib.findResultByKeyword(this.$store, this.$router, inputKeyword, function() {
					setTimeout(function() {
						that.countLength = that.getSearchResult.data.length
						that.productList = that.getSearchResult.data
						that.allTotal = that.getSearchTotal
					}, 2000)
				}.bind(this), this.page++)
			},
			wordClick(txt) {
				this.submitSearch(txt)
			},
			onSearch() {
				this.submitSearch()
			},
			goProduct(id) {
				this.$router.push({ path:'../productDetail/main', query: { uuid: id} })
			},
			goService() {
				this.$router.push('../customerService/main')
			},
			moreProduct (cb) {
			  let result = Search.more(this.$store,this.getKeyword, cb, this.page++)
			  if (!result) {
			    this.$store.commit('page/RESET_SEARCH_DATA')
			  }
			  this.$store.commit('page/SET_NEW_SEARCH', false)
			},
		}
	}
</script>

<style>
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
		height: 42px;
		display: flex;
		align-items: center;
		background: #fff !important;
		border: 3px solid #eee;
		border-radius: 8px;
		padding: 3px 12px !important;
		font-size: 14px;
		box-sizing: border-box;
	}
	
	._van-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	input {
		width: 90%;
		border: none;
		text-align: center;
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

	.searchBox {
		width: 100%;
		position: absolute;
		top: 54px;
		left: 0;
		bottom: 0;
		background: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.word-title {
		padding: 40rpx 0;
		width: 100%;
		font-size: 32rpx;
		color: #333;
	}

	.default-word {
		margin: 0 8px;
		zoom: 1.4;
	}

	.van-tag {
		background: #fff;
	}

	.center {
		margin: 20px 20px 10px;
		text-align: center;
		font-size: 32rpx;
		color: #333;
	}
	
	.scroll-container {
		width: 100%;
		position: absolute;
		left: 0;
		top: 51px;
		bottom: 0;
	}
	
	.list_box {
		width: 100%;
		padding: 0 10px 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.list_box li {
		width: 48%;
		background: #F5F5F5;
		display: flex;
		flex-direction: column;
	}
	
	.img_list {
		width: 100%;
		height: 340rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.img_list img {
		width: 80%;
		height: 80%;
	}
	
	.produce {
		width: 100%;
		padding: 16rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.title {
		width: 100%;
		font-size: 30rpx;
		color: #333;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
	}
	
	.price {
		font-size: 30rpx;
		color: red;
		margin: 6rpx 0;
	}
	
	.currentPrice {
		font-size: 24rpx;
		color: #999;
	}
</style>
