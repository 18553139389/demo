<template>
	<div>
		<main-header :text="text"></main-header>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<ul class="list">
					<li v-for="(item,index) in list" :key="index">
						<span>{{item.title}}</span>
						<img src="../../static/img/go.png" alt="">
					</li>
				</ul>
			</van-pull-refresh>
		</van-list>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import {Toast} from 'vant'
	
	export default {
		data() {
			return {
				text: '运送货物名称',
				loading: false,
				finished: false,
				isLoading: false,
				totalPage: 2,
				page: 1,
				list: [],
				msgList: [{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、农副产品'
					},
					{
						title: '水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					},
					{
						title: '酒、农副产品'
					},
					{
						title: '水、农副产品'
					},
					{
						title: '酒、水、农副产品'
					}
				]
			}
		},
		components: {
			MainHeader,
			Toast
		},
		methods: {
			onRefresh: function() {
				var self = this
				this.list = []
				this.page = 1
				this.totalPage = 2
				this.onLoad()
				setTimeout(function() {
					Toast('刷新成功')
					self.isLoading = false
				}, 500);
			},
			onLoad: function() {
				console.log(this.page)
				//注意在此处的滚动加载必须产生滚动条所以多加载几条数据
				if (this.page <= this.totalPage) {
					for (var i = 0; i < this.msgList.length; i++) {
						this.list.push(this.msgList[i])
					}
					this.page++;
					// 加载状态结束
					this.loading = false;
				} else {
					this.loading = false;
					this.finished = true;
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.list {
		width: 100%;
		box-sizing: border-box;
	}
	
	.list li {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.3rem 0.5rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}
	
	.list li span {
		font-size: 15px;
		color: #333;
	}
</style>
