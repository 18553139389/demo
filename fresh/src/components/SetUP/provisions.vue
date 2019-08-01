<template>
	<div class="tenants-box wrapper">
		<main-header :text="text" @back="back"></main-header>
		<div class="tenants-zi">
			<!-- <iframe :src="url" height="100%" width="100%" frameborder="0"></iframe> -->
			<ul>
			  <li v-for="(item,index) in list" :key="index" @click="problemDetails(item.title,item.url)">
			    <span>{{item.title}}</span>
			    <span>
			      <img src="../../../static/img/right.png" alt>
			    </span>
			  </li>
			</ul>
		</div>
	</div>
</template>

<script>
	import MainHeader from "@/components/component/mainHeader";
	import {
		Toast
	} from "vant";
	import Request from "@/common/js/request";

	export default {
		data() {
			return {
				text: "服务条文",
				list: []
			};
		},
		components: {
			MainHeader
		},
		created() {
			this.getshop();
		},
		mounted() {
			var first = null;
			mui.back = function() {
				if (!first) {
					window.history.go(-1);
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
			back() {
				this.$router.go(-1);
			},
			problemDetails(title,url){
				this.$router.push({
				  path: "/provisionsDetail",
				  query: {
					title: title,
				    url: url
				  }
				});
			},
			getshop() {
				let goCarlist = {
					cmd: "serviceProtocal"
				};
				Request.postRequest(goCarlist)
					.then(res => {
						console.log(res.data);
						if (res.data.result == 0) {
							this.list = res.data.dataList;
						}
					})
					.catch(res => {
						Toast("获取失败");
					});
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.wrapper {
		width: 100%;
		height: 100%;
	}
	
	.tenants-zi {
		width: 100%;
		height: 100%;
		border-top: 1px solid #dedede;
		
		ul {
		  margin-top: 50px;
		  li {
		    padding: 0 0.5rem;
		    font-size: 16px;
		    line-height: 40px;
		    border-bottom: 1px solid #dedede;
		    display: flex;
		    justify-content: space-between;
		    span {
		      color:#000;
		      img {
		        width: 20px;
		        height: 20px;
		      }
		    }
		  }
		}
	}
</style>
