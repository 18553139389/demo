<template>
	<view class="contain">
		<view class="list">
			<img src="../../static/img/none.png" alt="">
			<view>暂未开通，敬请期待！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/index',
					data: datas,
					success: function(res){
						console.log(res)
						if(res.data.result == 0){
							self.$store.commit('changeVip', res.data.vipType)
							self.$store.commit('changeCustomer', res.data.customer)
						}
					}
				}
				ajax(data)
			}
		},
		onReady() {
	
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
		background: #FFFFFF;
	}
	
	.list {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #999;
	}
	
	.list>img {
		width: 50%;
		margin-bottom: 30upx;
	}
</style>
