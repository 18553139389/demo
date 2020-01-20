<template>
	<div>
		<div class="map" id="container"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				map: null
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				console.log('111')
				let self = this
				self.map = new AMap.Map("container", {
					center: [115.046627, 35.733298],
					zoom: 14
				});

				var path = [
					[115.103322, 35.120255],
					[114.410703, 35.497555],
					[115.702292, 35.792353],
					[115.989846, 35.991365]
				]

				var polygon = new AMap.Polygon({
					path: path,
					strokeColor: "red",
					strokeWeight: 6,
					// strokeOpacity: 0.2,
					fillOpacity: 0.4,
					// fillColor: '#1791fc',
					zIndex: 50,
				})

				self.map.add(polygon)
				// 缩放地图到合适的视野级别
				self.map.setFitView([polygon])
			}
		}
	}
</script>

<style>
	.map {
		width: 100%;
		position: absolute;
		top: 1.2rem;
		left: 0;
		bottom: 0;
		background: rgb(248, 248, 248);
	}
</style>
