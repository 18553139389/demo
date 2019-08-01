<template>
	<div class="all">
		<div class="contains">
			<div class="nav-item" v-for="(item,index) in datas" :key="index" v-if="index<9">
				<img v-lazy="item.icon" alt @click="classify(item.id)" />
				<span>{{item.name}}</span>
			</div>
			<div class="nav-item xia">
				<img src="../../../static/img/tilogo.png" alt @click="fenlei" />
				<span>更多</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Swipe,
		SwipeItem
	} from "vant";

	export default {
		props: {
			datas: {
				type: Array,
				default: []
			}
		},
		data() {
			return {};
		},
		components: {
			Swipe,
			SwipeItem
		},
		methods: {
			classify(id) {
				this.$router.push({
					name: "ClassifySearchone",
					params: {
						id: id
					}
				});
			},
			fenlei() {
				this.$router.push("/classify");
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.all {
		width: 100%;
		position: relative;

		.contains {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.nav-item {
				width: 20%;
				margin-top: 10px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				img {
					width: 45px;
					height: 45px;
					border-radius: 50%;
				}

				span {
					font-size: 12px;
					color: #666;
					margin-top: 7px;
				}
			}
		}

		// .xia {
		// 	position: absolute;
		// 	right: 0;
		// 	bottom: 0;
		// }
	}
</style>
