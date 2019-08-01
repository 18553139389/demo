<template>
	<div class="list" v-cloak>
		<main-header :text="text" @back="back"></main-header>
		<div class="box" v-if="ayin==false">
			<van-radio-group v-model="choiced" @change="radiol">
				<div class="a_list" v-for="(item,index) in dataList[0]" :key="index" @click="qieaddress(item)">
					<div class="user">
						<span>{{item.receiverName}}</span>
						<span style="margin-left: 0.3rem;">{{item.mobile|hideMiddle}}</span>
					</div>
					<p>{{item.province}}{{item.city}}{{item.town}}{{item.addr}}</p>
					<div class="choice">
						<van-radio :name="item.id" checked-color="#07c160">设为默认</van-radio>
						<div class="editor">
							<div class="del" @click="deladdress(item.id)">删除</div>
							<div class="modify" @click="updateAddress(item.id)">编辑</div>
						</div>
					</div>
				</div>
			</van-radio-group>
			<div class="add" @click="goAdd">添加地址</div>
		</div>
		<div class="box" v-else>
			<div class="wuadd">暂无收货地址</div>
			<div class="add" @click="goAdd">添加地址</div>
		</div>
	</div>
</template>

<script>
	import MainHeader from "@/components/component/mainHeader";
	import Request from "@/common/js/request";
	import {
		Toast,
		RadioGroup,
		Radio,
		Dialog
	} from "vant";
	export default {
		data() {
			return {
				text: "收货地址",
				radio: 0,
				pageNow: 1,
				dataList: [],
				ayin: false,
				choiced: '',
				type: 0
			};
		},
		created() {
			this.cid = JSON.parse(localStorage.getItem("user")).cid;
			this.address();
		},
		components: {
			MainHeader
		},
		mounted() {
			var first = null;
			let self = this;
			mui.back = function() {
				if (!first) {
					self.$router.push("/order");
					first = new Date().getTime();
					setTimeout(function() {
						first = null;
					}, 1000);
				} else {
					if (new Date().getTime() - first < 1000) {
						plus.runtime.quit();
					}
				}
			};
		},
		methods: {
			qieaddress(i) {
				console.log(i);
				let add = {
					cmd: "setDefaultAddress",
					id: i.id
				};
				localStorage.setItem("add", JSON.stringify(i.id)); //默认地址ID
				this.$router.push({
					name: "order",
					params: {
						addresslist: i,
					}
				});
			},
			radiol(id) {
				if (this.type == 0) {
					this.type = 1
					return false
				}
				this.choiced = id
				let add = {
					cmd: "setDefaultAddress",
					id: id
				};
				Request.postRequest(add).then(res => {
					// console.log(res.data)
					if (res.data.result == "0") {
						Toast("设置默认地址成功");
						localStorage.setItem("add", JSON.stringify(id)); //默认地址ID
					}
				}).catch(res => {});
			},
			back() {
				this.$router.push('/order');
			},
			goAdd() {
				this.$router.push('/addyi');
			},
			updateAddress(id) {
				window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
				this.$router.push({
					path: "/addsyi",
					query: {
						id: id,
					}
				});
			},
			address() {
				console.log("地址列表");
				let add = {
					cmd: "addressList",
					cid: this.cid,
					pageNow: this.pageNow
				};
				Request.postRequest(add)
					.then(res => {
						// console.log(res.data)
						if (res.data.result == "0") {
							this.dataList.push(res.data.dataList);
							// console.log(this.dataList[0])
							for (let i in this.dataList[0]) {
								if (this.dataList[0][i].isDefault == "1") {
									this.choiced = this.dataList[0][i].id;
									localStorage.setItem("add", JSON.stringify(this.dataList[0][i].id));
								}
							}
							if (this.dataList[0].length > 0) {
								this.ayin = false;
							} else {
								this.ayin = true;
							}
						} else if (res.data.result == "2") {
							this.$router.push("/fenghao");
						}
					})
					.catch(res => {});
			},
			deladdress(id) {
				window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
				Dialog.confirm({
						title: "删除地址",
						message: "是否要删除该地址?"
					})
					.then(() => {
						console.log(id);
						let deladdress = {
							cmd: "deleteAddress",
							id: id
						};
						Request.postRequest(deladdress)
							.then(res => {
								// console.log(res.data)
								if (res.data.result == "0") {
									Toast("地址删除成功");
									// 页面刷新
									this.$router.replace({
										path: "/kong",
										query: {
											t: Date.now()
										}
									});
								}
							})
							.catch(res => {});
					})
					.catch(() => {});
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	[v-cloak] {
		display: none !important;
	}

	.list {
		width: 100%;
		height: 100%;
		background: #f5f5f5;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 72px 0.4rem 1.2rem 0.4rem;
			box-sizing: border-box;

			.a_list {
				width: 100%;
				display: flex;
				flex-direction: column;
				background: #fff;
				border-radius: 6px;
				font-size: 14px;
				color: #333;
				margin-top: 0.4rem;
				padding: 0.3rem;
				box-sizing: border-box;

				.user {
					width: 100%;
					display: flex;
					align-items: center;
				}

				p {
					width: 100%;
					color: #999;
					margin-top: 0.4rem;
					line-height: 18px;
				}

				.choice {
					width: 100%;
					margin-top: 0.4rem;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.editor {
						flex: 1;
						display: flex;
						flex-direction: row-reverse;
						align-items: center;

						.del {
							height: 0.7rem;
							line-height: 0.7rem;
							padding: 0 0.3rem;
							background: #72D141;
							font-size: 14px;
							color: #fff;
							border-radius: 4px;
						}

						.modify {
							height: 0.7rem;
							line-height: 0.7rem;
							padding: 0 0.3rem;
							border: 1px solid #999;
							font-size: 14px;
							color: #999;
							border-radius: 4px;
							margin-right: 0.4rem;
						}
					}
				}
			}

			.wuadd {
				text-align: center;
				font-size: 18px;
			}

			.add {
				width: 100%;
				height: 1.2rem;
				line-height: 1.2rem;
				background: #72D141;
				position: fixed;
				left: 0;
				bottom: 0;
				font-size: 14px;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>
