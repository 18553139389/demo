<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">纪念币商城</block>
			</cu-custom>
		</view>
		<view class="VerticalBox" style="margin-top: 50px;">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 50px)">
				<view class="cu-item" :class="index==tabCur?'cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect($event,index)" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 50px)" :scroll-into-view="'main-'+mainCur"
			 @scroll="VerticalMain">
				<view class="lr" v-for="(item,index) in list" :key="index" :id="'main-'+index" v-if="currentItem == index">
					<view class="cu-bar bg-white">
						<img class="top_img" :src="item.icon" alt="">
					</view>
					<view class="cu-list menu-avatar">
						<view class="list_detail">
							<view class="tab" v-for="(v,k) in item.childList" :key="k" @tap.stop="goList(v.childId)">
								<img class="tab_img" :src="v.childIcon" alt="">
								<view>{{v.childName}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<van-popup v-model="sub" :close-on-click-overlay="false" style="background: none !important;">
			<van-loading type="spinner" />
		</van-popup>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				currentItem: 0,
				load: true,
				sub: false
			}
		},
		onLoad() {
			this.sub = true
			let self = this
			let data = {
				url: '/api/gzh/productCategoryList',
				data: {},
				success: function(res) {
					console.log(res)
					if (res.data.result == 0) {
						if (res.data.dataList) {
							self.list = res.data.dataList
							for (let i = 0; i < self.list.length; i++) {
								self.list[i].ids = i;
							}
							self.sub = false
							// self.listCur = self.list[0];
						}
					}
				}
			}
			ajax(data)
		},
		methods: {
			TabSelect(e,item) {
				this.tabCur = e.currentTarget.dataset.id;
				// this.mainCur = e.currentTarget.dataset.id;
				// this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
				this.currentItem = item
			},
			VerticalMain(e) {
				// // #ifdef MP-ALIPAY
				// return false //支付宝小程序暂时不支持双向联动 
				// // #endif
				// let that = this;
				// let tabHeight = 0;
				// if (this.load) {
				// 	for (let i = 0; i < this.list.length; i++) {
				// 		let view = uni.createSelectorQuery().select("#main-" + this.list[i].ids);
				// 		view.fields({
				// 			size: true
				// 		}, data => {
				// 			this.list[i].top = tabHeight;
				// 			tabHeight = tabHeight + data.height;
				// 			this.list[i].bottom = tabHeight;
				// 		}).exec();
				// 	}
				// 	this.load = false
				// }
				// let scrollTop = e.detail.scrollTop + 10;
				// for (let i = 0; i < this.list.length; i++) {
				// 	if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
				// 		this.verticalNavTop = (this.list[i].id - 1) * 50
				// 		this.tabCur = this.list[i].ids
				// 		// console.log(scrollTop)
				// 		return false
				// 	}
				// }
			},
			goList(id) {
				uni.navigateTo({
					url: '../shopSearch/shopSearch?id=' + id
				})
			}
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow: hidden;
	}

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		background: #ececec;
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #ececec;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #ffffff;
		border-left: 4px solid #DE2910;
		color: #DE2910;
	}

	/* .VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	} */

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #FFFFFF;
		flex: 1;
	}

	.top_img {
		width: 100%;
		padding-left: 3.333%;
		box-sizing: border-box;
	}

	.list_detail {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		margin-bottom: 30upx;
	}

	.tab {
		width: 30%;
		height: 190upx;
		margin-top: 24upx;
		margin-left: 3.333%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tab_img {
		width: 100%;
		height: 140upx;
	}

	.lr {
		padding: 0 30upx 0 10upx;
	}

	.tab>view {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		margin-top: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
