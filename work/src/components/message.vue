<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<ul class="list">
					<li v-for="(item,index) in list" :key="index">
						<img src="../../static/img/msg.png" alt="">
						<div class="msg_list">
							<div class="msg_title" @click="goDetail(item.id)">
								<div class="msg_head">{{item.heading}}</div>
								<div class="msg_des">{{item.content}}</div>
							</div>
							<div class="msg_icon">
								<img v-if="item.isRead == 0" class="msg_warn" src="../../static/img/warn-icon.png" alt="">
								<img class="msg_del" src="../../static/img/del.png" @click="del(index,item.id)" alt="">
							</div>
						</div>
					</li>
				</ul>
			</van-pull-refresh>
		</van-list>
		<div class="no" v-if="show">
			<img src="../../static/img/warning.png" alt="">
			<span>暂没有消息通知</span>
		</div>
		<div class="load" v-if="load">
			<van-loading type="spinner" color="white" />
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import {
		Toast
	} from 'vant'
	import {
		Dialog,
		Loading
	} from 'vant'

	export default {
		data() {
			return {
				text: '消息',
				loading: false,
				finished: false,
				isLoading: false,
				totalPage: 2,
				page: 1,
				list: [],
				msgList: [],
				uid: '',
				show: false,
				load: false
			}
		},
		components: {
			MainHeader
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		methods: {
			onRefresh: function() {
				var self = this
				this.list = []
				this.page = 1
				this.totalPage = 2
				this.load = true
				this.onLoad()
				setTimeout(function() {
					Toast('刷新成功')
					self.isLoading = false
				}, 500);
			},
			onLoad: function() {
				var self = this
				//注意在此处的滚动加载必须产生滚动条所以多加载几条数据
				if (this.page <= this.totalPage) {
					let self = this
					let datas = {
						uid: self.uid
					}
					Request.postRequest('api/platform/tPlatformInfo/list', datas).then(res => {
						if (res.data.success == true) {
							self.totalPage = res.data.body.totalPage
							if(res.data.body.list.length > 0){
								self.show = false
								self.load = false
								for (let i = 0; i < res.data.body.list.length; i++) {
									self.list.push(res.data.body.list[i])
								}
							}else{
								self.show = true
								self.load = false
							}
						}
					}).catch(res => {
						console.log(res)
					})
					this.page++;
					// 加载状态结束
					this.loading = false;
				} else {
					this.loading = false;
					this.finished = true;
				}
			},
			del(item, id) {
				var self = this
				Dialog.confirm({
					title: '删除',
					message: '确认删除该消息吗'
				}).then(() => {
					self.list.splice(item, 1)
					let datas = {
						uid: self.uid,
						id: id
					}
					Request.postRequest('api/platform/tPlatformInfo/delete', datas).then(res => {
						console.log(res)
						if (res.data.success == true) {
							Toast('删除成功')
						}
					}).catch(res => {
						console.log(res)
					})
				}).catch(() => {
					// on cancel
				})
			},
			back() {
				this.$router.push('/first')
			},
			goDetail(id) {
				let self = this
				let datas = {
					uid: self.uid,
					id: id
				}
				Request.postRequest('api/platform/tPlatformInfo/haveRead', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						self.$router.push({
							name: 'messageDetail',
							params: {
								id: id
							}
						})
					}
				}).catch(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.list {
		width: 100%;
		box-sizing: border-box;
		margin-top: 72px;
	}

	.list li {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.3rem 0.5rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.list li>img {
		width: 60px;
		height: 60px;
	}

	.msg_list {
		width: 86%;
		display: flex;
		padding-left: 0.3rem;
		box-sizing: border-box;
		height: 46px;
	}

	.msg_title {
		width: 5.7rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.msg_head {
		font-size: 16px;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.msg_des {
		font-size: 14px;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}

	.msg_icon {
		width: 20%;
		height: 46px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.msg_warn {
		width: 26px;
		height: 20px;
	}

	.msg_del {
		width: 20px;
		height: 20px;
	}
	
	.no {
		width: 80%;
		height: 6rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -40%;
		margin-top: -3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.no img {
		width: 40%;
	}
	
	.no span {
		font-size: 15px;
		margin-top: 0.8rem;
	}
	
	.load {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
