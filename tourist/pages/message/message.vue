<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">消息中心</block>
			</cu-custom>
		</view>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit"
		 @emptyclick="emptyClick" @topclick="topClick">
			<view class="wrapper">
				<van-swipe-cell :right-width="60" :left-width="0" v-for="(v,k) in list" :key="k">
					<van-cell :border="true" :value="v.createDate">
						<template slot="title">
							<img src="../../static/img/tongzhi.png" alt="">
							<text class="custom-text" @tap="goDetail(v.title,v.content)">{{v.title}}</text>
						</template>
					</van-cell>
					<van-button square slot="right" type="danger" text="删除" @tap="onClose(k)" />
				</van-swipe-cell>
			</view>
		</mescroll-uni>
		<model :show="show" title="删除" content="确认删除此消息吗" @cancel="cancel" @confirm="confirm"></model>
		<!-- <view class="no" v-if="dataList.length == 0">
			<img src="../../static/img/no.png" alt="">
			<view>亲~暂时没有消息呦~</view>
		</view> -->
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import model from '../../components/model/model.vue'
	import {
		SwipeCell
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				show: false,
				index: 0,
				list: [],
				totalPage: 2,
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
					noMoreSize: 6, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
						tip: '暂无消息数据', // 提示
						// btnText: '去逛逛 >' // 按钮
					}
				}
			}
		},
		components: {
			model,
			SwipeCell,
			MescrollUni
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
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
			init(mescroll) {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/msgList',
					data: datas,
					success: function(res){
						console.log(res)
						if (res.data.result == 0) {
							if(res.data.dataList){
								for (var j = 0; j < res.data.dataList.length; j++) {
									self.list.push(res.data.dataList[j])
								}
							}
						}
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.dataList
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = res.data.totalPage
						mescroll.endByPage(curPageData.length, totalPage)
					}
				}
				ajax(data)
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
				this.list = []
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let self = this
				self.init(mescroll)
			},
			// 点击回到顶部按钮的回调
			topClick() {
				console.log('点击了回到顶部按钮');
			},
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
			cancel() {
				this.show = false
			},
			onClose(k) {
				this.show = true
				this.index = k
			},
			confirm() {
				this.show = false
				this.dataList.splice(this.index, 1)
			},
			goDetail(title,content) {
				uni.navigateTo({
					url: '../messageDetail/messageDetail?title=' + title + '&content=' + content
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}

	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		border-radius: 4px;
	}

	.list {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 1px solid #eee; */
	}

	.list-left {
		display: flex;
		width: 70%;
		align-items: center;
	}

	.list-left>img {
		width: 80upx;
		height: 80upx;
	}

	.list-right {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.list-right>img {
		width: 50upx;
		height: 50upx;
		margin-left: 20upx;
	}

	.content {
		flex: 1;
		margin-left: 20upx;
		font-size: 14px;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.no {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.no>view {
		margin-top: 30upx;
		font-size: 14px;
		color: #999;
	}

	.van-cell__title {
		display: flex;
		align-items: center;
	}

	.van-swipe-cell {
		height: 100upx;
		/* border-bottom: 1px solid #eee; */
	}

	.custom-text {
		margin-left: 20upx;
	}
</style>
