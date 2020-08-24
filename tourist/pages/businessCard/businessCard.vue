<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">驿站名片</block>
				<block slot="right" v-if="has == 0">
					<view @tap="goMsg">发布名片</view>
				</block>
			</cu-custom>
		</view>
		<view class="search">
			<mSearch :mode="2" button="inside" :show="false" :placeholder="placeholder" @search="search($event,3)"></mSearch>
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
		 @emptyclick="emptyClick" @topclick="topClick">
			<view class="cards">
				<view class="cards-list" v-if="userCard && userCard.state == 0" @tap="goDetail('0')">
					<img class="bg" src="../../static/img/state0.png">
					<view class="cards-header">
						<img :src="userCard.icon" alt="">
						<view class="user">{{userCard.username}}</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card3.png" alt="">
							<view>地址:<text style="color: #999;">{{userCard.city}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card2.png" alt="">
							<view>公司:<text style="color: #999;">{{userCard.company}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg" style="border-bottom: none; padding-bottom: 30upx;">
							<img src="../../static/img/card1.png" alt="">
							<view>个性签名:<text style="color: #999;">{{userCard.introduction}}</text></view>
						</view>
					</view>
				</view>
				<view class="cards-list" v-if="userCard && userCard.state == 1" @tap="goDetail('0')">
					<img class="bg" src="../../static/img/state2.png">
					<view class="cards-header">
						<img :src="userCard.icon" alt="">
						<view class="user">{{userCard.username}}</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card3.png" alt="">
							<view>地址:<text style="color: #999;">{{userCard.city}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card2.png" alt="">
							<view>公司:<text style="color: #999;">{{userCard.company}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg" style="border-bottom: none; padding-bottom: 30upx;">
							<img src="../../static/img/card1.png" alt="">
							<view>个性签名:<text style="color: #999;">{{userCard.introduction}}</text></view>
						</view>
					</view>
				</view>
				<view class="cards-list" v-if="userCard && userCard.state == 2" @tap="goDetail('0')">
					<img class="bg" src="../../static/img/state1.png">
					<view class="cards-header">
						<img :src="userCard.icon" alt="">
						<view class="user">{{userCard.username}}</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card3.png" alt="">
							<view>地址:<text style="color: #999;">{{userCard.city}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card2.png" alt="">
							<view>公司:<text style="color: #999;">{{userCard.company}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg" style="border-bottom: none;padding-bottom: 30upx;">
							<img src="../../static/img/card1.png" alt="">
							<view>个性签名:<text style="color: #999;">{{userCard.introduction}}</text></view>
						</view>
					</view>
				</view>
				<view class="cards-list" v-for="(v,k) in listData" :key="k" @tap="goDetail('1',v)">
					<img class="bg" src="../../static/img/state4.png">
					<view class="cards-header">
						<img :src="v.icon" alt="">
						<view class="user">{{v.username}}</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card3.png" alt="">
							<view>地址：<text style="color: #999;">{{v.city}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg">
							<img src="../../static/img/card2.png" alt="">
							<view>公司：<text style="color: #999;">{{v.company}}</text></view>
						</view>
					</view>
					<view class="cards-group">
						<view class="cards-msg" style="border-bottom: none;padding-bottom: 30upx;">
							<img src="../../static/img/card1.png" alt="">
							<view>个性签名：<text style="color: #999;">{{v.introduction}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import mSearch from '../../components/search/search.vue'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import {
		ajaxs
	} from '../../common/js/util.js'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				listData: [],
				mescroll: null, //mescroll实例对象
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					autoShowLoading: true, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
					isLock: false, // 是否锁定下拉刷新,默认false;
					isBoth: true, // 下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认true,两者可同时触发;
					offset: 80, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
					inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
					outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
					bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
					minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
					textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
					textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
					textLoading: '加载中 ...' // 加载中的提示文本
				},
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					isLock: false, // 是否锁定上拉加载,默认false;
					isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					textLoading: '加载中 ...', // 加载中的提示文本
					textNoMore: '-- 没有更多数据 --', // 没有更多数据的提示文本
					toTop: {
						// 回到顶部按钮,需配置src才显示
						src: "http://www.mescroll.com/img/mescroll-totop.png", // 图片路径
						offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
						duration: 300 // 回到顶部的动画时长,默认300ms
					},
					empty: {
						use: true, // 是否显示空布局
						icon: "http://www.mescroll.com/img/mescroll-empty.png", // 图标路径
						tip: '暂无相关数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				},
				userCard: null,
				placeholder: '请输入关键字',
				keyword: '',
				type: 0,
				has: 1
			}
		},
		components: {
			mSearch,
			MescrollUni
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
		},
		onShow() {
			if(this.mescroll){
				this.listData = []
				this.upCallback(this.mescroll)
			}
		},
		onUnload() {
			this.mescroll = null;
		},
		//注册滚动到底部的事件,用于上拉加载
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom()
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e)
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
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.listData = []
				this.userCard = null
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				let data = {
					url: '/api/gzh/vcardList',
					data: {
						uid: self.$store.state.uid,
						keyword: self.keyword,
						pageNo: pageNum,
						pageSize: pageSize
					},
					success: function(res) {
						let count = 0
						if (res.data.result == 0) {
							if (res.data.userCard) {
								self.userCard = res.data.userCard
								count++
							} 
							self.has = res.data.has
							for (var j = 0; j < res.data.dataList.length; j++) {
								self.listData.push(res.data.dataList[j])
							}
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.dataList
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.totalPage
						mescroll.endByPage(curPageData.length + count, totalPage)
						//设置列表数据
						// if (mescroll.num == 1) this.dataList = [] //如果是第一页需手动置空列表
						// self.dataList = self.dataList.concat(curPageData) //追加新数据
					}
				}
				ajaxs(data)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
			goMsg() {
				uni.navigateTo({
					url: '../cardsPublic/cardsPublic'
				})
			},
			goDetail(type, item) {
				uni.navigateTo({
					url: '../cardsDetail/cardsDetail?type=' + type + '&list=' + JSON.stringify(item)
				})
			},
			search(e, val) {
				this.keyword = e
				this.listData = []
				this.userCard = {}
				this.upCallback(this.mescroll)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #F8F8F8;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.search {
		width: 100%;
		height: 90upx;
		padding: 10upx 30upx 20upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: none;
		background: #fff;
	}

	.cards {
		width: 100%;
		padding: 30upx 0 30upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.cards-list {
		width: 48%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 2%;
		margin-bottom: 2%;
		/* padding: 20upx;
		box-sizing: border-box; */
		/* border-radius: 4px; */
		/* background: #fff; */
		/* box-shadow: 1px 1px 4px #eee; */
		position: relative;
	}

	.cards-header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
		color: #333;
		z-index: 90;
		margin: 24upx 0;
	}

	.cards-header>img {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 16upx;
	}

	.cards-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: #333;
		z-index: 90;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.cards-msg {
		width: 100%;
		overflow: hidden;
		padding: 18upx 0 20upx;
		display: flex;
		align-items: flex-start;
		border-bottom: 1px dashed #eee;
	}

	.cards-msg>img {
		width: 22upx;
		/* height: 26upx; */
		margin-right: 12upx;
		margin-top: 8upx;
	}

	.cards-msg>view {
		width: 100%;
		line-height: 40upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
