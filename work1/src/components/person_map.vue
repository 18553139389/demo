<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<div class="map" id="container"></div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	const src = require('../../static/img/close.png')
	const mark = require('../../static/img/poi-marker-red.png')
	export default {
		data() {
			return {
				text: '通行路线位置',
				list: [],
				allList: [],
				listTitle: [],
				sectionList: [],
				sectionTitle: [],
				ids: '',
				type: null
			}
		},
		components: {
			MainHeader
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
			console.log(this.uid)
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let self = this
				self.map = new AMap.Map("container", {
					center: [115.046627, 35.733298],
					zoom: 14
				});
				self.map.setMapStyle("amap://styles/fresh");
				var drivingOption = {
					policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
					ferry: 1, // 是否可以使用轮渡
					province: '豫', // 车牌省份的汉字缩写  
				}
				// 构造路线导航类
				var driving = new AMap.Driving(drivingOption)
				this.ids = this.$route.params.id
				this.type = this.$route.params.type
				let datas = {
					uid: self.uid,
					applyType: self.type
				}
				Request.postRequest('api/licence/tPermit/init', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						if (res.data.body !== undefined || res.data.body !== {}) {
							for (let i = 0; i < res.data.body.categorys.length; i++) {
								if (self.ids == res.data.body.categorys[i].id) {
									self.list = res.data.body.categorys[i].routeList
								}
							}
							for (let i = 0; i < self.list.length; i++) {
								self.allList.push(self.list[i].startPointValue)
								self.listTitle.push(self.list[i].name)
							}

							let arr1 = []
							for (let i = 0; i < self.allList.length; i++) {
								arr1.push(self.allList[i].split('|'))
							}
							for (let i = 0; i < arr1.length; i++) {
								for (let j = 0; j < arr1[i].length; j++) {
									arr1[i][j] = (arr1[i][j].split(':'))
								}
							}
							self.allList = arr1
							console.log(self.listTitle, '怎么改变')
						}

						for (let i = 0; i < self.allList.length; i++) {
							if (self.allList[i].length > 2) {
								// 根据起终点经纬度规划驾车导航路线
								driving.search(new AMap.LngLat(self.allList[i][0][0], self.allList[i][0][1]), new AMap.LngLat(self.allList[i]
									[self.allList[i].length - 1][0], self.allList[i][self.allList[i].length - 1][1]), {
									waypoints: [new AMap.LngLat(self.allList[i][1][0], self.allList[i][1][1])]
								}, function(status, result) {
									// result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
									if (status === 'complete') {
										if (result.routes && result.routes.length) {
											// 绘制第一条路线，也可以按需求绘制其它几条路线
											self.drawRoute(result.routes[0], self.listTitle[i])
											console.log('绘制驾车路线完成')
										}
									} else {
										console.log('获取驾车数据失败：' + result)
									}
								});
							} else if (self.allList[i].length > 3) {
								// 根据起终点经纬度规划驾车导航路线
								driving.search(new AMap.LngLat(self.allList[i][0][0], self.allList[i][0][1]), new AMap.LngLat(self.allList[i]
									[self.allList[i].length - 1][0], self.allList[i][self.allList[i].length - 1][1]), {
									waypoints: [new AMap.LngLat(self.allList[i][1][0], self.allList[i][1][1]), new AMap.LngLat(self.allList[i]
										[2][0], self.allList[i][2][1])]
								}, function(status, result) {
									// result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
									if (status === 'complete') {
										if (result.routes && result.routes.length) {
											// 绘制第一条路线，也可以按需求绘制其它几条路线
											self.drawRoute(result.routes[0], self.listTitle[i])
											console.log('绘制驾车路线完成')
										}
									} else {
										console.log('获取驾车数据失败：' + result)
									}
								});
							} else if (self.allList[i].length > 1) {
								// 根据起终点经纬度规划驾车导航路线
								driving.search(new AMap.LngLat(self.allList[i][0][0], self.allList[i][0][1]), new AMap.LngLat(self.allList[i]
									[self.allList[i].length - 1][0], self.allList[i][self.allList[i].length - 1][1]), function(status, result) {
									// result即是对应的驾车导航信息
									if (status === 'complete') {
										if (result.routes && result.routes.length) {
											// 绘制第一条路线，也可以按需求绘制其它几条路线
											self.drawRoute(result.routes[0], self.listTitle[i])
											console.log('绘制驾车路线完成')
										}
									} else {
										console.log('获取驾车数据失败：' + result)
									}
								});
							}
						}
					}
				}).catch(res => {
					console.log(res)
				})

				Request.postRequest('api/licence/region/list', datas).then(res => {
					console.log(res)
					if (res.data.success == true) {
						if (res.data.body !== undefined || res.data.body !== {}) {
							for (let i = 0; i < res.data.body.list.length; i++) {
								self.sectionList = res.data.body.list
								self.sectionTitle.push(res.data.body.list[i]['name'])
							}
							for (let i = 0; i < self.sectionList.length; i++) {
								var str = self.sectionList[i]['lonLat']
								let arr2 = []
								arr2 = str.split(',')
								console.log(arr2)
								for (let i = 0; i < arr2.length; i++) {
									arr2[i] = (arr2[i].split('_'))
								}
								self.drawSection(arr2,self.sectionTitle[i])
							}
						}
					}
				})
			},
			drawSection(arr,title) {
				var self = this
				var polygon = new AMap.Polygon({
					path: arr,
					strokeColor: "red",
					strokeWeight: 6,
					strokeOpacity: 1,
					fillOpacity: 0.2,
					fillColor: 'red',
					zIndex: 40,
				})
				self.map.add(polygon)
				// 缩放地图到合适的视野级别
				self.map.setFitView([polygon])
				//实例化信息窗体
				var title = title + '区域已禁行'
				var infoWindow = new AMap.InfoWindow({
					isCustom: true, //使用自定义窗体
					content: self.createInfoWindow(title),
					offset: new AMap.Pixel(16, -45)
				});
				
				polygon.on('click', function(event) {
					infoWindow.open(self.map, event.lnglat);
				})
			},
			drawRoute(route, title) {
				var self = this
				var path = self.parseRouteToPath(route)
				var startMarker = new AMap.Marker({
					position: path[0],
					icon: mark,
					map: self.map
				})
				console.log(path[0])

				//实例化信息窗体
				var title = title + '已禁行'
				var infoWindow = new AMap.InfoWindow({
					isCustom: true, //使用自定义窗体
					content: self.createInfoWindow(title),
					offset: new AMap.Pixel(16, -45)
				});

				//鼠标点击marker弹出自定义的信息窗体
				AMap.event.addListener(startMarker, 'click', function() {
					infoWindow.open(self.map, startMarker.getPosition());
				});

				var endMarker = new AMap.Marker({
					position: path[path.length - 1],
					icon: mark,
					map: self.map
				})

				//鼠标点击marker弹出自定义的信息窗体
				AMap.event.addListener(endMarker, 'click', function() {
					infoWindow.open(self.map, endMarker.getPosition());
				});

				var routeLine = new AMap.Polyline({
					path: path,
					isOutline: true,
					outlineColor: '#ffeeee',
					borderWeight: 2,
					strokeWeight: 3,
					strokeColor: 'red',
					lineJoin: 'round'
				})

				routeLine.setMap(self.map)

				// 调整视野达到最佳显示区域
				self.map.setFitView([startMarker, endMarker, routeLine])
			},
			parseRouteToPath(route) {
				var path = []
				for (var i = 0, l = route.steps.length; i < l; i++) {
					var step = route.steps[i]

					for (var j = 0, n = step.path.length; j < n; j++) {
						path.push(step.path[j])
					}
				}
				return path
			},
			createInfoWindow(title) {
				var info = document.createElement("div");
				info.className = "custom-info input-card content-window-card";
				var top = document.createElement("div");
				var titleD = document.createElement("div");
				var closeX = document.createElement("img");
				top.className = "info-top";
				titleD.innerHTML = title;
				closeX.src = src;
				closeX.onclick = this.closeInfoWindow;

				top.appendChild(titleD);
				top.appendChild(closeX);
				info.appendChild(top);
				return info
			},
			closeInfoWindow() {
				this.map.clearInfoWindow();
			},
			back() {
				let ids = this.$route.params.id
				let type = this.$route.params.type
				let path = this.$route.params.path
				if(path == 0){
					this.$router.push({
						name: 'person_path',
						params: {
							id: ids,
							type: type
						}
					})
				}else if(path == 1){
					this.$router.push({
						name: 'person_section',
						params: {
							id: ids,
							type: type
						}
					})
				}
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

	.content-window-card {
		position: relative;
		box-shadow: none;
		bottom: 0;
		left: 0;
		width: auto;
		padding: 0;
	}

	div.info-top {
		position: relative;
		background: none repeat scroll 0 0 red;
		border-radius: 30px;
		padding: 0px 10px;
	}

	div.info-top div {
		display: inline-block;
		color: #fff;
		font-size: 14px;
		line-height: 24px;
		padding: 0 10px;
	}

	div.info-top img {
		position: absolute;
		top: 2px;
		right: 6px;
		transition-duration: 0.25s;
		width: 10px;
		height: 10px;
	}

	div.info-top img:hover {
		box-shadow: 0px 0px 5px #000;
	}

	.amap-icon img {
		width: 30px;
		height: 30px;
	}
</style>
