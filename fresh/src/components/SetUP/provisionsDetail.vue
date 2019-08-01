<template>
	<div class="wrapper">
		<main-header :text="text" @back="back"></main-header>
		<div class="problemDetails-zi">
			<iframe :src="this.url" height="100%" width="100%" frameborder="0"></iframe>
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
				text: "",
				url: ""
			};
		},
		components: {
			MainHeader
		},
		created() {
			console.log(this.$route.query.url);
			this.url = this.$route.query.url;
			this.text = this.$route.query.title
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
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.wrapper {
		width: 100%;
		height: 100%;
	}
	
	.problemDetails-zi {
		width: 100%;
		height: 100%;
		padding: 50px 0.4rem 30px;
		box-sizing: border-box;
	}
</style>
